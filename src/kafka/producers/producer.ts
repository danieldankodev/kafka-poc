import {Producer, ProducerRecord} from 'kafkajs'
import {kafkaInstance} from "../kafka-instance";
import {Topics} from "../../types/topics";
import {SchemaRegistry} from "../schema-registery";
import { MessageHeaderActions} from "../../types/message";
import {objectUtil} from "../../utils/object-util";

export abstract class ProducerFactory<M extends {}> {
    private producer: Producer
    private schemaRegistry: SchemaRegistry

    private createProducer() : Producer {

        return kafkaInstance.producer()
    }

    protected constructor(private schemaRegistrySubject: string, private topic: Topics) {
        this.producer = this.createProducer()
        this.schemaRegistry = new SchemaRegistry()
    }

    public async start(): Promise<void> {
        try {
            await this.producer.connect()
        } catch (error) {
            console.log('Error connecting the producer: ', error)
        }
    }

    public async shutdown(): Promise<void> {
        await this.producer.disconnect()
    }

    public async send(message: M, key: string = 'user'): Promise<void> {
        const kafkaMessages = {
                key,
                value: await this.schemaRegistry.encode(this.schemaRegistrySubject, message),
                headers: objectUtil.encode({
                    action: MessageHeaderActions.READ
                })
            }

        const topicMessages: ProducerRecord = {
            topic: this.topic,
            messages: [kafkaMessages]
        }
        await this.producer.connect()
        await this.producer.send(topicMessages)
    }

    public async sendBatch(messages: Array<M>): Promise<void> {
        const kafkaMessages = await Promise.all(messages.map( async (message) => {
            return {
                value: await this.schemaRegistry.encode(this.schemaRegistrySubject, message)
            }
        }))

        const topicMessages = {
            topic: this.topic,
            messages: kafkaMessages
        }

        const batch = {
            topicMessages: [topicMessages]
        }

        await this.producer.sendBatch(batch)
    }
}
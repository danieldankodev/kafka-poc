import { Consumer, ConsumerSubscribeTopics, EachBatchPayload, EachMessagePayload } from 'kafkajs'
import { kafkaInstance } from "../kafka-instance";
import { Topics } from "../../types/topics";
import { MessageValue } from "../../types/message";
import { SchemaRegistry } from "../schema-registery";
import { objectUtil } from "../../utils/object-util";

export default abstract class AppConsumer<M extends MessageValue> {
    private kafkaConsumer: Consumer
    private schemaRegistry: SchemaRegistry

    protected constructor(private topics: Topics[]) {
        this.kafkaConsumer = this.createKafkaConsumer()
        this.schemaRegistry = new SchemaRegistry()

    }

    public async startConsumer(): Promise<void> {
        const topic: ConsumerSubscribeTopics = {
            topics: this.topics,
            fromBeginning: false
        }

        try {
            await this.kafkaConsumer.connect()
            await this.kafkaConsumer.subscribe(topic)

            await this.kafkaConsumer.run({
                eachMessage: async (messagePayload: EachMessagePayload) => {
                    const { topic, partition, message } = messagePayload
                    const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
                    const messageKeyDecoded = message.key?.toString()
                    const messageHeadersDecoded = objectUtil.decode(message.headers ?? {})
                    console.log(`Headers: ${JSON.stringify(messageHeadersDecoded)}`)
                    const messageValueDecoded = message.value && await this.schemaRegistry.decode(message.value)
                    console.log(`- ${prefix} ${messageKeyDecoded}#${messageValueDecoded}`)
                }
            })
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    public async startBatchConsumer(): Promise<void> {
        const topic: ConsumerSubscribeTopics = {
            topics: this.topics,
            fromBeginning: false
        }

        try {
            await this.kafkaConsumer.connect()
            await this.kafkaConsumer.subscribe(topic)
            await this.kafkaConsumer.run({
                eachBatch: async (eachBatchPayload: EachBatchPayload) => {
                    const { batch } = eachBatchPayload
                    for (const message of batch.messages) {
                        const prefix = `${batch.topic}[${batch.partition} | ${message.offset}] / ${message.timestamp}`
                        console.log(`- ${prefix} ${message.key}#${message.value}`)
                    }
                }
            })
        } catch (error) {
            console.log('Error: ', error)
        }
    }

    public async shutdown(): Promise<void> {
        await this.kafkaConsumer.disconnect()
    }

    private createKafkaConsumer(): Consumer {

        return  kafkaInstance.consumer({ groupId: 'consumer-group' })
    }
}
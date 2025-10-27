import { SchemaRegistry as Registry, SchemaType } from '@kafkajs/confluent-schema-registry';
import { RawAvroSchema } from "@kafkajs/confluent-schema-registry/dist/@types";

export class SchemaRegistry {
    private registry: Registry
    constructor() {
        this.registry = new Registry({
            host:
        process.env.AIVEN_REGISTRY_URL!,
            auth: {
                username: process.env.AIVEN_SASL_USER!,
                password: process.env.AIVEN_SASL_PASSWORD!,
            },
            clientId: 'my-app',
        });
    }

    async encode(subject: string, payload: any): Promise<Buffer<ArrayBufferLike>> {
        const registryId = await this.registry.getRegistryId(subject, 1)
        const encodedPayload = await this.registry.encode(registryId, payload)
        console.log(`encoded payload: ${encodedPayload}`)
        return encodedPayload
    }

    async decode(encodedPayload: Buffer<ArrayBufferLike>) {
        const decodedPayload = await this.registry.decode(encodedPayload)
        console.debug(`decoded payload: ${decodedPayload}`)
        return decodedPayload
    }

    async createSchema(schema: RawAvroSchema): Promise<number> {
        console.debug(`schema: ${JSON.stringify(schema)}`)

        const { id } = await this.registry.register({ type: SchemaType.AVRO, schema, })
        console.debug(`Schema saved with id: ${id}`)
        return id
    }
}
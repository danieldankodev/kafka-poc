import { Kafka, logLevel } from "kafkajs";
import fs from "fs";

export const kafkaInstance = new Kafka({
    clientId: 'my-app',
    brokers: [process.env.AIVEN_KAFKA_BROKER_ID!],
    ssl: {
        ca: fs.readFileSync('./ca.pem', 'utf-8')
    },
    sasl: {
        mechanism: 'scram-sha-256',
        username: process.env.AIVEN_SASL_USER!,
        password: process.env.AIVEN_SASL_PASSWORD!,
    },
    logLevel: logLevel.INFO
})
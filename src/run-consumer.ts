import {CompanyConsumer} from "./kafka/counsumers/company-consumer";

const consumer = new CompanyConsumer()

process.stdin.addListener('data', async () => {
    await consumer.startConsumer()
})

process.on('unhandledRejection', error => {
    console.error('error', error)
})

process.on('uncaughtException', error => {
    console.error('error', error)
})

process.on('SIGINT', async () => {
    console.log('SIGINT, disconnect consumer...');
    await consumer.shutdown();
    process.exit(0);
});
import { CompanyMessageValue } from "./types/message";
import {CompanyProducer} from "./kafka/producers/company-producer";


const producer = new CompanyProducer()

process.stdin.addListener('data', async (input) => {
    try {
        const payload: CompanyMessageValue = {"name": "DADO-tech", "employeeNumber": 4}
        await producer.send(payload, 'company')
    } catch (e) {
        console.error('error', e);
    }

})

process.on('SIGINT', async () => {
    console.log('SIGINT, disconnect producer...');
    await producer.shutdown();
    process.exit(0);
});

process.on('unhandledRejection', error => {
    console.error('error', error)
})

process.on('uncaughtException', error => {
    console.error('error', error)
})


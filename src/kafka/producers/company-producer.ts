import { ProducerFactory } from "./producer";
import { CompanyMessageValue, UserMessageValue } from "../../types/message";
import { Topics } from "../../types/topics";


export class CompanyProducer extends ProducerFactory<CompanyMessageValue>{
    constructor() {
        super(`${Topics.COMPANY_TOPIC}-schema`, Topics.COMPANY_TOPIC );
    }
}
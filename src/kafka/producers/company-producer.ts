import { AppProducer } from "./producer";
import { CompanyMessageValue } from "../../types/message";
import { Topics } from "../../types/topics";


export class CompanyProducer extends AppProducer<CompanyMessageValue>{
    constructor() {
        super(`${Topics.COMPANY_TOPIC}-schema`, Topics.COMPANY_TOPIC );
    }
}
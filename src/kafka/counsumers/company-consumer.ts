import AppConsumer from "./consumer";
import {CompanyMessageValue, UserMessageValue} from "../../types/message";
import {Topics} from "../../types/topics";

export class CompanyConsumer extends AppConsumer<CompanyMessageValue> {
    constructor() {
        super([Topics.COMPANY_TOPIC]);
    }
}
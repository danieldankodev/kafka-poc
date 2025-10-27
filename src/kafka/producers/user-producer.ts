import { ProducerFactory } from "./producer";
import { UserMessageValue } from "../../types/message";
import { Topics } from "../../types/topics";


export class UserProducer extends ProducerFactory<UserMessageValue>{
    constructor() {
        super(`${Topics.USER_TOPIC}-schema`, Topics.USER_TOPIC );
    }
}
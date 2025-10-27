import {ProducerFactory} from "./producer";
import {UserMessageValue} from "../../types/message";
import {configs} from "../../utils/constants";
import {Topics} from "../../types/topics";


export class UserProducer extends ProducerFactory<UserMessageValue>{
    constructor() {
        super(configs.schemas.userSchemaRegistry, Topics.USER_TOPIC );
    }
}
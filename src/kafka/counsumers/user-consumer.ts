import AppConsumer from "./consumer";
import {UserMessageValue} from "../../types/message";
import {Topics} from "../../types/topics";

export class UserConsumer extends AppConsumer<UserMessageValue> {
    constructor() {
        super([Topics.USER_TOPIC]);
    }
}
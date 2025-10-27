
export type MessageValue<M extends { [key: string]: any } = {}> = M;
export interface UserMessageValue extends MessageValue{
    firstName: string,
    lastName: string,
    age: number,
}
export interface CompanyMessageValue extends MessageValue{
    name: string,
    employeeNumber: number,
}
export type MessageKey = string
export enum MessageHeaderActions {
    READ = 'READ',
}
export type MessageHeaders = { action: MessageHeaderActions }

export type KafkaMessage<V extends MessageValue> = {
    key: MessageKey
    value: V
    headers: MessageHeaders
}

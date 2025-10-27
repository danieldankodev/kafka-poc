import {RawAvroSchema} from "@kafkajs/confluent-schema-registry/dist/@types";

export const companySchema: RawAvroSchema = {
    name: 'Company',
    type: 'record',
    namespace: 'crud.schema',
    fields: [
        { name: 'name', type: 'string' },
        { name: 'employeeNumber', type: 'int' },
    ]
}
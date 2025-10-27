<h1>Kafka - Proof of concept</h1>
<h2>Intro</h2>
I've created a small proof of concept using kafka for communication between 2 services.
<h2>Instructions</h2>

<h3>Internal configuration</h3>
To successfully run this app you will need to fill `.env` file with provided keys from `.env.example`

<h3>External configuration</h3>
 
For this example I've used [Aiven](https://console.aiven.io/) to create my Apache kafka cluster (tier gives 1 month free usage without giving your payment info).
Also I've created schema using Raw Avro format that can be found in `/src/kafka/schemas` you can:
- Use Aiven dashboard to create schema using this raw data as value (key should stay string always)
- schema-registry.createSchema method and create your on registration in code

To learn about Avro schemas you can visit this [link](https://avro.apache.org/docs/).

<h3>Running scripts</h3>

Both consumer and producer have debug and regular mode. You will run these two commands in root of the project but in two separate terminals<br>
`npm run consumer[-debug]`<br>
`npm run producer[-debug]`
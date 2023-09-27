const {Kafka} = require("kafkajs");
const system_logs = require("./system_logs.json");


const createProducer = async () => {
    try{
        const kafka = new Kafka({
            clientId: "kafka_log_store_client",
            brokers: ["192.168.1.26:9092"]
        });
    
        const producer = kafka.producer();
    
        console.log("Trying to connect Producer...");
        await producer.connect();
        console.log("Successfully connected to Producer");
        

        let messages_from_log = system_logs.map(item => {
            return {
                value: JSON.stringify(item),
                partition: item.type == "system" ? 0 : 1
            }
        })

        const message_result = await producer.send({
            topic: "LogStoreTopic",
            messages: messages_from_log
        })
        
        console.log("Sent", JSON.stringify(message_result));
        await producer.disconnect();

    } catch(error){
        console.log(`Error: ${error}`);
    } finally{
        process.exit(0);
    }
}

createProducer();
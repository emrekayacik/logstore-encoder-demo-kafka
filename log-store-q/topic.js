const {Kafka} = require("kafkajs");

const createTopic = async () => {
    try{
        const kafka = new Kafka({
            clientId: "kafka_log_store_client",
            brokers: ["192.168.1.26:9092"]
        });
    
        const admin = kafka.admin();
    
        console.log("Trying to connect Kafka Broker...");
        await admin.connect();

        console.log("Successfully connected to Kafka Broker. Creating new topic...");
        await admin.createTopics({
            topics: [
                {
                    topic: "LogStoreTopic",
                    numPartitions: 2
                }
            ]
        })
        console.log("Topic has been successfully created.");
        await admin.disconnect();
    } catch(error){
        console.log(`Error: ${error}`);
    } finally{
        process.exit(0);
    }
}

createTopic();
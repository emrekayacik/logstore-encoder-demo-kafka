const {Kafka} = require("kafkajs");

const createProducer = async () => {
    try{
        const kafka = new Kafka({
            clientId: "kafka_pub_sub_client",
            brokers: ["192.168.1.26:9092"]
        });
    
        const producer = kafka.producer();
    
        console.log("Trying to connect Producer...");
        await producer.connect();
        console.log("Successfully connected to Producer");
        
        const message_result = await producer.send({
            topic: "RawVideoTopic",
            messages:  [
                {
                  value: "New Video Content",
                  partition: 0
                }
              ]
        });
        
        console.log("Sent", JSON.stringify(message_result));
        await producer.disconnect();

    } catch(error){
        console.log(`Error: ${error}`);
    } finally{
        process.exit(0);
    }
}

createProducer();
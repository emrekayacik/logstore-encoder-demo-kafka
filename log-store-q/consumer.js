const {Kafka} = require("kafkajs");

const createConsumer = async () => {
    try {
        const kafka = new Kafka({
            clientId: "kafka_log_store_client",
            brokers: ["192.168.1.26:9092"]
        });

        const consumer = kafka.consumer({
            groupId: "log_store_consumer_group"
        });
        console.log("Trying to connect Consumer...");
        await consumer.connect();
        console.log("Successfully connected to Consumer.");

        // Consumer Subscribe
        await consumer.subscribe({
            topic: "LogStoreTopic",
            fromBeginning: true
        });

        await consumer.run({
            eachMessage: async result => {
                console.log(
                    `Message: ${result.message.value} - Partition: ${result.partition}`
                    );
            }
        });

        

    } catch (error) {
        console.log(`Error: ${error}`);
    }
};

createConsumer();

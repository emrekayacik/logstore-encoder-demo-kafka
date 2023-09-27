const {Kafka} = require("kafkajs");

const createConsumer = async () => {
    try {
        const kafka = new Kafka({
            clientId: "kafka_pub_sub_client",
            brokers: ["192.168.1.26:9092"]
        });

        const consumer = kafka.consumer({
            groupId: "mobile_encoder_consumer_group"
        });

        console.log("Trying to connect Mobile Encoder Consumer...");
        await consumer.connect();
        console.log("Successfully connected to Mobile Encoder Consumer.");

        // Consumer Subscribe
        await consumer.subscribe({
            topic: "RawVideoTopic",
            fromBeginning: true
        });

        await consumer.run({
            eachMessage: async result => {
                console.log(
                    `Message: ${result.message.value}_mobile_encoder`
                    );
            }
        });

        

    } catch (error) {
        console.log(`Error: ${error}`);
    }
};

createConsumer();

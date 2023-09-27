## Queue and Pub/Sub examples using Kafka

### run zookeeper and kafka on docker
```
docker run --name zookeeper -p 2181:2181 zookeeper
```
```
docker run --name kafka -p 9092:9092 -e KAFKA_ZOOKEEPER_CONNECT=<your_local_ip_address>:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://<your_local_ip_address>:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 confluentinc/cp-kafka
```

### Queue example

**clone the project**
```
git clone https://github.com/emrekayacik/logstore-encoder-demo-kafka.git
```

**cd to queue example**
```
cd log-store-q
```

**install required node modules**
```
npm i
```

**create the topic by running the topic.js**
```
node topic.js
```


>_Trying to connect Kafka Broker..._
>
>_Successfully connected to Kafka Broker. Creating new topic..._
>
>Topic has been successfully created.


**run the producer js to produce system_logs file content**
```
node producer.js
```

**run two consumers in different terminals**
```
node consumer.js
```

### Result
![image](https://github.com/emrekayacik/logstore-encoder-demo-kafka/assets/73127270/41e6c6a8-5cc5-49bd-bc12-c4cc14e6b1f1)
Consumers have readed their own partition


### Pub/Sub example

**clone the project**
```
git clone https://github.com/emrekayacik/logstore-encoder-demo-kafka.git
```

**cd to pub/sub example**
```
cd pub-sub
```

**install required node modules**
```
npm i
```

**create the topic by running the topic.js**
```
node topic.js
```


>Trying to connect Kafka Broker...
>
>Successfully connected to Kafka Broker. Creating new topic...
>
>Topic has been successfully created.


**run three consumers(mobile-1k/2k-4k/8k) in different terminals**
```
node mobile_consumer.js
```

>Trying to connect Mobile Encoder Consumer...
>
>Successfully connected to Mobile Encoder Consumer.
>
>{"level":"INFO","timestamp":"2023-09-27T14:22:29.868Z","logger":"kafkajs","message":"[Consumer] Starting","groupId":"mobile_encoder_consumer_group"}
>
>{"level":"INFO","timestamp":"2023-09-27T14:22:32.929Z","logger":"kafkajs","message":"[ConsumerGroup] Consumer has joined the group","groupId":"mobile_encoder_consumer_group",
>
>"memberId":"kafka_pub_sub_client-bb5333d7-f9c5-4dbb-8c23-4c4da9f67a91","leaderId":"kafka_pub_sub_client-bb5333d7-f9c5-4dbb-8c23-4c4da9f67a91",
>
>"isLeader":true,"memberAssignment":
>
>{"RawVideoTopic":[0]},"groupProtocol":"RoundRobinAssigner","duration":3058} 
 
```
node HD_K_2K_consumer.js
```

>Trying to connect K-2K Encoder Consumer...
>
>Successfully connected to Mobile Encoder Consumer.
>
>{"level":"INFO","timestamp":"2023-09-27T14:23:19.628Z","logger":"kafkajs","message":"[Consumer] Starting","groupId":"K_2K_encoder_consumer_group"}
>
>{"level":"INFO","timestamp":"2023-09-27T14:23:22.700Z","logger":"kafkajs","message":"[ConsumerGroup] Consumer has joined the group","groupId":"K_2K_encoder_consumer_group",
>
>"memberId":"kafka_pub_sub_client-0c5102d9-c7af-4c30-a475-471106ec8c8b","leaderId":"kafka_pub_sub_client-0c5102d9-c7af-4c30-a475-471106ec8c8b","isLeader":true,"memberAssignment":
>
>{"RawVideoTopic":[0]},"groupProtocol":"RoundRobinAssigner","duration":3068} 

```
node HD_4K_8K_consumer.js
```


>Trying to connect _4K-8K Encoder Consumer...          ent":{"RawVideoTopi
>
>Successfully connected to Mobile Encoder Consumer.    ":3062}
>
>{"level":"INFO","timestamp":"2023-09-27T14:24:04.997Z","logger":"kafkajs","message":"[Consumer] Starting","groupId":"_4K_8K_encoder_consumer_group"}
>
>{"level":"INFO","timestamp":"2023-09-27T14:24:08.048Z","logger":"kafkajs","message":"[ConsumerGroup] Consumer has joined the group","groupId":"_4K_8K_encoder_consumer_group",
>
>"memberId":"kafka_pub_sub_client-2c88b7ad-6989-4bf0-99cd-8064e3f929f4","leaderId":"kafka_pub_sub_client-2c88b7ad-6989-4bf0-99cd-8064e3f929f4","isLeader":true,"memberAssignment":
>
>{"RawVideoTopic":[0]},"groupProtocol":"RoundRobinAssigner","duration":3047}

Now all of three consumers are running and waiting for the message to be produced.

**run the producer js to produce dummy raw video content**
```
node producer.js
```

>Trying to connect Producer...
>
>Successfully connected to Producer
>
>Sent [{"topicName":"RawVideoTopic","partition":0,"errorCode":0,"baseOffset":"24","logAppendTime":"-1","logStartOffset":"0"}]

**run the producer js again to produce dummy raw video content again**
```
node producer.js
```

>Trying to connect Producer...
>
>Successfully connected to Producer
>
>Sent [{"topicName":"RawVideoTopic","partition":0,"errorCode":0,"baseOffset":"25","logAppendTime":"-1","logStartOffset":"0"}]


### Result
![image](https://github.com/emrekayacik/logstore-encoder-demo-kafka/assets/73127270/f9557a2a-5e37-46b1-bac8-08903f020f77)
Consumers have readed the partition at the same time

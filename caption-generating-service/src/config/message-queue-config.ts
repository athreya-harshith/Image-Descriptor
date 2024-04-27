import amqplib from 'amqplib'
let channel: amqplib.Channel, connection;
export async function connectQueue() {
    try {
        //to connect to rabbitMQ server
        connection = await amqplib.connect('amqp://localhost');
        channel = await connection.createChannel();
        await channel.assertQueue('CaptionReceiverQueue');
        console.log('Connected to the CaptionReceiverQueue')
    } catch (error) {
        console.log(error);
    }
}

export async function sendData(data: any) {
    try {
        await channel.sendToQueue('CaptionReceiverQueue', Buffer.from(JSON.stringify(data)));
    } catch (error) {
        console.log(error);
    }
}

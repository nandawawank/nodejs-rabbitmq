const amqp = require('amqplib/callback_api');

class MessageBrokerService {
    async send(queue, message) {
        amqp.connect('amqp://localhost', (err, connection) => {
            if (err) throw err;

            connection.createConfirmChannel((err, channel) => {
                if (err) throw err;

                channel.assertQueue(queue, { durable: true });
                channel.sendToQueue(queue, Buffer.from(message), {
                    persistent: true
                }, (err, ok) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(ok)
                    }
                });
            });

            setTimeout(() => {
                connection.close();
            }, 1000);
        });

        console.log(" [x] Sent %s", message);
    }

    async receive(queue) {
        amqp.connect('amqp://localhost', (err, connection) => {
            if (err) throw err;

            connection.createChannel((err, channel) => {
                if (err) throw err;

                channel.assertQueue(queue, { durable: true });
                channel.prefetch(10);
                channel.consume(queue, (message) => {
                    console.log(" [x] Received %s", message.content.toString());
                    setTimeout(() => {
                        console.log(" [x] Done");
                        channel.ack(message);
                    }, 7000);
                }, {
                    noAck: false,
                })
            });
        });
    }
}

module.exports = MessageBrokerService;
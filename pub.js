const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost:5672', function (err, conn) {

    conn.createChannel(function (err, ch) {
        let ex = 'pub_sub_meetup28';
        let msg = process.argv.slice(2).join(' ') || 'Its empty!';

        ch.assertExchange(ex, 'fanout', { durable: false });
        ch.publish(ex, '', new Buffer(msg));
        console.log(" [x] Sent %s", msg);
    });
    setTimeout(function () {conn.close(); process.exit(0) }, 500);
});
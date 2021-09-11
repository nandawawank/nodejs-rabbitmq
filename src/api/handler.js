class MessageBrokerHandler {
    constructor(service) {
        this._service = service;

        this.messageBrokerSendQueue = this.messageBrokerSendQueue.bind(this);
        this.messageBrokerReceiveQueue = this.messageBrokerReceiveQueue.bind(this);
    }

    async messageBrokerSendQueue(request, response) {
        const queue = request.body.queue;
        const message = request.body.message;
        
        try {
            await this._service.send(queue, message);
            response.statusCode = 200;
            return response.json('success');
        } catch (err) {
            console.log(err);
            response.statusCode = 400;
            return response.json('failed');
        }
    }

    async messageBrokerReceiveQueue(request, response) {
        const queue = request.body.queue;

        try {
            await this._service.receive(queue);
            response.statusCode = 200;
            return response.json('success');
        } catch (err) {
            console.log(err);
            response.statusCode = 400;
            return response.json('failed');
        }
    }
}

module.exports = MessageBrokerHandler;
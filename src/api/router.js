const express = require('express');
const router = express.Router();

const MessageBrokerService = require('../services/rabbitmq/MessageBrokerService');
const MessageBrokerHandler = require('../api/handler');

const messageBrokerService = new MessageBrokerService();
const messageBrokerHandler = new MessageBrokerHandler(messageBrokerService);

router.get('/sendQueue', messageBrokerHandler.messageBrokerSendQueue);
router.get('/receiveQueue', messageBrokerHandler.messageBrokerReceiveQueue);

module.exports = router;

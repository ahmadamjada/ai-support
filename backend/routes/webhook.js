// backend/routes/webhook.js
const express = require('express');
const router = express.Router();
const dialogflow = require('@google-cloud/dialogflow');
const Chat = require('../models/chat');

const sessionClient = new dialogflow.SessionsClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

const projectId = process.env.DIALOGFLOW_PROJECT_ID;
const sessionId = 'default-session';

router.post('/', async (req, res) => {
    try {
        const startTime = Date.now();
        const { message, userId } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: message,
                    languageCode: 'en-US',
                },
            },
        };

        const responses = await sessionClient.detectIntent(request);
        const result = responses[0].queryResult;
        const responseTime = Date.now() - startTime;

        // Save chat interaction
        const chat = new Chat({
            query: message,
            response: result.fulfillmentText,
            intent: result.intent.displayName,
            confidence: result.intentDetectionConfidence,
            responseTime: responseTime / 1000, // Convert to seconds
            userId: userId || 'anonymous',
            sessionId
        });

        console.log('Attempting to save chat interaction...', chat);
        await chat.save();
        console.log('Chat interaction saved!');

        res.json({
            fulfillmentText: result.fulfillmentText,
            intent: result.intent.displayName,
            confidence: result.intentDetectionConfidence,
            responseTime: responseTime
        });
    } catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;

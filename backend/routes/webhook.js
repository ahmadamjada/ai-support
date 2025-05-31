// backend/routes/webhook.js
const express = require('express');
const router = express.Router();
const dialogflow = require('@google-cloud/dialogflow');
const Chat = require('../models/chat');

const sessionClient = new dialogflow.SessionsClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

const projectId = process.env.DIALOGFLOW_PROJECT_ID;
// Dialogflow sends a unique session ID in the request
// We should use this instead of a hardcoded defaultSessionId
// const sessionId = 'default-session';

router.post('/', async (req, res) => {
    try {
        const startTime = Date.now();
        // Extract the necessary information from the Dialogflow webhook request
        const { queryResult } = req.body; // Get the queryResult object
        const message = queryResult?.queryText; // Get the user's message
        const intentDisplayName = queryResult?.intent?.displayName; // Get the detected intent name
        // userId might need to be passed from the frontend or derived differently
        // For now, we'll keep the anonymous fallback if not present in the payload
        const userId = req.body?.originalDetectIntentRequest?.payload?.userId || 'anonymous'; // Attempt to get userId if available

        if (!message) {
            // Respond with a 400 if no message is found in the expected place
            return res.status(400).json({ error: 'No query text found in Dialogflow request' });
        }

        // Use the session ID provided by Dialogflow or generate one if needed
        const dialogflowSessionId = req.body?.session?.split('/').pop() || 'generated-session';
        const sessionPath = sessionClient.projectAgentSessionPath(projectId, dialogflowSessionId);

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: message,
                    languageCode: queryResult?.languageCode || 'en-US', // Use language code from Dialogflow if available
                },
            },
        };

        // If Dialogflow has already determined the fulfillment response, you might use that
        // or you can still call detectIntent here to re-process or log
        // For a simple webhook, you might just use queryResult.fulfillmentText

        // Let's assume for now we process it again with detectIntent
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
            userId: userId,
            sessionId: dialogflowSessionId
        });

        console.log('Attempting to save chat interaction...', chat);
        await chat.save();
        console.log('Chat interaction saved!');

        // Respond to Dialogflow with the fulfillment text
        res.json({
            fulfillmentText: result.fulfillmentText,
            // You can include other fields if needed by Dialogflow
            // payload: { ... }
        });
    } catch (error) {
        console.error('Error processing webhook:', error);
        // Respond with a 500 error for internal server errors
        res.status(500).json({ error: 'Internal server error processing webhook' });
    }
});

module.exports = router;

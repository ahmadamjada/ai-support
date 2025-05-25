// backend/routes/webhook.js
const express = require('express');
const router = express.Router();
const Order = require('../models/order');



router.post('/', async (req, res) => {
  const intent = req.body.queryResult.intent.displayName;
  const parameters = req.body.queryResult.parameters;

  console.log("🤖 Received intent:", intent);
  console.log("📦 Parameters:", parameters);
  console.log("🔥 Webhook hit!");
  console.log(req.body)
  let responseText = "Sorry, I didn’t understand that.";

  // Intent handling
  switch (intent) {
    case 'Order Status':
      responseText = `📦 Your order is currently being processed. Please wait for a confirmation.`;
      break;

    case 'Booking':
      responseText = `✅ Your booking request has been received. We’ll get back to you shortly.`;
      break;

      case 'Refund Request':
      // Assuming parameters.product_name is provided in the request

        const product = parameters.product_name || 'your item';
        responseText = `💰 Refund process has been initiated for ${product}. Please check your email for updates.`;
        break;


        case 'User Info Collection':
      const { person, 'phone-number': phone, email, address, product_name } = parameters;

      const name = Array.isArray(person) && person.length > 0 ? person[0].name : 'User';

      // Save user order to MongoDB
  try {
    await Order.create({
      name,
      phone,
      email,
      address,
      product: product_name,
    });
    console.log('📦 Order saved to DB');
  } catch (err) {
    console.error('❌ Error saving order:', err.message);
  }


      responseText = `🎉 Thanks ${name}! We’ve received your details:
📞 Phone: ${phone}
📧 Email: ${email}
🏠 Address: ${address}
🛍️ Product: ${product_name}

We’ll reach out to you shortly!`;
      break;

    default:
      responseText = `😅 I'm not sure how to help with that. Let me check with Gemini...`;
      // Later we'll call Gemini API here!
  }


  res.json({
    fulfillmentText: responseText,
  });
});

module.exports = router;

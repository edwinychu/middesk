import axios from 'axios';
import querystring from 'querystring';

import { connectToDatabase } from '../../util/mongodb';

/**
 * Handles the different webhook requests coming in from Middesk.
 * It is recommended that you set a webhook on the Dashboard, but you can
 * also set a webhook via the API.
 */
const webhook = async(req, res) => {

  const { db } = await connectToDatabase();

  const webhook_body = req.body;
  const business_id = webhook_body.data.object.id;

  // Handle different webhooks from Middesk based on its "type". For a full list
  // different webhook types, visit http://https://docs.middesk.com/docs/using-webhooks
  const webhook_type = webhook_body.type;

  if (webhook_type === 'business.updated') {
    // If a business is updated, fetch the new data from the webhook to utilize it
    const new_business_data = webhook_body.data;
    
    const query = { id: business_id };
    const update = { data: new_business_data };

    // We're choosing to save the new data from the webhook in our mongo collection
    await db.collection("businesses").updateOne(query, {$set: update});
    
  } else if (webhook_type === 'industry_classification.created') {

  } else if (webhook_type === 'industry_classification.completed') {

  }

  // Make sure you send a 200 response back to Middesk to confirm reception of webhook
  res.status(200).end();
}

export default webhook;
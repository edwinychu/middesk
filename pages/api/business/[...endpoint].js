import baseRequest from '../../../util/baseRequest.js';
import { connectToDatabase } from '../../../util/mongodb';

/**
 * Every request in our application that handles Middesk's Business logic 
 * (i.e Create a Business, Retrieve a Business, etc.)
 */
const business = async(req, res) => {

  const { query: { endpoint }} = req;
  const request = endpoint.join('/');

  // Internal endpoint that handles creating a business via Middesk
  if (request === 'create') {
    const { 
      name,
      address_line1,
      city,
      state,
      postal_code,
      tin,
      url,
      phone_number,
      person
    } = req.body;

    const data = {
      name,
      website: {
        url
      },
      addresses: [
        {
          address_line1,
          city,
          state,
          postal_code
        }
      ]
    }

    if (tin.length > 0) {
      data.tin = tin;
    }

    if (phone_number.length > 0) {
      data.phone_numbers = [{ phone_number }];
    }

    if (person.length > 0) {
      data.people = [{ name: person }];
    }

    // Create a Middesk Business
    const base_response = 
      await baseRequest('create_business', { data });

    // Save Middesk Business into Database
    const { db } = await connectToDatabase();
    const query = {
      name,
      data: base_response.data,
      id: base_response.data.id 
    }
    await db.collection("businesses").insert(query);

    if (base_response.error) {
      res.status(400).json(base_response);
    }

    res.status(200);
  }

  if (request === 'retrieve') {
    const { id } = req.body;
    // Retrieve a specific Middesk Business
    const base_response = 
      await baseRequest('retrieve_business', { id });
      
    if (base_response.error) {
      res.status(400).json(base_response);
    }
    
    res.status(200).json(base_response.data);
  }

  if (request === 'retrieve_all') {
    const base_response = 
      await baseRequest('retrieve_all_business');

    if (base_response.error) {
      res.status(400).json(base_response);
    }

    res.status(200).json(base_response.data);
  }

  res.end();
}

export default business;
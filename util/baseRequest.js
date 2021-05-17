import axios from 'axios';
import querystring from 'querystring';

require('dotenv').config();

/**
 * The base request that is configured with the necessary authentication keys. 
 * Pass in the Middesk endpoint you want to call as well as any other params.
 * @param {string} endpoint The Middesk endpoint you want to call
 * @param {object} options Any additional params you want to pass in
 */
const baseRequest = async ( endpoint, options = {} ) => {
  const { MIDDESK_SECRET_LIVE } = process.env;

  if (!MIDDESK_SECRET_LIVE) {
    throw new Error (
      'Please define the MIDDESK_SECRET_LIVE environment vairable inside .env file'
    )
  }

  const BASE_URL = "https://api.middesk.com/v1";
  const AUTH_HEADER = {
    'Authorization': `Bearer ${MIDDESK_SECRET_LIVE}`
  }

  const middesk_endpoints = {
    'create_business': {
      url: `${BASE_URL}/businesses`,
      method: 'post',
      data: options.data,
    },
    'retrieve_business': {
      url: `${BASE_URL}/businesses/${options.id}`,
      method: 'get'
    },
    'update_business': {
      url:`${BASE_URL}/businesses/${options.id}`,
      method: 'patch',
      data: options.data 
    },
    'retrieve_all_business': {
      url: `${BASE_URL}/businesses`,
      method: 'get',
    }
  }
  try {
    const request_info = middesk_endpoints[endpoint];
    request_info.headers = AUTH_HEADER;
    const base_response = await axios(request_info);
    return base_response;
  } catch (err) {
    return {
      error: true,
      message: err
    }
  }
} 

export default baseRequest;
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import styles from '../styles/Home.module.css';

import Navbar from './navbar.js';

export default function Applications() {
  let [businesses, setBusinesses] = useState([]);
  let [businessCount, setBusinessCount] = useState(0);

  useEffect(async () => {
    const res = await axios({
      url: '/api/business/retrieve_all',
      method: 'get'
    });

    if (res.status === 200) {
      const business_list = res.data.data;
      const business_count = res.data.total_count;
      setBusinesses(business_list);
      setBusinessCount(business_count);
    } else {

    }

  }, []);

  // expandBusiness(async () => {

  // });

  return (
    <div className={styles.containerpages}>
      <Head>
          <title>Application Statuses</title>
          <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <br />
      <h1 className={styles.title}>
        Application Statuses
      </h1>
      <br />
      <div className="flex flex-col mt-10">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name & Middesk Business ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Updated At
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Created At
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {businesses.map((business) => (
                    <tr key={business.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-md font-medium text-gray-900">{business.name}</div>
                            <div className="text-sm text-gray-500">{business.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-md text-gray-700">{business.updated_at}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-md text-gray-700">{business.created_at}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        { business.status === 'approved' 
                          ? <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Approved
                          </span> 
                          : <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            {business.status}
                          </span> 
                        }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-blue-600 hover:text-blue-900">
                          Expand
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <br />
      <footer className={styles.footer}>
        <a
        href="https://middesk.com"
        target="_blank"
        rel="noopener noreferrer"
        >
          Powered by &nbsp;<strong>Middesk</strong>
        </a>
      </footer>
    </div>
  )
}
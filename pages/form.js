import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { React, useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";

import Navbar from './navbar.js';
import Alert from './alert.js';
import styles from '../styles/Home.module.css';

/**
 * A simple form that captures information about the business
 */
export default function Form() {
    
    const { register, handleSubmit } = useForm();

    let [businessInfo, setBusinessInfo] = 
        useState({
            name: "Getting info...",
            address_line1: "Getting info...",
            city: "Getting info...",
            state: "Getting info...",
            postal_code: "Getting info...",
            tin: "Getting info...",
            url: "Getting info...",
            phone_number: "Getting info...",
            person: "Getting info..."
        }); 

    // Submits information captured by the form to an endpoint in our server
    async function submitForm(data) {
        setBusinessInfo(data);
        const res = await axios({
            url: '/api/business/create',
            method: 'post',
            data
        }); 
    }

    // The form where businesses can enter their data
    return (
        <div className={styles.containerpages}>
            <Head>
                <title>Middesk Business Application</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar/>
            <main className={styles.form}>
                <h1 className={styles.title}>
                    Business Application Form
                </h1>
                <p className={styles.description}>
                    Get started by submitting your information below!
                </p>
                <div class="md:grid md:grid-cols-12 mt-2 mb-8 md:gap-6 max-w-8xl">
                    <div class="mt-5 md:mt-0 md:col-span-9">
                        <form onSubmit={handleSubmit(submitForm)} action="#" method="POST">
                            <div class="mt-10 ml-72 shadow sm:rounded-md  sm:overflow-hidden">
                                <div class="bg-white space-y-6 sm:p-6">
                                    <div class="grid grid-cols-12 gap-6">
                                        <div class="col-span-12 sm:col-span-12">
                                            <label for="name" class="block text-md font-medium text-gray-700">
                                                Business Name
                                            </label>
                                            <div class="mt-3 flex rounded-md shadow-sm">
                                                <input {...register("name")} placeholder="Enter Business Name" type="text" name="name" id="name" class="focus:ring-blue-700 focus:border-blue-700 flex-1 block w-full rounded-md sm:text-md border-gray-300" />
                                            </div>
                                        </div>
                                        <div class="col-span-12 sm:col-span-12">
                                            <label for="address_line1" class="block text-md font-medium text-gray-700">
                                                Address Line 1
                                            </label>
                                            <div class="mt-3 flex rounded-sm shadow-sm">
                                                <input {...register("address_line1")} placeholder="Address Line 1" type="text" name="address_line1" id="address_line1" class="focus:ring-blue-700 focus:border-blue-700 flex-1 block w-full rounded-md sm:text-md border-gray-300" />
                                            </div>
                                        </div>
                                        <div class="col-span-4 sm:col-span-4">
                                            <label for="city" class="block text-md font-medium text-gray-700">
                                                City
                                            </label>
                                            <div class="mt-3 flex rounded-sm shadow-sm">
                                                <input {...register("city")} placeholder="City" type="text" name="city" id="city" class="focus:ring-blue-700 focus:border-blue-700 flex-1 block w-full rounded-md sm:text-md border-gray-300" />
                                            </div>
                                        </div>
                                        <div class="col-span-4 sm:col-span-4">
                                            <label for="state" class="block text-md font-medium text-gray-700">
                                                State
                                            </label>
                                            <div class="mt-3 flex rounded-sm shadow-sm">
                                                <input {...register("state")} placeholder="State" type="text" name="state" id="state" class="focus:ring-blue-700 focus:border-blue-700 flex-1 block w-full rounded-md sm:text-md border-gray-300" />
                                            </div>
                                        </div>
                                        <div class="col-span-4 sm:col-span-4">
                                            <label for="state" class="block text-md font-medium text-gray-700">
                                                Zip Code
                                            </label>
                                            <div class="mt-3 flex rounded-sm shadow-sm">
                                                <input {...register("postal_code")} placeholder="Zip Code" type="text" name="postal_code" id="postal_code" class="focus:ring-blue-700 focus:border-blue-700 flex-1 block w-full rounded-md sm:text-md border-gray-300" />
                                            </div>
                                        </div>
                                        <div class="col-span-12 sm:col-span-12">
                                            <label for="tin" class="block text-md font-medium text-gray-700">
                                            Taxpayer Identification Number TIN/EIN (Optional) 
                                            </label>
                                            <div class="mt-3 flex rounded-sm shadow-sm">
                                                <input {...register("tin")} placeholder="XX-XXXXXXX" type="text" name="tin" id="tin" class="focus:ring-blue-700 focus:border-blue-700 flex-1 block w-full rounded-md sm:text-md border-gray-300" />
                                            </div>
                                        </div>
                                        <div class="col-span-12 sm:col-span-12">
                                            <label for="url" class="block text-md font-medium text-gray-700">
                                                Website (Optional)
                                            </label>
                                            <div class="mt-3 flex rounded-sm shadow-sm">
                                                <input {...register("url")} type="text" placeholder="https://www.example.com" name="url" id="url" class="focus:ring-blue-700 focus:border-blue-700 flex-1 block w-full rounded-md sm:text-md border-gray-300" />
                                            </div>
                                        </div>
                                        <div class="col-span-12 sm:col-span-12">
                                            <label for="password" class="block text-md font-medium text-gray-700">
                                                Phone Number (Optional)
                                            </label>
                                            <div class="mt-3 flex rounded-sm shadow-sm">
                                                <input {...register("phone_number")} type="text" placeholder="(XXX)XXX-XXXX" name="phone_number" id="phone_number" class="focus:ring-blue-700 focus:border-blue-700 flex-1 block w-full rounded-md  sm:text-md border-gray-300" />
                                            </div>
                                        </div>
                                        <div class="col-span-12 sm:col-span-12">
                                            <label for="person" class="block text-md font-medium text-gray-700">
                                                Associated Person (Optional)
                                            </label>
                                            <div class="mt-3 flex rounded-sm shadow-sm">
                                                <input {...register("person")} type="text" placeholder="Enter First and Last Name" name="person" id="person" class="focus:ring-blue-700 focus:border-blue-700 flex-1 block w-full rounded-md  sm:text-md border-gray-300" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                  <Alert />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
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

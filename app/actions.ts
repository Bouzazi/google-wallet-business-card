'use server';

import { FormInputs } from "@/components/mainform";
import puppeteer from 'puppeteer-core'

const jwt = require('jsonwebtoken');
const { GoogleAuth } = require('google-auth-library');

const issuerId = '3388000000022245007';
const classId = `${issuerId}.testing_class`;
const baseUrl = 'https://walletobjects.googleapis.com/walletobjects/v1';

require("dotenv").config();

enum Side {
    Front = "front",
    Back = "back"
}

// TODO: Remove key
const credentials = {
    type: process.env.type,
    project_id: process.env.project_id,
    private_key_id: process.env.private_key_id,
    private_key: process.env.private_key,
    client_email: process.env.client_email,
    client_id: process.env.client_id,
    auth_uri: process.env.auth_uri,
    token_uri: process.env.token_uri,
    auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.client_x509_cert_url,
    universe_domain: process.env.universe_domain,
}

export async function createPassClass() {
    const httpClient = new GoogleAuth({
        credentials: credentials,
        scopes: 'https://www.googleapis.com/auth/wallet_object.issuer'
    });

    const genericClass = {
        "id": classId,
        "classTemplateInfo": {
            "cardTemplateOverride": {
                "cardRowTemplateInfos": [
                    {
                        "twoItems": {
                            "startItem": {
                                "firstValue": {
                                    "fields": [
                                        {
                                            "fieldPath": "object.textModulesData['phone_number']"
                                        }
                                    ]
                                }
                            },
                            "endItem": {
                                "firstValue": {
                                    "fields": [
                                        {
                                            "fieldPath": "object.textModulesData['phonenumber']"
                                        }
                                    ]
                                }
                            }
                        }
                    },
                    {
                        "twoItems": {
                            "startItem": {
                                "firstValue": {
                                    "fields": [
                                        {
                                            "fieldPath": "object.textModulesData['website']"
                                        }
                                    ]
                                }
                            },
                            "endItem": {
                                "firstValue": {
                                    "fields": [
                                        {
                                            "fieldPath": "object.textModulesData['website_YWRkcmVzcw==']"
                                        }
                                    ]
                                }
                            }
                        }
                    }
                ]
            }
        }
    };

    let response;
    try {
        // Check if the class exists already
        response = await httpClient.request({
            url: `${baseUrl}/genericClass/${classId}`,
            method: 'GET'
        });

        console.log('Class already exists');
        console.log(response);
    } catch (err: any) {
        if (err.response && err.response.status === 404) {
            // Class does not exist
            // Create it now
            response = await httpClient.request({
                url: `${baseUrl}/genericClass`,
                method: "POST",
                body: JSON.stringify(genericClass)
            });

            console.log('Class insert response');
            console.log(response);
        } else {
            // Something else went wrong
            console.error(err);
        }
    }
}

export async function createPassObject(data: FormInputs) {
    let objectSuffix = `${data.email.replace(/[^\w.-]/g, '_')}`;
    let objectId = `${issuerId}.${objectSuffix}`;

    let genericObject = {
        'id': `${objectId}`,
        'classId': classId,
        'genericType': 'GENERIC_TYPE_UNSPECIFIED',
        "cardTitle": {
            "defaultValue": {
                "language": "en-US",
                "value": "Business Card"
            }
        },
        "subheader": {
            "defaultValue": {
                "language": "en-US",
                "value": data.jobposition
            }
        },
        "header": {
            "defaultValue": {
                "language": "en-US",
                "value": data.fullname
            }
        },
        "textModulesData": [
            {
                "id": "phone_number",
                "header": "Email",
                "body": "Phone Number"
            },
            {
                "id": "phonenumber",
                "header": data.email,
                "body": data.phonenumber
            },
            {
                "id": "website",
                "header": "Address",
                "body": "Website"
            },
            {
                "id": "website_YWRkcmVzcw==",
                "header": data.address,
                "body": data.website
            }
        ],
        "barcode": {
            "type": "QR_CODE",
            "value": data.website,
        },
        "hexBackgroundColor": "#4285f4"
    }

    const claims = {
        iss: credentials.client_email,
        aud: 'google',
        origins: [],
        typ: 'savetowallet',
        payload: {
            genericObjects: [
                genericObject
            ]
        }
    };

    const token = await jwt.sign(claims, credentials.private_key, { algorithm: 'RS256' });
    const saveUrl = `https://pay.google.com/gp/v/save/${token}`;

    return saveUrl
}

export async function getCardScreenshot(data: FormInputs, side: `${Side}`) {
    // Use browserless since we're currently using Vercel for deployment
    const browser = await puppeteer.connect({
        browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.BLESS_TOKEN}`,
    })

    const url = `${"https://google-wallet.vercel.app"}/${side}?fullname=${data.fullname}&jobposition=${data.jobposition}&phonenumber=${data.phonenumber}&email=${data.email}&address=${data.address}&website=${data.website}`

    console.log(url);


    const page = await browser.newPage()
    await page.setViewport({ width: 540, height: 280 })
    await page.goto(url)
    const screenshot = await page.screenshot({ encoding: "base64" })
    return screenshot
}

export async function shortenLink(link: string) {
    try {
        const response = await fetch(
            `https://tiny.cc/tiny/api/3/urls/`,
            {
                body: JSON.stringify({
                    "urls": [
                        {
                            "long_url": link
                        }
                    ]
                }),
                headers: {
                    'Authorization': 'Basic ' + process.env.TINY_AUTH,
                    'Content-Type': 'application/json',
                },
                method: 'POST'
            }

        );

        if (response.status >= 400) {
            throw new Error('Failed to fetch data')
        }

        const res = await response.json()

        return res.urls[0].short_url
    } catch (error) {
        console.log(error)
        return link
    }
}
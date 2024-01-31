import protos from '@google-cloud/dialogflow-cx/build/protos/protos'
import checkAvailabilities from './check-availabilities'
import checkSelectedTime from './check-selected-time'

export default async (params: protos.google.cloud.dialogflow.cx.v3.WebhookRequest | any) : Promise<protos.google.cloud.dialogflow.cx.v3.WebhookResponse | any> => {
    const { fulfillmentInfo, sessionInfo } = params
    const { tag } = fulfillmentInfo || {}
    const { parameters } = sessionInfo || {}

    console.log("Webhook incoming request")
    console.log(params)

    if ( tag === 'check-availabilities' ) { //webhook tag
        return checkAvailabilities(params)
    } else if (tag === 'check-selected-time') {
        return checkSelectedTime(params)
    } else if (tag === 'bill-number-verification') {
        if(parameters?.billnumber === '123456') {
            return {
                sessionInfo: {
                    parameters: {
                        billnumberexist: true,
                        billdetails: "Facture payé le 12/06/2021, la somme totale est de 100€"
                    }
                }
            }
        } else {
            return {
                sessionInfo: {
                    parameters: {
                        billnumber: null,
                    }
                },
                fulfillmentResponse: {
                    messages: [
                        {
                            text: {
                                text: [
                                    'Le numéro de facture est incorrect'
                                ]
                            }
                        }
                    ]
                }
            }
        }
    } else if (tag === 'userid-verification') {
        if(parameters?.userid === '00123456') {
            return {
                sessionInfo: {
                    parameters: {
                        useridexist: true,
                        username: "Jean Marc Geoffroy"
                    },
                }
            }
        } else {
            return {
                sessionInfo: {
                    parameters: {
                        userid: null,
                    }
                },
                fulfillmentResponse: {
                    messages: [
                        {
                            text: {
                                text: [
                                    'Le numéro de client est incorrect'
                                ]
                            }
                        }
                    ]
                }
            }
        }
    }


    return params
}
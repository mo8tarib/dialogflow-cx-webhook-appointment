import protos from '@google-cloud/dialogflow-cx/build/protos/protos'
import checkAvailabilities from './check-availabilities'
import checkSelectedTime from './check-selected-time'
import moment from 'moment'

export default async (params: protos.google.cloud.dialogflow.cx.v3.WebhookRequest | any) : Promise<protos.google.cloud.dialogflow.cx.v3.WebhookResponse | any> => {
    const { fulfillmentInfo, sessionInfo } = params
    const { tag } = fulfillmentInfo || {}
    const { parameters } = sessionInfo || {}
    const availableSlots = [
        '10:00',
        '11:00',
        '12:00'
    ]

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
                        username: "Jean Marc G"
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
    } else if (tag === 'verify-disponibilities') {
        return {
            sessionInfo: {
                parameters: {
                    availableSlots
                }
            },
            fulfillmentResponse: {
                messages: [
                    {
                        text: {
                            text: [
                                'Les créneaux disponibles sont: 10:00, 11:00, 12:00'
                            ]
                        }
                    }
                ]
            }
        }
    } else if (tag === 'verify-selected-time') {
        const { hours, minutes } = parameters?.time
        const formattedTime = moment(`${hours}:${minutes}`, 'HH:mm').format('HH:mm')
        if (availableSlots.includes(formattedTime)) {
            // ajouter une confirmation dans la BD
            return {
                sessionInfo: {
                    parameters: {
                        selectedTime: true
                    }
                },
                fulfillmentResponse: {
                    messages: [
                        {
                            text: {
                                text: [
                                    `Le créneau ${formattedTime} est reservé avec succès`
                                ]
                            }
                        }
                    ]
                }
            }
        } else {
            return {
                sessionInfo: {
                    parameters: {
                        time: null,
                        selectedTime: false
                    }
                },
                fulfillmentResponse: {
                    messages: [
                        {
                            text: {
                                text: [
                                    `Le créneau ${formattedTime} n'est pas disponible`
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
import protos from '@google-cloud/dialogflow-cx/build/protos/protos'
import { DialogflowWebhookRequest, DialogflowWebhookResponse } from '../types/webhook'
import { availableAppointement } from './availableAppointement'


export default async (params: protos.google.cloud.dialogflow.cx.v3.WebhookRequest| DialogflowWebhookRequest) : Promise<protos.google.cloud.dialogflow.cx.v3.WebhookResponse | DialogflowWebhookResponse | any> => {
    const { date, examen } = params?.sessionInfo?.parameters || {}
    const { day, month, year } = date || {}
    

    // Ensure day

    const formattedDate = `${day?.toString().padStart(2, '0')}${month?.toString().padStart(2, '0')}`;
    let response = {
        session_info: params?.sessionInfo,
    }

    if (availableAppointement[formattedDate]) {
        // Handle the case where appointments are available
        return {
            fulfillmentResponse: {
                messages: [{
                    text: {
                        text: [
                            `Les rendez-vous disponible le ${formattedDate}: ${availableAppointement[formattedDate].join(", ")}`
                        ]
                    }
                }]
            },
            session_info: {
                session: params?.sessionInfo?.session,
                parameters: {
                    ...params?.sessionInfo?.parameters,
                    availableAppointment: true,
                    availableSlots: availableAppointement[formattedDate]
                }
            }
        }
    }

    return params
}
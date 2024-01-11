import protos from '@google-cloud/dialogflow-cx/build/protos/protos'
import { DialogflowWebhookRequest, DialogflowWebhookResponse } from '../types/webhook'

export default async (params: protos.google.cloud.dialogflow.cx.v3.WebhookRequest| DialogflowWebhookRequest) : Promise<protos.google.cloud.dialogflow.cx.v3.WebhookResponse | DialogflowWebhookResponse | any> => {
    const { availableSlots, time } = params?.sessionInfo?.parameters || {}
    const { hours, minutes } = time

    const formattedTime = `${hours?.toString().padStart(2, '0')}:${minutes?.toString().padStart(2, '0')}`;
    console.log(formattedTime)
    if (availableSlots?.includes(formattedTime)) {
        return {
            session_info: {
                session: params?.sessionInfo?.session,
                parameters: {
                    ...params?.sessionInfo?.parameters,
                    appointmentConfirmed: true,
                }
            }
        }
    }

    return params
}
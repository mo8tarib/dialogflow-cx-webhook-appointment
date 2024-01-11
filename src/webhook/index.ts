import protos from '@google-cloud/dialogflow-cx/build/protos/protos'
import checkAvailabilities from './check-availabilities'
import checkSelectedTime from './check-selected-time'

export default async (params: protos.google.cloud.dialogflow.cx.v3.WebhookRequest) : Promise<protos.google.cloud.dialogflow.cx.v3.WebhookResponse | any> => {
    const { fulfillmentInfo } = params
    const { tag } = fulfillmentInfo || {}

    console.log("Webhook incoming request")
    console.log(params)

    if ( tag === 'check-availabilities' ) { //webhook tag
        return checkAvailabilities(params)
    } else if (tag === 'check-selected-time') {
        return checkSelectedTime(params)
    }

    return params
}
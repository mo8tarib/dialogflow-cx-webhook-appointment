import protos from '@google-cloud/dialogflow-cx/build/protos/protos'

export default async (params: protos.google.cloud.dialogflow.cx.v3.WebhookRequest) : Promise<protos.google.cloud.dialogflow.cx.v3.WebhookResponse> => {
    const { fulfillmentInfo } = params
    const { tag } = fulfillmentInfo || {}

    if( tag === '' ) { //webhook tag
        
    }

    return params
}
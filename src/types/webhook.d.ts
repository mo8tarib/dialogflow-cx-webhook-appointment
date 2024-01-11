export declare interface DialogflowWebhookRequest {
    detectIntentResponseId: string
    intentInfo?: {
      lastMatchedIntent: string
      parameters?: any
      displayName: string
      confidence: number
    }
    pageInfo: {
      currentPage: string
      formInfo?: any
      displayName?: string
    }
    sessionInfo: {
      session: string
      parameters?: any
    }
    fulfillmentInfo: {
      tag: string
    }
    text?: string
    transcript?: string
    languageCode: string
}
  

export declare interface DialogflowWebhookResponse {
    source?: string
    fulfillment_response?: {
      messages: any
      payload?: any
    }
    session_info?: {
      session?: string
      parameters?: any
    }
    payload?: any
    triggerEvent?: string
    transition?: string
    target_flow?: string
    target_page?: string
}


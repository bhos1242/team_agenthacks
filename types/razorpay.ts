export interface RazorpaySuccessResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

export interface RazorpayErrorResponse {
    error: {
        code?: string;
        description: string;
        source?: string;
        step?: string;
        reason?: string;
        metadata?: {
            order_id: string;
            payment_id: string;
        };
    };
}

export interface RazorpayOptions {
    key: string | undefined;
    amount: number;
    currency: string;
    name: string;
    description?: string;
    image?: string;
    order_id: string;
    handler: (response: RazorpaySuccessResponse) => void;
    prefill?: {
        name?: string;
        email?: string;
        contact?: string;
    };
    theme?: {
        color?: string;
    };
}

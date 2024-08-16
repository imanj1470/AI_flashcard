import { loadStripe } from '@stripe/stripe-js';
import { NextResponse } from 'next/server';
const stripe = new Stripe(process.env.STRPE_API_SECRET_KEY)
/* const stripe = await loadStripe(process.env.STRIPE_API_PUBLIC_KEY); */

const formatAmountStripe = (amount) => {
    return Math.round(amount * 100)
}

export async function POST(req) {
    const params = {
        submit_type: 'subscription',
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "Pro subscription",
                    },
                    unit_amount: formatAmountStripe(10),
                    reccuring: {
                        interval: "month",
                        interval_count: 1,
                    },
                },
                quantity: 1,
            },
        ],
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
    }

    const checkoutSession = await stripe.checkout.sessions.create(params);

    return NextResponse.json(checkoutSession, {
        status: 200,
    })

}



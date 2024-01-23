import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '../../lib/stripe'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const priceId = '';

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_APP}/success`,
    cancel_url: `${process.env.NEXT_APP}/`,
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ]
  })
}
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRETY_KEY, {
  apiVersion: '2023-10-16',
  appInfo: {
    name: 'Ignite Shop'
  }
})
import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID = {
    'seeker_pro': 'price_1Tg3W2LRdtczoBj21WO0EETn',
    'seeker_premium': 'price_1Tg3XULRdtczoBj2s6GxcChl',
    'recruiter_growth': 'price_1Tg3bhLRdtczoBj2XSJ2qYgB',
    'recruiter_enterprise': 'price_1Tg3aBLRdtczoBj25GTa5DiD'
}
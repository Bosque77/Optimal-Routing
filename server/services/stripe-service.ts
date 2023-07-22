import { Stripe } from 'stripe'
import * as z from 'zod'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST!, { apiVersion: '2022-11-15' });

const customerSchema = z.object({
    email: z.string(),
    name: z.string(),
    phone: z.string().optional(),
})

export const createCustomer = async (customerData: { email: string; name: string; phone?: string }) => {
  const new_customer = customerSchema.parse(customerData)
  const customer = await stripe.customers.create({
      email: new_customer.email,
      name: new_customer.name,
      phone: new_customer.phone,
  });

  return customer.id
}

export const getCustomerCards = async (stripeCustomerId: string) => {
  const cards = await stripe.customers.listSources(stripeCustomerId, {
    object: 'card',
  });

  return cards.data;
}
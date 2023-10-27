import { Stripe } from 'stripe'
import * as z from 'zod'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST!, { apiVersion: '2022-11-15' });

const customerSchema = z.object({
    email: z.string(),
    name: z.string(),
    phone: z.string().optional(),
})

const createCustomer = async (customerData: { email: string; name: string; phone?: string }) => {  
  const new_customer = customerSchema.parse(customerData)


  // check if customer already exists
  const existing_customer = await stripe.customers.list({
    email: new_customer.email,
  });

  if (existing_customer.data.length > 0) {
    throw new Error(`Customer with email ${new_customer.email} already exists. ID: ${existing_customer.data[0].id}`);
}


  const customer = await stripe.customers.create({
      email: new_customer.email,
      name: new_customer.name,
      phone: new_customer.phone,
  });

  return customer.id
}

export const getCustomerCards = async (stripeCustomerId: string) => {
  const cards = await stripe.paymentMethods.list({
    customer: stripeCustomerId,
    type: 'card'
  });

  console.log(cards)

  return cards.data;
}



export const attachPaymentMethod = async (paymentMethodId: string, stripeCustomerId: string) => {
  
  const paymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
    customer: stripeCustomerId,
  });

  return paymentMethod;
}


export default {
  createCustomer,
  getCustomerCards,
  attachPaymentMethod
}
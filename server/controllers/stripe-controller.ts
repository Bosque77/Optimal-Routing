import express from 'express'
import { UserType } from '../types';
import stripeService from  '../services/stripe-service'

const stripeRouter = express.Router()


stripeRouter.post('/attachPayment', async (req, res) => {

    console.log('inside stripe attach payment method')

    const user = req.user as UserType;
    const stripe_id = user.stripeUserId
    const { payment_id } = req.body

    try {
        console.log(payment_id, stripe_id)
        const paymentMethod = await stripeService.attachPaymentMethod(payment_id, stripe_id);
        console.log('Payment method attached successfully:', paymentMethod.id);
        res.status(200).send({ message: 'Payment method attached successfully' });
    } catch (error) {
        console.error('Error attaching payment method:', error);
        res.status(500).send({ error: 'Error attaching payment method' });
    }
    
})

export default stripeRouter

import express from 'express';
import Stripe from 'stripe';

const app = express();
app.use(express.json());
const port = 3000;
// const PUBLISHABLE_KEY =
//     'pk_test_51KebhFIlBbGoLzRf29lF05V8HHvRvffWVo0ilCBvTWDtiEWyVCi1elpfk62fhNpE8ImEgGAFFcOTN7CdBgX6T4kN008bLxKPaf';
const SECRET_KEY =
    'sk_test_51KebhFIlBbGoLzRfnrCxmexPfQH0pSW8jwE1qyfCBsTw08FLXRsaWOSKQgxCi7NX1nvpcmeGfhIpQz3uh2e5TQ5P007eDD3smo';

const stripe = new Stripe(SECRET_KEY, { apiVersion: '2020-08-27' });

app.post('/create-payment-intent', async (req, res) => {
    try {
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 5000, // 50$
            currency: 'usd',
            payment_method_types: ['card'],
        });

        console.log('paymentIntent', paymentIntent);

        const clientSecret = paymentIntent.client_secret;

        res.json({
            clientSecret,
        });
    } catch (error: any) {
        console.log(error.message);
        res.json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server listen port: ${port}`);
});

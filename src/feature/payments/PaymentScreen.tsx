/* eslint-disable no-shadow */
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';
import { fetchPaymentIntentClientSecret } from 'api/modules/api-app/paymentStripe';
import { Themes } from 'assets/themes';
import { StyledButton, StyledInput } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

const PaymentScreen = () => {
    const [email, setEmail] = useState<any>('user@stripe.com');
    const [cardDetails, setCardDetails] = useState<any>();
    const { confirmPayment } = useConfirmPayment();

    const handlePayment = async () => {
        if (!cardDetails?.complete || !email) {
            AlertMessage('Please enter Complete Card detail & Email ');
        }
        const billingDetails = { email };

        // B2. Fetch Payment Intent Client Secret
        try {
            const { clientSecret, error }: any = await fetchPaymentIntentClientSecret();
            // 2. confirm the payment
            if (error) {
                AlertMessage('Unable to process payment');
            } else {
                const { paymentIntent, error } = await confirmPayment(clientSecret, {
                    type: 'Card',
                    billingDetails,
                });
                if (error) {
                    AlertMessage(`Payment Confirmation Error ${error.message}`);
                } else if (paymentIntent) {
                    AlertMessage('Payment Successful');
                    console.log('Payment successful ', paymentIntent);
                }
            }
        } catch (error: any) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <StyledInput
                placeholder="E-mail"
                keyboardType="email-address"
                onChangeText={(text: any) => setEmail(text)}
                customStyle={styles.input}
                value={email}
            />
            <CardField
                postalCodeEnabled={true}
                style={styles.cardContainer}
                onCardChange={(cardParam: any) => setCardDetails(cardParam)}
            />
            <StyledButton title="Payment" onPress={handlePayment} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    input: {
        borderRadius: 8,
        height: 50,
        padding: 10,
        fontSize: 18,
    },
    cardContainer: {
        height: 50,
        width: '80%',
        marginVertical: 10,
        borderRadius: 8,
        backgroundColor: Themes.COLORS.secondary,
    },
});

export default PaymentScreen;

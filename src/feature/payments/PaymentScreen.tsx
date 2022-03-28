/* eslint-disable no-shadow */
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';
import { Themes } from 'assets/themes';
import { StyledButton, StyledInput } from 'components/base';
import AlertMessage from 'components/base/AlertMessage';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

const API_URL = 'http://localhost:3000';

const PaymentScreen = () => {
    const [email, setEmail] = useState<any>();
    const [cardDetails, setCardDetails] = useState<any>();
    const { confirmPayment } = useConfirmPayment();

    const fetchPaymentIntentClientSecret = async () => {
        const response = await fetch(`${API_URL}/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const { clientSecret, error } = await response.json();
        return { clientSecret, error };
    };

    const handlePayment = async () => {
        // B1. Thu thập thông tin của khách hàng.
        if (!cardDetails?.complete || !email) {
            AlertMessage('Please enter Complete Card detail & Email ');
        }
        const billingDetails = {
            email,
        };
        // B2. Lấy (fetch) chuỗi bí mật của khách hàng từ backend.
        try {
            const { clientSecret, error } = await fetchPaymentIntentClientSecret();
            console.log('clientSecret', clientSecret);
            // 2. confirm the payment
            if (error) {
                console.log('Unable to process payment');
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
        // B3. Xác nhận thanh toán bằng thẻ chi tiết.
    };

    return (
        <View style={styles.container}>
            <StyledInput
                autoCapitalize="none"
                placeholder="E-mail"
                keyboardType="email-address"
                onChangeText={(text: any) => setEmail(text)}
                customStyle={styles.input}
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

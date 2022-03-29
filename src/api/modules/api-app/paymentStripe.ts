import request from 'api/request';

export const fetchPaymentIntentClientSecret = () => {
    return request.post(`create-payment-intent`);
};

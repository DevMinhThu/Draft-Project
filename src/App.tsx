import { NavigationContainer } from '@react-navigation/native';
import { StripeProvider } from '@stripe/stripe-react-native';
import { persistor, store } from 'app-redux/store';
import { navigationRef } from 'navigation/NavigationService';
import Navigation from 'navigation/scene/RootScenes';
import React, { FunctionComponent, useEffect } from 'react';
import { ActivityIndicator, LogBox } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import APIProvider from 'utilities/context/APIProvider';
import { addMenuClearAsyncStorage, getCodePushInfo } from 'utilities/helper';
import { loadLocaleLanguage } from 'utilities/i18next';

LogBox.ignoreLogs(['Require cycle:']);

const App: FunctionComponent = () => {
    const onBeforeLift = () => {
        loadLocaleLanguage();
    };
    useEffect(() => {
        addMenuClearAsyncStorage();
        getCodePushInfo();
    }, []);

    return (
        <Provider store={store}>
            <PersistGate loading={<ActivityIndicator />} persistor={persistor} onBeforeLift={onBeforeLift}>
                <APIProvider>
                    <RootSiblingParent>
                        <StripeProvider
                            publishableKey={
                                'pk_test_51KebhFIlBbGoLzRf29lF05V8HHvRvffWVo0ilCBvTWDtiEWyVCi1elpfk62fhNpE8ImEgGAFFcOTN7CdBgX6T4kN008bLxKPaf'
                            }
                        >
                            <NavigationContainer ref={navigationRef}>
                                <Navigation />
                            </NavigationContainer>
                        </StripeProvider>
                    </RootSiblingParent>
                </APIProvider>
            </PersistGate>
        </Provider>
    );
};

export default App;

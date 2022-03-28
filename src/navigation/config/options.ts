import { CardStyleInterpolators } from '@react-navigation/stack';
import { Themes } from 'assets/themes';
import { isIos } from 'utilities/helper';
import transition from './transition';

const navigationConfigs = {
    cardStyle: {
        backgroundColor: Themes.COLORS.white,
        // paddingBottom: Metrics.safeBottomPadding,
    },
    headerShown: false,
    gestureEnabled: true,
    // gestureDirection: 'default',
    cardShadowEnabled: true,
    cardOverlayEnabled: true,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    transitionSpec: {
        open: transition,
        close: transition,
    },
    keyboardHandlingEnabled: isIos,
    headerMode: false,
    // animationEnabled: false,
};

export default navigationConfigs;

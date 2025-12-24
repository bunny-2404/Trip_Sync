
import React from 'react';
import { AppProvider, useAppContext } from './src/contexts/AppContext';
import { Screen } from './src/types';
import { SplashScreen } from './src/screens/SplashScreen';
import { LoginScreen } from './src/screens/auth/LoginScreen';
import { SignUpScreen } from './src/screens/auth/SignUpScreen';
import { ProfileSetup1Screen } from './src/screens/profile/ProfileSetup1Screen';
import { ProfileSetup2Screen } from './src/screens/profile/ProfileSetup2Screen';
import { MainScreen } from './src/screens/MainScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { NavigationScreen } from './src/screens/NavigationScreen';
import { AccountScreen } from './src/screens/AccountScreen';

const Content = () => {
    const { screen, isNavigating, currentTripDetails, endNavigation } = useAppContext();

    // If navigation is active, force NavigationScreen regardless of 'screen' state?
    // In original App.tsx, NavigationScreen was conditionally rendered or switched to.
    // Generally 'screen' state controls view.
    // But NavigationScreen takes props?
    // In original App.tsx, NavigationScreen took { tripDetails, onCheckOut }.
    // If screen is Screen.Navigation, we assume currentTripDetails is set in context.

    // Check if currentTripDetails is available when screen is Navigation.

    switch (screen) {
        case Screen.Splash: return <SplashScreen />;
        case Screen.Login: return <LoginScreen />;
        case Screen.SignUp: return <SignUpScreen />;
        case Screen.ProfileSetup1: return <ProfileSetup1Screen />;
        case Screen.ProfileSetup2: return <ProfileSetup2Screen />;
        case Screen.Home: return <HomeScreen />;
        case Screen.Main: return <MainScreen />;
        case Screen.Navigation:
            return currentTripDetails
                ? <NavigationScreen tripDetails={currentTripDetails} onCheckOut={endNavigation} />
                : <HomeScreen />; // Fallback if no trip details
        case Screen.Account: return <AccountScreen />;
        default: return <SplashScreen />;
    }
};

const App = () => {
    return (
        <AppProvider>
            <Content />
        </AppProvider>
    );
};

export default App;
import React from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
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

const libraries: ("places" | "geometry")[] = ["places", "geometry"];

const Content = () => {
    const { screen, currentTripDetails, endNavigation } = useAppContext();

    // Load Google Maps API globally
    const { isLoaded, loadError } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
        libraries: libraries
    });

    if (loadError) {
        return <div className="h-screen flex items-center justify-center text-red-500">Error loading maps: {loadError.message}</div>;
    }

    if (!isLoaded) {
        // You might want to show a splash screen or a loading spinner here while maps load
        // But for now, returning null or a spinner is fine. 
        // If we return SplashScreen, it might flicker if app logic is also deciding Screen.Splash.
        // Let's just return a simple loader or keep existing behavior if it wasn't blocking.
        // However, providing the script early is the goal.
        return <div className="h-screen flex items-center justify-center bg-gray-900 text-white">Loading Maps...</div>;
    }

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
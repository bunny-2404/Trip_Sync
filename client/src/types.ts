
import React from 'react';

// FIX: Removed unnecessary self-import of 'MainTab' and 'Screen' which was causing declaration conflicts.
export enum Screen {
  Splash,
  Login,
  SignUp,
  ProfileSetup1,
  ProfileSetup2,
  Home,
  Main,
  Account,
  Navigation,
}

export enum MainTab {
  Home,
  Sakha,
  Planner,
  Destinations,
  History,
}

export type ModalType = 'travelMode' | 'vehicleSelection' | null;

export interface Vehicle {
  id: string;
  regNumber: string;
}

export interface UserProfile {
  name: string;
  phone: string;
  password: string;
  twoWheelers: Vehicle[];
  fourWheelers: Vehicle[];
}

export interface SavedRoute {
  id: string;
  origin: string;
  destination: string;
  stay: string;
  travelTime: string;
}

export interface Trip {
  id: string;
  tripName: string;
  date: string;
  duration: string;
  from: string;
  fromSubtitle: string;
  startTime: string;
  distance: number;
  to: string;

  toSubtitle: string;
  endTime: string;
  vehicleNumber?: string;
  travelers: number;
  stops: number;
  mode: '4W' | '2W' | 'train' | 'walking';
}


export interface Stay {
  id: string;
  name: string;
  distance: string;
  rating: number;
  image: string;
}

export interface ProfileSetupData {
  name: string;
  numTwoWheelers: number;
  numFourWheelers: number;
}

export interface PlanningTrip {
  destination: string;
  stayLocation?: string;
  hasStayPlanned: boolean;
}

export interface TripDetails {
  from: string;
  to: string;
  mode: '4W' | '2W' | 'train' | 'walking';
  travelers: number;
  vehicleNumber?: string;
}

export interface AppContextType {
  screen: Screen;
  setScreen: (screen: Screen) => void;
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  savedRoutes: SavedRoute[];
  addRoute: (route: Omit<SavedRoute, 'id' | 'travelTime'>) => void;
  removeRoute: (id: string) => void;
  reverseRoute: (id: string) => void;
  trips: Trip[];
  addTrip: (trip: Omit<Trip, 'id' | 'tripName' | 'date' | 'duration' | 'startTime' | 'endTime'>) => void;
  removeTrip: (id: string) => void;
  clearTrips: () => void;
  navigationDestination: string | null;
  setNavigationDestination: (target: string | null) => void;
  navigationOrigin: string | null;
  setNavigationOrigin: (target: string | null) => void;
  profileSetupData: ProfileSetupData | null;
  startProfileSetup: (data: ProfileSetupData) => void;
  completeProfileSetup: (vehicles: { twoWheelers: string[], fourWheelers: string[] }) => void;
  skipProfileSetup: () => void;
  addVehicle: (type: 'twoWheelers' | 'fourWheelers', regNumber: string) => void;
  removeVehicle: (type: 'twoWheelers' | 'fourWheelers', id: string) => void;
  // FIX: Refactored `updateVehicle` to take a single object argument to resolve a signature mismatch error.
  updateVehicle: (payload: { type: 'twoWheelers' | 'fourWheelers'; vehicle: Vehicle }) => void;
  activeTab: MainTab;
  setActiveTab: (tab: MainTab) => void;
  activeModal: ModalType;
  setActiveModal: (modal: ModalType) => void;
  startNavigationFrom: (origin: string, destination: string) => void;
  planningTrip: PlanningTrip | null;
  setPlanningTrip: React.Dispatch<React.SetStateAction<PlanningTrip | null>>;
  isNavigating: boolean;
  currentTripDetails: TripDetails | null;
  startNavigation: (details: TripDetails) => void;
  endNavigation: () => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  handleLogin: (phone: string, password: string) => Promise<{ success: boolean; message?: string }>;
  handleSignup: (phone: string, password: string) => Promise<{ success: boolean; message?: string }>;
}
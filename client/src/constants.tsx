// This file contains mock data and SVG icon components used throughout the application.
import { SavedRoute, Trip } from './types';

export const MOCK_TRIPS: Trip[] = [
  {
    id: '1',
    tripName: 'Trip 1',
    date: 'Jan 20, 2024',
    duration: '1h 15m',
    from: 'Home',
    fromSubtitle: 'Andheri West, Mumbai',
    startTime: '09:30 AM',
    distance: 18.5,
    to: 'Gateway of India',
    toSubtitle: 'Colaba, Mumbai',
    endTime: '10:45 AM',
    vehicleNumber: 'MH 01 AB 1234',
    travelers: 2,
    stops: 1,
    mode: '4W' as const,
  },
  {
    id: '2',
    tripName: 'Trip 2',
    date: 'Jan 18, 2024',
    duration: '45m',
    from: 'Office',
    fromSubtitle: 'Bandra Kurla Complex, Mumbai',
    startTime: '06:15 PM',
    distance: 12.3,
    to: 'Juhu Beach',
    toSubtitle: 'Juhu, Mumbai',
    endTime: '07:00 PM',
    vehicleNumber: 'MH 02 CD 5678',
    travelers: 1,
    stops: 0,
    mode: '2W' as const,
  },
  {
    id: '3',
    tripName: 'Trip 3',
    date: 'Jan 15, 2024',
    duration: '2h 30m',
    from: 'Pune',
    fromSubtitle: 'Swargate, Pune',
    startTime: '11:00 AM',
    distance: 150,
    to: 'Lonavala',
    toSubtitle: 'Lonavala, Maharashtra',
    endTime: '01:30 PM',
    vehicleNumber: 'N/A',
    travelers: 4,
    stops: 2,
    mode: 'train' as const,
  },
  {
    id: '4',
    tripName: 'Trip 4',
    date: 'Jan 12, 2024',
    duration: '25m',
    from: 'Market',
    fromSubtitle: 'Crawford Market, Mumbai',
    startTime: '04:00 PM',
    distance: 2.1,
    to: 'Marine Drive',
    toSubtitle: 'Mumbai, Maharashtra',
    endTime: '04:25 PM',
    vehicleNumber: 'N/A',
    travelers: 2,
    stops: 0,
    mode: 'walking' as const,
  },
   {
    id: '5',
    tripName: 'Trip 5',
    date: 'Jan 10, 2024',
    duration: '3h 5m',
    from: 'Mumbai Airport',
    fromSubtitle: 'Terminal 2, Mumbai',
    startTime: '08:00 AM',
    distance: 165,
    to: 'Alibaug',
    toSubtitle: 'Alibaug, Maharashtra',
    endTime: '11:05 AM',
    vehicleNumber: 'MH 04 EF 9101',
    travelers: 3,
    stops: 1,
    mode: '4W' as const,
  },
];

export const MOCK_SAVED_ROUTES: SavedRoute[] = [
  {
    id: 'route1',
    origin: 'Taj Mahal Palace',
    destination: 'Gateway of India',
    stay: 'Taj Mahal Palace',
    travelTime: '5 min',
  },
  {
    id: 'route2',
    origin: 'The Oberoi',
    destination: 'Marine Drive',
    stay: 'The Oberoi',
    travelTime: '15 min',
  },
];

export const MOCK_NEARBY_DESTINATIONS = [
    { id: '3', name: 'Gateway of India', distance: '25 km' },
    { id: '4', name: 'Juhu Beach' },
    { id: '5', name: 'Marine Drive', distance: '22 km' },
    { id: '6', name: 'Siddhivinayak Temple', distance: '15 km' },
    { id: '7', name: 'Haji Ali Dargah', distance: '18 km' },
];

export const MOCK_STAYS = [
    { id: '1', name: 'Taj Mahal Palace', distance: '0.5 km', rating: 4.8, image: 'https://images.unsplash.com/photo-1562369325-1882c5a04a62?q=80&w=2940&auto=format&fit=crop' },
    { id: '2', name: 'The Oberoi', distance: '1.2 km', rating: 4.9, image: 'https://images.unsplash.com/photo-1620121823199-9d7a2dec1770?q=80&w=2940&auto=format&fit=crop' },
    { id: '3', name: 'Trident Nariman Point', distance: '1.5 km', rating: 4.7, image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2825&auto=format&fit=crop' },
];

// SVGs for Home Screen Feature Cards
const CompassIconSvg = ({ className = "w-7 h-7 text-white" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
    </svg>
);

const CalendarIconSvg = ({ className = "w-7 h-7 text-white" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
);

const PinIconSvg = ({ className = "w-7 h-7 text-white" }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const DocumentTextIconSvg = ({ className = "w-7 h-7 text-white" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
);


export const LogoSvg = () => (
    <svg className="w-full h-full" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pin-gradient" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
        <filter id="cyan-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Pin shape */}
      <path
          d="M32 2 C18.7 2 8 12.7 8 26 C8 44 32 62 32 62 S56 44 56 26 C56 12.7 45.3 2 32 2 Z"
          fill="url(#pin-gradient)"
      />
      {/* Glossy Highlight */}
      <path 
        d="M32,5 C43.2,5 52.8,11.8 55,22 C46,15 39,13 32,13 C25,13 18,15 9,22 C11.2,11.8 20.8,5 32,5 Z" 
        fill="white" 
        opacity="0.2"
      />
      {/* Central circle background for the S-path */}
      <circle cx="32" cy="28" r="14" fill="#000" />

      {/* The stylized 'S' path with glow */}
      <g filter="url(#cyan-glow)">
        <path
            d="M26 24 C 26 34 38 22 38 32"
            stroke="#06b6d4"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
        />
        <circle cx="26" cy="24" r="3.5" fill="#06b6d4" />
        <circle cx="38" cy="32" r="3.5" fill="#06b6d4" />
      </g>
    </svg>
);

export const AppLogo = () => (
    <div className="w-24 h-24 bg-gray-900 rounded-3xl flex items-center justify-center shadow-2xl border border-slate-700 p-1">
        <LogoSvg />
    </div>
);

export const TripSyncAppIcon = () => (
    <div className="flex flex-col items-center">
        <div className="w-28 h-28 bg-white dark:bg-gray-900 rounded-[2.25rem] flex items-center justify-center shadow-2xl border border-gray-200 dark:border-slate-700/50 p-1 overflow-hidden relative">
            <div className="absolute inset-0 bg-black/5 dark:bg-black/50"></div>
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-3xl"></div>
            <svg className="w-16 h-16 text-cyan-500 dark:text-cyan-400 z-10" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="cyan-glow-login" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                    </filter>
                </defs>
                <path
                    d="M32 6 C18.7 6 8 16.7 8 30 C8 48 32 66 32 66 S56 48 56 30 C56 16.7 45.3 6 32 6 Z"
                    className="fill-slate-100 dark:fill-slate-900 stroke-slate-300 dark:stroke-slate-700"
                    strokeWidth="2"
                />
                <g filter="url(#cyan-glow-login)">
                    <path
                        d="M26 28 C 26 38 38 26 38 36"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                    />
                    <circle cx="26" cy="28" r="3.5" fill="currentColor" />
                    <circle cx="38" cy="36" r="3.5" fill="currentColor" />
                </g>
            </svg>
        </div>
        <p className="text-slate-900 dark:text-white text-xl font-semibold mt-2">TripSync</p>
    </div>
);

export const IndianFlagIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 21 15">
        <rect width="21" height="15" fill="#fff"/>
        <rect width="21" height="5" fill="#f93"/>
        <rect width="21" height="5" y="10" fill="#128807"/>
        <circle cx="10.5" cy="7.5" r="2" fill="#008" fillOpacity=".25"/>
        <circle cx="10.5" cy="7.5" r="1.6" fill="#fff"/>
        <circle cx="10.5" cy="7.5" r=".8" fill="#008"/>
    </svg>
);

export const SakhaFeatureIcon = () => <div className="w-16 h-16 rounded-xl bg-cyan-500/80 flex items-center justify-center mx-auto"><CompassIconSvg /></div>;
export const PlannerFeatureIcon = () => <div className="w-16 h-16 rounded-xl bg-orange-400/80 flex items-center justify-center mx-auto"><CalendarIconSvg /></div>;
export const DestinationsFeatureIcon = () => <div className="w-16 h-16 rounded-xl bg-rose-500/80 flex items-center justify-center mx-auto"><PinIconSvg /></div>;
export const TripHistoryFeatureIcon = () => <div className="w-16 h-16 rounded-xl bg-slate-600/80 flex items-center justify-center mx-auto"><DocumentTextIconSvg /></div>;


export const FourWheelerIcon = () => <CarIcon className="w-8 h-8 text-gray-700 dark:text-gray-300" />;
export const TwoWheelerIcon = () => <BikeIcon className="w-8 h-8 text-gray-700 dark:text-gray-300" />;
export const TrainIcon = () => <Trainicon className="w-8 h-8 text-gray-700 dark:text-gray-300" />;
export const WalkingIcon = () => <Walkingicon className="w-8 h-8 text-gray-700 dark:text-gray-300" />;

export const ReverseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
    </svg>
);

export const SearchIcon = ({ className = "w-5 h-5"}: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

export const CarIcon = ({ color = "currentColor", className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={color}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5h12.75" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 14.25c0-1.036.84-1.875 1.875-1.875h13.5c1.036 0 1.875.84 1.875 1.875v2.25c0 1.035-.84 1.875-1.875 1.875h-13.5a1.875 1.875 0 01-1.875-1.875v-2.25z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75v-2.625c0-.965.785-1.75 1.75-1.75h11.5c.965 0 1.75.785 1.75 1.75v2.625" />
  </svg>
);

export const BikeIcon = ({ color = "currentColor", className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" strokeWidth="1.5" stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="5" cy="18" r="3" />
    <circle cx="19" cy="18" r="3" />
    <path d="M12 18h-3.5" />
    <path d="M15 18h-1" />
    <path d="M5 15l1.5-3 2-2 3.5 4 2-3h3" />
    <path d="M11 9h3" />
  </svg>
);

export const Trainicon = ({ color = "currentColor", className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 8.5V4a2 2 0 00-2-2h-8a2 2 0 00-2 2v4.5m12 0V15a2.5 2.5 0 01-2.5 2.5h-7A2.5 2.5 0 016 15V8.5m12 0h-12m12 0H6m4 11.5h4M4 19h16" />
      <circle cx="12" cy="12" r="2" />
  </svg>
);

export const Walkingicon = ({ color = "currentColor", className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="4.5" r="2.5"/>
        <path d="M14 20l-4-6-4 3"/>
        <path d="M10 14l1-5 4.5 3"/>
    </svg>
);

export const HomeIcon = ({ isActive, className = "" }: { isActive: boolean, className?: string }) => (
    <svg className={`w-7 h-7 ${isActive ? 'text-blue-500 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300'} ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

export const SakhaIcon = ({ isActive }: { isActive: boolean }) => (
    <svg className={`w-7 h-7 ${isActive ? 'text-blue-500 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
         <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-4 4v-4z" />
    </svg>
);

export const PlannerIcon = ({ isActive }: { isActive: boolean }) => (
    <svg className={`w-7 h-7 ${isActive ? 'text-blue-500 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m-6 10V7" />
    </svg>
);

export const PlacesIcon = ({ isActive, className = "" }: { isActive: boolean, className?: string }) => (
    <svg className={`w-7 h-7 ${isActive ? 'text-blue-500 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300'} ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

export const HistoryIcon = ({ isActive, className = "" }: { isActive: boolean, className?: string }) => (
    <svg className={`w-7 h-7 ${isActive ? 'text-blue-500 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300'} ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const PlusIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);

export const CheckIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);

export const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
)

export const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
);

export const ArrowLeftIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

export const EditIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
    </svg>
);

// Icons for Home Screen Feature Cards - Updated to match reference image
const iconContainerBaseStyle = "w-14 h-14 rounded-2xl flex items-center justify-center";
const iconSvgBaseStyle = "w-7 h-7 text-white";

export const HomeSakhaIcon = () => <div className={`${iconContainerBaseStyle} bg-teal-500`}><CompassIconSvg className={iconSvgBaseStyle} /></div>;
export const HomePlannerIcon = () => <div className={`${iconContainerBaseStyle} bg-orange-500`}><CalendarIconSvg className={iconSvgBaseStyle} /></div>;
export const HomeDestinationsIcon = () => <div className={`${iconContainerBaseStyle} bg-rose-500`}><PinIconSvg className={iconSvgBaseStyle} /></div>;
export const HomeHistoryIcon = () => <div className={`${iconContainerBaseStyle} bg-blue-600`}><DocumentTextIconSvg className={iconSvgBaseStyle} /></div>;


// New Icons for Add Stop Modal
export const PetrolPumpIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11v-1a1 1 0 00-1-1h-4a1 1 0 00-1 1v1a1 1 0 001 1h2" />
    </svg>
);

export const RestaurantIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 5H3v16h18V5h-8zm0 0a4 4 0 100-8 4 4 0 000 8zM5 13h14M5 17h14" />
        <path d="M13 5v16" />
    </svg>
);

export const AtmIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H9a2 2 0 00-2 2v2m10 0a2 2 0 012 2v5a2 2 0 01-2 2H7a2 2 0 01-2-2v-5a2 2 0 012-2h10z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v-3m0 0V9" />
    </svg>
);

export const EvChargingIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

export const EyeOpenIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

export const EyeClosedIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
    </svg>
);

// NEW ICONS FOR IN-APP NAVIGATION
export const TurnLeftIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15l-6-6 6-6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9h12a6 6 0 016 6v3" />
    </svg>
);

export const TurnRightIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6-6-6" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 9H9a6 6 0 00-6 6v3" />
    </svg>
);

export const StraightIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 14l-4-4m4 4l4-4" />
    </svg>
);

export const UTurnIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m0 0l-3-3m3 3l3-3m5 3H7a6 6 0 010-12h2" />
    </svg>
);
export const MergeIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
       <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l4-4-4-4" />
       <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18" />
       <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h4" />
    </svg>
);


export const RecenterIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m-4-4h8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5a.5.5 0 100-1 .5.5 0 000 1zM12 20a.5.5 0 100-1 .5.5 0 000 1zM5 12a.5.5 0 10-1 0 .5.5 0 001 0zM20 12a.5.5 0 10-1 0 .5.5 0 001 0z" />
    </svg>
);

export const MicrophoneIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-14 0m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 013 3v5a3 3 0 01-6 0v-5a3 3 0 013-3z" />
    </svg>
);
import { CompatibleDevice, ReviewItem } from '../types';

export const COMPATIBLE_DEVICES: CompatibleDevice[] = [
  {
    brand: 'Apple',
    popularModels: [
      'iPhone 16, 16 Plus, 16 Pro, 16 Pro Max',
      'iPhone 15, 15 Plus, 15 Pro, 15 Pro Max',
      'iPhone 14, 14 Plus, 14 Pro, 14 Pro Max',
      'iPhone 13, 13 mini, 13 Pro, 13 Pro Max',
      'iPhone 12, 12 mini, 12 Pro, 12 Pro Max',
      'iPhone 11, 11 Pro, 11 Pro Max',
      'iPhone XS, XS Max, XR',
      'iPhone SE (2nd & 3rd generation)',
      'iPad Pro (all cellular models since 2018)',
      'iPad Air (3rd gen and newer with cellular)',
      'iPad mini (5th gen and newer with cellular)'
    ],
    instructions: 'Go to Settings > Cellular > Add eSIM. If you see this option, your iPhone is eSIM capable. Make sure "Carrier Lock" shows "No SIM restrictions" in Settings > General > About.'
  },
  {
    brand: 'Samsung',
    popularModels: [
      'Galaxy S24, S24+, S24 Ultra',
      'Galaxy S23, S23+, S23 Ultra, S23 FE',
      'Galaxy S22, S22+, S22 Ultra',
      'Galaxy S21, S21+ 5G, S21 Ultra 5G',
      'Galaxy S20, S20+ 5G, S20 Ultra 5G',
      'Galaxy Z Fold6, Fold5, Fold4, Fold3, Fold2',
      'Galaxy Z Flip6, Flip5, Flip4, Flip3, Flip',
      'Galaxy Note 20, Note 20 Ultra'
    ],
    instructions: 'Go to Settings > Connections > SIM manager > Add eSIM. If "Add eSIM" is present, your Samsung device supports digital SIM cards.'
  },
  {
    brand: 'Google',
    popularModels: [
      'Pixel 9, 9 Pro, 9 Pro XL, 9 Pro Fold',
      'Pixel 8, 8 Pro, 8a',
      'Pixel 7, 7 Pro, 7a',
      'Pixel 6, 6 Pro, 6a',
      'Pixel 5, 5a 5G',
      'Pixel 4, 4 XL, 4a, 4a 5G',
      'Pixel 3, 3 XL, 3a, 3a XL'
    ],
    instructions: 'Go to Settings > Network & internet > SIMs > tap "+ Add SIM" > Download a SIM instead.'
  },
  {
    brand: 'Xiaomi',
    popularModels: [
      'Xiaomi 14, 14 Pro, 14 Ultra',
      'Xiaomi 13, 13 Pro, 13 Lite, 13T, 13T Pro',
      'Xiaomi 12T Pro',
      'Redmi Note 13 Pro+, Note 13 Pro (Global)'
    ],
    instructions: 'Go to Settings > SIM cards & mobile networks > Manage eSIM or Add eSIM.'
  },
  {
    brand: 'Other Android & Tablets',
    popularModels: [
      'Motorola Razr 40 Ultra, Razr 2022/2020',
      'Motorola Edge 50, Edge 40 Pro',
      'Sony Xperia 1 V, 1 IV, 5 IV, 10 IV',
      'Honor Magic6 Pro, Magic5 Pro, Magic V2',
      'Oppo Find X7 Ultra, X5 Pro, Find N3'
    ],
    instructions: 'Dial *#06# on your keypad. If an "EID" 32-digit identifier barcode appears on your screen, your device hardware includes an embedded eSIM chip!'
  }
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    customerName: 'Marcus Lindqvist',
    country: 'Sweden',
    destination: 'Japan',
    rating: 5,
    text: 'Installation took only a few minutes before my flight from Stockholm. As soon as we touched down at Haneda Airport, high-speed 5G kicked in immediately with zero hassle.',
    date: '3 days ago',
    published: true,
    verifiedTrip: true
  },
  {
    id: 'rev-2',
    customerName: 'Elena Rostova',
    country: 'Canada',
    destination: 'United States',
    rating: 5,
    text: 'Traveled through California and Nevada for 2 weeks. The coverage on T-Mobile 5G was blistering fast, and I used hotspot constantly for my work MacBook in coffee shops.',
    date: '1 week ago',
    published: true,
    verifiedTrip: true
  },
  {
    id: 'rev-3',
    customerName: 'Tariq Al-Mansoor',
    country: 'United Arab Emirates',
    destination: 'United Kingdom',
    rating: 5,
    text: 'Much better than paying outrageous roaming fees from my domestic carrier. London, Edinburgh, and Manchester connectivity was flawless on EE network.',
    date: '2 weeks ago',
    published: true,
    verifiedTrip: true
  },
  {
    id: 'rev-4',
    customerName: 'Sophie Beaumont',
    country: 'France',
    destination: 'Thailand',
    rating: 5,
    text: 'Unlimited package in Bangkok and Phuket worked brilliantly for Google Maps and Grab. Never had to hunt for a physical tourist SIM booth at the airport.',
    date: '3 weeks ago',
    published: true,
    verifiedTrip: true
  },
  {
    id: 'rev-5',
    customerName: 'David Chen',
    country: 'Australia',
    destination: 'Europe (35+ Countries)',
    rating: 5,
    text: 'Did a 4-country rail tour across France, Germany, Switzerland, and Italy. The eSIM switched borders without dropping voice calls or navigation once.',
    date: '1 month ago',
    published: true,
    verifiedTrip: true
  }
];

export const INITIAL_COUPONS = [
  {
    id: 'coup-1',
    code: 'WELCOME10',
    discountType: 'percentage' as const,
    value: 10,
    minOrder: 10,
    expiryDate: '2027-12-31',
    usageLimit: 1000,
    timesUsed: 142,
    isActive: true
  },
  {
    id: 'coup-2',
    code: 'TRAVEL5',
    discountType: 'fixed' as const,
    value: 5,
    minOrder: 20,
    expiryDate: '2027-12-31',
    usageLimit: 500,
    timesUsed: 89,
    isActive: true
  },
  {
    id: 'coup-3',
    code: 'ESIMORA15',
    discountType: 'percentage' as const,
    value: 15,
    minOrder: 25,
    expiryDate: '2027-12-31',
    usageLimit: 250,
    timesUsed: 64,
    isActive: true
  }
];

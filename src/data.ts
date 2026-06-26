import { Property } from './types';

export const PROPERTIES: Property[] = [
  {
    id: 'lunar-oasis',
    name: 'Browntree Ooty Resort',
    location: 'OOTY',
    address: '1874 Forest Haven Rd, Asheville',
    price: 300000,
    rentPrice: 2400,
    type: 'Hotel',
    size: 695,
    yard: 126,
    bedrooms: 3,
    baths: 2,
    mainImage: '/src/assets/images/browntree_ooty_hotel.png',
    gallery: [
      { name: 'Browntree Ooty Suite', url: '/src/assets/images/browntree_ooty_hotel.png' },
      { name: 'Browntree Ooty Grounds', url: '/src/assets/images/browntree_ooty_hotels.png' },
      { name: 'Browntree Kothagiri Crest', url: '/src/assets/images/browntree_kothagiri.png' },
      { name: 'Browntree Kodaikanal Retreat', url: '/src/assets/images/browntree_kodaikanal.png' }
    ],
    description: 'This futuristic villa seamlessly blends into the desert environment, offering a modern, flowing space with panoramic desert views. Its innovative design makes it a perfect luxury getaway.',
    rating: 4.9
  },
  {
    id: 'solaria-dome',
    name: 'Solaria Dome Haven',
    location: 'COONOOR',
    address: '442 Sunrise Crest, Malibu',
    price: 520000,
    rentPrice: 3800,
    type: 'HomeStays',
    size: 540,
    yard: 80,
    bedrooms: 2,
    baths: 2,
    mainImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      { name: 'Main Front', url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80' },
      { name: 'Atrium Dining', url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80' },
      { name: 'Wellness Spa', url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80' }
    ],
    description: 'A masterpiece of curved geodesic architecture. Solaria Dome features smart thermal glass, an integrated biodome garden, and expansive ocean views over the Malibu coastline.',
    rating: 4.85
  },
  {
    id: 'nebula-glass',
    name: 'Nebula Glass Penthouse',
    location: 'KOTHAKIRI',
    address: '88 Clifftop Way, Zion Valley',
    price: 850000,
    rentPrice: 5900,
    type: 'Heritage Stays',
    size: 820,
    yard: 150,
    bedrooms: 4,
    baths: 4,
    mainImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      { name: 'Clifftop Overlook', url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80' },
      { name: 'Kitchen Horizon', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80' },
      { name: 'Skydeck Lounge', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80' }
    ],
    description: 'Suspended dramatically over the red rock canyon cliffs, Nebula Glass features cantilevering structural glass floors, private heli-pad access, and automated climate control systems.',
    rating: 4.98
  },
  {
    id: 'canyon-echo',
    name: 'Canyon Echo Residence',
    location: 'KODAIKANAL',
    address: '712 Red Slate Ravine, Aspen',
    price: 430000,
    rentPrice: 3100,
    type: 'Service Apartments',
    size: 610,
    yard: 200,
    bedrooms: 3,
    baths: 3,
    mainImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      { name: 'Exterior Pine', url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80' },
      { name: 'Stone Fireplace', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80' },
      { name: 'Observatory Room', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80' }
    ],
    description: 'Constructed from natural cedar and thermal slate, Canyon Echo hugs the Aspen valley contours. Complete with an outdoor natural-filtration rock pool, high-ceiling pine beams, and custom glass walls.',
    rating: 4.78
  }
];


import React from 'react';
import { 
  Zap, 
  Wrench, 
  Hammer, 
  Droplets, 
  Leaf, 
  Truck, 
  Trash2, 
  Clock, 
  ShieldCheck, 
  CreditCard, 
  MapPin,
  Flame,
  Construction,
  Lightbulb,
  Plug,
  Home
} from 'lucide-react';

export const BUSINESS_INFO = {
  name: "Carlos Electrical",
  phone: "084 839 5755",
  phoneFormatted: "0848395755",
  email: "nenhariracalisto@gmail.com",
  address: "21 Elm Road, Parkwood, Cape Town",
  hours: "24/7 Emergency Service",
  whatsapp: "27848395755"
};

export const ELECTRICAL_SERVICES = [
  {
    id: "domestic",
    title: "Domestic Installations",
    shortDescription: "New house wiring, light fittings, and socket replacements.",
    longDescription: "We provide comprehensive residential electrical solutions. Whether you're building a new home or renovating an existing one, our team handles full house wiring, installation of modern light fixtures, additional plug points, and appliance installations (stoves, geysers, etc.) to ensure your home is safe and compliant with South African regulations.",
    icon: <Zap className="w-8 h-8 text-yellow-400" />,
    features: ["House Wiring", "Socket Replacements", "Light Fittings", "Geyser Repairs"]
  },
  {
    id: "construction",
    title: "Electrical Construction",
    shortDescription: "Full site electrification and industrial wiring solutions.",
    longDescription: "For contractors and developers, Carlos Electrical offers professional electrical construction services. We manage site electrification from the ground up, including cable laying, trenching, distribution board installations for new complexes, and ensuring all work meets rigorous safety standards before project handover.",
    icon: <Construction className="w-8 h-8 text-yellow-400" />,
    features: ["Site Electrification", "Cable Trenching", "Industrial Panels", "Blueprints Implementation"]
  },
  {
    id: "faultfinding",
    title: "Fault Finding",
    shortDescription: "Professional diagnostics for tripping switches and power issues.",
    longDescription: "Persistent power trips or mysterious electrical issues? Our advanced fault-finding techniques allow us to isolate problems quickly, saving you time and money. We diagnose short circuits, earth leakage issues, and overloaded circuits with precision equipment.",
    icon: <ShieldCheck className="w-8 h-8 text-yellow-400" />,
    features: ["Advanced Diagnostics", "Earth Leakage Testing", "Circuit Isolation", "Safety Audits"]
  },
  {
    id: "dbboard",
    title: "DB Board Upgrades",
    shortDescription: "Modernizing distribution boards for safety and compliance.",
    longDescription: "An outdated distribution board is a major fire hazard. we specialize in modernizing old boards, installing high-quality circuit breakers, and ensuring your earth leakage systems are fully functional. We also provide Certificates of Compliance (CoC) after major upgrades.",
    icon: <Flame className="w-8 h-8 text-yellow-400" />,
    features: ["Labeling & Testing", "Earth Leakage Installation", "Surge Protection", "CoC Certification"]
  },
  {
    id: "emergency",
    title: "Emergency Repairs",
    shortDescription: "Fast 24/7 response for any electrical urgent situation.",
    longDescription: "Electrical disasters don't keep office hours. Our 24/7 rapid response team is always on standby to handle power outages, burning smells from outlets, or severe electrical faults. We aim to reach any location in Cape Town within 30-60 minutes.",
    icon: <Clock className="w-8 h-8 text-yellow-400" />,
    features: ["24/7 Availability", "Rapid Response", "Temporary Power Restoration", "Urgent Safety Checks"]
  },
  {
    id: "maintenance",
    title: "Maintenance",
    shortDescription: "Preventative checks and repairs for long-term safety.",
    longDescription: "Regular maintenance is key to preventing expensive breakdowns. We offer tailored maintenance packages for both residential and commercial properties, including periodic inspections, cleaning of panels, and proactive replacement of worn components.",
    icon: <Wrench className="w-8 h-8 text-yellow-400" />,
    features: ["Periodic Inspections", "Cleaning & Tightening", "Load Balancing", "Performance Testing"]
  }
];

export const OTHER_SERVICES = {
  handyman: [
    { title: "Carpentry", icon: <Hammer className="w-5 h-5" /> },
    { title: "Painting", icon: <Hammer className="w-5 h-5" /> },
    { title: "Plumbing", icon: <Droplets className="w-5 h-5" /> }
  ],
  garden: [
    { title: "Landscaping", icon: <Leaf className="w-5 h-5" /> },
    { title: "Tree Felling", icon: <Leaf className="w-5 h-5" /> },
    { title: "Grass Cutting", icon: <Leaf className="w-5 h-5" /> },
    { title: "Hedge Trimming", icon: <Leaf className="w-5 h-5" /> }
  ],
  transport: [
    { title: "Bakkie & Trailer", icon: <Truck className="w-5 h-5" /> },
    { title: "Home Removals", icon: <Truck className="w-5 h-5" /> },
    { title: "Garage Clearing", icon: <Trash2 className="w-5 h-5" /> },
    { title: "Refuse Removal", icon: <Trash2 className="w-5 h-5" /> }
  ]
};

export const PORTFOLIO_ITEMS = [
  {
    title: "Modern Villa Wiring",
    category: "Electrical",
    image: "https://images.unsplash.com/photo-1686385798007-b14812307040?auto=format&fit=crop&q=80&w=800",
    description: "Complete electrification of a luxury 4-bedroom villa in Constantia."
  },
  {
    title: "Distribution Board Upgrade",
    category: "Electrical",
    image: "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=format&fit=crop&q=80&w=800",
    description: "Full modernization of an outdated panel with safety breakers and surge protection."
  },
  {
    title: "Interior Office Painting",
    category: "Handyman",
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=800",
    description: "Full interior paint job and dry wall repair for a commercial office in Century City."
  },
  {
    title: "Lawn Restoration",
    category: "Garden",
    image: "https://images.unsplash.com/photo-1708724327011-d1233673e730?auto=format&fit=crop&q=80&w=800",
    description: "Complete landscaping, lawn restoration, and irrigation setup in Sea Point."
  },
  {
    title: "Custom Timber Decking",
    category: "Handyman",
    image: "https://images.unsplash.com/photo-1714321589197-27752729f3bd?auto=format&fit=crop&q=80&w=800",
    description: "Built a sustainable timber deck and outdoor seating area for a family home."
  },
  {
    title: "Industrial High-Bay Lighting",
    category: "Electrical",
    image: "https://images.unsplash.com/photo-1546102741-936b7dcc25af?auto=format&fit=crop&q=80&w=800",
    description: "Energy-efficient LED lighting installation for a 2000sqm warehouse."
  },
  {
    title: "Kitchen Electrical Remodel",
    category: "Electrical",
    image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&q=80&w=800",
    description: "Rewiring and smart lighting installation for a modern kitchen renovation."
  },
  {
    title: "Precision Hedge Trimming",
    category: "Garden",
    image: "https://images.unsplash.com/photo-1734079692079-172d8243ebd3?auto=format&fit=crop&q=80&w=800",
    description: "Routine maintenance and artistic trimming for a large estate garden."
  },
  {
    title: "Plumbing Fix & Tiling",
    category: "Handyman",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
    description: "Bathroom leak repair followed by professional wall retiling."
  },
  {
    title: "Full Site Clearance",
    category: "Garden",
    image: "https://images.unsplash.com/photo-1773852184074-e7ecb1dd3665?auto=format&fit=crop&q=80&w=800",
    description: "Removing overgrown vegetation and refuse from a newly purchased plot."
  },
  {
    title: "Home Office Setup",
    category: "Electrical",
    image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&q=80&w=800",
    description: "Dedicated circuit and UPS integration for a professional home studio."
  },
  {
    title: "Security Lighting",
    category: "Electrical",
    image: "https://images.unsplash.com/photo-1764857558281-3b804f32463e?auto=format&fit=crop&q=80&w=800",
    description: "Installation of sensor-activated floodlights for a residential perimeter."
  }
];

export const TESTIMONIALS = [
  {
    name: "John Andrews",
    location: "Constantia",
    comment: "Carlos saved us during a blackout at 2 AM. He arrived in 30 minutes and fixed our DB board. Incredible service!",
    rating: 5
  },
  {
    name: "Sarah Meyer",
    location: "Sea Point",
    comment: "Used them for both painting and a minor electrical fault. Highly professional and very fair pricing.",
    rating: 5
  },
  {
    name: "David Mokwena",
    location: "Claremont",
    comment: "The team did a fantastic job with our new lighting installation. Clean work and very reliable.",
    rating: 4
  }
];

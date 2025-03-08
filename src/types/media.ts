export interface MediaConfig {
  videos: {
    hero: string;
  };
  images: {
    placeholders: {
      aboutUsSection: {
        [key: string]: string;
      };
      servicesSection: {
        luxuryCar: string;
        executiveChauffeur: string;
        airportTransfers: string;
        events: string;
        securityChauffeurs: string;
        heroLoading: string;
      };
    };
    logo: {
      original: string;
    };
  };
  socialMedia: {
    whatsapp: string;
    facebook: string;
    instagram: string;
    tiktok: string;
  };
  contact: {
    phone: string;
    email: string;
    location: string;
  };
} 
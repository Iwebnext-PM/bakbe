export interface OpportunityCategory {
  slug: string;
  route: string;
  title: string;
  kicker: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  imageAlt: string;
  defaultCdlClass: 'A' | 'B' | 'Other';
  defaultDrivingType: 'Local' | 'Regional' | 'OTR' | 'Dedicated' | 'Owner-Operator' | 'Open to Opportunities';
  highlights: string[];
  typicalQualifications: string[];
  seoTitle: string;
  seoDescription: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const COMPANY_INFO = {
  name: 'ProDriver',
  phoneDisplay: '(888) 445-5423',
  phoneHref: 'tel:+18884455423',
  email: 'iwebnext.com@gmail.com',
  emailHref: 'mailto:iwebnext.com@gmail.com',
  copyright: '© 2026 ProDriver. All Rights Reserved.',
} as const;

export const HERO_IMAGE = '/src/assets/images/hero_american_semitruck_1794614045854.jpg';
export const LOGISTICS_HUB_IMAGE = '/src/assets/images/freight_logistics_hub_1794614046912.jpg';
export const CAB_INTERIOR_IMAGE = '/src/assets/images/driver_cab_interior_1794614047049.jpg';

export const OPPORTUNITY_CATEGORIES: OpportunityCategory[] = [
  {
    slug: 'cdl-a-driver-jobs',
    route: '/cdl-opportunities/cdl-a-driver-jobs',
    title: 'CDL-A Truck Driver Jobs',
    kicker: 'CDL-A · Tractor-Trailer Operations',
    shortDescription:
      'Opportunities for qualified CDL-A drivers interested in professional tractor-trailer driving positions.',
    fullDescription:
      'ProDriver helps Class A Commercial Driver’s License holders explore tractor-trailer opportunities across dry van, reefer, flatbed, and dedicated freight lanes. Submit one streamlined application to share your CDL-A credentials, endorsements, and preferred schedule.',
    image: '/src/assets/images/cdl_a_tractor_trailer_1794614045578.jpg',
    imageAlt: 'American Class 8 CDL-A tractor-trailer semi-truck cruising along a US interstate highway',
    defaultCdlClass: 'A',
    defaultDrivingType: 'Open to Opportunities',
    highlights: [
      'Combination vehicle and tractor-trailer career pathways',
      'Options spanning local, regional, dedicated, and OTR lanes',
      'Opportunities suited for experienced CDL-A professionals and eligible applicants',
      'Direct recruiter review based on your endorsements and location',
    ],
    typicalQualifications: [
      'Valid Class A Commercial Driver’s License (CDL-A)',
      'Compliance with applicable DOT medical card and FMCSA regulations',
      'Applicable tractor-trailer experience depending on the specific opportunity',
      'Clean or qualifying motor vehicle record subject to employer standards',
    ],
    seoTitle: 'CDL-A Truck Driver Jobs & Tractor-Trailer Careers | ProDriver',
    seoDescription:
      'Explore CDL-A truck driver jobs across the USA with ProDriver. Apply online for tractor-trailer driving opportunities or call (888) 445-5423.',
  },
  {
    slug: 'cdl-b-driver-jobs',
    route: '/cdl-opportunities/cdl-b-driver-jobs',
    title: 'CDL-B Truck Driver Jobs',
    kicker: 'CDL-B · Straight & Box Trucks',
    shortDescription:
      'Explore driving opportunities involving straight trucks, box trucks, and other eligible commercial vehicles.',
    fullDescription:
      'Qualified CDL-B commercial drivers can connect with ProDriver to explore commercial driving careers operating straight trucks, box trucks, municipal or commercial delivery vehicles, and regional distribution routes.',
    image: '/src/assets/images/cdl_b_box_truck_1794614046369.jpg',
    imageAlt: 'Modern CDL-B commercial straight box truck parked at a US distribution loading dock',
    defaultCdlClass: 'B',
    defaultDrivingType: 'Local',
    highlights: [
      'Straight truck, box truck, and single commercial vehicle options',
      'Strong fit for drivers seeking local delivery and metro route structures',
      'Full-time, part-time, and flexible arrangement inquiries accepted',
      'Simple online application tailored to Class B credentials',
    ],
    typicalQualifications: [
      'Valid Class B Commercial Driver’s License (CDL-B)',
      'Compliance with DOT physical and FMCSA safety standards',
      'Applicable commercial vehicle experience as specified by each opportunity',
      'Required endorsements such as HazMat or Passenger where applicable',
    ],
    seoTitle: 'CDL-B Truck Driver Jobs & Box Truck Careers | ProDriver',
    seoDescription:
      'Apply for CDL-B truck driver jobs with ProDriver. Explore straight truck, box truck, and commercial delivery driver opportunities across the USA.',
  },
  {
    slug: 'local-truck-driving-jobs',
    route: '/cdl-opportunities/local-truck-driving-jobs',
    title: 'Local Truck Driving Jobs',
    kicker: 'Local Routes · Regular Home Time',
    shortDescription:
      'Explore opportunities that may offer local routes and the possibility of returning home regularly.',
    fullDescription:
      'For commercial drivers prioritizing metro-area routes, short-haul freight, or city-to-city distribution that supports returning home regularly, ProDriver helps you outline your location and schedule preferences in minutes.',
    image: '/src/assets/images/cdl_b_box_truck_1794614046369.jpg',
    imageAlt: 'Commercial delivery truck backed into a local freight distribution terminal bay',
    defaultCdlClass: 'A',
    defaultDrivingType: 'Local',
    highlights: [
      'Short-haul, metro delivery, and local terminal-to-terminal options',
      'Schedule preferences considered during application review',
      'Open to qualified CDL-A and CDL-B drivers',
      'No obligation — discuss available local routes where offered',
    ],
    typicalQualifications: [
      'Valid CDL-A or CDL-B license matching equipment requirements',
      'Familiarity with local commercial delivery and safety procedures',
      'Qualifying driving history under applicable employer policies',
      'Current DOT medical certification',
    ],
    seoTitle: 'Local CDL Truck Driving Jobs in USA | ProDriver',
    seoDescription:
      'Search local CDL driver jobs with ProDriver. Submit one application to explore local truck driving opportunities for CDL-A and CDL-B drivers.',
  },
  {
    slug: 'regional-truck-driving-jobs',
    route: '/cdl-opportunities/regional-truck-driving-jobs',
    title: 'Regional Truck Driving Jobs',
    kicker: 'Regional · Multi-State Corridors',
    shortDescription:
      'Discover regional driving opportunities across designated areas.',
    fullDescription:
      'Regional trucking careers balance consistent multi-state freight corridors with structured geographic boundaries. Share your preferred operating area, CDL class, and freight experience through ProDriver.',
    image: '/src/assets/images/freight_logistics_hub_1794614046912.jpg',
    imageAlt: 'Regional freight logistics terminal yard at twilight with lined commercial semi-trucks',
    defaultCdlClass: 'A',
    defaultDrivingType: 'Regional',
    highlights: [
      'Designated multi-state and regional freight lanes',
      'Consistent corridor operations depending on employer needs',
      'Suitable for experienced CDL-A and eligible CDL-B drivers',
      'Clear discussion of route scope before any commitment',
    ],
    typicalQualifications: [
      'Valid Commercial Driver’s License (typically CDL-A)',
      'Interstate qualification and FMCSA regulatory compliance',
      'Verifiable commercial driving experience where required',
      'Valid driving record subject to carrier criteria',
    ],
    seoTitle: 'Regional Truck Driver Jobs & Interstate Freight Careers | ProDriver',
    seoDescription:
      'Explore regional truck driver jobs across designated US corridors. Apply online with ProDriver for CDL-A and CDL-B regional opportunities.',
  },
  {
    slug: 'otr-truck-driving-jobs',
    route: '/cdl-opportunities/otr-truck-driving-jobs',
    title: 'OTR Truck Driving Jobs',
    kicker: 'Over-the-Road · Long-Distance',
    shortDescription:
      'Explore over-the-road trucking opportunities involving longer-distance routes.',
    fullDescription:
      'Over-the-Road (OTR) truck drivers keep long-haul American supply chains moving coast to coast. ProDriver makes it straightforward to share your long-haul preferences, endorsements, and availability.',
    image: '/src/assets/images/hero_american_semitruck_1794614045854.jpg',
    imageAlt: 'American Class 8 sleeper semi-truck hauling a dry-van trailer across an open western highway',
    defaultCdlClass: 'A',
    defaultDrivingType: 'OTR',
    highlights: [
      'Long-distance interstate freight opportunities across the US',
      'Sleeper-cab combination vehicle career options',
      'Endorsement matching including HazMat, Tanker, and Doubles/Triples',
      'Direct phone support with our recruitment team at (888) 445-5423',
    ],
    typicalQualifications: [
      'Valid Class A CDL eligible for interstate commerce',
      'Full compliance with DOT, ELD, and FMCSA Hours of Service rules',
      'Applicable OTR or tractor-trailer experience per opportunity guidelines',
      'Satisfactory safety and MVR background',
    ],
    seoTitle: 'OTR Truck Driver Jobs & Long-Haul CDL Careers | ProDriver',
    seoDescription:
      'Explore OTR truck driver jobs and long-distance commercial driving careers in the USA with ProDriver. Submit your CDL application today.',
  },
  {
    slug: 'owner-operator-opportunities',
    route: '/cdl-opportunities/owner-operator-opportunities',
    title: 'Owner-Operator Opportunities',
    kicker: 'Independent · Own Commercial Vehicle',
    shortDescription:
      'Explore opportunities for independent truck drivers operating their own commercial vehicles.',
    fullDescription:
      'Independent owner-operators bring both commercial driving expertise and their own equipment. Let ProDriver know about your commercial vehicle setup, preferred lanes, and contract preferences.',
    image: '/src/assets/images/driver_cab_interior_1794614047049.jpg',
    imageAlt: 'Inside view of an American semi-truck cab looking out onto an open US interstate at sunrise',
    defaultCdlClass: 'A',
    defaultDrivingType: 'Owner-Operator',
    highlights: [
      'Independent contract and lease-on inquiry options',
      'Specify local, regional, or OTR lane preferences',
      'Share equipment details in your application comments',
      'Transparent conversation with zero upfront application fees',
    ],
    typicalQualifications: [
      'Valid CDL-A or appropriate commercial license',
      'Compliant commercial tractor or vehicle meeting DOT inspection standards',
      'Active commercial insurance and authority requirements where applicable',
      'Verified commercial operating experience',
    ],
    seoTitle: 'Owner-Operator Trucking Opportunities | ProDriver',
    seoDescription:
      'Independent truck drivers operating their own commercial vehicles can apply online with ProDriver to explore owner-operator trucking opportunities.',
  },
];

export const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'DC',
] as const;

export const CDL_ENDORSEMENTS = [
  { code: 'H', label: 'H — Hazardous Materials (HazMat)' },
  { code: 'N', label: 'N — Tank Vehicle' },
  { code: 'T', label: 'T — Double / Triple Trailers' },
  { code: 'X', label: 'X — Tanker & HazMat Combination' },
  { code: 'P', label: 'P — Passenger Transport' },
  { code: 'S', label: 'S — School Bus' },
  { code: 'None', label: 'No Additional Endorsements' },
] as const;

export const WHY_PRODRIVER_ITEMS = [
  {
    number: '01',
    title: 'Multiple CDL Career Opportunities',
    description:
      'Explore options spanning CDL-A tractor-trailers, CDL-B straight and box trucks, dedicated lanes, and owner-operator paths.',
  },
  {
    number: '02',
    title: 'Simple Driver Application Process',
    description:
      'Share your essential CDL qualifications and route preferences in one concise form without collecting unnecessary sensitive data.',
  },
  {
    number: '03',
    title: 'Opportunities Across Driving Categories',
    description:
      'Filter your career preferences across local, regional, over-the-road (OTR), dedicated, and flexible employment arrangements.',
  },
  {
    number: '04',
    title: 'Driver-Focused Support',
    description:
      'Reach a real recruitment contact directly by phone at (888) 445-5423 or by email whenever you have questions about your application.',
  },
  {
    number: '05',
    title: 'Career Opportunities for Experienced Drivers',
    description:
      'Highlight your commercial driving years, endorsements, and safety history so relevant opportunities can be discussed accurately.',
  },
  {
    number: '06',
    title: 'Convenient Application Assistance',
    description:
      'Apply on desktop or from your mobile cab in minutes, with clear communication on next steps after review.',
  },
] as const;

export const DRIVER_REQUIREMENTS_LIST = [
  {
    title: 'Valid Commercial Driver’s License',
    detail: 'An active, valid CDL issued by your state of residence in good standing.',
  },
  {
    title: 'Appropriate CDL Class (A or B)',
    detail: 'Class A for tractor-trailers and combination vehicles, or Class B for qualifying straight and box trucks.',
  },
  {
    title: 'Applicable Driving Experience',
    detail: 'Verifiable commercial driving experience, depending on the specific opportunity and carrier guidelines.',
  },
  {
    title: 'Valid Driving Record',
    detail: 'A motor vehicle record (MVR) that meets the safety standards of the hiring employer.',
  },
  {
    title: 'Required Endorsements',
    detail: 'HazMat (H), Tanker (N), Doubles/Triples (T), or X endorsements where required by the specific freight type.',
  },
  {
    title: 'DOT & FMCSA Compliance',
    detail: 'Compliance with applicable Department of Transportation medical certification and FMCSA safety regulations.',
  },
  {
    title: 'Position-Specific Qualifications',
    detail: 'Ability to meet the physical, equipment-handling, and scheduling requirements of the specific driving position.',
  },
] as const;

export const DRIVER_BENEFITS_LIST = [
  {
    title: 'Different Route Options',
    description:
      'Explore career paths ranging from metro local deliveries to dedicated regional corridors and coast-to-coast OTR freight.',
  },
  {
    title: 'Flexible Career Opportunities',
    description:
      'Indicate whether you are seeking full-time, part-time, contract, or flexible commercial driving arrangements.',
  },
  {
    title: 'Local & Long-Distance Options',
    description:
      'Choose opportunities aligned with your home-time preferences, whether returning regularly or running extended highway miles.',
  },
  {
    title: 'Opportunities for Professional Growth',
    description:
      'Put your CDL endorsements, specialized equipment experience, and safe driving record to work in roles that fit your background.',
  },
  {
    title: 'Different Employment Arrangements',
    description:
      'Options may include company driver roles as well as independent owner-operator opportunities depending on availability.',
  },
  {
    title: 'Opportunities for Experienced Drivers',
    description:
      'Seasoned CDL-A and CDL-B professionals can communicate their exact years on the road and preferred haul types upfront.',
  },
] as const;

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What types of CDL driver opportunities does ProDriver offer?',
    answer:
      'ProDriver helps commercial drivers explore opportunities across several categories, including CDL-A tractor-trailer positions, CDL-B straight and box truck roles, local delivery routes, regional corridors, over-the-road (OTR) freight, and owner-operator arrangements. Specific availability depends on current employer openings and your location.',
  },
  {
    id: 'faq-2',
    question: 'Do you work with CDL-A and CDL-B drivers?',
    answer:
      'Yes. Both CDL-A and CDL-B drivers are welcome to submit an application. During the application, you can specify your CDL class, issuing state, endorsements, and preferred vehicle or route type.',
  },
  {
    id: 'faq-3',
    question: 'Can I apply without previous trucking experience?',
    answer:
      'Entry-level CDL drivers are welcome to submit their information. While many positions require prior verifiable commercial driving experience, requirements vary by employer and position. Submitting your application allows our team to review your credentials and discuss any suitable options.',
  },
  {
    id: 'faq-4',
    question: 'What information do I need to submit an application?',
    answer:
      'Our initial application only asks for basic contact details (name, phone, email, city, state, ZIP code), general CDL details (CDL class, issuing state, years of experience, endorsements), and your job preferences. For your security, we do not ask for Social Security numbers, full CDL license numbers, or banking information on the initial form.',
  },
  {
    id: 'faq-5',
    question: 'Do you offer local truck driving opportunities?',
    answer:
      'You can select "Local" as your preferred driving type on the application form. Availability of local routes and home-time schedules varies depending on your geographic area and specific employer requirements.',
  },
  {
    id: 'faq-6',
    question: 'Are regional and OTR opportunities available?',
    answer:
      'Yes, drivers interested in regional or over-the-road (OTR) routes can indicate those preferences in Step 3 of our application. Our team reviews your experience and preferences against available opportunities.',
  },
  {
    id: 'faq-7',
    question: 'How long does the application process take?',
    answer:
      'Completing the online ProDriver application typically takes only a few minutes. Review timelines vary depending on application volume and specific opportunity requirements, and you are always welcome to call us directly at (888) 445-5423.',
  },
  {
    id: 'faq-8',
    question: 'Can owner-operators apply?',
    answer:
      'Yes. Independent drivers who operate their own commercial vehicles can choose "Owner-Operator" under Preferred Driving Type and share any relevant vehicle or authority details in the comments section.',
  },
  {
    id: 'faq-9',
    question: 'How can I contact ProDriver?',
    answer:
      'You can reach ProDriver directly by phone at (888) 445-5423, by email at iwebnext.com@gmail.com, or by submitting a message through our Contact Us form.',
  },
  {
    id: 'faq-10',
    question: 'Is there a fee to submit an application?',
    answer:
      'No. Submitting a CDL driver application or contacting ProDriver about trucking career opportunities is completely free for drivers.',
  },
];

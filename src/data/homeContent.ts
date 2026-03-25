// src/data/homeContent.ts
// Single source of truth for all home page content.
// Update content here without touching component markup.

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  { value: 300, suffix: '+', label: 'Completed Projects' },
  { value: 100, suffix: '+', label: 'Satisfied Clients' },
  { value: 10,  suffix: '+', label: 'Years Experience' },
  { value: 150, suffix: '',  label: 'Team Members' },
];

// ---------------------------------------------------------------------------
// Services / Industries
// ---------------------------------------------------------------------------

export interface ServiceCard {
  title: string;
  description: string;
  bullets: string[];
  iconPath: string; // SVG `d` attribute string, 24x24 viewBox
}

export const services: ServiceCard[] = [
  {
    title: 'Customer Support',
    description:
      'Dedicated agents who handle inquiries, resolve issues, and represent your brand with professionalism and care.',
    bullets: [
      'Inbound & outbound call handling',
      'Live chat and email support',
      'CRM updates and ticket management',
    ],
    iconPath:
      'M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z',
  },
  {
    title: 'Sales',
    description:
      'Driven sales support professionals who qualify leads, manage pipelines, follow up with prospects, and help close more deals.',
    bullets: [
      'Lead qualification and follow-up',
      'Pipeline and CRM management',
      'Appointment setting and outreach',
    ],
    iconPath:
      'M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941',
  },
  {
    title: 'Healthcare',
    description:
      'HIPAA-aware support staff who handle patient scheduling, insurance verification, and administrative workflows with confidentiality.',
    bullets: [
      'Patient scheduling and reminders',
      'Insurance verification support',
      'HIPAA-compliant documentation',
    ],
    iconPath:
      'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z',
  },
  {
    title: 'Real Estate',
    description:
      'Skilled virtual assistants who manage listings, coordinate showings, handle client follow-ups, and keep your transactions on track.',
    bullets: [
      'Listing management and MLS updates',
      'Showing coordination and follow-up',
      'Transaction tracking and paperwork',
    ],
    iconPath:
      'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25',
  },
  {
    title: 'Legal',
    description:
      'Detail-oriented legal assistants who draft correspondence, manage calendars, conduct research, and keep your practice running smoothly.',
    bullets: [
      'Drafting and proofreading documents',
      'Calendar and deadline management',
      'Legal research and case organization',
    ],
    iconPath:
      'M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.589-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.589-1.202L5.25 4.971Z',
  },
  {
    title: 'Tech Support',
    description:
      'Technical specialists who troubleshoot issues, manage help desks, and provide first- and second-level support for your customers.',
    bullets: [
      'Tier 1 & 2 help desk support',
      'Troubleshooting and issue resolution',
      'Ticket routing and escalation',
    ],
    iconPath:
      'M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3',
  },
];

// ---------------------------------------------------------------------------
// Value Propositions
// ---------------------------------------------------------------------------

export const valuePropItems: string[] = [
  'Simplified Hiring',
  'IRS Compliance',
  'Bilingual Talent',
  'Full Contract Management',
  'Flexible Payroll Options',
  'Customized Roles',
];

// ---------------------------------------------------------------------------
// Process Steps
// ---------------------------------------------------------------------------

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: 'Understanding Your Needs',
    description:
      'We start with a discovery call to learn your business, workflows, and the exact support you need — so we match you with the right professional from day one.',
  },
  {
    step: 2,
    title: 'Pre-Qualified Candidates',
    description:
      'We tap into our vetted pool of Latin American professionals and hand-select candidates that match your role requirements, schedule, and communication style.',
  },
  {
    step: 3,
    title: 'Client Selection',
    description:
      'You interview and choose your preferred candidate. We facilitate structured introductions so you can make a confident decision with no pressure.',
  },
  {
    step: 4,
    title: 'Quick Onboarding',
    description:
      'Your new team member is up and running in days — not weeks. We handle contracts, IRS compliance, payroll setup, and initial training on your behalf.',
  },
  {
    step: 5,
    title: 'Boost Productivity',
    description:
      'With your VA fully integrated into your team, you reclaim your time and focus on growth. We provide ongoing support to ensure the relationship stays strong.',
  },
];

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  initials: string;
  image: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'WorkWiser transformed our patient scheduling process. Our VA handles over 200 appointments a week, freeing our nurses to focus entirely on patient care. The onboarding was seamless.',
    name: 'Client Name',
    title: 'Healthcare Practice Owner',
    initials: 'CN',
    image: '/images/testimonial-1.jpg',
  },
  {
    quote:
      'Within two weeks my WorkWiser VA was managing all my listings, client follow-ups, and transaction paperwork. I\'ve been able to focus on closing deals instead of admin work.',
    name: 'Client Name',
    title: 'Real Estate Broker',
    initials: 'CN',
    image: '/images/testimonial-2.jpg',
  },
  {
    quote:
      'Finding bilingual tech support talent used to take us months. WorkWiser placed a qualified specialist in 10 days who hit the ground running and immediately reduced our ticket backlog.',
    name: 'Client Name',
    title: 'Tech Company CEO',
    initials: 'CN',
    image: '/images/testimonial-3.jpg',
  },
];

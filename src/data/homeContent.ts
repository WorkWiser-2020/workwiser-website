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
  iconPath: string; // SVG `d` attribute string, 24x24 viewBox
}

export const services: ServiceCard[] = [
  {
    title: 'Customer Support',
    description:
      'Dedicated agents who handle inquiries, resolve issues, and represent your brand with professionalism and care.',
    iconPath:
      'M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z',
  },
  {
    title: 'Real Estate',
    description:
      'Skilled virtual assistants who manage listings, coordinate showings, handle client follow-ups, and keep your transactions on track.',
    iconPath:
      'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25',
  },
  {
    title: 'Healthcare',
    description:
      'HIPAA-aware support staff who handle patient scheduling, insurance verification, and administrative workflows with confidentiality.',
    iconPath:
      'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z',
  },
  {
    title: 'Tech Support',
    description:
      'Technical specialists who troubleshoot issues, manage help desks, and provide first- and second-level support for your customers.',
    iconPath:
      'M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3',
  },
  {
    title: 'Sales',
    description:
      'Driven sales support professionals who qualify leads, manage pipelines, follow up with prospects, and help close more deals.',
    iconPath:
      'M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941',
  },
  {
    title: 'Legal',
    description:
      'Detail-oriented legal assistants who draft correspondence, manage calendars, conduct research, and keep your practice running smoothly.',
    iconPath:
      'M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.589-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.589-1.202L5.25 4.971Z',
  },
];

// ---------------------------------------------------------------------------
// Value Propositions
// ---------------------------------------------------------------------------

export interface ValueProp {
  title: string;
  description: string;
  iconPath: string; // SVG `d` attribute string, 24x24 viewBox
}

export const valueProps: ValueProp[] = [
  {
    title: 'Simplified Hiring',
    description:
      'Skip the lengthy recruitment process. We pre-screen, vet, and match talent to your exact role requirements — you meet only ready-to-start candidates.',
    iconPath:
      'M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  },
  {
    title: 'IRS Compliance',
    description:
      'Our nearshore model is structured to keep your business fully compliant — no contractor misclassification risk, no payroll tax exposure.',
    iconPath:
      'M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z',
  },
  {
    title: 'Full Contract Management',
    description:
      'From offer letter to ongoing agreements, we handle the paperwork so you can focus on the work — not the administration.',
    iconPath:
      'M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z',
  },
  {
    title: 'Customized Roles',
    description:
      'Every business is different. We work with you to define the exact skill set, schedule, and scope your team needs — no one-size-fits-all packages.',
    iconPath:
      'M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
  },
  {
    title: 'Bilingual Talent',
    description:
      'Access a pool of English–Spanish bilingual professionals who can seamlessly serve your customers in both languages.',
    iconPath:
      'M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802',
  },
  {
    title: 'Flexible Payroll Options',
    description:
      'Choose hourly, part-time, or full-time engagements with payment structures that scale to your budget and business rhythm.',
    iconPath:
      'M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z',
  },
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
      'We start with a discovery call to learn your business, the roles you need to fill, and the qualities that matter most to you.',
  },
  {
    step: 2,
    title: 'Pre-Qualified Candidates',
    description:
      'Our talent team sources and screens candidates against your criteria — skills, experience, language, and cultural fit.',
  },
  {
    step: 3,
    title: 'Client Selection',
    description:
      'You review the top candidates, conduct interviews, and choose the person who feels like the right addition to your team.',
  },
  {
    step: 4,
    title: 'Quick Onboarding',
    description:
      'We handle contracts, equipment, and orientation so your new team member is productive from day one — typically within two weeks.',
  },
  {
    step: 5,
    title: 'Boost Productivity',
    description:
      'Your VA integrates with your workflows and tools, freeing you to focus on high-value work while they handle the rest.',
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
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'WorkWiser found us an exceptional customer support specialist in under two weeks. She integrated with our team immediately and our CSAT scores jumped within the first month. I wish we had made this move sooner.',
    name: 'Rachel Thornton',
    title: 'Operations Director, BrightPath Consulting',
    initials: 'RT',
  },
  {
    quote:
      'As a real estate team, we needed someone who could juggle listing coordination, client follow-ups, and transaction paperwork without missing a beat. Our WorkWiser VA handles all three flawlessly — and she is bilingual, which opened up a whole new client segment for us.',
    name: 'Marcus Delgado',
    title: 'Broker-Owner, Crestview Realty Group',
    initials: 'MD',
  },
  {
    quote:
      "The onboarding process was remarkably smooth. WorkWiser took care of compliance, contracts, and equipment — we just showed up for the intro call. Our tech support VA has been running our help desk for six months now and we couldn't imagine operating without her.",
    name: 'Samantha Okafor',
    title: 'CEO, NovaSphere Technologies',
    initials: 'SO',
  },
];

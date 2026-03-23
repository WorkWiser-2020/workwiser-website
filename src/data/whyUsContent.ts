// src/data/whyUsContent.ts
// Single source of truth for all Why Us page content.
// Update content here without touching component markup.

// ---------------------------------------------------------------------------
// Differentiators
// ---------------------------------------------------------------------------

export interface Differentiator {
  title: string;
  description: string;
  iconPath: string; // SVG `d` attribute string, 24x24 viewBox
}

export const differentiators: Differentiator[] = [
  {
    title: 'Tailored Approach',
    description:
      'We take the time to understand your unique business needs, culture, and goals before presenting any candidates. Every placement is custom-matched — not pulled from a generic database — ensuring you get a professional who truly fits your team.',
    iconPath:
      'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
  },
  {
    title: 'Extensive Expertise',
    description:
      'With years of experience placing virtual professionals across industries — including customer support, healthcare, real estate, sales, legal, and tech — our team brings deep domain knowledge to every search. We know what great talent looks like in your field.',
    iconPath:
      'M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5',
  },
  {
    title: 'Thorough Screening Process',
    description:
      'Every candidate goes through a rigorous multi-stage evaluation: skills testing, English proficiency assessment, behavioral interviews, and background verification. You only meet candidates we are confident can deliver results from day one.',
    iconPath:
      'M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  },
  {
    title: 'Confidentiality and Privacy',
    description:
      'We treat every client engagement and candidate profile with the highest level of discretion. Your business information, hiring plans, and candidate data are kept strictly confidential throughout the entire recruitment process.',
    iconPath:
      'M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z',
  },
  {
    title: 'Continuous Support',
    description:
      'Our relationship does not end at placement. We provide ongoing support to both clients and virtual assistants to ensure the partnership thrives long-term. From onboarding guidance to performance check-ins, we are with you every step of the way.',
    iconPath:
      'M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z',
  },
  {
    title: 'Time and Cost Efficiency',
    description:
      'Hiring through WorkWiser dramatically reduces the time and cost of building your team. Our streamlined process, pre-vetted talent pipeline, and nearshore rates mean you get top-quality professionals faster and at a fraction of traditional recruitment costs.',
    iconPath:
      'M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  },
];

// ---------------------------------------------------------------------------
// Recruitment Steps
// ---------------------------------------------------------------------------

export const recruitmentSteps: string[] = [
  'Client consultation',
  'Job analysis and position profiling',
  'Candidate sourcing',
  'Screening and presentation',
  'Skill assessment and testing',
  'Candidate presentation',
  'Client interviews',
  'Client management',
];

// ---------------------------------------------------------------------------
// FAQs
// ---------------------------------------------------------------------------

export interface FAQ {
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    question: 'What is a virtual assistant?',
    answer:
      'A virtual assistant (VA) is a skilled remote professional who handles a wide range of business tasks — from administrative work and customer support to sales assistance and specialized functions like healthcare scheduling or legal research. VAs work remotely but are fully integrated into your team, communicating and collaborating during your business hours just like an in-office employee.',
  },
  {
    question: 'How does WorkWiser screen its candidates?',
    answer:
      'Every WorkWiser candidate goes through a multi-stage screening process that includes a skills assessment tailored to their specialty, an English proficiency evaluation, a structured behavioral interview, and a background check. We only present candidates we are confident can deliver results from their very first day on the job.',
  },
  {
    question: 'What industries do you serve?',
    answer:
      'WorkWiser places virtual professionals across a broad range of industries, including customer support, sales, healthcare, real estate, legal, and technology. If your industry is not listed, reach out — our diverse talent pool means we can often find the right fit for specialized or niche roles as well.',
  },
  {
    question: 'How quickly can I get started?',
    answer:
      'Most clients receive their first candidate presentations within 5 to 10 business days of completing an initial consultation. The overall timeline depends on the complexity of the role and your specific requirements, but our pre-vetted talent pipeline means we move quickly without sacrificing quality.',
  },
  {
    question: 'What time zones do your virtual assistants work?',
    answer:
      'Our talent is based in Central America, which means they naturally overlap with North American business hours — covering Eastern, Central, Mountain, and Pacific time zones without requiring unusual schedules. Your VA is available during your workday, enabling real-time collaboration and responsive communication.',
  },
  {
    question: 'How does billing work?',
    answer:
      'WorkWiser offers flexible billing arrangements based on hourly rates, with packages designed to suit both part-time and full-time engagements. You will receive transparent invoicing and clear breakdowns of hours worked. Contact us to discuss the arrangement that best fits your budget and workload.',
  },
  {
    question: 'Can I scale my team up or down?',
    answer:
      'Yes — flexibility is one of the core advantages of working with WorkWiser. You can add team members as your business grows, reduce hours during slower periods, or adjust the scope of your VA\'s responsibilities as your needs evolve. We make scaling simple and low-friction.',
  },
  {
    question: 'What if I am not satisfied with my virtual assistant?',
    answer:
      'Your satisfaction is our priority. If a placement is not working out, let us know and we will work quickly to understand the issue and find a better match. We provide ongoing support throughout every engagement and stand behind every placement we make.',
  },
];

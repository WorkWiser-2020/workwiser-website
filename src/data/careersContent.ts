// src/data/careersContent.ts
// Single source of truth for all Careers page content — CAREER-01, CAREER-02

export interface CareersFormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'url' | 'select' | 'textarea';
  required: boolean;
  half: boolean;
  options?: string[];     // only for type === 'select'
  placeholder?: string;
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export const careersHero = {
  badge: 'Now Hiring',
  headline: 'Join the WorkWiser Team',
  subtitle:
    "We're looking for motivated, bilingual professionals ready to make an impact for US-based clients. Work remotely, grow your career, and be part of a team that values excellence.",
};

// ---------------------------------------------------------------------------
// Dropdown option sets
// ---------------------------------------------------------------------------

export const roleOptions: string[] = [
  'Customer Support',
  'Real Estate',
  'Healthcare',
  'Tech Support',
  'Sales',
  'Legal',
  'Other',
];

export const experienceOptions: string[] = [
  'Less than 1 year',
  '1–2 years',
  '3–5 years',
  '5+ years',
];

// ---------------------------------------------------------------------------
// Form fields (8 fields)
// Required: fullName, email, role
// half: true pairs render side-by-side in a 2-column grid
// ---------------------------------------------------------------------------

export const careersFormFields: CareersFormField[] = [
  {
    id: 'fullName',
    label: 'Full Name',
    type: 'text',
    required: true,
    half: true,
  },
  {
    id: 'email',
    label: 'Email Address',
    type: 'email',
    required: true,
    half: true,
  },
  {
    id: 'phone',
    label: 'Phone Number',
    type: 'tel',
    required: false,
    half: true,
  },
  {
    id: 'location',
    label: 'Location',
    type: 'text',
    required: false,
    half: true,
    placeholder: 'Country',
  },
  {
    id: 'role',
    label: 'Role of Interest',
    type: 'select',
    required: true,
    half: false,
    options: roleOptions,
  },
  {
    id: 'experience',
    label: 'Years of Experience',
    type: 'select',
    required: false,
    half: false,
    options: experienceOptions,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn Profile or Resume URL',
    type: 'url',
    required: false,
    half: false,
    placeholder: 'LinkedIn profile or resume URL',
  },
  {
    id: 'coverMessage',
    label: 'Cover Message',
    type: 'textarea',
    required: false,
    half: false,
    placeholder: 'Tell us a little about yourself and why you want to join WorkWiser.',
  },
];

// ---------------------------------------------------------------------------
// Benefits (3 items for "Why Work With WorkWiser?" section)
// ---------------------------------------------------------------------------

export const careersBenefits: string[] = [
  'Flexible remote work from Latin America — no relocation, no commute',
  'Grow your career serving US-based clients with structured onboarding and ongoing support',
  'Join a collaborative team culture where your bilingual skills are a valued asset',
];

// src/data/contactContent.ts
// Single source of truth for all contact page content.
// Update content here without touching component markup.

// ---------------------------------------------------------------------------
// Stats
// ---------------------------------------------------------------------------

export interface ContactStat {
  value: number;
  suffix: string;
  label: string;
}

export const contactStats: ContactStat[] = [
  { value: 100, suffix: '+', label: 'Satisfied Clients' },
  { value: 300, suffix: '+', label: 'Projects Completed' },
  { value: 10,  suffix: '+', label: 'Years Experience' },
  { value: 150, suffix: '',  label: 'Team Members' },
];

// ---------------------------------------------------------------------------
// Contact Info
// ---------------------------------------------------------------------------

export const contactInfo = {
  phone: '(302) 257-5427',
  email: 'info@workwiser.io',
  calendlyUrl: 'https://calendly.com/workwiser-info/ceo-client',
};

// ---------------------------------------------------------------------------
// Form Fields
// ---------------------------------------------------------------------------

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'textarea';
  required: boolean;
  half: boolean;
}

export const formFields: FormField[] = [
  { id: 'firstName',  label: 'First Name',             type: 'text',     required: false, half: true  },
  { id: 'lastName',   label: 'Last Name',              type: 'text',     required: false, half: true  },
  { id: 'jobTitle',   label: 'Job Title',              type: 'text',     required: false, half: true  },
  { id: 'company',    label: 'Company Name',           type: 'text',     required: false, half: true  },
  { id: 'email',      label: 'Email',                  type: 'email',    required: true,  half: true  },
  { id: 'location',   label: 'Location of Operations', type: 'text',     required: true,  half: true  },
  { id: 'message',    label: 'Message',                type: 'textarea', required: false, half: false },
];

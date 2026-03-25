// src/data/caseStudies.ts
// Single source of truth for case study content.
// Add a new object to the caseStudies array to render a new card automatically.

// ---------------------------------------------------------------------------
// CaseStudy Interface
// ---------------------------------------------------------------------------

export interface CaseStudy {
  id: string;        // slug-safe identifier
  industry: string;  // e.g. "Healthcare"
  companyName: string;
  roleType: string;  // e.g. "Medical Administrative VA"
  challenge: string; // 1-2 sentences describing the business problem
  outcome: string;   // 1-2 sentences describing the result
  outcomeStat: string; // short metric, e.g. "Saved 30 hrs/week"
  iconPath: string;  // SVG d-attribute for 24x24 viewBox (stroke-based Heroicon)
}

// ---------------------------------------------------------------------------
// Case Studies Data
// ---------------------------------------------------------------------------

export const caseStudies: CaseStudy[] = [
  {
    id: 'healthcare-admin',
    industry: 'Healthcare',
    companyName: 'Meridian Medical Group',
    roleType: 'Medical Administrative VA',
    challenge:
      'Front-desk staff were spending 30+ hours per week on appointment scheduling, insurance verification, and patient follow-up calls — pulling clinical staff away from direct patient care.',
    outcome:
      'A dedicated WorkWiser VA absorbed all scheduling and follow-up coordination, freeing the clinical team to focus on patients. No-show rates fell by 40% within the first 60 days.',
    outcomeStat: 'Saved 30 hrs/week',
    // Heroicons outline: heart
    iconPath:
      'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z',
  },
  {
    id: 'real-estate-transaction',
    industry: 'Real Estate',
    companyName: 'Bayside Property Group',
    roleType: 'Real Estate Transaction VA',
    challenge:
      'A solo agent closing 15+ deals per month was drowning in transaction paperwork and CRM updates, causing missed deadlines and slow lead follow-up that was costing closings.',
    outcome:
      'A WorkWiser VA took over all transaction coordination and CRM maintenance, giving the agent back the time to focus exclusively on client relationships — resulting in a 25% increase in closed deals without adding in-house staff.',
    outcomeStat: '25% more closes',
    // Heroicons outline: building-office
    iconPath:
      'M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21',
  },
  {
    id: 'tech-support-l1',
    industry: 'Tech Support',
    companyName: 'ClearPath Technologies',
    roleType: 'Level 1 Tech Support VA',
    challenge:
      'Engineers were fielding 200+ repetitive Level 1 support tickets per week, pulling senior developers away from product work and creating a costly bottleneck in the support queue.',
    outcome:
      'A WorkWiser VA team handled all L1 triage and resolution, escalating only 12% of tickets to engineering. Developers reclaimed 20 hours per week each, and average ticket resolution time dropped by half.',
    outcomeStat: '88% tickets resolved',
    // Heroicons outline: computer-desktop
    iconPath:
      'M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0H3',
  },
  {
    id: 'customer-support',
    industry: 'Customer Support',
    companyName: 'Nexus Logistics Co.',
    roleType: 'Customer Support VA',
    challenge:
      "Customer satisfaction scores were declining due to slow response times — the average first response was taking over 6 hours, leading to frustrated clients and an increase in churn.",
    outcome:
      'WorkWiser VAs cut the average first response time to under 45 minutes and brought consistent, professional tone to every interaction. CSAT scores climbed from 71% to 94% within 60 days of onboarding.',
    outcomeStat: 'CSAT: 71% to 94%',
    // Heroicons outline: chat-bubble-left-ellipsis
    iconPath:
      'M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z',
  },
];

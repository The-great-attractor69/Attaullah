import { PortfolioData, ThemeConfig } from '../types/portfolio';

export const ATTA_ULLAH_PORTFOLIO: PortfolioData = {
  name: 'Atta Ullah',
  headline: 'Atta, data analyst and quality auditor.',
  bio: "I turn audit findings and production data into clear, decision-ready reporting. With 4+ years across ISO quality auditing and Power BI and Excel analytics, I bring an auditor's rigor to data and a designer's clarity to compliance.",
  location: 'Pakistan',
  experienceYears: '4+ years',
  languages: [
    'Sindhi (native)',
    'Urdu (fluent)',
    'English (professional)',
    'Passive understanding of Seraiki and Punjabi',
  ],
  positioning:
    'Dual expertise in quality auditing (QMS) and data reporting. The combination is the differentiator.',
  email: 'attaullahkhokhar23@gmail.com',
  socials: {
    linkedin: 'https://linkedin.com/in/atta-ullah-k',
    upwork: 'https://www.upwork.com/freelancers/~0121b4fb3247607da6?mp_source=share',
    github: 'https://the-great-attractor69.github.io',
    x: 'https://x.com/4AttaUllah',
    instagram: 'https://www.instagram.com/talha.the.terrible',
  },
  stats: [
    {
      figure: '20+',
      description: 'Power BI dashboards built',
      detail: 'KPI cards, custom themes, QMS tracking & executive summaries',
    },
    {
      figure: '30+',
      description: 'Excel dashboards & reporting systems built',
      detail: 'Buffer sheet architectures, Named Ranges, dynamic formula arrays',
    },
    {
      figure: '8',
      description: 'Internal audit rounds completed',
      detail: 'Rigorous rounds spanning ISO 9001:2015 and ISO 45001 standards',
    },
    {
      figure: '17',
      description: 'Departments audited',
      detail:
        'HR, Admin, Security, Payroll, Warehouse, QA/QC, IQC, IT, Health and Safety, Process Engineering, Equipment Engineering, Maintenance, Production',
    },
    {
      figure: '4+',
      description: 'Years of professional experience',
      detail: 'Cross-functional quality assurance, compliance engineering & business intelligence',
    },
  ],
  departmentsAudited: [
    'HR',
    'Admin',
    'Security',
    'Payroll',
    'Warehouse',
    'QA/QC',
    'IQC',
    'IT',
    'Health and Safety',
    'Process Engineering',
    'Equipment Engineering',
    'Maintenance',
    'Production',
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'TPE QMS Compliance Audit Dashboard',
      subtitle: 'Audit findings log converted to decision-ready visibility',
      year: '2026',
      clientContext: 'TPE / QMS Quality Operations',
      problem:
        'Audit findings lived in a spreadsheet log, making overdue items and department progress hard to see.',
      whatWasBuilt: [
        'KPI cards for Major NC, Minor NC, and Observations',
        'Overdue deadline tracking per department and progress over time',
        'Filters for Department, Severity (5 classes: Minor NC, Major NC, Observation, Verification, Gap), and Quarter',
        'Three-column findings panel: Finding, Departmental Remarks, QMS Remarks with collapsible long remarks',
        'Automated "Data refreshed" timestamp and soft claymorphism theme (soft blue accent, rounded cards)',
        'Circulated to management and stakeholders via Outlook twice a week',
      ],
      tools: ['Power BI', 'DAX', 'QMS Compliance', 'Outlook Automation'],
      outcome:
        'Replaced daily manual reporting with a clear executive dashboard circulated to stakeholders twice a week.',
      linkText: 'No public link (available on request)',
      dataSnippet: 'Data: Audit Findings Log with reference IDs (AUD-Dept-Q3-n) across 5 severity classes.',
    },
    {
      id: 'proj-2',
      title: 'PPM Quality Dashboard',
      subtitle: 'Decision-ready defect analytics for an international manufacturing client',
      year: '2026',
      clientContext: 'International Client (delivered via Upwork)',
      problem:
        'Client needed to track defect rates by product, process step, and lot in a clean, decision-ready format.',
      whatWasBuilt: [
        'Overall PPM card, total scrap, and total production volume cards',
        'PPM by quarter and by year, alongside a weekly PPM trend line',
        'Top five defects by PPM as a pie chart with monthly breakdown by defect type',
        'Scrap decomposition tree to drill down into root causes and scrap contributors',
        'Interactive slicers for Step Name, Product, Process Group, Lot ID, and Week Number',
      ],
      tools: ['Power BI', 'Upwork Delivery', 'DPPM Analytics', 'Scrap Decomposition'],
      outcome:
        'Delivered root-cause defect tracking across multi-stage manufacturing lines for international management.',
      linkText: 'No public link (available on request)',
    },
    {
      id: 'proj-3',
      title: 'IQC Defect Tracking & Supplier Feedback Automation',
      subtitle: 'Buffer sheet architecture eliminating #REF! link failures',
      year: '2026',
      clientContext: 'SKD/CKD Electronics Assembly Plant (Feature Phones)',
      problem:
        'Recurring #REF! errors caused by external network link breakages and tedious manual collation of photos for supplier claims.',
      whatWasBuilt: [
        'Centralized Excel buffer sheet (data_pull) feeding four isolated supplier feedback files',
        'SUMIFS with Named Ranges, resolving external link breakage on local network servers',
        'TEXTJOIN, FILTER, and UNIQUE formulas dynamically pulling defect descriptions from SKD reports',
        'Python automation script that systematically attaches component photos to IQC defect records',
      ],
      tools: ['Advanced Excel', 'Python Scripting', 'Named Ranges', 'Buffer Architecture'],
      outcome:
        'Eliminated server link breakage completely and automated photo-verified supplier feedback claims.',
      linkText: 'No public link (available on request)',
    },
    {
      id: 'proj-4',
      title: 'FPY Reporting Tools & Category Mapping',
      subtitle: 'First Pass Yield workbook fixing formula inflation bug',
      year: '2026',
      clientContext: 'Bike Manufacturing Operation',
      problem:
        'Defect categorization drift and a critical defect quantity inflation bug caused by summing contribution percentages across sessions before multiplying.',
      whatWasBuilt: [
        'Four-sheet workbook with keyword-based defect categorization across ten categories',
        'Maintainable mapping table allowing shop-floor coworkers to update categories without altering formulas',
        'Color-coded management summary dashboards',
        'Found and fixed mathematical inflation bug in legacy session aggregation',
      ],
      tools: ['Excel Advanced', 'FPY Modeling', 'Mapping Tables', 'Mathematical Auditing'],
      outcome:
        'Restored accurate yield metrics and enabled team members to update categories independently.',
      linkText: 'No public link (available on request)',
    },
    {
      id: 'proj-5',
      title: 'Procurement Gap Analysis & SOP Standardization',
      subtitle: 'Standardized SOP template with three-part QMS control block',
      year: '2026',
      clientContext: 'Manufacturing Operations & Procurement',
      problem:
        'Local purchase SOP was outdated and lacked modern QMS alignment, revision history, and formal approval control.',
      whatWasBuilt: [
        'Detailed comparison of local purchase SOP against newer procurement standard in structured Excel workbook',
        'Standardized SOP template (Century Gothic, blue header) with three-part QMS control block',
        'Integrated formal approval grid and structured revision history table',
      ],
      tools: ['Excel', 'QMS SOP Architecture', 'ISO 9001 Compliance', 'Gap Matrix'],
      outcome:
        'Delivered complete gap closure and institutionalized standard operating procedure governance.',
      linkText: 'No public link (available on request)',
    },
    {
      id: 'proj-7',
      title: 'ISO 9001:2015 & ISO 45001 Internal Audit Program',
      subtitle: 'Cross-functional verification across 17 departments',
      year: '2026',
      clientContext: 'SKD/CKD Feature Phone Assembly Plant',
      problem:
        'Discrepancies between formal documentation and shop-floor practice across manufacturing and administrative functions.',
      whatWasBuilt: [
        'Shop-floor verification of job descriptions against daily practices and comprehensive SOP reviews',
        'Addressed missing or overlapping job descriptions and missing core SOPs across departments',
        'Eliminated obsolete model-specific checklists and closed scrap control gaps on high-value components',
        'Aligned security and HSE scope to meet statutory and ISO 45001 standards',
      ],
      tools: ['ISO 9001:2015', 'ISO 45001', 'NCR Drafting', 'CAPA Planning'],
      outcome:
        'Conducted 8 comprehensive audit rounds covering 17 departments with formal NCR citations and CAPA follow-up.',
      linkText: 'No public link (available on request)',
    },
  ],
  skills: [
    {
      category: 'Data & Reporting',
      skills: [
        {
          name: 'Power BI',
          detail: 'Dashboards, KPI cards, filters, custom visuals, claymorphism themes, DAX',
        },
        {
          name: 'Advanced Excel',
          detail:
            'XLOOKUP, VLOOKUP, INDEX+MATCH, SUMIFS, TEXTJOIN, FILTER, UNIQUE, Named Ranges, buffer sheet architecture, formula auditing',
        },
        {
          name: 'Dashboard Design',
          detail: 'Executive management reporting, decision-ready data density, trend analysis',
        },
        {
          name: 'Python',
          detail: 'Automation scripting, automated file & image attachment to defect records',
        },
      ],
    },
    {
      category: 'Quality & Compliance',
      skills: [
        {
          name: 'ISO 9001:2015 & ISO 45001',
          detail: 'Internal auditing across manufacturing and administrative processes',
        },
        {
          name: 'NCR Writing & CAPA Planning',
          detail: 'Clause citations, corrective and preventive action root-cause plans',
        },
        {
          name: 'SOP & QMS Document Architecture',
          detail: 'Standardized templates, gap analysis, revision master lists, control blocks',
        },
        {
          name: 'Manufacturing Quality Metrics',
          detail: 'IQC, FPY (First Pass Yield), and DPPM (Defective Parts Per Million) reporting',
        },
      ],
    },
    {
      category: 'Domain Context',
      skills: [
        {
          name: 'SKD/CKD Electronics Assembly',
          detail: 'Feature phone assembly, component batch tracking, cleanroom standards',
        },
        {
          name: 'Supplier Quality Feedback',
          detail: 'IQC defect reporting, photo documentation, claim verification logs',
        },
        {
          name: 'Manufacturing Operations',
          detail: 'Scrap control, equipment maintenance logs, health & safety compliance',
        },
      ],
    },
  ],
  experience: [
    {
      role: 'Document controller & Data Analyst',
      organization: 'An SKD/CKD electronics assembly plant producing feature phones',
      dates: '2021 to Present',
      bullets: [
        'Conducts ISO 9001:2015 and ISO 45001 internal audits, drafting NCRs with clause citations and CAPA plans for management.',
        'Builds Power BI dashboards and Excel reporting systems for quality and production data.',
        'Develops advanced Excel formulas and automation for rejection tracking and supplier feedback.',
        'Creates and standardizes QMS documents, including SOP/SIP templates.',
        'Maintains document revisions / Master Lists and availability across plant operations.',
        'Identifies operational gaps and initiates continuous quality improvements.',
      ],
    },
    {
      role: 'Contract Data Analyst & QMS Specialist',
      organization: 'Independent Advisory Services',
      dates: '2023 to Present',
      bullets: [
        'Delivered a PPM (Parts per million) dashboard in Power BI for an international manufacturing client.',
        'Developed a comprehensive organizational chart for a client, aligning team structures with core business goals.',
        'Designed and drafted client security protocols, mitigating organizational risks and formalizing internal safety procedures.',
        'Delivered four Project Catalog services for enterprise clients.',
      ],
    },
  ],
  availability: {
    badge: 'OPEN TO WORK',
    headline: 'Available for freelance dashboards, audits and reporting systems.',
    timeframe: '[8:00 AM to 5:00 PM]',
    timezone: 'PKT (UTC+5)',
    preferredEngagements: [
      'Power BI and Excel dashboards',
      'Advanced Excel formulas and automation',
      'ISO 9001:2015 QMS auditing',
      'QMS document creation/revision',
    ],
    locationLine: 'Based in Pakistan (worldwide remote)',
  },
  statement: {
    eyebrow: 'DESIGN PHILOSOPHY AND APPROACH',
    quote: 'Tools are secondary. Clarity is the standard.',
    supportingText:
      'Every report is a decision waiting to be made. When data is structured with intentional restraint, compliance stops feeling like paperwork and becomes clear direction.',
    signatureLine: 'Atta Ullah, Data Analyst and Quality Professional · Pakistan',
  },
};

export const MONOLITH_THEMES: Record<string, ThemeConfig> = {
  amber: {
    id: 'amber',
    name: 'Amber Salt',
    crystalColor: 0xe87a42,
    innerGlowColor: 0xffa040,
    lightColor: 0xff8c40,
    rimColor: 0xffdfaa,
    accentHex: '#d97736',
  },
  rosequartz: {
    id: 'rosequartz',
    name: 'Rose Quartz',
    crystalColor: 0xe0728c,
    innerGlowColor: 0xff99bb,
    lightColor: 0xff7799,
    rimColor: 0xffd5e0,
    accentHex: '#d8587d',
  },
  emerald: {
    id: 'emerald',
    name: 'Auroral Jade',
    crystalColor: 0x2e9b72,
    innerGlowColor: 0x48e5a3,
    lightColor: 0x36cf8e,
    rimColor: 0xabffd8,
    accentHex: '#2ba875',
  },
  obsidian: {
    id: 'obsidian',
    name: 'Obsidian Magma',
    crystalColor: 0xc8421e,
    innerGlowColor: 0xff6622,
    lightColor: 0xff5511,
    rimColor: 0xffcc88,
    accentHex: '#c23d18',
  },
  celestial: {
    id: 'celestial',
    name: 'Celestial Sapphire',
    crystalColor: 0x3a7be0,
    innerGlowColor: 0x5daaff,
    lightColor: 0x4494ff,
    rimColor: 0xb5d8ff,
    accentHex: '#3b82f6',
  },
};

// Investor Relations placeholder documents. Every row is a placeholder: titles follow the usual
// FRA and EGX reporting calendar, dates and sizes are layout samples, no file exists behind them.

export type IrDoc = {
  id: string;
  /** i18n key under ir.docs */
  key: string;
  /** Optional value interpolated into the title, usually a year or quarter */
  period?: string;
  date: string;
  sizeKb: number;
};

export type IrDocGroup = { id: string; key: string; docs: IrDoc[] };

export const financialReports: IrDocGroup[] = [
  {
    id: "annual",
    key: "annual",
    docs: [
      { id: "ar-2025", key: "annualReport", period: "2025", date: "2026-04-15", sizeKb: 8400 },
      { id: "fs-2025", key: "annualStatements", period: "2025", date: "2026-03-30", sizeKb: 2100 },
      { id: "aud-2025", key: "auditorReport", period: "2025", date: "2026-03-30", sizeKb: 640 },
      { id: "ar-2024", key: "annualReport", period: "2024", date: "2025-04-20", sizeKb: 7900 },
      { id: "fs-2024", key: "annualStatements", period: "2024", date: "2025-03-28", sizeKb: 1980 },
    ],
  },
  {
    id: "interim",
    key: "interim",
    docs: [
      { id: "q2-2026", key: "interimStatements", period: "H1 2026", date: "2026-08-14", sizeKb: 1250 },
      { id: "q1-2026", key: "interimStatements", period: "Q1 2026", date: "2026-05-15", sizeKb: 1130 },
      { id: "q3-2025", key: "interimStatements", period: "9M 2025", date: "2025-11-13", sizeKb: 1190 },
    ],
  },
  {
    id: "presentations",
    key: "presentations",
    docs: [
      { id: "pres-h1-2026", key: "investorPresentation", period: "H1 2026", date: "2026-08-20", sizeKb: 4300 },
      { id: "sust-2025", key: "sustainabilityReport", period: "2025", date: "2026-06-01", sizeKb: 5200 },
    ],
  },
];

export const fraDisclosures: IrDoc[] = [
  { id: "fra-solvency-h1", key: "solvency", period: "H1 2026", date: "2026-08-30", sizeKb: 420 },
  { id: "fra-fs-h1", key: "fraStatements", period: "H1 2026", date: "2026-08-14", sizeKb: 1250 },
  { id: "fra-board", key: "boardChange", date: "2026-06-10", sizeKb: 180 },
  { id: "fra-actuarial", key: "actuarial", period: "2025", date: "2026-03-30", sizeKb: 760 },
  { id: "fra-decision", key: "fraDecision", date: "2026-02-22", sizeKb: 150 },
];

export const egxDisclosures: IrDoc[] = [
  { id: "egx-board-results", key: "boardResults", date: "2026-08-14", sizeKb: 210 },
  { id: "egx-material", key: "materialEvent", date: "2026-07-02", sizeKb: 160 },
  { id: "egx-ogm-invite", key: "ogmInvitation", period: "2026", date: "2026-03-10", sizeKb: 320 },
  { id: "egx-ogm-minutes", key: "ogmResolutions", period: "2026", date: "2026-04-02", sizeKb: 280 },
  { id: "egx-ownership", key: "ownership", date: "2026-07-01", sizeKb: 140 },
];

export const assemblies = [
  { id: "ogm-2026", key: "ogm", period: "2026", date: "2026-03-31" },
  { id: "egm-2025", key: "egm", period: "2025", date: "2025-11-20" },
  { id: "ogm-2025", key: "ogm", period: "2025", date: "2025-03-30" },
];

export const irCalendar = [
  { id: "q3-results", key: "q3Results", date: "2026-11-15" },
  { id: "fy-results", key: "fyResults", date: "2027-03-30" },
  { id: "ogm", key: "ogm", date: "2027-04-15" },
];

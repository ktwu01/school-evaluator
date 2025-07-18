export interface SchoolData {
  name: string;
  tuition: number;
  scholarship: number;
  livingCost: number;
  programLength: number;
  postGradSalary: number;
  reputation: number;
  location: number;
  programFit: number;
}

export interface CalculatedMetrics {
  netAnnualCost: number;
  totalProgramCost: number;
  estimatedROI: number;
  weightedScore: number;
}

export interface ComparisonResult {
  school1: SchoolData & CalculatedMetrics;
  school2: SchoolData & CalculatedMetrics;
  recommendation: {
    betterFinancially: 'school1' | 'school2' | 'tie';
    betterOverall: 'school1' | 'school2' | 'tie';
    message: string;
  };
}

export interface ValidationError {
  field: keyof SchoolData;
  message: string;
}

export interface FormErrors {
  [key: string]: string;
}

export const INITIAL_SCHOOL_DATA: SchoolData = {
  name: '',
  tuition: 0,
  scholarship: 0,
  livingCost: 0,
  programLength: 4,
  postGradSalary: 0,
  reputation: 5,
  location: 5,
  programFit: 5,
};

export const VALIDATION_RULES = {
  tuition: { min: 0, max: 200000 },
  scholarship: { min: 0, max: 200000 },
  livingCost: { min: 0, max: 100000 },
  programLength: { min: 0.5, max: 10 },
  postGradSalary: { min: 0, max: 1000000 },
  reputation: { min: 1, max: 10 },
  location: { min: 1, max: 10 },
  programFit: { min: 1, max: 10 },
} as const;
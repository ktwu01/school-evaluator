import { useMemo } from 'react';
import { SchoolData, CalculatedMetrics, ComparisonResult } from '@/types/school';

export const useSchoolCalculations = (school1: SchoolData, school2: SchoolData): ComparisonResult | null => {
  return useMemo(() => {
    // Check if both schools have minimum required data
    const isSchool1Valid = school1.name && school1.tuition >= 0 && school1.programLength > 0;
    const isSchool2Valid = school2.name && school2.tuition >= 0 && school2.programLength > 0;
    
    if (!isSchool1Valid || !isSchool2Valid) {
      return null;
    }

    // Calculate metrics for school 1
    const school1Metrics = calculateMetrics(school1);
    const school2Metrics = calculateMetrics(school2);

    // Determine recommendations
    const recommendation = generateRecommendation(school1Metrics, school2Metrics);

    return {
      school1: { ...school1, ...school1Metrics },
      school2: { ...school2, ...school2Metrics },
      recommendation,
    };
  }, [school1, school2]);
};

const calculateMetrics = (school: SchoolData): CalculatedMetrics => {
  // Net Annual Cost = tuition - scholarship + living cost
  const netAnnualCost = Math.max(0, school.tuition - school.scholarship + school.livingCost);
  
  // Total Program Cost = net annual cost × program length
  const totalProgramCost = netAnnualCost * school.programLength;
  
  // 5-Year ROI = ((5-year salary - total program cost) / total program cost) × 100
  const fiveYearSalary = school.postGradSalary * 5;
  const estimatedROI = totalProgramCost > 0 
    ? ((fiveYearSalary - totalProgramCost) / totalProgramCost) * 100 
    : 0;
  
  // Weighted Score = (reputation × 0.3) + (location × 0.2) + (program fit × 0.3) + (normalized ROI × 0.2)
  const normalizedROI = normalizeROI(estimatedROI);
  const weightedScore = (
    school.reputation * 0.3 +
    school.location * 0.2 +
    school.programFit * 0.3 +
    normalizedROI * 0.2
  );

  return {
    netAnnualCost,
    totalProgramCost,
    estimatedROI,
    weightedScore,
  };
};

const normalizeROI = (roi: number): number => {
  // Normalize ROI to 1-10 scale
  // Assume ROI range of -100% to 500% maps to 1-10
  const minROI = -100;
  const maxROI = 500;
  
  const clampedROI = Math.max(minROI, Math.min(maxROI, roi));
  const normalized = ((clampedROI - minROI) / (maxROI - minROI)) * 9 + 1;
  
  return Math.round(normalized * 10) / 10; // Round to 1 decimal place
};

const generateRecommendation = (
  school1: CalculatedMetrics, 
  school2: CalculatedMetrics
): ComparisonResult['recommendation'] => {
  // Determine financial winner (lower total cost and higher ROI)
  const school1FinancialScore = (school1.estimatedROI - school2.estimatedROI) + 
    ((school2.totalProgramCost - school1.totalProgramCost) / 10000); // Normalize cost difference
  
  const betterFinancially: 'school1' | 'school2' | 'tie' = 
    Math.abs(school1FinancialScore) < 5 ? 'tie' :
    school1FinancialScore > 0 ? 'school1' : 'school2';

  // Determine overall winner based on weighted score
  const scoreDifference = school1.weightedScore - school2.weightedScore;
  const betterOverall: 'school1' | 'school2' | 'tie' = 
    Math.abs(scoreDifference) < 0.5 ? 'tie' :
    scoreDifference > 0 ? 'school1' : 'school2';

  // Generate recommendation message
  let message = '';
  if (betterOverall === 'tie' && betterFinancially === 'tie') {
    message = 'Both schools are very similar in value. Consider personal preferences and specific program details.';
  } else if (betterOverall === betterFinancially) {
    const winner = betterOverall === 'school1' ? 'School 1' : 'School 2';
    message = `${winner} is the clear winner with both better financial value and overall fit.`;
  } else {
    const financialWinner = betterFinancially === 'school1' ? 'School 1' : 'School 2';
    const overallWinner = betterOverall === 'school1' ? 'School 1' : 'School 2';
    message = `${financialWinner} offers better financial value, but ${overallWinner} has a better overall fit. Consider your priorities.`;
  }

  return {
    betterFinancially,
    betterOverall,
    message,
  };
};
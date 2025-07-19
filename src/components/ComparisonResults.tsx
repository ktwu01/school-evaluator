"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ComparisonResult } from '@/types/school';

interface ComparisonResultsProps {
  comparison: ComparisonResult | null;
  t: (key: string) => string;
}

const ComparisonResults: React.FC<ComparisonResultsProps> = ({ comparison, t }) => {
  if (!comparison) {
    return null;
  }

  const { school1, school2, recommendation } = comparison;

  // Format currency with USD
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Format percentage
  const formatPercentage = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value / 100);
  };

  // Format score with 1 decimal place
  const formatScore = (value: number) => {
    return value.toFixed(1);
  };

  // Determine which school is better for a specific metric
  const getBetterSchool = (metric: keyof typeof school1) => {
    if (metric === 'netAnnualCost' || metric === 'totalProgramCost') {
      // For costs, lower is better
      return school1[metric] < school2[metric] ? 'school1' : 
             school1[metric] > school2[metric] ? 'school2' : 'tie';
    } else {
      // For other metrics, higher is better
      return school1[metric] > school2[metric] ? 'school1' : 
             school1[metric] < school2[metric] ? 'school2' : 'tie';
    }
  };

  return (
    <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">{t('comparisonResults')}</h2>
      
      {/* Financial Metrics Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse mb-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">{t('metric')}</th>
              <th className="p-2 text-right">{school1.name || t('school1')}</th>
              <th className="p-2 text-right">{school2.name || t('school2')}</th>
            </tr>
          </thead>
          <tbody>
            {/* Net Annual Cost */}
            <tr className="border-b">
              <td className="p-2">{t('netCost')}</td>
              <td className={`p-2 text-right ${getBetterSchool('netAnnualCost') === 'school1' ? 'font-bold text-green-600' : ''}`}>
                {formatCurrency(school1.netAnnualCost)}
              </td>
              <td className={`p-2 text-right ${getBetterSchool('netAnnualCost') === 'school2' ? 'font-bold text-green-600' : ''}`}>
                {formatCurrency(school2.netAnnualCost)}
              </td>
            </tr>
            
            {/* Total Program Cost */}
            <tr className="border-b">
              <td className="p-2">{t('totalProgramCost')}</td>
              <td className={`p-2 text-right ${getBetterSchool('totalProgramCost') === 'school1' ? 'font-bold text-green-600' : ''}`}>
                {formatCurrency(school1.totalProgramCost)}
              </td>
              <td className={`p-2 text-right ${getBetterSchool('totalProgramCost') === 'school2' ? 'font-bold text-green-600' : ''}`}>
                {formatCurrency(school2.totalProgramCost)}
              </td>
            </tr>
            
            {/* Estimated ROI */}
            <tr className="border-b">
              <td className="p-2">{t('estimatedROI')}</td>
              <td className={`p-2 text-right ${getBetterSchool('estimatedROI') === 'school1' ? 'font-bold text-green-600' : ''}`}>
                {formatPercentage(school1.estimatedROI)}
              </td>
              <td className={`p-2 text-right ${getBetterSchool('estimatedROI') === 'school2' ? 'font-bold text-green-600' : ''}`}>
                {formatPercentage(school2.estimatedROI)}
              </td>
            </tr>
            
            {/* Weighted Score */}
            <tr>
              <td className="p-2">{t('weightedScore')}</td>
              <td className={`p-2 text-right ${getBetterSchool('weightedScore') === 'school1' ? 'font-bold text-green-600' : ''}`}>
                {formatScore(school1.weightedScore)}
              </td>
              <td className={`p-2 text-right ${getBetterSchool('weightedScore') === 'school2' ? 'font-bold text-green-600' : ''}`}>
                {formatScore(school2.weightedScore)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* Recommendation */}
      <Card className="p-4 mb-4">
        <h3 className="text-lg font-medium mb-2">{t('recommendation')}</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant={recommendation.betterFinancially === 'school1' ? 'default' : 'outline'}>
            {school1.name || t('school1')} {recommendation.betterFinancially === 'school1' ? `- ${t('betterFinancially')}` : ''}
          </Badge>
          <Badge variant={recommendation.betterFinancially === 'school2' ? 'default' : 'outline'}>
            {school2.name || t('school2')} {recommendation.betterFinancially === 'school2' ? `- ${t('betterFinancially')}` : ''}
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant={recommendation.betterOverall === 'school1' ? 'default' : 'outline'}>
            {school1.name || t('school1')} {recommendation.betterOverall === 'school1' ? `- ${t('betterOverall')}` : ''}
          </Badge>
          <Badge variant={recommendation.betterOverall === 'school2' ? 'default' : 'outline'}>
            {school2.name || t('school2')} {recommendation.betterOverall === 'school2' ? `- ${t('betterOverall')}` : ''}
          </Badge>
        </div>
        <p className="text-gray-700">{recommendation.message}</p>
      </Card>
    </div>
  );
};

export default ComparisonResults;
"use client";

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tooltip } from '@/components/ui/tooltip';
import { SchoolData, FormErrors, VALIDATION_RULES } from '@/types/school';

interface SchoolInputFormProps {
  schoolData: SchoolData;
  onChange: (data: SchoolData) => void;
  title: string;
  t: (key: string) => string;
}

const SchoolInputForm: React.FC<SchoolInputFormProps> = ({
  schoolData,
  onChange,
  title,
  t,
}) => {
  const [errors, setErrors] = useState<FormErrors>({});

  // Update errors when data changes
  useEffect(() => {
    validateForm(schoolData);
  }, [schoolData]);

  const validateForm = (data: SchoolData) => {
    const newErrors: FormErrors = {};

    // Validate name
    if (!data.name.trim()) {
      newErrors.name = t('validation.nameRequired');
    }

    // Validate numeric fields
    Object.entries(VALIDATION_RULES).forEach(([field, rules]) => {
      const key = field as keyof typeof VALIDATION_RULES;
      const value = data[key as keyof SchoolData] as number;
      
      if (value < rules.min) {
        newErrors[key] = t('validation.minValue', { min: rules.min });
      } else if (value > rules.max) {
        newErrors[key] = t('validation.maxValue', { max: rules.max });
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof SchoolData, value: string | number) => {
    const newData = { ...schoolData };
    
    if (typeof value === 'string' && typeof newData[field] === 'number') {
      // Convert string to number for numeric fields
      newData[field] = value === '' ? 0 : parseFloat(value);
    } else {
      newData[field] = value;
    }
    
    onChange(newData);
  };

  const handleSliderChange = (field: keyof SchoolData, value: number[]) => {
    const newData = { ...schoolData };
    newData[field] = value[0];
    onChange(newData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      
      <div className="space-y-4">
        {/* School Name */}
        <div>
          <Label htmlFor={`${title}-name`}>{t('schoolName')}</Label>
          <Input
            id={`${title}-name`}
            value={schoolData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={errors.name ? 'border-red-500' : ''}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Financial Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tuition */}
          <div>
            <Label htmlFor={`${title}-tuition`}>{t('tuition')}</Label>
            <Input
              id={`${title}-tuition`}
              type="number"
              min={VALIDATION_RULES.tuition.min}
              max={VALIDATION_RULES.tuition.max}
              value={schoolData.tuition || ''}
              onChange={(e) => handleInputChange('tuition', e.target.value)}
              className={errors.tuition ? 'border-red-500' : ''}
            />
            {errors.tuition && <p className="text-red-500 text-sm mt-1">{errors.tuition}</p>}
          </div>

          {/* Scholarship */}
          <div>
            <Label htmlFor={`${title}-scholarship`}>{t('scholarship')}</Label>
            <Input
              id={`${title}-scholarship`}
              type="number"
              min={VALIDATION_RULES.scholarship.min}
              max={VALIDATION_RULES.scholarship.max}
              value={schoolData.scholarship || ''}
              onChange={(e) => handleInputChange('scholarship', e.target.value)}
              className={errors.scholarship ? 'border-red-500' : ''}
            />
            {errors.scholarship && <p className="text-red-500 text-sm mt-1">{errors.scholarship}</p>}
          </div>

          {/* Living Cost */}
          <div>
            <Label htmlFor={`${title}-livingCost`}>{t('livingCost')}</Label>
            <Input
              id={`${title}-livingCost`}
              type="number"
              min={VALIDATION_RULES.livingCost.min}
              max={VALIDATION_RULES.livingCost.max}
              value={schoolData.livingCost || ''}
              onChange={(e) => handleInputChange('livingCost', e.target.value)}
              className={errors.livingCost ? 'border-red-500' : ''}
            />
            {errors.livingCost && <p className="text-red-500 text-sm mt-1">{errors.livingCost}</p>}
          </div>

          {/* Program Length */}
          <div>
            <Label htmlFor={`${title}-programLength`}>{t('programLength')}</Label>
            <Input
              id={`${title}-programLength`}
              type="number"
              min={VALIDATION_RULES.programLength.min}
              max={VALIDATION_RULES.programLength.max}
              step="0.5"
              value={schoolData.programLength || ''}
              onChange={(e) => handleInputChange('programLength', e.target.value)}
              className={errors.programLength ? 'border-red-500' : ''}
            />
            {errors.programLength && <p className="text-red-500 text-sm mt-1">{errors.programLength}</p>}
          </div>

          {/* Post-Graduation Salary */}
          <div className="md:col-span-2">
            <Label htmlFor={`${title}-postGradSalary`}>{t('postGradSalary')}</Label>
            <Input
              id={`${title}-postGradSalary`}
              type="number"
              min={VALIDATION_RULES.postGradSalary.min}
              max={VALIDATION_RULES.postGradSalary.max}
              value={schoolData.postGradSalary || ''}
              onChange={(e) => handleInputChange('postGradSalary', e.target.value)}
              className={errors.postGradSalary ? 'border-red-500' : ''}
            />
            {errors.postGradSalary && <p className="text-red-500 text-sm mt-1">{errors.postGradSalary}</p>}
          </div>
        </div>

        {/* Preference Ratings */}
        <div className="space-y-6 mt-6">
          <h3 className="text-lg font-medium">{t('preferences')}</h3>
          
          {/* School Reputation */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor={`${title}-reputation`}>{t('reputation')}</Label>
              <span className="text-sm font-medium">{schoolData.reputation}</span>
            </div>
            <Slider
              id={`${title}-reputation`}
              min={VALIDATION_RULES.reputation.min}
              max={VALIDATION_RULES.reputation.max}
              step={1}
              value={[schoolData.reputation]}
              onValueChange={(value) => handleSliderChange('reputation', value)}
            />
          </div>

          {/* Location Preference */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor={`${title}-location`}>{t('location')}</Label>
              <span className="text-sm font-medium">{schoolData.location}</span>
            </div>
            <Slider
              id={`${title}-location`}
              min={VALIDATION_RULES.location.min}
              max={VALIDATION_RULES.location.max}
              step={1}
              value={[schoolData.location]}
              onValueChange={(value) => handleSliderChange('location', value)}
            />
          </div>

          {/* Program Fit */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor={`${title}-programFit`}>{t('programFit')}</Label>
              <span className="text-sm font-medium">{schoolData.programFit}</span>
            </div>
            <Slider
              id={`${title}-programFit`}
              min={VALIDATION_RULES.programFit.min}
              max={VALIDATION_RULES.programFit.max}
              step={1}
              value={[schoolData.programFit]}
              onValueChange={(value) => handleSliderChange('programFit', value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolInputForm;
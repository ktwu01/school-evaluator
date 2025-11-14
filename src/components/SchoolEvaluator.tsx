"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import SchoolInputForm from "@/components/SchoolInputForm";
import ComparisonResults from "@/components/ComparisonResults";
import { Button } from "@/components/ui/button";
import { SchoolData, ComparisonResult, INITIAL_SCHOOL_DATA } from "@/types/school";
import { useSchoolCalculations } from "@/hooks/useSchoolCalculations";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const SchoolEvaluator: React.FC = () => {
  const t = useTranslations("schoolEvaluator");
  // Use localStorage for persistence
  const [school1Data, setSchool1Data, clearSchool1] = useLocalStorage<SchoolData>(
    "schoolEvaluator_school1",
    { ...INITIAL_SCHOOL_DATA }
  );
  
  const [school2Data, setSchool2Data, clearSchool2] = useLocalStorage<SchoolData>(
    "schoolEvaluator_school2",
    { ...INITIAL_SCHOOL_DATA }
  );

  // Calculate comparison results
  const comparisonResult = useSchoolCalculations(school1Data, school2Data);
  
  // Handle form changes
  const handleSchool1Change = (data: SchoolData) => {
    setSchool1Data(data);
  };
  
  const handleSchool2Change = (data: SchoolData) => {
    setSchool2Data(data);
  };
  
  // Reset both forms
  const handleReset = () => {
    clearSchool1();
    clearSchool2();
    setSchool1Data({ ...INITIAL_SCHOOL_DATA });
    setSchool2Data({ ...INITIAL_SCHOOL_DATA });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {t('title')}
      </h1>
      <p className="text-center mb-8">
        {t('description')}
      </p>

      {/* School input forms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SchoolInputForm
          schoolData={school1Data}
          onChange={handleSchool1Change}
          title={t('school1')}
          t={t}
        />
        <SchoolInputForm
          schoolData={school2Data}
          onChange={handleSchool2Change}
          title={t('school2')}
          t={t}
        />
      </div>

      {/* Action buttons */}
      <div className="mt-6 flex justify-center gap-4">
        <Button
          onClick={handleReset}
          variant="outline"
        >
          {t('reset')}
        </Button>
      </div>

      {/* Comparison results */}
      {comparisonResult && (
        <ComparisonResults
          comparison={comparisonResult}
          t={t}
        />
      )}
    </div>
  );
};

export default SchoolEvaluator;


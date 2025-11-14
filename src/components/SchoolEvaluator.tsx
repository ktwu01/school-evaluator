"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import SchoolInputForm from "@/components/SchoolInputForm";
import ComparisonResults from "@/components/ComparisonResults";
import { Button } from "@/components/ui/button";
import { SchoolData, ComparisonResult, INITIAL_SCHOOL_DATA } from "@/types/school";
import { useSchoolCalculations } from "@/hooks/useSchoolCalculations";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Github, GitFork, Star, Download, Upload } from "lucide-react";

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

  // Export comparison data
  const exportComparison = () => {
    const data = {
      school1: school1Data,
      school2: school2Data,
      exportDate: new Date().toISOString(),
      version: "1.0.0",
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `school_comparison_${new Date().toLocaleDateString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Import comparison data
  const importComparison = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string);
            if (data.school1 && data.school2) {
              setSchool1Data(data.school1);
              setSchool2Data(data.school2);
              alert("Data imported successfully!");
            } else {
              alert("Invalid file format. Please select a valid comparison file.");
            }
          } catch (error) {
            alert("Error parsing file. Please check the file format.");
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header with GitHub buttons */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {t('title')}
        </h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            asChild
          >
            <a
              href="https://github.com/ktwu01/school-evaluator"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </Button>
          <Button
            variant="default"
            size="sm"
            asChild
            className="bg-green-600 hover:bg-green-700"
          >
            <a
              href="https://github.com/ktwu01/school-evaluator/fork"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <GitFork className="h-4 w-4" />
              Fork
            </a>
          </Button>
          <Button
            variant="outline"
            size="sm"
            asChild
          >
            <a
              href="https://github.com/ktwu01/school-evaluator"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Star className="h-4 w-4" />
              Star
            </a>
          </Button>
        </div>
      </div>
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
          onClick={importComparison}
          variant="outline"
        >
          <Upload className="h-4 w-4 mr-2" />
          Import Data
        </Button>
        <Button
          onClick={exportComparison}
          variant="outline"
        >
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
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


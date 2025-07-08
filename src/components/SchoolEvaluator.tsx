import React from "react";

interface SchoolEvaluatorProps {
  dictionary: any; // Type this more specifically later
}

const SchoolEvaluator: React.FC<SchoolEvaluatorProps> = ({ dictionary }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {dictionary.schoolEvaluator.title}
      </h1>
      <p className="text-center mb-8">
        {dictionary.schoolEvaluator.description}
      </p>

      {/* Placeholder for school input forms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">School 1</h2>
          {/* Input fields for School 1 */}
          <p>Input fields for School 1 will go here.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">School 2</h2>
          {/* Input fields for School 2 */}
          <p>Input fields for School 2 will go here.</p>
        </div>
      </div>

      {/* Placeholder for comparison results */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Comparison Results</h2>
        <p className="text-center">Comparison results will be displayed here.</p>
      </div>
    </div>
  );
};

export default SchoolEvaluator;



import { BrainCircuit } from "lucide-react";

export const AuthHeader = () => {
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <div className="flex justify-center">
        <BrainCircuit className="h-12 w-12 text-primary" />
      </div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        NutriMind AI
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Smart Dietary Choices with AI-Powered Nutrition Analysis
      </p>
    </div>
  );
};

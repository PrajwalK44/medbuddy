import React from "react";
import PatientProfileForm from "../components/PatientProfileForm";
import { PatientProfileSchema } from "../types/schemas";

const PatientProfile = () => {
  const handleSubmit = async (data: PatientProfileSchema) => {
    try {
      // TODO: Add API call to save patient profile
      console.log("Saving patient profile:", data);
      // Add your API call here
    } catch (error) {
      console.error("Error saving patient profile:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Patient Profile
        </h1>
        <PatientProfileForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default PatientProfile;

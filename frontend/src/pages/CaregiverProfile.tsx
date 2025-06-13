import React from "react";
import CaregiverProfileForm from "../components/CaregiverProfileForm";
import { CaregiverProfileSchema } from "../types/schemas";

const CaregiverProfile = () => {
  const handleSubmit = async (data: CaregiverProfileSchema) => {
    try {
      // TODO: Add API call to save caregiver profile
      console.log("Saving caregiver profile:", data);
      // Add your API call here
    } catch (error) {
      console.error("Error saving caregiver profile:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Caregiver Profile
        </h1>
        <CaregiverProfileForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CaregiverProfile;

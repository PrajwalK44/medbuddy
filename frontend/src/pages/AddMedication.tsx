import React from "react";
import MedicationForm from "../components/MedicationForm";
import { MedicationSchema } from "../types/schemas";

const AddMedication = () => {
  // TODO: Get actual user ID from authentication context
  const userId = "current-user-id";

  const handleSubmit = async (data: MedicationSchema) => {
    try {
      // TODO: Add API call to save medication
      console.log("Saving medication:", data);
      // Add your API call here
    } catch (error) {
      console.error("Error saving medication:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Add Medication
        </h1>
        <MedicationForm onSubmit={handleSubmit} userId={userId} />
      </div>
    </div>
  );
};

export default AddMedication;

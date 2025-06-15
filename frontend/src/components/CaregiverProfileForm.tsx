import React, { useState } from "react";
import { CaregiverProfileSchema } from "../types/schemas";

interface CaregiverProfileFormProps {
  onSubmit: (data: CaregiverProfileSchema) => void;
  initialData?: Partial<CaregiverProfileSchema>;
}

const CaregiverProfileForm: React.FC<CaregiverProfileFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<CaregiverProfileSchema>({
    age: initialData?.age || 18,
    gender: initialData?.gender || "",
    relation_to_patient: initialData?.relation_to_patient || "",
    experience: initialData?.experience || 0,
    certifications: initialData?.certifications || [],
    patients_assigned: initialData?.patients_assigned || "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleCertificationsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const certifications = e.target.value.split(",").map((c) => c.trim());
    setFormData((prev) => ({
      ...prev,
      certifications,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Basic Information
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Age
            </label>
            <input
              type="number"
              name="age"
              id="age"
              min="18"
              max="100"
              value={formData.age}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Caregiving Information
        </h3>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="relation_to_patient"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Relation to Patient
            </label>
            <input
              type="text"
              name="relation_to_patient"
              id="relation_to_patient"
              value={formData.relation_to_patient}
              onChange={handleChange}
              placeholder="e.g., Family member, Professional caregiver"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Years of Experience
            </label>
            <input
              type="number"
              name="experience"
              id="experience"
              min="0"
              value={formData.experience}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="certifications"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Certifications (comma-separated)
            </label>
            <input
              type="text"
              name="certifications"
              id="certifications"
              value={formData.certifications?.join(", ")}
              onChange={handleCertificationsChange}
              placeholder="e.g., CPR, First Aid, Nursing"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="patients_assigned"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Assigned Patient ID
            </label>
            <input
              type="text"
              name="patients_assigned"
              id="patients_assigned"
              value={formData.patients_assigned}
              onChange={handleChange}
              placeholder="Enter patient ID if assigned"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Profile
        </button>
      </div>
    </form>
  );
};

export default CaregiverProfileForm;

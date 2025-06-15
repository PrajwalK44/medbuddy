import React, { useState } from "react";
import {
  PatientProfileSchema,
  EmergencyContact,
  MedicalInfo,
  Physician,
} from "../types/schemas";

interface PatientProfileFormProps {
  onSubmit: (data: PatientProfileSchema) => void;
  initialData?: Partial<PatientProfileSchema>;
}

const PatientProfileForm: React.FC<PatientProfileFormProps> = ({
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<PatientProfileSchema>({
    dateOfBirth: initialData?.dateOfBirth || "",
    gender: initialData?.gender || "",
    emergencyContact: initialData?.emergencyContact || {
      emergencyName: "",
      emergencyRelation: "",
      emergencyPhone: "",
    },
    medicalInfo: initialData?.medicalInfo || {
      allergies: [],
      conditions: [],
      bloodType: "",
      physician: {
        physicianName: "",
        physicianPhone: "",
        hospital: "",
      },
    },
    notificationPreferences: initialData?.notificationPreferences || {
      push: true,
    },
    healthGoals: initialData?.healthGoals || [],
    appointments: initialData?.appointments || [],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof PatientProfileSchema],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
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
              htmlFor="dateOfBirth"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              value={formData.dateOfBirth}
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
          Emergency Contact
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="emergencyContact.emergencyName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Contact Name
            </label>
            <input
              type="text"
              name="emergencyContact.emergencyName"
              id="emergencyContact.emergencyName"
              value={formData.emergencyContact?.emergencyName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="emergencyContact.emergencyRelation"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Relationship
            </label>
            <input
              type="text"
              name="emergencyContact.emergencyRelation"
              id="emergencyContact.emergencyRelation"
              value={formData.emergencyContact?.emergencyRelation}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="emergencyContact.emergencyPhone"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Phone Number
            </label>
            <input
              type="tel"
              name="emergencyContact.emergencyPhone"
              id="emergencyContact.emergencyPhone"
              value={formData.emergencyContact?.emergencyPhone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Medical Information
        </h3>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="medicalInfo.bloodType"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Blood Type
            </label>
            <select
              name="medicalInfo.bloodType"
              id="medicalInfo.bloodType"
              value={formData.medicalInfo?.bloodType}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Select blood type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="medicalInfo.allergies"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Allergies (comma-separated)
            </label>
            <input
              type="text"
              name="medicalInfo.allergies"
              id="medicalInfo.allergies"
              value={formData.medicalInfo?.allergies?.join(", ")}
              onChange={(e) => {
                const allergies = e.target.value
                  .split(",")
                  .map((a) => a.trim());
                setFormData((prev) => ({
                  ...prev,
                  medicalInfo: {
                    ...prev.medicalInfo!,
                    allergies,
                  },
                }));
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label
              htmlFor="medicalInfo.conditions"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Medical Conditions (comma-separated)
            </label>
            <input
              type="text"
              name="medicalInfo.conditions"
              id="medicalInfo.conditions"
              value={formData.medicalInfo?.conditions?.join(", ")}
              onChange={(e) => {
                const conditions = e.target.value
                  .split(",")
                  .map((c) => c.trim());
                setFormData((prev) => ({
                  ...prev,
                  medicalInfo: {
                    ...prev.medicalInfo!,
                    conditions,
                  },
                }));
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Physician Information
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="medicalInfo.physician.physicianName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Physician Name
            </label>
            <input
              type="text"
              name="medicalInfo.physician.physicianName"
              id="medicalInfo.physician.physicianName"
              value={formData.medicalInfo?.physician?.physicianName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="medicalInfo.physician.physicianPhone"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Physician Phone
            </label>
            <input
              type="tel"
              name="medicalInfo.physician.physicianPhone"
              id="medicalInfo.physician.physicianPhone"
              value={formData.medicalInfo?.physician?.physicianPhone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="medicalInfo.physician.hospital"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Hospital
            </label>
            <input
              type="text"
              name="medicalInfo.physician.hospital"
              id="medicalInfo.physician.hospital"
              value={formData.medicalInfo?.physician?.hospital}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Notification Preferences
        </h3>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="notificationPreferences.push"
            id="notificationPreferences.push"
            checked={formData.notificationPreferences?.push}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                notificationPreferences: {
                  ...prev.notificationPreferences!,
                  push: e.target.checked,
                },
              }));
            }}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="notificationPreferences.push"
            className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
          >
            Enable push notifications
          </label>
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

export default PatientProfileForm;

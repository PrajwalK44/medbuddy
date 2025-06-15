import React, { useState } from "react";
import { MedicationSchema, MedicationStatus } from "../types/schemas";

interface MedicationFormProps {
  onSubmit: (data: MedicationSchema) => void;
  initialData?: Partial<MedicationSchema>;
  userId: string;
}

const MedicationForm: React.FC<MedicationFormProps> = ({
  onSubmit,
  initialData,
  userId,
}) => {
  const [formData, setFormData] = useState<MedicationSchema>({
    user_id: userId,
    name: initialData?.name || "",
    dosage: initialData?.dosage || "",
    frequency: initialData?.frequency || "",
    time: initialData?.time || "",
    instructions: initialData?.instructions || "",
    status: initialData?.status || "upcoming",
    refill_date: initialData?.refill_date || "",
    low_supply: initialData?.low_supply || false,
    notification: initialData?.notification || false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
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
          Medication Information
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Medication Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter medication name"
            />
          </div>

          <div>
            <label
              htmlFor="dosage"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Dosage
            </label>
            <input
              type="text"
              name="dosage"
              id="dosage"
              required
              value={formData.dosage}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="e.g., 500mg"
            />
          </div>

          <div>
            <label
              htmlFor="frequency"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Frequency
            </label>
            <input
              type="text"
              name="frequency"
              id="frequency"
              required
              value={formData.frequency}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="e.g., twice a day"
            />
          </div>

          <div>
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Time
            </label>
            <input
              type="time"
              name="time"
              id="time"
              required
              value={formData.time}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
        </div>

        <div className="mt-4">
          <label
            htmlFor="instructions"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Instructions
          </label>
          <textarea
            name="instructions"
            id="instructions"
            required
            value={formData.instructions}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Enter any special instructions"
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Status
          </label>
          <select
            name="status"
            id="status"
            required
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="upcoming">Upcoming</option>
            <option value="taken">Taken</option>
            <option value="missed">Missed</option>
          </select>
        </div>

        <div className="mt-4">
          <label
            htmlFor="refill_date"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Refill Date
          </label>
          <input
            type="date"
            name="refill_date"
            id="refill_date"
            value={formData.refill_date}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        <div className="mt-4 space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="low_supply"
              id="low_supply"
              checked={formData.low_supply}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="low_supply"
              className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
            >
              Low Supply Alert
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="notification"
              id="notification"
              checked={formData.notification}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="notification"
              className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
            >
              Enable Notifications
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Medication
        </button>
      </div>
    </form>
  );
};

export default MedicationForm;

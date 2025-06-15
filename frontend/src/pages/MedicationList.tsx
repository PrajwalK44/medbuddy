import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  Info,
  AlertCircle,
  CheckCircle,
  X,
  Plus,
  Calendar,
  Pill,
} from "lucide-react";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time: string;
  instructions: string;
  status: "taken" | "missed" | "upcoming";
  refillDate?: string;
  lowSupply?: boolean;
}

const MedicationList: React.FC = () => {
  const navigate = useNavigate();
  const [medications] = useState<Medication[]>([
    {
      id: "1",
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      time: "08:00",
      instructions: "Take with food",
      status: "taken",
    },
    {
      id: "2",
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      time: "09:00",
      instructions: "Take on an empty stomach",
      status: "upcoming",
      refillDate: "2025-05-30",
      lowSupply: true,
    },
    {
      id: "3",
      name: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily",
      time: "20:00",
      instructions: "Take in the evening",
      status: "upcoming",
    },
    {
      id: "4",
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      time: "20:00",
      instructions: "Take with food",
      status: "upcoming",
    },
    {
      id: "5",
      name: "Aspirin",
      dosage: "81mg",
      frequency: "Once daily",
      time: "09:00",
      instructions: "Take with food",
      status: "missed",
    },
  ]);

  const [selectedMedication, setSelectedMedication] =
    useState<Medication | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleMedicationClick = (medication: Medication) => {
    setSelectedMedication(medication);
    setShowDetails(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "taken":
        return <CheckCircle size={20} className="text-green-500" />;
      case "missed":
        return <X size={20} className="text-red-500" />;
      case "upcoming":
        return <Clock size={20} className="text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "taken":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300";
      case "missed":
        return "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300";
      case "upcoming":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300";
    }
  };

  const addMedication = () => {
    navigate("/medications/add");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
          Medications
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Manage and track your medications
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Your Medication List
            </h2>
            <button
              onClick={addMedication}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-400 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-500 transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 shadow-md"
            >
              <Plus size={20} />
              <span>Add Medication</span>
            </button>
          </div>
        </div>

        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {medications.map((medication) => (
            <li
              key={medication.id}
              className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors duration-200 animate-fadeIn"
              onClick={() => handleMedicationClick(medication)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <Pill
                      size={24}
                      className="text-blue-600 dark:text-blue-400"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      {medication.name}{" "}
                      <span className="text-gray-500 dark:text-gray-400">
                        {medication.dosage}
                      </span>
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {medication.frequency}
                      </p>
                      <span className="text-gray-300 dark:text-gray-600">
                        •
                      </span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {medication.time}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {medication.lowSupply && (
                    <div className="flex items-center text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-3 py-1 rounded-full">
                      <AlertCircle size={16} className="mr-1" />
                      <span className="text-sm">Low Supply</span>
                    </div>
                  )}
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${getStatusClass(
                      medication.status
                    )}`}
                  >
                    {medication.status.charAt(0).toUpperCase() +
                      medication.status.slice(1)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Medication Details Modal */}
      {showDetails && selectedMedication && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={() => setShowDetails(false)}
            >
              <div className="absolute inset-0 bg-gray-500/75 backdrop-blur-sm"></div>
            </div>
            <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-slideUp">
              <div className="bg-white dark:bg-gray-800 px-6 pt-6 pb-4 sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <Pill
                          size={24}
                          className="text-blue-600 dark:text-blue-400"
                        />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        {selectedMedication.name}{" "}
                        <span className="text-gray-500 dark:text-gray-400">
                          {selectedMedication.dosage}
                        </span>
                      </h3>
                    </div>
                    <div className="mt-6">
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl">
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              Frequency
                            </p>
                            <p className="mt-1 text-gray-900 dark:text-gray-100">
                              {selectedMedication.frequency}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              Time
                            </p>
                            <p className="mt-1 text-gray-900 dark:text-gray-100">
                              {selectedMedication.time}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              Status
                            </p>
                            <p className="mt-1 flex items-center text-gray-900 dark:text-gray-100">
                              {getStatusIcon(selectedMedication.status)}
                              <span className="ml-2">
                                {selectedMedication.status
                                  .charAt(0)
                                  .toUpperCase() +
                                  selectedMedication.status.slice(1)}
                              </span>
                            </p>
                          </div>
                          {selectedMedication.refillDate && (
                            <div>
                              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Next Refill
                              </p>
                              <p className="mt-1 flex items-center text-gray-900 dark:text-gray-100">
                                <Calendar size={16} className="mr-2" />
                                {selectedMedication.refillDate}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-6">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Instructions
                        </p>
                        <p className="mt-2 text-gray-900 dark:text-gray-100">
                          {selectedMedication.instructions}
                        </p>
                      </div>

                      <div className="mt-6 flex items-start bg-blue-50 dark:bg-blue-900/30 p-4 rounded-xl">
                        <Info
                          size={20}
                          className="text-blue-500 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0"
                        />
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Ask the AI chatbot for more information about this
                          medication, including side effects and drug
                          interactions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-400 text-base font-medium text-white hover:from-blue-700 hover:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-500 focus:outline-none transition-all duration-200 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowDetails(false)}
                >
                  Close
                </button>
                {selectedMedication.status === "upcoming" && (
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none transition-all duration-200 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Mark as Taken
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
          .animate-slideUp {
            animation: slideUp 0.3s ease-out;
          }
        `,
        }}
      />
    </div>
  );
};

export default MedicationList;

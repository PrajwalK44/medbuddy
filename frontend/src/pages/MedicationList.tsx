import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Info, AlertCircle, CheckCircle, X } from 'lucide-react';
import { CiBookmarkPlus } from "react-icons/ci";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time: string;
  instructions: string;
  status: 'taken' | 'missed' | 'upcoming';
  refillDate?: string;
  lowSupply?: boolean;
}

const MedicationList: React.FC = () => {
  const navigate=useNavigate();
  const [medications] = useState<Medication[]>([
    {
      id: '1',
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      time: '08:00',
      instructions: 'Take with food',
      status: 'taken',
    },
    {
      id: '2',
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      time: '09:00',
      instructions: 'Take on an empty stomach',
      status: 'upcoming',
      refillDate: '2025-05-30',
      lowSupply: true,
    },
    {
      id: '3',
      name: 'Atorvastatin',
      dosage: '20mg',
      frequency: 'Once daily',
      time: '20:00',
      instructions: 'Take in the evening',
      status: 'upcoming',
    },
    {
      id: '4',
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      time: '20:00',
      instructions: 'Take with food',
      status: 'upcoming',
    },
    {
      id: '5',
      name: 'Aspirin',
      dosage: '81mg',
      frequency: 'Once daily',
      time: '09:00',
      instructions: 'Take with food',
      status: 'missed',
    },
  ]);

  const [selectedMedication, setSelectedMedication] = useState<Medication | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleMedicationClick = (medication: Medication) => {
    setSelectedMedication(medication);
    setShowDetails(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'taken':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'missed':
        return <X size={20} className="text-red-500" />;
      case 'upcoming':
        return <Clock size={20} className="text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'taken':
        return 'bg-green-100 text-green-800';
      case 'missed':
        return 'bg-red-100 text-red-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const addMedication=()=>{
    navigate('/medications/add');
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Medications</h1>
        <p className="text-gray-500 mt-1">Manage and track your medications</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Your Medication List</h2>
            <button onClick={addMedication} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ">
              Add Medication 
            </button>
          </div>
        </div>

        <ul className="divide-y divide-gray-200">
          {medications.map((medication) => (
            <li
              key={medication.id}
              className="p-4 sm:p-6 hover:bg-gray-50 cursor-pointer"
              onClick={() => handleMedicationClick(medication)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-4">{getStatusIcon(medication.status)}</div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {medication.name} {medication.dosage}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {medication.frequency} • {medication.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  {medication.lowSupply && (
                    <div className="mr-4 flex items-center text-amber-600">
                      <AlertCircle size={16} className="mr-1" />
                      <span className="text-sm">Low Supply</span>
                    </div>
                  )}
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getStatusClass(
                      medication.status
                    )}`}
                  >
                    {medication.status.charAt(0).toUpperCase() + medication.status.slice(1)}
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
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {selectedMedication.name} {selectedMedication.dosage}
                    </h3>
                    <div className="mt-4">
                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-500">Frequency</p>
                            <p className="mt-1">{selectedMedication.frequency}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Time</p>
                            <p className="mt-1">{selectedMedication.time}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Status</p>
                            <p className="mt-1 flex items-center">
                              {getStatusIcon(selectedMedication.status)}
                              <span className="ml-1">
                                {selectedMedication.status.charAt(0).toUpperCase() +
                                  selectedMedication.status.slice(1)}
                              </span>
                            </p>
                          </div>
                          {selectedMedication.refillDate && (
                            <div>
                              <p className="text-sm font-medium text-gray-500">Next Refill</p>
                              <p className="mt-1">{selectedMedication.refillDate}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-500">Instructions</p>
                        <p className="mt-1">{selectedMedication.instructions}</p>
                      </div>

                      <div className="mt-4 flex items-start">
                        <Info size={20} className="text-blue-500 mr-2 mt-0.5" />
                        <p className="text-sm text-gray-600">
                          Ask the AI chatbot for more information about this medication, including
                          side effects and drug interactions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowDetails(false)}
                >
                  Close
                </button>
                {selectedMedication.status === 'upcoming' && (
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Mark as Taken
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicationList;
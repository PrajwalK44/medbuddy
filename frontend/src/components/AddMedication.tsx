// AddMedicationForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

// In a real application, this would likely be a context or state management solution
// For simplicity, we're just mocking the function
const addMedicationToList = (medication: Medication) => {
  console.log('Adding medication:', medication);
  // In a real app: dispatch action, make API call, update context, etc.
  return true;
};

const AddMedicationForm: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<Omit<Medication, 'id' | 'status'>>({
    name: '',
    dosage: '',
    frequency: '',
    time: '',
    instructions: '',
  });
  const [hasRefill, setHasRefill] = useState(false);
  const [refillDate, setRefillDate] = useState('');
  const [isLowSupply, setIsLowSupply] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate a unique ID (in a real app, this would come from the backend)
    const id = Date.now().toString();
    
    const newMedication: Medication = {
      id,
      ...formData,
      status: 'upcoming', // Default status for new medications
      ...(hasRefill && { refillDate }),
      ...(isLowSupply && { lowSupply: true }),
    };
    
    // Add medication to the list
    const success = addMedicationToList(newMedication);
    
    // Navigate back to the medication list
    if (success) {
      navigate('/medications');
    }
  };

  const handleCancel = () => {
    navigate('/medications');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add New Medication</h1>
        <p className="text-gray-500 mt-1">Enter details for your new medication</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <form onSubmit={handleSubmit}>
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="mb-4">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Medication Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="dosage" className="block text-sm font-medium text-gray-700 mb-1">
                  Dosage*
                </label>
                <input
                  type="text"
                  id="dosage"
                  name="dosage"
                  required
                  value={formData.dosage}
                  onChange={handleChange}
                  placeholder="e.g., 500mg"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">
                    Frequency*
                  </label>
                  <select
                    id="frequency"
                    name="frequency"
                    required
                    value={formData.frequency}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select frequency</option>
                    <option value="Once daily">Once daily</option>
                    <option value="Twice daily">Twice daily</option>
                    <option value="Three times daily">Three times daily</option>
                    <option value="Four times daily">Four times daily</option>
                    <option value="As needed">As needed</option>
                    <option value="Every other day">Every other day</option>
                    <option value="Weekly">Weekly</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                    Time*
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">
                  Instructions
                </label>
                <textarea
                  id="instructions"
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Special instructions (e.g., Take with food)"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="mb-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="hasRefill"
                    checked={hasRefill}
                    onChange={() => setHasRefill(!hasRefill)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="hasRefill" className="ml-2 block text-sm text-gray-700">
                    Set refill date
                  </label>
                </div>
                
                {hasRefill && (
                  <div className="mt-2">
                    <input
                      type="date"
                      id="refillDate"
                      value={refillDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setRefillDate(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                )}
              </div>
              
              <div className="mb-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isLowSupply"
                    checked={isLowSupply}
                    onChange={() => setIsLowSupply(!isLowSupply)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isLowSupply" className="ml-2 block text-sm text-gray-700">
                    Mark as low supply
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Add Medication
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMedicationForm;
import React, { useState } from 'react';
import { Download, Share2, Calendar, AlertTriangle } from 'lucide-react';
import AdherenceChart from '../components/AdherenceChart';

const Reports: React.FC = () => {
  const [timeRange, setTimeRange] = useState('week');
  const [showRiskAlert, setShowRiskAlert] = useState(true);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-500 mt-1">View insights and trends about your medication adherence</p>
      </div>

      {showRiskAlert && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-amber-800">Adherence Risk Detected</h3>
              <div className="mt-2 text-sm text-amber-700">
                <p>
                  Our AI has detected a pattern of missed evening doses for your blood pressure medication. 
                  This may increase your risk of cardiovascular events. We recommend adjusting your evening 
                  reminder time or speaking with your healthcare provider.
                </p>
              </div>
              <div className="mt-4">
                <div className="-mx-2 -my-1.5 flex">
                  <button
                    type="button"
                    className="bg-amber-50 px-2 py-1.5 rounded-md text-sm font-medium text-amber-800 hover:bg-amber-100 focus:outline-none"
                  >
                    View Details
                  </button>
                  <button
                    type="button"
                    className="ml-3 bg-amber-50 px-2 py-1.5 rounded-md text-sm font-medium text-amber-800 hover:bg-amber-100 focus:outline-none"
                    onClick={() => setShowRiskAlert(false)}
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <h2 className="text-lg font-medium text-gray-900 mb-4 sm:mb-0">Adherence Trends</h2>
            <div className="flex space-x-2">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-gray-300 rounded-md text-sm p-2"
              >
                <option value="week">Last 7 days</option>
                <option value="month">Last 30 days</option>
                <option value="quarter">Last 90 days</option>
              </select>
              <button className="p-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md">
                <Download size={18} />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="h-80">
            <AdherenceChart />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">AI Insights</h2>
          </div>
          <div className="p-6">
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Time Pattern Detected</p>
                  <p className="text-sm text-gray-500">
                    You consistently miss your evening dose on Thursdays between 7-9 PM. This may be related to your weekly social activities.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Improvement Opportunity</p>
                  <p className="text-sm text-gray-500">
                    Taking your medication 30 minutes earlier in the morning could improve your adherence by an estimated 15%.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <svg className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Medication Interaction</p>
                  <p className="text-sm text-gray-500">
                    Your adherence to Metformin improves when taken with Lisinopril. Consider aligning these medications.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Health Impact Prediction</h2>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Blood Pressure Control</span>
                <span className="text-sm font-medium text-green-600">Good</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Based on your 85% adherence to blood pressure medication
              </p>
            </div>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Diabetes Management</span>
                <span className="text-sm font-medium text-amber-600">Moderate</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Based on your 65% adherence to diabetes medication
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Cholesterol Management</span>
                <span className="text-sm font-medium text-green-600">Excellent</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Based on your 95% adherence to cholesterol medication
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Exportable Reports</h2>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Generate New Report
            </button>
          </div>
        </div>
        <div className="p-6">
          <ul className="divide-y divide-gray-200">
            <li className="py-4 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-900">Monthly Adherence Summary</p>
                <p className="text-xs text-gray-500">Generated on May 1, 2025</p>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md">
                  <Download size={18} />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md">
                  <Share2 size={18} />
                </button>
              </div>
            </li>
            <li className="py-4 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-900">Quarterly Health Impact Report</p>
                <p className="text-xs text-gray-500">Generated on April 15, 2025</p>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md">
                  <Download size={18} />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md">
                  <Share2 size={18} />
                </button>
              </div>
            </li>
            <li className="py-4 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-900">Doctor's Visit Summary</p>
                <p className="text-xs text-gray-500">Generated on March 22, 2025</p>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md">
                  <Download size={18} />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md">
                  <Share2 size={18} />
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Reports;
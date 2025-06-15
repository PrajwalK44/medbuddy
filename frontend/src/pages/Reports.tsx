import React, { useState } from "react";
import {
  Download,
  Share2,
  Calendar,
  AlertTriangle,
  Activity,
  TrendingUp,
  Clock,
  BarChart2,
} from "lucide-react";
import AdherenceChart from "../components/AdherenceChart";

const Reports: React.FC = () => {
  const [timeRange, setTimeRange] = useState("week");
  const [showRiskAlert, setShowRiskAlert] = useState(true);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
          Reports & Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          View insights and trends about your medication adherence
        </p>
      </div>

      {showRiskAlert && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 border-l-4 border-amber-500 p-6 mb-8 rounded-xl shadow-sm">
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-300">
                Adherence Risk Detected
              </h3>
              <div className="mt-2 text-amber-700 dark:text-amber-400">
                <p>
                  Our AI has detected a pattern of missed evening doses for your
                  blood pressure medication. This may increase your risk of
                  cardiovascular events. We recommend adjusting your evening
                  reminder time or speaking with your healthcare provider.
                </p>
              </div>
              <div className="mt-4 flex space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-amber-100 dark:bg-amber-900/50 rounded-lg text-sm font-medium text-amber-800 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-800/50 transition-colors duration-200"
                >
                  View Details
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                  onClick={() => setShowRiskAlert(false)}
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 mb-8">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                <BarChart2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Adherence Trends
              </h2>
            </div>
            <div className="flex space-x-3 mt-4 sm:mt-0">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="week">Last 7 days</option>
                <option value="month">Last 30 days</option>
                <option value="quarter">Last 90 days</option>
              </select>
              <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                <Download size={18} />
              </button>
              <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="h-96">
            <AdherenceChart />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                AI Insights
              </h2>
            </div>
          </div>
          <div className="p-6">
            <ul className="space-y-6">
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                    Time Pattern Detected
                  </p>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    You consistently miss your evening dose on Thursdays between
                    7-9 PM. This may be related to your weekly social
                    activities.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                    Improvement Opportunity
                  </p>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Taking your medication 30 minutes earlier in the morning
                    could improve your adherence by an estimated 15%.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                    Medication Interaction
                  </p>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                    Your adherence to Metformin improves when taken with
                    Lisinopril. Consider aligning these medications.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Health Impact Prediction
              </h2>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Blood Pressure Control
                  </span>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    Good
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-400 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: "85%" }}
                  ></div>
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Based on your 85% adherence to blood pressure medication
                </p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Diabetes Management
                  </span>
                  <span className="text-sm font-medium text-amber-600 dark:text-amber-400">
                    Moderate
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-amber-400 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: "65%" }}
                  ></div>
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Based on your 65% adherence to diabetes medication
                </p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Cholesterol Management
                  </span>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    Excellent
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-400 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: "95%" }}
                  ></div>
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Based on your 95% adherence to cholesterol medication
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                <Download className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Exportable Reports
              </h2>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Generate New Report
            </button>
          </div>
        </div>
        <div className="p-6">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="py-4 flex justify-between items-center">
              <div>
                <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                  Monthly Adherence Summary
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Generated on May 1, 2025
                </p>
              </div>
              <div className="flex space-x-3">
                <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                  <Download size={18} />
                </button>
                <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                  <Share2 size={18} />
                </button>
              </div>
            </li>
            <li className="py-4 flex justify-between items-center">
              <div>
                <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                  Quarterly Health Impact Report
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Generated on April 15, 2025
                </p>
              </div>
              <div className="flex space-x-3">
                <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                  <Download size={18} />
                </button>
                <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                  <Share2 size={18} />
                </button>
              </div>
            </li>
            <li className="py-4 flex justify-between items-center">
              <div>
                <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                  Doctor's Visit Summary
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Generated on March 22, 2025
                </p>
              </div>
              <div className="flex space-x-3">
                <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                  <Download size={18} />
                </button>
                <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
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

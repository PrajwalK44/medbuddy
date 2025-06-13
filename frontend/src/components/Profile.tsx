import React, { useState } from 'react';
import { User, Settings, Bell, Shield, LogOut, ChevronRight, Heart, Calendar, Phone, Activity, Clock } from 'lucide-react';

const Profile: React.FC = () => {
  const [user] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: '1975-05-15',
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    emergencyContact: {
      name: 'Jane Doe',
      relation: 'Spouse',
      phone: '+1 (555) 987-6543',
    },
    medicalInfo: {
      allergies: ['Penicillin', 'Sulfa drugs'],
      conditions: ['Hypertension', 'Type 2 Diabetes'],
      bloodType: 'O+',
      physician: {
        name: 'Dr. Sarah Johnson',
        phone: '+1 (555) 234-5678',
        hospital: 'City General Hospital'
      }
    },
    notificationPreferences: {
      push: true,
      email: false,
      sms: true,
      voice: false,
    },
    healthGoals: [
      { id: 1, title: 'Take all medications', progress: 85 },
      { id: 2, title: 'Drink 8 glasses of water', progress: 60 },
      { id: 3, title: 'Walk 30 minutes daily', progress: 45 }
    ],
    appointments: [
      { id: 1, title: 'Dr. Johnson - Checkup', date: '2025-06-15', time: '10:00 AM' },
      { id: 2, title: 'Cardiologist Appointment', date: '2025-06-28', time: '2:30 PM' }
    ]
  });

  const [activeSection, setActiveSection] = useState('');

  const toggleSection = (section: string) => {
    if (activeSection === section) {
      setActiveSection('');
    } else {
      setActiveSection(section);
    }
  };

  // Calculate age from date of birth
  const calculateAge = (dob: string): number => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
          />
          <div className="ml-4">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <div className="flex items-center mt-1 text-sm text-gray-500">
              <span className="mr-3">{calculateAge(user.dateOfBirth)} years</span>
              <span className="mr-3">•</span>
              <span>{user.gender}</span>
            </div>
          </div>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 mt-4 text-center">
          <div className="bg-blue-50 rounded-lg p-2">
            <p className="text-xs text-blue-600 font-medium">Adherence</p>
            <p className="text-lg font-bold text-blue-700">85%</p>
          </div>
          <div className="bg-green-50 rounded-lg p-2">
            <p className="text-xs text-green-600 font-medium">Medications</p>
            <p className="text-lg font-bold text-green-700">3</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-2">
            <p className="text-xs text-purple-600 font-medium">Next Refill</p>
            <p className="text-lg font-bold text-purple-700">5 days</p>
          </div>
        </div>
      </div>
      
      {/* Health Goals */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <button 
          className="w-full p-4 flex justify-between items-center border-b"
          onClick={() => toggleSection('goals')}
        >
          <div className="flex items-center">
            <Activity className="text-green-500 mr-3" size={20} />
            <span className="font-medium">Health Goals</span>
          </div>
          <ChevronRight 
            className={`transition-transform ${activeSection === 'goals' ? 'rotate-90' : ''}`} 
            size={20} 
          />
        </button>
        
        {activeSection === 'goals' && (
          <div className="p-4 bg-gray-50">
            <div className="space-y-4">
              {user.healthGoals.map(goal => (
                <div key={goal.id} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{goal.title}</span>
                    <span className="text-sm font-medium">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        goal.progress > 80 ? 'bg-green-500' : 
                        goal.progress > 50 ? 'bg-blue-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
              <button className="mt-3 text-sm text-blue-600 font-medium flex items-center">
                <span className="mr-1">+</span> Add New Goal
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Upcoming Appointments */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <button 
          className="w-full p-4 flex justify-between items-center border-b"
          onClick={() => toggleSection('appointments')}
        >
          <div className="flex items-center">
            <Calendar className="text-blue-500 mr-3" size={20} />
            <span className="font-medium">Upcoming Appointments</span>
          </div>
          <ChevronRight 
            className={`transition-transform ${activeSection === 'appointments' ? 'rotate-90' : ''}`} 
            size={20} 
          />
        </button>
        
        {activeSection === 'appointments' && (
          <div className="p-4 bg-gray-50">
            {user.appointments.length > 0 ? (
              <div className="space-y-3">
                {user.appointments.map(appointment => (
                  <div key={appointment.id} className="bg-white p-3 rounded-md border border-gray-200">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{appointment.title}</h4>
                      <span className="text-sm text-blue-600">{appointment.time}</span>
                    </div>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <Calendar size={14} className="mr-1" />
                      <span>{appointment.date}</span>
                    </div>
                  </div>
                ))}
                <button className="mt-2 text-sm text-blue-600 font-medium flex items-center">
                  <span className="mr-1">+</span> Add Appointment
                </button>
              </div>
            ) : (
              <div className="text-center py-3">
                <p className="text-gray-500">No upcoming appointments</p>
                <button className="mt-2 text-sm text-blue-600 font-medium">
                  Schedule an appointment
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Medical Information */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <button 
          className="w-full p-4 flex justify-between items-center border-b"
          onClick={() => toggleSection('medical')}
        >
          <div className="flex items-center">
            <Heart className="text-red-500 mr-3" size={20} />
            <span className="font-medium">Medical Information</span>
          </div>
          <ChevronRight 
            className={`transition-transform ${activeSection === 'medical' ? 'rotate-90' : ''}`} 
            size={20} 
          />
        </button>
        
        {activeSection === 'medical' && (
          <div className="p-4 bg-gray-50">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">Blood Type</h4>
                <p className="bg-white px-3 py-2 rounded-md border border-gray-200">{user.medicalInfo.bloodType}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">Allergies</h4>
                {user.medicalInfo.allergies.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {user.medicalInfo.allergies.map((allergy, index) => (
                      <span key={index} className="bg-red-50 text-red-700 px-2 py-1 rounded-full text-sm">
                        {allergy}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No known allergies</p>
                )}
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">Medical Conditions</h4>
                {user.medicalInfo.conditions.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {user.medicalInfo.conditions.map((condition, index) => (
                      <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-sm">
                        {condition}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No known conditions</p>
                )}
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-1">Primary Physician</h4>
                <div className="bg-white p-3 rounded-md border border-gray-200">
                  <p className="font-medium">{user.medicalInfo.physician.name}</p>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <Phone size={14} className="mr-1" />
                    <span>{user.medicalInfo.physician.phone}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{user.medicalInfo.physician.hospital}</p>
                </div>
              </div>
              
              <button className="mt-2 text-sm text-blue-600 font-medium">
                Update Medical Information
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Account Settings */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <button 
          className="w-full p-4 flex justify-between items-center border-b"
          onClick={() => toggleSection('account')}
        >
          <div className="flex items-center">
            <User className="text-blue-500 mr-3" size={20} />
            <span className="font-medium">Account Information</span>
          </div>
          <ChevronRight 
            className={`transition-transform ${activeSection === 'account' ? 'rotate-90' : ''}`} 
            size={20} 
          />
        </button>
        
        {activeSection === 'account' && (
          <div className="p-4 bg-gray-50">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input 
                  type="text" 
                  value={user.name}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input 
                  type="email" 
                  value={user.email}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input 
                  type="tel" 
                  value={user.phone}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                <input 
                  type="date" 
                  value={user.dateOfBirth}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select 
                  disabled
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option>{user.gender}</option>
                </select>
              </div>
              <button className="mt-2 text-sm text-blue-600 font-medium">
                Edit Information
              </button>
            </div>
          </div>
        )}
        
        {/* Emergency Contact */}
        <button 
          className="w-full p-4 flex justify-between items-center border-b"
          onClick={() => toggleSection('emergency')}
        >
          <div className="flex items-center">
            <AlertCircle className="text-red-500 mr-3" size={20} />
            <span className="font-medium">Emergency Contact</span>
          </div>
          <ChevronRight 
            className={`transition-transform ${activeSection === 'emergency' ? 'rotate-90' : ''}`} 
            size={20} 
          />
        </button>
        
        {activeSection === 'emergency' && (
          <div className="p-4 bg-gray-50">
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Name</label>
                <input 
                  type="text" 
                  value={user.emergencyContact.name}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Relationship</label>
                <input 
                  type="text" 
                  value={user.emergencyContact.relation}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input 
                  type="tel" 
                  value={user.emergencyContact.phone}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button className="mt-2 text-sm text-blue-600 font-medium">
                Edit Emergency Contact
              </button>
            </div>
          </div>
        )}
        
        {/* Notification Settings */}
        <button 
          className="w-full p-4 flex justify-between items-center border-b"
          onClick={() => toggleSection('notifications')}
        >
          <div className="flex items-center">
            <Bell className="text-blue-500 mr-3" size={20} />
            <span className="font-medium">Notification Settings</span>
          </div>
          <ChevronRight 
            className={`transition-transform ${activeSection === 'notifications' ? 'rotate-90' : ''}`} 
            size={20} 
          />
        </button>
        
        {activeSection === 'notifications' && (
          <div className="p-4 bg-gray-50">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Push Notifications</span>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input 
                    type="checkbox" 
                    id="push" 
                    checked={user.notificationPreferences.push}
                    readOnly
                    className="sr-only"
                  />
                  <label 
                    htmlFor="push"
                    className={`block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer ${
                      user.notificationPreferences.push ? 'bg-blue-500' : ''
                    }`}
                  >
                    <span 
                      className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                        user.notificationPreferences.push ? 'translate-x-4' : 'translate-x-0'
                      }`} 
                    />
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Email Notifications</span>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input 
                    type="checkbox" 
                    id="email" 
                    checked={user.notificationPreferences.email}
                    readOnly
                    className="sr-only"
                  />
                  <label 
                    htmlFor="email"
                    className={`block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer ${
                      user.notificationPreferences.email ? 'bg-blue-500' : ''
                    }`}
                  >
                    <span 
                      className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                        user.notificationPreferences.email ? 'translate-x-4' : 'translate-x-0'
                      }`} 
                    />
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-700">SMS Notifications</span>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input 
                    type="checkbox" 
                    id="sms" 
                    checked={user.notificationPreferences.sms}
                    readOnly
                    className="sr-only"
                  />
                  <label 
                    htmlFor="sms"
                    className={`block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer ${
                      user.notificationPreferences.sms ? 'bg-blue-500' : ''
                    }`}
                  >
                    <span 
                      className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                        user.notificationPreferences.sms ? 'translate-x-4' : 'translate-x-0'
                      }`} 
                    />
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Voice Reminders</span>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input 
                    type="checkbox" 
                    id="voice" 
                    checked={user.notificationPreferences.voice}
                    readOnly
                    className="sr-only"
                  />
                  <label 
                    htmlFor="voice"
                    className={`block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer ${
                      user.notificationPreferences.voice ? 'bg-blue-500' : ''
                    }`}
                  >
                    <span 
                      className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                        user.notificationPreferences.voice ? 'translate-x-4' : 'translate-x-0'
                      }`} 
                    />
                  </label>
                </div>
              </div>
              
              <div className="mt-3">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Reminder Timing</h4>
                <div className="flex items-center space-x-2">
                  <Clock size={16} className="text-gray-500" />
                  <select className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm">
                    <option>At the exact time</option>
                    <option>5 minutes before</option>
                    <option>15 minutes before</option>
                    <option>30 minutes before</option>
                  </select>
                </div>
              </div>
              
              <button className="mt-2 text-sm text-blue-600 font-medium">
                Save Preferences
              </button>
            </div>
          </div>
        )}
        
        {/* Privacy & Security */}
        <button 
          className="w-full p-4 flex justify-between items-center border-b"
          onClick={() => toggleSection('privacy')}
        >
          <div className="flex items-center">
            <Shield className="text-blue-500 mr-3" size={20} />
            <span className="font-medium">Privacy & Security</span>
          </div>
          <ChevronRight 
            className={`transition-transform ${activeSection === 'privacy' ? 'rotate-90' : ''}`} 
            size={20} 
          />
        </button>
        
        {activeSection === 'privacy' && (
          <div className="p-4 bg-gray-50">
            <div className="space-y-3">
              <button className="w-full text-left py-2 text-gray-700 hover:text-blue-600">
                Change Password
              </button>
              <button className="w-full text-left py-2 text-gray-700 hover:text-blue-600">
                Two-Factor Authentication
              </button>
              <button className="w-full text-left py-2 text-gray-700 hover:text-blue-600">
                Data Privacy Settings
              </button>
              <button className="w-full text-left py-2 text-gray-700 hover:text-blue-600">
                Export My Data
              </button>
              <div className="pt-2 border-t border-gray-200 mt-2">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Data Sharing</h4>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 text-sm">Share data with my doctor</span>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      id="shareDoctor" 
                      checked={true}
                      readOnly
                      className="sr-only"
                    />
                    <label 
                      htmlFor="shareDoctor"
                      className="block overflow-hidden h-6 rounded-full bg-blue-500 cursor-pointer"
                    >
                      <span 
                        className="block h-6 w-6 rounded-full bg-white shadow transform translate-x-4" 
                      />
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-gray-700 text-sm">Share data with caregivers</span>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input 
                      type="checkbox" 
                      id="shareCaregiver" 
                      checked={true}
                      readOnly
                      className="sr-only"
                    />
                    <label 
                      htmlFor="shareCaregiver"
                      className="block overflow-hidden h-6 rounded-full bg-blue-500 cursor-pointer"
                    >
                      <span 
                        className="block h-6 w-6 rounded-full bg-white shadow transform translate-x-4" 
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* App Settings */}
        <button 
          className="w-full p-4 flex justify-between items-center border-b"
          onClick={() => toggleSection('settings')}
        >
          <div className="flex items-center">
            <Settings className="text-blue-500 mr-3" size={20} />
            <span className="font-medium">App Settings</span>
          </div>
          <ChevronRight 
            className={`transition-transform ${activeSection === 'settings' ? 'rotate-90' : ''}`} 
            size={20} 
          />
        </button>
        
        {activeSection === 'settings' && (
          <div className="p-4 bg-gray-50">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Dark Mode</span>
                <div className="relative inline-block w-10 mr-2 align-middle select-none">
                  <input 
                    type="checkbox" 
                    id="darkMode" 
                    className="sr-only"
                  />
                  <label 
                    htmlFor="darkMode"
                    className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                  >
                    <span 
                      className="block h-6 w-6 rounded-full bg-white shadow transform transition-transform" 
                    />
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Language</label>
                <select className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Measurement Units</label>
                <select className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option>Imperial (lbs, in)</option>
                  <option>Metric (kg, cm)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Time Format</label>
                <select className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                  <option>12-hour (AM/PM)</option>
                  <option>24-hour</option>
                </select>
              </div>
              
              <button className="mt-2 text-sm text-blue-600 font-medium">
                Save Settings
              </button>
            </div>
          </div>
        )}
        
        {/* Logout */}
        <button className="w-full p-4 flex items-center text-red-500">
          <LogOut className="mr-3" size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
      
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
        <h3 className="font-medium text-blue-800 mb-2">About MedTracker</h3>
        <p className="text-sm text-blue-700">
          Version 1.0.0 | © 2025 MedTracker
        </p>
        <div className="mt-3 space-x-3">
          <button className="text-sm text-blue-600 hover:text-blue-800">Privacy Policy</button>
          <span className="text-blue-300">|</span>
          <button className="text-sm text-blue-600 hover:text-blue-800">Terms of Service</button>
          <span className="text-blue-300">|</span>
          <button className="text-sm text-blue-600 hover:text-blue-800">Help Center</button>
        </div>
      </div>
    </div>
  );
};

// Missing component
const AlertCircle = ({ ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28px"
      height="28px"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
};

export default Profile;
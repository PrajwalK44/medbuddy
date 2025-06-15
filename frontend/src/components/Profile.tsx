import React, { useState } from "react";
import {
  User,
  Settings,
  Bell,
  Shield,
  LogOut,
  ChevronRight,
  Heart,
  Calendar,
  Phone,
  Activity,
  Clock,
  Mail,
} from "lucide-react";

const Profile: React.FC = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1975-05-15",
    gender: "Male",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    emergencyContact: {
      name: "Jane Doe",
      relation: "Spouse",
      phone: "+1 (555) 987-6543",
    },
    medicalInfo: {
      allergies: ["Penicillin", "Sulfa drugs"],
      conditions: ["Hypertension", "Type 2 Diabetes"],
      bloodType: "O+",
      physician: {
        name: "Dr. Sarah Johnson",
        phone: "+1 (555) 234-5678",
        hospital: "City General Hospital",
      },
    },
    notificationPreferences: {
      push: true,
      email: false,
      sms: true,
      voice: false,
    },
    healthGoals: [
      { id: 1, title: "Take all medications", progress: 85 },
      { id: 2, title: "Drink 8 glasses of water", progress: 60 },
      { id: 3, title: "Walk 30 minutes daily", progress: 45 },
    ],
    appointments: [
      {
        id: 1,
        title: "Dr. Johnson - Checkup",
        date: "2025-06-15",
        time: "10:00 AM",
      },
      {
        id: 2,
        title: "Cardiologist Appointment",
        date: "2025-06-28",
        time: "2:30 PM",
      },
    ],
  });

  const [activeSection, setActiveSection] = useState("");
  const [isNewGoalDialogOpen, setIsNewGoalDialogOpen] = useState(false);
  const [isNewAppointmentDialogOpen, setIsNewAppointmentDialogOpen] =
    useState(false);
  const [isUpdateMedicalOpen, setIsUpdateMedicalOpen] = useState(false);
  const [isUpdateAccountOpen, setIsUpdateAccountOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
  });
  const [newAppointment, setNewAppointment] = useState({
    title: "",
    date: "",
    time: "",
  });
  const [newAllergy, setNewAllergy] = useState("");
  const [newCondition, setNewCondition] = useState("");
  const [newPhysician, setNewPhysician] = useState({
    name: "",
    phone: "",
    hospital: "",
  });
  const [updatedMedical, setUpdatedMedical] = useState({
    bloodType: "",
    allergies: [] as string[],
    conditions: [] as string[],
    physicians: [] as Array<{
      name: string;
      phone: string;
      hospital: string;
    }>,
  });
  const [updatedAccount, setUpdatedAccount] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
  });

  const toggleSection = (section: string) => {
    if (activeSection === section) {
      setActiveSection("");
    } else {
      setActiveSection(section);
    }
  };

  const handleAddGoal = () => {
    if (newGoal.title.trim()) {
      const goal = {
        id: user.healthGoals.length + 1,
        title: newGoal.title,
        progress: 0,
      };
      setUser({
        ...user,
        healthGoals: [...user.healthGoals, goal],
      });
      setNewGoal({ title: "" });
      setIsNewGoalDialogOpen(false);
    }
  };

  const handleAddAppointment = () => {
    if (
      newAppointment.title.trim() &&
      newAppointment.date &&
      newAppointment.time
    ) {
      const appointment = {
        id: user.appointments.length + 1,
        title: newAppointment.title,
        date: newAppointment.date,
        time: newAppointment.time,
      };
      setUser({
        ...user,
        appointments: [...user.appointments, appointment],
      });
      setNewAppointment({ title: "", date: "", time: "" });
      setIsNewAppointmentDialogOpen(false);
    }
  };

  const handleAddAllergy = () => {
    if (newAllergy.trim()) {
      setUpdatedMedical({
        ...updatedMedical,
        allergies: [...updatedMedical.allergies, newAllergy.trim()],
      });
      setNewAllergy("");
    }
  };

  const handleRemoveAllergy = (index: number) => {
    setUpdatedMedical({
      ...updatedMedical,
      allergies: updatedMedical.allergies.filter((_, i) => i !== index),
    });
  };

  const handleAddCondition = () => {
    if (newCondition.trim()) {
      setUpdatedMedical({
        ...updatedMedical,
        conditions: [...updatedMedical.conditions, newCondition.trim()],
      });
      setNewCondition("");
    }
  };

  const handleRemoveCondition = (index: number) => {
    setUpdatedMedical({
      ...updatedMedical,
      conditions: updatedMedical.conditions.filter((_, i) => i !== index),
    });
  };

  const handleAddPhysician = () => {
    if (
      newPhysician.name.trim() &&
      newPhysician.phone.trim() &&
      newPhysician.hospital.trim()
    ) {
      setUpdatedMedical({
        ...updatedMedical,
        physicians: [...updatedMedical.physicians, { ...newPhysician }],
      });
      setNewPhysician({ name: "", phone: "", hospital: "" });
    }
  };

  const handleRemovePhysician = (index: number) => {
    setUpdatedMedical({
      ...updatedMedical,
      physicians: updatedMedical.physicians.filter((_, i) => i !== index),
    });
  };

  const handleUpdateMedical = () => {
    setUser({
      ...user,
      medicalInfo: {
        ...user.medicalInfo,
        bloodType: updatedMedical.bloodType,
        allergies: updatedMedical.allergies,
        conditions: updatedMedical.conditions,
        physicians: updatedMedical.physicians, // Store the full array
      },
    });
    setIsUpdateMedicalOpen(false);
  };

  const handleUpdateAccount = () => {
    setUser({
      ...user,
      name: updatedAccount.name,
      email: updatedAccount.email,
      phone: updatedAccount.phone,
      dateOfBirth: updatedAccount.dateOfBirth,
      gender: updatedAccount.gender,
    });
    setIsUpdateAccountOpen(false);
  };

  // Calculate age from date of birth
  const calculateAge = (dob: string): number => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700">
          <div className="flex items-center">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
              />
              <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1.5 border-2 border-white dark:border-gray-700">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                {user.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {isUpdateAccountOpen ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={updatedAccount.name}
                  onChange={(e) =>
                    setUpdatedAccount({
                      ...updatedAccount,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={updatedAccount.email}
                  onChange={(e) =>
                    setUpdatedAccount({
                      ...updatedAccount,
                      email: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={updatedAccount.phone}
                  onChange={(e) =>
                    setUpdatedAccount({
                      ...updatedAccount,
                      phone: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={updatedAccount.dateOfBirth}
                  onChange={(e) =>
                    setUpdatedAccount({
                      ...updatedAccount,
                      dateOfBirth: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Gender
                </label>
                <select
                  value={updatedAccount.gender}
                  onChange={(e) =>
                    setUpdatedAccount({
                      ...updatedAccount,
                      gender: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsUpdateAccountOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateAccount}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Age
                  </h4>
                  <p className="bg-white dark:bg-gray-800 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 font-medium">
                    {calculateAge(user.dateOfBirth)} years
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Gender
                  </h4>
                  <p className="bg-white dark:bg-gray-800 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 font-medium">
                    {user.gender}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Contact Information
                </h4>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 space-y-3">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Mail size={16} className="mr-2" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Phone size={16} className="mr-2" />
                    <span>{user.phone}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setUpdatedAccount({
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    dateOfBirth: user.dateOfBirth,
                    gender: user.gender,
                  });
                  setIsUpdateAccountOpen(true);
                }}
                className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
              >
                Update Account Information
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Health Goals */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <button
          className="w-full p-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
          onClick={() => toggleSection("goals")}
        >
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-4">
              <Activity
                className="text-green-600 dark:text-green-400"
                size={20}
              />
            </div>
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Health Goals
            </span>
          </div>
          <ChevronRight
            className={`transition-transform duration-200 ${
              activeSection === "goals" ? "rotate-90" : ""
            } text-gray-400`}
            size={20}
          />
        </button>

        {activeSection === "goals" && (
          <div className="p-6 bg-gray-50 dark:bg-gray-700/50 animate-slideDown">
            <div className="space-y-6">
              {user.healthGoals.map((goal) => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {goal.title}
                    </span>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {goal.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-500 ${
                        goal.progress > 80
                          ? "bg-gradient-to-r from-green-500 to-green-400"
                          : goal.progress > 50
                          ? "bg-gradient-to-r from-blue-500 to-blue-400"
                          : "bg-gradient-to-r from-yellow-500 to-yellow-400"
                      }`}
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}

              {isNewGoalDialogOpen ? (
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 animate-slideDown">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Goal Title
                    </label>
                    <input
                      type="text"
                      value={newGoal.title}
                      onChange={(e) =>
                        setNewGoal({ ...newGoal, title: e.target.value })
                      }
                      placeholder="e.g., Exercise 30 minutes daily"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setIsNewGoalDialogOpen(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddGoal}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                    >
                      Add Goal
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setIsNewGoalDialogOpen(true)}
                  className="mt-4 text-sm text-blue-600 dark:text-blue-400 font-medium flex items-center hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
                >
                  <span className="mr-1">+</span> Add New Goal
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <button
          className="w-full p-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
          onClick={() => toggleSection("appointments")}
        >
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
              <Calendar
                className="text-blue-600 dark:text-blue-400"
                size={20}
              />
            </div>
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Upcoming Appointments
            </span>
          </div>
          <ChevronRight
            className={`transition-transform duration-200 ${
              activeSection === "appointments" ? "rotate-90" : ""
            } text-gray-400`}
            size={20}
          />
        </button>

        {activeSection === "appointments" && (
          <div className="p-6 bg-gray-50 dark:bg-gray-700/50 animate-slideDown">
            {user.appointments.length > 0 ? (
              <div className="space-y-4">
                {user.appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">
                        {appointment.title}
                      </h4>
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                        {appointment.time}
                      </span>
                    </div>
                    <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar size={14} className="mr-2" />
                      <span>{appointment.date}</span>
                    </div>
                  </div>
                ))}

                {isNewAppointmentDialogOpen ? (
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 animate-slideDown">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Appointment Title
                        </label>
                        <input
                          type="text"
                          value={newAppointment.title}
                          onChange={(e) =>
                            setNewAppointment({
                              ...newAppointment,
                              title: e.target.value,
                            })
                          }
                          placeholder="e.g., Annual Checkup"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Date
                        </label>
                        <input
                          type="date"
                          value={newAppointment.date}
                          onChange={(e) =>
                            setNewAppointment({
                              ...newAppointment,
                              date: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Time
                        </label>
                        <input
                          type="time"
                          value={newAppointment.time}
                          onChange={(e) =>
                            setNewAppointment({
                              ...newAppointment,
                              time: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => setIsNewAppointmentDialogOpen(false)}
                          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleAddAppointment}
                          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                        >
                          Add Appointment
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsNewAppointmentDialogOpen(true)}
                    className="mt-4 text-sm text-blue-600 dark:text-blue-400 font-medium flex items-center hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
                  >
                    <span className="mr-1">+</span> Add Appointment
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500 dark:text-gray-400">
                  No upcoming appointments
                </p>
                <button
                  onClick={() => setIsNewAppointmentDialogOpen(true)}
                  className="mt-3 text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
                >
                  Schedule an appointment
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Medical Information */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <button
          className="w-full p-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
          onClick={() => toggleSection("medical")}
        >
          <div className="flex items-center">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg mr-4">
              <Heart className="text-red-600 dark:text-red-400" size={20} />
            </div>
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Medical Information
            </span>
          </div>
          <ChevronRight
            className={`transition-transform duration-200 ${
              activeSection === "medical" ? "rotate-90" : ""
            } text-gray-400`}
            size={20}
          />
        </button>

        {activeSection === "medical" && (
          <div className="p-6 bg-gray-50 dark:bg-gray-700/50 animate-slideDown">
            <div className="space-y-6">
              {isUpdateMedicalOpen ? (
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 animate-slideDown">
                  <div className="space-y-6">
                    {/* Blood Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Blood Type
                      </label>
                      <select
                        value={updatedMedical.bloodType}
                        onChange={(e) =>
                          setUpdatedMedical({
                            ...updatedMedical,
                            bloodType: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select Blood Type</option>
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

                    {/* Allergies */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Allergies
                      </label>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {updatedMedical.allergies.map((allergy, index) => (
                          <span
                            key={index}
                            className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-1.5 rounded-full text-sm font-medium flex items-center"
                          >
                            {allergy}
                            <button
                              onClick={() => handleRemoveAllergy(index)}
                              className="ml-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newAllergy}
                          onChange={(e) => setNewAllergy(e.target.value)}
                          placeholder="Add new allergy"
                          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                          onClick={handleAddAllergy}
                          className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-800/30 transition-colors duration-200"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Medical Conditions */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Medical Conditions
                      </label>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {updatedMedical.conditions.map((condition, index) => (
                          <span
                            key={index}
                            className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-full text-sm font-medium flex items-center"
                          >
                            {condition}
                            <button
                              onClick={() => handleRemoveCondition(index)}
                              className="ml-2 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newCondition}
                          onChange={(e) => setNewCondition(e.target.value)}
                          placeholder="Add new condition"
                          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                          onClick={handleAddCondition}
                          className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-colors duration-200"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Primary Physicians */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Primary Physicians
                      </label>
                      <div className="space-y-3 mb-4">
                        {updatedMedical.physicians.map((physician, index) => (
                          <div
                            key={index}
                            className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 flex justify-between items-start"
                          >
                            <div>
                              <p className="font-medium text-gray-900 dark:text-gray-100">
                                {physician.name}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {physician.phone}
                              </p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {physician.hospital}
                              </p>
                            </div>
                            <button
                              onClick={() => handleRemovePhysician(index)}
                              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={newPhysician.name}
                          onChange={(e) =>
                            setNewPhysician({
                              ...newPhysician,
                              name: e.target.value,
                            })
                          }
                          placeholder="Doctor's Name"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                          type="tel"
                          value={newPhysician.phone}
                          onChange={(e) =>
                            setNewPhysician({
                              ...newPhysician,
                              phone: e.target.value,
                            })
                          }
                          placeholder="Phone Number"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <input
                          type="text"
                          value={newPhysician.hospital}
                          onChange={(e) =>
                            setNewPhysician({
                              ...newPhysician,
                              hospital: e.target.value,
                            })
                          }
                          placeholder="Hospital/Clinic Name"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                          onClick={handleAddPhysician}
                          className="w-full px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-800/30 transition-colors duration-200"
                        >
                          Add Physician
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setIsUpdateMedicalOpen(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleUpdateMedical}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Blood Type
                    </h4>
                    <p className="bg-white dark:bg-gray-800 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 font-medium">
                      {user.medicalInfo.bloodType}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Allergies
                    </h4>
                    {user.medicalInfo.allergies.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {user.medicalInfo.allergies.map((allergy, index) => (
                          <span
                            key={index}
                            className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-1.5 rounded-full text-sm font-medium"
                          >
                            {allergy}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        No known allergies
                      </p>
                    )}
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Medical Conditions
                    </h4>
                    {user.medicalInfo.conditions.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {user.medicalInfo.conditions.map((condition, index) => (
                          <span
                            key={index}
                            className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-full text-sm font-medium"
                          >
                            {condition}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        No known conditions
                      </p>
                    )}
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Primary Physician
                    </h4>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {user.medicalInfo.physician.name}
                      </p>
                      <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <Phone size={14} className="mr-2" />
                        <span>{user.medicalInfo.physician.phone}</span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {user.medicalInfo.physician.hospital}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setUpdatedMedical({
                        bloodType: user.medicalInfo.bloodType,
                        allergies: [...user.medicalInfo.allergies],
                        conditions: [...user.medicalInfo.conditions],
                        physicians: [user.medicalInfo.physician],
                      });
                      setIsUpdateMedicalOpen(true);
                    }}
                    className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
                  >
                    Update Medical Information
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Account Settings */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        <button
          className="w-full p-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
          onClick={() => toggleSection("account")}
        >
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
              <User className="text-blue-600 dark:text-blue-400" size={20} />
            </div>
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Account Information
            </span>
          </div>
          <ChevronRight
            className={`transition-transform duration-200 ${
              activeSection === "account" ? "rotate-90" : ""
            } text-gray-400`}
            size={20}
          />
        </button>

        {activeSection === "account" && (
          <div className="p-6 bg-gray-50 dark:bg-gray-700/50 animate-slideDown">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <input
                  type="text"
                  value={user.name}
                  readOnly
                  className="mt-1 block w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="mt-1 block w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone
                </label>
                <input
                  type="tel"
                  value={user.phone}
                  readOnly
                  className="mt-1 block w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={user.dateOfBirth}
                  readOnly
                  className="mt-1 block w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Gender
                </label>
                <select
                  disabled
                  className="mt-1 block w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-gray-100"
                >
                  <option>{user.gender}</option>
                </select>
              </div>
              <button className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200">
                Edit Information
              </button>
            </div>
          </div>
        )}

        {/* Emergency Contact */}
        <button
          className="w-full p-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
          onClick={() => toggleSection("emergency")}
        >
          <div className="flex items-center">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg mr-4">
              <AlertCircle
                className="text-red-600 dark:text-red-400"
                size={20}
              />
            </div>
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Emergency Contact
            </span>
          </div>
          <ChevronRight
            className={`transition-transform duration-200 ${
              activeSection === "emergency" ? "rotate-90" : ""
            } text-gray-400`}
            size={20}
          />
        </button>

        {activeSection === "emergency" && (
          <div className="p-6 bg-gray-50 dark:bg-gray-700/50 animate-slideDown">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Contact Name
                </label>
                <input
                  type="text"
                  value={user.emergencyContact.name}
                  readOnly
                  className="mt-1 block w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Relationship
                </label>
                <input
                  type="text"
                  value={user.emergencyContact.relation}
                  readOnly
                  className="mt-1 block w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone
                </label>
                <input
                  type="tel"
                  value={user.emergencyContact.phone}
                  readOnly
                  className="mt-1 block w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-gray-100"
                />
              </div>
              <button className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200">
                Edit Emergency Contact
              </button>
            </div>
          </div>
        )}

        {/* Notification Settings */}
        <button
          className="w-full p-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
          onClick={() => toggleSection("notifications")}
        >
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
              <Bell className="text-blue-600 dark:text-blue-400" size={20} />
            </div>
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Notification Settings
            </span>
          </div>
          <ChevronRight
            className={`transition-transform duration-200 ${
              activeSection === "notifications" ? "rotate-90" : ""
            } text-gray-400`}
            size={20}
          />
        </button>

        {activeSection === "notifications" && (
          <div className="p-6 bg-gray-50 dark:bg-gray-700/50 animate-slideDown">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <span className="text-gray-700 dark:text-gray-300">
                  Push Notifications
                </span>
                <div className="relative inline-block w-12 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    id="push"
                    checked={user.notificationPreferences.push}
                    readOnly
                    className="sr-only"
                  />
                  <label
                    htmlFor="push"
                    className={`block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer transition-colors duration-200 ${
                      user.notificationPreferences.push ? "bg-blue-500" : ""
                    }`}
                  >
                    <span
                      className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ${
                        user.notificationPreferences.push
                          ? "translate-x-6"
                          : "translate-x-0"
                      }`}
                    />
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <span className="text-gray-700 dark:text-gray-300">
                  Email Notifications
                </span>
                <div className="relative inline-block w-12 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    id="email"
                    checked={user.notificationPreferences.email}
                    readOnly
                    className="sr-only"
                  />
                  <label
                    htmlFor="email"
                    className={`block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer transition-colors duration-200 ${
                      user.notificationPreferences.email ? "bg-blue-500" : ""
                    }`}
                  >
                    <span
                      className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ${
                        user.notificationPreferences.email
                          ? "translate-x-6"
                          : "translate-x-0"
                      }`}
                    />
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <span className="text-gray-700 dark:text-gray-300">
                  SMS Notifications
                </span>
                <div className="relative inline-block w-12 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    id="sms"
                    checked={user.notificationPreferences.sms}
                    readOnly
                    className="sr-only"
                  />
                  <label
                    htmlFor="sms"
                    className={`block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer transition-colors duration-200 ${
                      user.notificationPreferences.sms ? "bg-blue-500" : ""
                    }`}
                  >
                    <span
                      className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ${
                        user.notificationPreferences.sms
                          ? "translate-x-6"
                          : "translate-x-0"
                      }`}
                    />
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <span className="text-gray-700 dark:text-gray-300">
                  Voice Reminders
                </span>
                <div className="relative inline-block w-12 mr-2 align-middle select-none">
                  <input
                    type="checkbox"
                    id="voice"
                    checked={user.notificationPreferences.voice}
                    readOnly
                    className="sr-only"
                  />
                  <label
                    htmlFor="voice"
                    className={`block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer transition-colors duration-200 ${
                      user.notificationPreferences.voice ? "bg-blue-500" : ""
                    }`}
                  >
                    <span
                      className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ${
                        user.notificationPreferences.voice
                          ? "translate-x-6"
                          : "translate-x-0"
                      }`}
                    />
                  </label>
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Reminder Timing
                </h4>
                <div className="flex items-center space-x-3">
                  <Clock
                    size={16}
                    className="text-gray-500 dark:text-gray-400"
                  />
                  <select className="block w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-gray-100">
                    <option>At the exact time</option>
                    <option>5 minutes before</option>
                    <option>15 minutes before</option>
                    <option>30 minutes before</option>
                  </select>
                </div>
              </div>

              <button className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200">
                Save Preferences
              </button>
            </div>
          </div>
        )}

        {/* Privacy & Security */}
        <button
          className="w-full p-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
          onClick={() => toggleSection("privacy")}
        >
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
              <Shield className="text-blue-600 dark:text-blue-400" size={20} />
            </div>
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Privacy & Security
            </span>
          </div>
          <ChevronRight
            className={`transition-transform duration-200 ${
              activeSection === "privacy" ? "rotate-90" : ""
            } text-gray-400`}
            size={20}
          />
        </button>

        {activeSection === "privacy" && (
          <div className="p-6 bg-gray-50 dark:bg-gray-700/50 animate-slideDown">
            <div className="space-y-4">
              <button className="w-full text-left p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                Change Password
              </button>
              <button className="w-full text-left p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                Two-Factor Authentication
              </button>
              <button className="w-full text-left p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                Data Privacy Settings
              </button>
              <button className="w-full text-left p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                Export My Data
              </button>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Data Sharing
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                      Share data with my doctor
                    </span>
                    <div className="relative inline-block w-12 mr-2 align-middle select-none">
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
                        <span className="block h-6 w-6 rounded-full bg-white shadow transform translate-x-6" />
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                      Share data with caregivers
                    </span>
                    <div className="relative inline-block w-12 mr-2 align-middle select-none">
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
                        <span className="block h-6 w-6 rounded-full bg-white shadow transform translate-x-6" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* App Settings */}
        <button
          className="w-full p-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
          onClick={() => toggleSection("settings")}
        >
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
              <Settings
                className="text-blue-600 dark:text-blue-400"
                size={20}
              />
            </div>
            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              App Settings
            </span>
          </div>
          <ChevronRight
            className={`transition-transform duration-200 ${
              activeSection === "settings" ? "rotate-90" : ""
            } text-gray-400`}
            size={20}
          />
        </button>

        {activeSection === "settings" && (
          <div className="p-6 bg-gray-50 dark:bg-gray-700/50 animate-slideDown">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <span className="text-gray-700 dark:text-gray-300">
                  Dark Mode
                </span>
                <div className="relative inline-block w-12 mr-2 align-middle select-none">
                  <input type="checkbox" id="darkMode" className="sr-only" />
                  <label
                    htmlFor="darkMode"
                    className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                  >
                    <span className="block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200" />
                  </label>
                </div>
              </div>

              <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Language
                </label>
                <select className="block w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-gray-100">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>

              <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Measurement Units
                </label>
                <select className="block w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-gray-100">
                  <option>Imperial (lbs, in)</option>
                  <option>Metric (kg, cm)</option>
                </select>
              </div>

              <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Time Format
                </label>
                <select className="block w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-gray-100">
                  <option>12-hour (AM/PM)</option>
                  <option>24-hour</option>
                </select>
              </div>

              <button className="text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200">
                Save Settings
              </button>
            </div>
          </div>
        )}

        {/* Logout */}
        <button className="w-full p-6 flex items-center text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors duration-200">
          <LogOut className="mr-4" size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-6 border border-blue-100 dark:border-blue-800/50">
        <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">
          About MedTracker
        </h3>
        <p className="text-sm text-blue-700 dark:text-blue-400">
          Version 1.0.0 | © 2025 MedTracker
        </p>
        <div className="mt-4 space-x-4">
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200">
            Privacy Policy
          </button>
          <span className="text-blue-300 dark:text-blue-600">|</span>
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200">
            Terms of Service
          </button>
          <span className="text-blue-300 dark:text-blue-600">|</span>
          <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200">
            Help Center
          </button>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-100%);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-slideDown {
            animation: slideDown 0.3s ease-out;
          }
        `,
        }}
      />
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

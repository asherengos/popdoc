import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { PillIcon, Plus, Edit, Trash2 } from 'lucide-react';

const MedicationManager: React.FC = () => {
  const { user, selectedDoctor, addMedication } = useUser();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: 'daily',
    timeOfDay: [] as string[],
    notes: ''
  });

  if (!user || !selectedDoctor) return null;

  const handleTimeOfDayChange = (time: string) => {
    if (newMedication.timeOfDay.includes(time)) {
      setNewMedication({
        ...newMedication,
        timeOfDay: newMedication.timeOfDay.filter(t => t !== time)
      });
    } else {
      setNewMedication({
        ...newMedication,
        timeOfDay: [...newMedication.timeOfDay, time]
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMedication.name && newMedication.dosage && newMedication.timeOfDay.length > 0) {
      addMedication(newMedication);
      setNewMedication({
        name: '',
        dosage: '',
        frequency: 'daily',
        timeOfDay: [],
        notes: ''
      });
      setShowAddForm(false);
    }
  };

  // Group medications by time of day
  const medicationsByTime: Record<string, typeof user.medications> = {
    morning: [],
    afternoon: [],
    evening: [],
    night: []
  };

  user.medications.forEach(med => {
    med.timeOfDay.forEach(time => {
      if (medicationsByTime[time]) {
        medicationsByTime[time].push(med);
      }
    });
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: selectedDoctor.primaryColor }}>
            Medication Management
          </h1>
          <p className="text-gray-600">
            Track and manage your prescriptions and supplements
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 py-2 px-4 rounded-md text-white"
          style={{ backgroundColor: selectedDoctor.primaryColor }}
        >
          <Plus size={18} />
          Add Medication
        </button>
      </header>

      {/* Add Medication Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Add New Medication</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Medication Name
                </label>
                <input
                  type="text"
                  value={newMedication.name}
                  onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
                  className="w-full p-2 border rounded focus:ring-2 focus:outline-none"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dosage
                </label>
                <input
                  type="text"
                  value={newMedication.dosage}
                  onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
                  placeholder="e.g., 10mg, 1 tablet"
                  className="w-full p-2 border rounded focus:ring-2 focus:outline-none"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Frequency
                </label>
                <select
                  value={newMedication.frequency}
                  onChange={(e) => setNewMedication({ ...newMedication, frequency: e.target.value })}
                  className="w-full p-2 border rounded focus:ring-2 focus:outline-none"
                >
                  <option value="daily">Daily</option>
                  <option value="twice-daily">Twice Daily</option>
                  <option value="as-needed">As Needed</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time of Day
                </label>
                <div className="flex flex-wrap gap-2">
                  {['morning', 'afternoon', 'evening', 'night'].map(time => (
                    <label key={time} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newMedication.timeOfDay.includes(time)}
                        onChange={() => handleTimeOfDayChange(time)}
                        className="mr-1"
                      />
                      <span className="capitalize">{time}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (Optional)
                </label>
                <textarea
                  value={newMedication.notes}
                  onChange={(e) => setNewMedication({ ...newMedication, notes: e.target.value })}
                  className="w-full p-2 border rounded focus:ring-2 focus:outline-none"
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="py-2 px-4 border rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 rounded-md text-white"
                  style={{ backgroundColor: selectedDoctor.primaryColor }}
                >
                  Add Medication
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Current Medications */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-6 flex items-center">
          <PillIcon className="mr-2" size={20} style={{ color: selectedDoctor.primaryColor }} />
          Current Medications
        </h2>
        
        {user.medications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>You haven't added any medications yet.</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="mt-4 text-sm font-medium"
              style={{ color: selectedDoctor.primaryColor }}
            >
              Add your first medication
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(medicationsByTime).map(([time, medications]) => 
              medications.length > 0 && (
                <div key={time}>
                  <h3 className="text-lg font-medium mb-3 capitalize">{time}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {medications.map(med => (
                      <div 
                        key={med.id} 
                        className="border rounded-lg p-4 relative"
                        style={{ borderColor: `${selectedDoctor.primaryColor}30` }}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold">{med.name}</h4>
                            <p className="text-gray-600">{med.dosage}</p>
                          </div>
                          <div className="flex space-x-1">
                            <button className="p-1 text-gray-400 hover:text-gray-600">
                              <Edit size={16} />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-red-500">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                        <div className="mt-2 text-sm">
                          <span className="font-medium">Frequency:</span> {med.frequency}
                        </div>
                        <div className="mt-1 text-sm">
                          <span className="font-medium">Times:</span> {med.timeOfDay.join(', ')}
                        </div>
                        {med.notes && (
                          <div className="mt-2 text-sm text-gray-500">
                            {med.notes}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicationManager;
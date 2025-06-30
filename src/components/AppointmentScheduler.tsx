import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { Calendar, Clock, MapPin, Plus, Edit, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from '../utils/dateUtils';

const AppointmentScheduler: React.FC = () => {
  const { user, selectedDoctor, addAppointment } = useUser();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    title: '',
    date: '',
    time: '',
    notes: '',
    location: ''
  });

  if (!user || !selectedDoctor) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAppointment.title && newAppointment.date && newAppointment.time) {
      addAppointment(newAppointment);
      setNewAppointment({
        title: '',
        date: '',
        time: '',
        notes: '',
        location: ''
      });
      setShowAddForm(false);
    }
  };

  // Group appointments by upcoming vs past
  const today = new Date().toISOString().split('T')[0];
  const upcomingAppointments = user.appointments
    .filter(apt => apt.date >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const pastAppointments = user.appointments
    .filter(apt => apt.date < today)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: selectedDoctor.primaryColor }}>
            Appointment Scheduler
          </h1>
          <p className="text-gray-600">
            Manage your healthcare appointments and visits
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 py-2 px-4 rounded-md text-white"
          style={{ backgroundColor: selectedDoctor.primaryColor }}
        >
          <Plus size={18} />
          Schedule Appointment
        </button>
      </header>

      {/* Add Appointment Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Schedule New Appointment</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Appointment Title
                </label>
                <input
                  type="text"
                  value={newAppointment.title}
                  onChange={(e) => setNewAppointment({ ...newAppointment, title: e.target.value })}
                  placeholder="e.g., Annual Check-up, Dental Cleaning"
                  className="w-full p-2 border rounded focus:ring-2 focus:outline-none"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={newAppointment.date}
                  onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                  className="w-full p-2 border rounded focus:ring-2 focus:outline-none"
                  min={today}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                  className="w-full p-2 border rounded focus:ring-2 focus:outline-none"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location (Optional)
                </label>
                <input
                  type="text"
                  value={newAppointment.location}
                  onChange={(e) => setNewAppointment({ ...newAppointment, location: e.target.value })}
                  placeholder="e.g., City Hospital, Dr. Smith's Office"
                  className="w-full p-2 border rounded focus:ring-2 focus:outline-none"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (Optional)
                </label>
                <textarea
                  value={newAppointment.notes}
                  onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                  placeholder="Bring referral, fasting required, etc."
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
                  Schedule Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Calendar View Placeholder */}
      <div 
        className="bg-white rounded-lg shadow-md p-6 mb-8"
        style={{ borderTop: `4px solid ${selectedDoctor.primaryColor}` }}
      >
        <h2 className="text-xl font-bold mb-6 flex items-center">
          <Calendar className="mr-2" size={20} style={{ color: selectedDoctor.primaryColor }} />
          Calendar View
        </h2>
        
        <div className="bg-gray-100 p-6 rounded-md text-center text-gray-500">
          <p>Calendar visualization would be displayed here</p>
          <p className="text-sm mt-2">Integrate with FullCalendar or similar library</p>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold mb-6">Upcoming Appointments</h2>
        
        {upcomingAppointments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>You don't have any upcoming appointments.</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="mt-4 text-sm font-medium"
              style={{ color: selectedDoctor.primaryColor }}
            >
              Schedule your first appointment
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingAppointments.map(apt => (
              <div 
                key={apt.id} 
                className="border rounded-lg p-4 relative flex flex-col md:flex-row md:items-center md:justify-between"
                style={{ borderLeft: `4px solid ${selectedDoctor.primaryColor}` }}
              >
                <div className="mb-3 md:mb-0">
                  <h4 className="font-bold text-lg">{apt.title}</h4>
                  <div className="flex flex-wrap gap-x-4 text-gray-600 mt-1">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      {new Date(apt.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      {apt.time}
                    </div>
                    {apt.location && (
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-1" />
                        {apt.location}
                      </div>
                    )}
                  </div>
                  {apt.notes && (
                    <div className="mt-2 text-sm text-gray-500">
                      {apt.notes}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-sm font-medium" style={{ color: selectedDoctor.primaryColor }}>
                    {formatDistanceToNow(new Date(`${apt.date}T${apt.time}`))}
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
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Past Appointments */}
      {pastAppointments.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-6">Past Appointments</h2>
          <div className="space-y-4">
            {pastAppointments.map(apt => (
              <div 
                key={apt.id} 
                className="border rounded-lg p-4 relative flex flex-col md:flex-row md:items-center md:justify-between bg-gray-50"
              >
                <div className="mb-3 md:mb-0">
                  <h4 className="font-bold">{apt.title}</h4>
                  <div className="flex flex-wrap gap-x-4 text-gray-500 mt-1">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      {new Date(apt.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      {apt.time}
                    </div>
                    {apt.location && (
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-1" />
                        {apt.location}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentScheduler;
import * as React from 'react';
import { CharacterCard } from './CharacterCard';
import { doctors } from '../../data/doctors';

export const CharacterGrid: React.FC<{ onDoctorSelected: (doctorId: string) => void }> = ({ onDoctorSelected }) => {
  const [selectedDoctor, setSelectedDoctor] = React.useState<string | null>(null);

  const handleSelect = (doctorId: string) => {
    setSelectedDoctor(doctorId);
  };

  const confirmSelection = () => {
    if (selectedDoctor) {
      onDoctorSelected(selectedDoctor);
      setSelectedDoctor(null);
    }
  };

  const selectedDoc = doctors.find(d => d.id === selectedDoctor);

  return (
    <div className="p-4 bg-gradient-to-b from-gray-900 to-blue-900 animate-fade-in relative">
      <div className="particles">
        <div className="particle w-2 h-2" style={{ left: '10%', top: '20%', animationDelay: '0s' }}></div>
        <div className="particle w-3 h-3" style={{ left: '30%', top: '40%', animationDelay: '2s' }}></div>
        <div className="particle w-2 h-2" style={{ left: '70%', top: '60%', animationDelay: '4s' }}></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4" role="grid" aria-label="Doctor selection grid">
        {doctors.map(doctor => (
          <CharacterCard
            key={doctor.id}
            doctor={doctor}
            isSelected={selectedDoctor === doctor.id}
            onClick={() => handleSelect(doctor.id)}
          />
        ))}
      </div>
      {selectedDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in" role="dialog" aria-modal="true" aria-label={`Confirm Dr. ${selectedDoc.name} selection`}>
          <div className="bg-gray-800 p-6 rounded-xl max-w-md w-full animate-pulse">
            <img
              src={selectedDoc.avatar}
              alt={`Avatar of Dr. ${selectedDoc.name}`}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold text-white mb-2">Dr. {selectedDoc.name}</h2>
            <p className="text-blue-100 mb-2">{selectedDoc.specialty}</p>
            <p className="text-gray-300 mb-4">{selectedDoc.bio}</p>
            <div className="flex gap-2">
              <button
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 animate-pulse"
                onClick={confirmSelection}
                aria-label={`Confirm selection of Dr. ${selectedDoc.name}`}
              >
                Select
              </button>
              <button
                className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
                onClick={() => setSelectedDoctor(null)}
                aria-label="Cancel selection"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// export default CharacterGrid; 
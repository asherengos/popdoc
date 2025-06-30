import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { doctors } from '../data/doctors';
import { useUser } from '../context/UserContext';
import { Stethoscope, Brain } from 'lucide-react';

const CharacterSelection: React.FC = () => {
  const { selectDoctor } = useUser();
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const handleDoctorSelect = (doctorId: string) => {
    setTimeout(() => {
      selectDoctor(doctorId);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-center mb-4 text-blue-400"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Choose Your Medical Companion
        </motion.h1>
        <motion.p 
          className="text-xl text-center mb-12 text-gray-300"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Select a renowned doctor from science fiction to be your personal health assistant
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doctor, index) => (
            <motion.div 
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer"
              onClick={() => setShowDetails(showDetails === doctor.id ? null : doctor.id)}
            >
              <motion.div 
                className="h-48 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${doctor.avatar})` }}
                whileHover={{ scale: 1.05 }}
              >
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"
                />
              </motion.div>
              
              <div 
                className="p-6" 
                style={{ 
                  backgroundColor: `${doctor.primaryColor}20`,
                  borderTop: `4px solid ${doctor.primaryColor}` 
                }}
              >
                <h2 className="text-2xl font-bold mb-2" style={{ color: doctor.primaryColor }}>
                  Dr. {doctor.name}
                </h2>
                <div className="text-sm text-gray-300 mb-4 flex items-center">
                  <Stethoscope size={16} className="mr-2" />
                  {doctor.bio}
                </div>

                <AnimatePresence>
                  {showDetails === doctor.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-4 mb-4">
                        <div>
                          <h3 className="font-semibold flex items-center mb-2">
                            <Brain size={16} className="mr-2" style={{ color: doctor.primaryColor }} />
                            Specialty
                          </h3>
                          <p className="text-sm text-gray-300 italic">
                            {doctor.specialty}
                          </p>
                        </div>
                        
                        <p className="text-sm text-gray-300 italic">
                          "{doctor.bio}"
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDoctorSelect(doctor.id);
                  }}
                  className="w-full py-2 rounded-md transition-colors duration-300 font-semibold"
                  style={{ 
                    backgroundColor: doctor.primaryColor,
                    color: 'white',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Choose Dr. {doctor.name.split(' ')[0]}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterSelection;
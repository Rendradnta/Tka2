import React from 'react';
import { LogOut, User, BookOpen, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = ({ userName, onLogout }) => {
  const navigate = useNavigate();

  const subjectCategories = {
    wajib: {
      title: 'Mata Pelajaran Wajib',
      description: 'Mata pelajaran inti yang harus diikuti oleh semua peserta.',
      subjects: ['Matematika', 'B. Indonesia', 'B. Inggris'],
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
    },
    pilihan: {
      title: 'Mata Pelajaran Pilihan',
      description: 'Mata pelajaran peminatan sesuai dengan jurusan.',
      subjects: ['Matematika Lanjut', 'Geografi', 'Fisika', 'Kimia'],
      color: 'bg-green-600',
      hoverColor: 'hover:bg-green-700',
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <img src="https://raw.githubusercontent.com/Rendradnta/BoboiboyDB/main/database/7beaae1d85aa9e9f.jpeg" alt="RESABELAJAR Logo" className="w-10 h-10 rounded-full object-cover"/>
              <div>
                <h1 className="text-xl font-bold text-gray-800">RESABELAJAR</h1>
                <p className="text-sm text-gray-600">Aplikasi TKA - SMA Sederajat</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-700"><User className="w-5 h-5" /><span className="font-medium">{userName}</span></div>
              <button onClick={onLogout} className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"><LogOut className="w-4 h-4" /><span>Keluar</span></button>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Selamat Datang, {userName}!</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Silakan pilih jenis simulasi untuk melanjutkan.</p>
          </div>
        </motion.div>

        {/* Category Selection with new design */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {Object.keys(subjectCategories).map((key) => {
              const category = subjectCategories[key];
              return (
                <motion.div
                  key={key}
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
                >
                  <div className={`p-8 text-center text-white ${category.color}`}>
                    <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-80" />
                    <h3 className="text-2xl font-bold">{category.title}</h3>
                    <p className="mt-2 text-sm opacity-90">{category.description}</p>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <p className="text-sm font-semibold text-gray-500 mb-3 text-center">Mata Pelajaran:</p>
                    <div className="flex flex-wrap gap-2 justify-center mb-6">
                      {category.subjects.map(subject => (
                        <span key={subject} className="text-xs font-medium bg-gray-200 text-gray-700 px-2.5 py-1 rounded-full">{subject}</span>
                      ))}
                    </div>
                    <div className="mt-auto pt-4">
                      <button 
                        onClick={() => navigate(`/subject-selection/${key}`)}
                        className={`w-full flex items-center justify-center space-x-2 px-4 py-3 font-semibold text-white rounded-lg transition-colors ${category.color} ${category.hoverColor}`}
                      >
                        <span>Pilih Mata Pelajaran</span>
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
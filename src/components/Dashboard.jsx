import React from 'react';
import { LogOut, User, BookOpen, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = ({ userName, onLogout }) => {
  const navigate = useNavigate();

  // Data untuk ditampilkan di kartu
  const subjectCategories = {
    wajib: {
      title: 'Mata Pelajaran Wajib',
      description: 'Simulasi untuk mata pelajaran inti yang wajib diikuti.',
      subjects: ['Matematika', 'B. Indonesia', 'B. Inggris'],
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
    },
    pilihan: {
      title: 'Mata Pelajaran Pilihan',
      description: 'Simulasi untuk mata pelajaran sesuai minat dan jurusan.',
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

        {/* Category Selection */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {Object.keys(subjectCategories).map((key) => {
              const category = subjectCategories[key];
              return (
                <motion.div
                  key={key}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  onClick={() => navigate(`/subject-selection/${key}`)} // Navigasi dengan parameter
                  className={`${category.color} ${category.hoverColor} text-white rounded-lg p-8 cursor-pointer transition-colors duration-300 shadow-xl flex flex-col justify-between`}
                >
                  <div>
                    <BookOpen className="w-12 h-12 mb-4 opacity-75" />
                    <h4 className="text-2xl font-bold mb-2">{category.title}</h4>
                    <p className="opacity-90 mb-6">{category.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {category.subjects.map(subject => (
                        <span key={subject} className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">{subject}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-end mt-6 text-sm font-semibold opacity-80">
                    <span>Pilih Kategori</span>
                    <Play className="w-4 h-4 ml-2" />
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

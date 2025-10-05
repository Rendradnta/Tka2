import React from 'react';
import { BookOpen, FileText, LogOut, User, Play, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = ({ userName, onLogout }) => {
  const navigate = useNavigate();

  const stats = [
    { icon: BookOpen, label: 'Total Simulasi', value: '7', color: 'bg-blue-500' },
    { icon: FileText, label: 'Total Soal', value: '35', color: 'bg-green-500' }
  ];

  const subjectCategories = [
    {
      id: 'wajib',
      title: 'Mata Pelajaran Wajib',
      description: 'Simulasi untuk mata pelajaran yang wajib diikuti semua peserta.',
      subjects: ['Bahasa Indonesia', 'Bahasa Inggris', 'Matematika'],
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700'
    },
    {
      id: 'pilihan',
      title: 'Mata Pelajaran Pilihan',
      description: 'Simulasi untuk mata pelajaran sesuai minat dan jurusan.',
      subjects: ['Matematika Lanjut', 'Geografi', 'Fisika', 'Kimia'],
      color: 'bg-green-600',
      hoverColor: 'hover:bg-green-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <img src="https://raw.githubusercontent.com/Rendradnta/BoboiboyDB/main/database/7beaae1d85aa9e9f.jpeg" alt="RESABELAJAR Logo" className="w-10 h-10 rounded-full object-cover" />
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

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Selamat Datang, {userName}!</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Platform simulasi Tes Kemampuan Akademik untuk SMA sederajat.</p>
        </motion.div>

        {/* Stats Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-4 rounded-lg shadow-lg`}><IconComponent className="h-8 w-8 text-white" /></div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Subject Categories Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Pilih Jenis Simulasi</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {subjectCategories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                onClick={() => navigate(`/subject-selection/${category.id}`)} // Navigasi yang benar
                className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col cursor-pointer"
              >
                <div className={`p-8 text-center text-white ${category.color}`}>
                  <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-80" />
                  <h3 className="text-2xl font-bold">{category.title}</h3>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <p className="text-sm text-gray-500 mb-4 text-center">{category.description}</p>
                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {category.subjects.map((subject) => (<span key={subject} className="text-xs font-medium bg-gray-200 text-gray-700 px-2.5 py-1 rounded-full">{subject}</span>))}
                  </div>
                  <div className="mt-auto pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-center font-semibold text-gray-600">
                      <span>Lihat Mata Pelajaran</span><ChevronRight className="w-5 h-5 ml-1" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
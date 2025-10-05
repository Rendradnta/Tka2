import React from 'react';
import { BookOpen, FileText, LogOut, User, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ExamCard from './ExamCard';
import { examData } from '../utils/examData';

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
      description: 'Simulasi untuk mata pelajaran yang wajib diikuti semua peserta',
      subjects: ['Bahasa Indonesia', 'Bahasa Inggris', 'Matematika'],
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700'
    },
    {
      id: 'pilihan',
      title: 'Mata Pelajaran Pilihan',
      description: 'Simulasi untuk mata pelajaran sesuai minat dan jurusan',
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
              <img
                src="https://raw.githubusercontent.com/Rendradnta/BoboiboyDB/main/database/7beaae1d85aa9e9f.jpeg"
                alt="RESABELAJAR Logo"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-800">RESABELAJAR</h1>
                <p className="text-sm text-gray-600">Aplikasi TKA - SMA Sederajat</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-700">
                <User className="w-5 h-5" />
                <span className="font-medium">{userName}</span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Selamat Datang, {userName}!
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Platform simulasi Tes Kemampuan Akademik untuk SMA sederajat.
            Persiapkan diri Anda dengan soal-soal berkualitas dan sistem penilaian yang akurat.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-4 rounded-lg`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Subject Categories Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Pilih Jenis Simulasi</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {subjectCategories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={`${category.color} ${category.hoverColor} text-white rounded-lg p-8 cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-lg`}
                onClick={() => navigate('/subject-selection')}
              >
                <div className="text-center">
                  <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{category.title}</h3>
                  <p className="text-lg opacity-90 mb-4">{category.description}</p>
                  <div className="text-sm opacity-80 mb-4">
                    {category.subjects.length} mata pelajaran tersedia
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {category.subjects.map((subject, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white bg-opacity-20 text-white text-xs rounded-full font-medium"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-center space-x-2 bg-white bg-opacity-20 rounded-lg py-2 px-4">
                    <Play className="w-4 h-4" />
                    <span className="font-medium">Mulai Simulasi</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Information Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 bg-blue-50 rounded-lg p-8"
        >
          <h4 className="text-xl font-semibold text-gray-900 mb-4">Petunjuk Penggunaan</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700">
            <div>
              <h5 className="font-medium mb-2">Sebelum Memulai:</h5>
              <ul className="space-y-1 text-sm">
                <li>• Pastikan koneksi internet stabil</li>
                <li>• Siapkan alat tulis untuk coret-coretan</li>
                <li>• Pilih tempat yang tenang dan nyaman</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-2">Selama Ujian:</h5>
              <ul className="space-y-1 text-sm">
                <li>• Perhatikan waktu yang tersisa</li>
                <li>• Gunakan navigasi soal untuk berpindah</li>
                <li>• Tandai soal yang ingin direview</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-2">Mata Pelajaran:</h5>
              <ul className="space-y-1 text-sm">
                <li>• <strong>Wajib:</strong> B. Indonesia, B. Inggris, Matematika</li>
                <li>• <strong>Pilihan:</strong> Matematika Lanjut, Geografi</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;

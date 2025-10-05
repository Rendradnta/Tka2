import React from 'react';
import { motion } from 'framer-motion';
import ExamCard from '../components/ExamCard';
import { examData } from '../utils/examData';
import { BookOpen, Target, Award, Users } from 'lucide-react';

const Home = () => {
  const stats = [
    { icon: BookOpen, label: 'Total Simulasi', value: '12', color: 'bg-blue-500' },
    { icon: Users, label: 'Peserta Aktif', value: '2,847', color: 'bg-green-500' },
    { icon: Target, label: 'Soal Tersedia', value: '1,200', color: 'bg-purple-500' },
    { icon: Award, label: 'Tingkat Kelulusan', value: '87%', color: 'bg-orange-500' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Simulasi Tes Kompetensi Akademik (TKA)
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Platform simulasi resmi untuk persiapan Tes Kompetensi Akademik. 
          Latih kemampuan Anda dengan soal-soal berkualitas dan sistem penilaian yang akurat.
        </p>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      >
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Exam Cards Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Simulasi Tersedia</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examData.map((exam) => (
            <ExamCard key={exam.id} exam={exam} />
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
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Petunjuk Penggunaan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div>
            <h4 className="font-medium mb-2">Sebelum Memulai:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Pastikan koneksi internet stabil</li>
              <li>• Siapkan alat tulis untuk coret-coretan</li>
              <li>• Pilih tempat yang tenang dan nyaman</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Selama Ujian:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Perhatikan waktu yang tersisa</li>
              <li>• Gunakan navigasi soal untuk berpindah</li>
              <li>• Tandai soal yang ingin direview</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
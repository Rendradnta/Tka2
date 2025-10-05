import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Calculator, Globe, Atom, FlaskConical, Play } from 'lucide-react';

const SubjectSelectionPage = () => {
  const navigate = useNavigate();
  const { category } = useParams();

  const allSubjects = [
    { category: 'wajib', id: 'matematika', name: 'Matematika', icon: Calculator, description: 'Aljabar, Geometri, Kalkulus Dasar' },
    { category: 'wajib', id: 'bahasa-indonesia', name: 'Bahasa Indonesia', icon: BookOpen, description: 'Tata Bahasa & Pemahaman Bacaan' },
    { category: 'wajib', id: 'bahasa-inggris', name: 'Bahasa Inggris', icon: Globe, description: 'Grammar & Reading Comprehension' },
    { category: 'pilihan', id: 'matematika-lanjut', name: 'Matematika Lanjut', icon: Calculator, description: 'Kalkulus & Statistika' },
    { category: 'pilihan', id: 'geografi', name: 'Geografi', icon: Globe, description: 'Geografi Fisik & Manusia' },
    { category: 'pilihan', id: 'fisika', name: 'Fisika', icon: Atom, description: 'Mekanika & Termodinamika' },
    { category: 'pilihan', id: 'kimia', name: 'Kimia', icon: FlaskConical, description: 'Kimia Anorganik & Organik' }
  ];

  const subjectsToShow = allSubjects.filter(subject => subject.category === category);
  const pageTitle = category === 'wajib' ? 'Mata Pelajaran Wajib' : 'Mata Pelajaran Pilihan';
  const titleColor = category === 'wajib' ? 'text-blue-600' : 'text-green-600';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <button onClick={() => navigate('/dashboard')} className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium">
              <ArrowLeft className="w-5 h-5" />
              <span>Kembali</span>
            </button>
            <img src="https://raw.githubusercontent.com/Rendradnta/BoboiboyDB/main/database/7beaae1d85aa9e9f.jpeg" alt="RESABELAJAR Logo" className="w-10 h-10 rounded-full object-cover"/>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-10">
            <h1 className={`text-3xl font-bold ${titleColor}`}>{pageTitle}</h1>
            <p className="mt-2 text-lg text-gray-600">Pilih salah satu mata pelajaran untuk memulai simulasi.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subjectsToShow.map((subject, index) => {
              const IconComponent = subject.icon;
              return (
                <motion.div
                  key={subject.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col text-center"
                  whileHover={{ y: -8 }}
                >
                  <div className="p-8 flex-grow flex flex-col items-center">
                    <div className="bg-gray-100 p-4 rounded-full mb-4">
                      <IconComponent className={`w-8 h-8 ${titleColor}`} />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">{subject.name}</h4>
                    <p className="text-sm text-gray-500 mt-2 flex-grow">{subject.description}</p>
                    <button
                      onClick={() => navigate(`/exam/${subject.id}`)}
                      className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Play className="w-5 h-5" />
                      <span>Mulai Simulasi</span>
                    </button>
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

export default SubjectSelectionPage;
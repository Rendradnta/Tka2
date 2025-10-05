import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calculator, Globe, Atom, FlaskConical, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SubjectSelectionPage = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const subjectTypes = [
    {
      id: 'wajib',
      title: 'Mata Pelajaran Wajib',
      description: 'Simulasi untuk mata pelajaran yang wajib diikuti semua peserta',
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
      subjects: [
        { id: 'matematika', name: 'Matematika', icon: Calculator, description: 'Aljabar, Geometri, Kalkulus Dasar' },
        { id: 'bahasa-indonesia', name: 'Bahasa Indonesia', icon: BookOpen, description: 'Tata Bahasa, Sastra, Pemahaman Bacaan' },
        { id: 'bahasa-inggris', name: 'Bahasa Inggris', icon: Globe, description: 'Grammar, Vocabulary, Reading Comprehension' }
      ]
    },
    {
      id: 'pilihan',
      title: 'Mata Pelajaran Pilihan',
      description: 'Simulasi untuk mata pelajaran sesuai minat dan jurusan',
      color: 'bg-green-600',
      hoverColor: 'hover:bg-green-700',
      subjects: [
        { id: 'matematika-lanjut', name: 'Matematika Lanjut', icon: Calculator, description: 'Kalkulus, Statistika, Geometri Analitik' },
        { id: 'geografi', name: 'Geografi', icon: Globe, description: 'Geografi Fisik, Manusia, dan Regional' },
        { id: 'fisika', name: 'Fisika', icon: Atom, description: 'Mekanika, Termodinamika, Gelombang' },
        { id: 'kimia', name: 'Kimia', icon: FlaskConical, description: 'Kimia Anorganik, Organik, Fisika Kimia' }
      ]
    }
  ];

  const handleTypeSelect = (typeId) => {
    setSelectedType(typeId);
    setSelectedSubject(null);
  };

  const handleSubjectSelect = (subjectId) => {
    setSelectedSubject(subjectId);
  };

  const handleStartExam = () => {
    if (selectedSubject) {
      navigate(`/exam/${selectedSubject}`);
    }
  };

  const selectedTypeData = subjectTypes.find(type => type.id === selectedType);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img 
                src="https://raw.githubusercontent.com/Rendradnta/BoboiboyDB/main/database/7beaae1d85aa9e9f.jpeg" 
                alt="RESABELAJAR Logo" 
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-800">RESABELAJAR</h1>
                <p className="text-sm text-gray-600">Pilih Mata Pelajaran Simulasi TKA</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Step 1: Select Subject Type */}
        {!selectedType && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Pilih Jenis Mata Pelajaran
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Silakan pilih jenis mata pelajaran yang ingin Anda ikuti untuk simulasi TKA
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {subjectTypes.map((type) => (
                <motion.div
                  key={type.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: type.id === 'wajib' ? 0.2 : 0.4 }}
                  className={`${type.color} ${type.hoverColor} text-white rounded-lg p-8 cursor-pointer transition-all duration-300 transform hover:scale-105 shadow-lg`}
                  onClick={() => handleTypeSelect(type.id)}
                >
                  <div className="text-center">
                    <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{type.title}</h3>
                    <p className="text-lg opacity-90 mb-4">{type.description}</p>
                    <div className="text-sm opacity-80">
                      {type.subjects.length} mata pelajaran tersedia
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Select Specific Subject */}
        {selectedType && !selectedSubject && selectedTypeData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {selectedTypeData.title}
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Pilih mata pelajaran yang ingin Anda ikuti untuk simulasi
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedTypeData.subjects.map((subject) => {
                const IconComponent = subject.icon;
                return (
                  <motion.div
                    key={subject.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-lg shadow-md border border-gray-200 p-6 cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    onClick={() => handleSubjectSelect(subject.id)}
                  >
                    <div className="text-center">
                      <div className={`${selectedTypeData.color} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{subject.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{subject.description}</p>
                      <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                        <span>5 soal</span>
                        <span>•</span>
                        <span>10 menit</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={() => setSelectedType(null)}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali ke Pilihan Jenis</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Confirm Selection */}
        {selectedSubject && selectedTypeData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Konfirmasi Pilihan
                  </h2>
                  <p className="text-gray-600">
                    Anda akan mengikuti simulasi untuk mata pelajaran berikut:
                  </p>
                </div>

                <div className={`${selectedTypeData.color} rounded-lg p-6 text-white mb-8`}>
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">
                      {selectedTypeData.subjects.find(s => s.id === selectedSubject)?.name}
                    </h3>
                    <p className="text-lg opacity-90 mb-4">
                      {selectedTypeData.subjects.find(s => s.id === selectedSubject)?.description}
                    </p>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold">5</div>
                        <div className="text-sm opacity-80">Soal</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">10</div>
                        <div className="text-sm opacity-80">Menit</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">3</div>
                        <div className="text-sm opacity-80">Jenis Soal</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                  <h4 className="font-semibold text-blue-900 mb-2">Jenis Soal:</h4>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• Pilihan Ganda (lingkaran) - pilih satu jawaban benar</li>
                    <li>• Pilihan Ganda Kompleks (kotak) - pilih beberapa jawaban benar</li>
                    <li>• Benar Salah - tentukan pernyataan benar atau salah</li>
                  </ul>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setSelectedSubject(null)}
                    className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Kembali</span>
                  </button>
                  <button
                    onClick={handleStartExam}
                    className="flex items-center space-x-2 px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                  >
                    <span>Mulai Simulasi</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SubjectSelectionPage;
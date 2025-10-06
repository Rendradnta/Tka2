import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Calculator, Globe, Atom, FlaskConical, Play, Clock, FileText } from 'lucide-react';

// Helper untuk menambahkan detail (nama, ikon, kategori) ke data dari API
const subjectDetailsMap = {
  'matematika': { category: 'wajib', name: 'Matematika', icon: Calculator, description: 'Aljabar, Geometri, Kalkulus Dasar' },
  'bahasa-indonesia': { category: 'wajib', name: 'Bahasa Indonesia', icon: BookOpen, description: 'Tata Bahasa & Pemahaman Bacaan' },
  'geografi': { category: 'pilihan', name: 'Geografi', icon: Globe, description: 'Geografi Fisik & Manusia' },
  'fisika': { category: 'pilihan', name: 'Fisika', icon: Atom, description: 'Mekanika & Termodinamika' }
  // Tambahkan mapel lain di sini jika API Anda menyediakannya
};

const SubjectSelectionPage = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        [cite_start]// Panggil API untuk mendapatkan daftar mata pelajaran [cite: 27]
        const response = await fetch('https://api-tka.resa.my.id/api/db/soal');
        const data = await response.json();
        
        if (data.status && data.subjects) {
          // Gabungkan data ID dari API dengan detail dari `subjectDetailsMap`
          const availableSubjects = data.subjects
            .map(id => ({
              id,
              ...(subjectDetailsMap[id] || { name: id, icon: BookOpen, description: 'Deskripsi tidak tersedia', category: 'lainnya' })
            }));
          setSubjects(availableSubjects);
        } else {
          throw new Error("Gagal memuat daftar mata pelajaran.");
        }
      } catch (error) {
        console.error("Gagal mengambil daftar mata pelajaran:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubjects();
  }, []);

  // Filter mata pelajaran berdasarkan kategori dari URL
  const subjectsToShow = subjects.filter(subject => subject.category === category);
  const pageTitle = category === 'wajib' ? 'Mata Pelajaran Wajib' : 'Mata Pelajaran Pilihan';
  const titleColor = category === 'wajib' ? 'text-blue-600' : 'text-green-600';

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat mata pelajaran...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <button onClick={() => navigate('/dashboard')} className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium">
              <ArrowLeft className="w-5 h-5" /><span>Kembali</span>
            </button>
            <img src="https://raw.githubusercontent.com/Rendradnta/BoboiboyDB/main/database/7beaae1d85aa9e9f.jpeg" alt="RESABELAJAR Logo" className="w-10 h-10 rounded-full object-cover"/>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {!selectedSubject ? (
            <motion.div key="selection" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <div className="text-center mb-10">
                <h1 className={`text-3xl font-bold ${titleColor}`}>{pageTitle}</h1>
                <p className="mt-2 text-lg text-gray-600">Pilih salah satu mata pelajaran untuk memulai.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {subjectsToShow.map((subject, index) => {
                  const IconComponent = subject.icon;
                  return (
                    <motion.div
                      key={subject.id}
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ y: -8 }}
                      onClick={() => setSelectedSubject(subject)}
                      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col text-center cursor-pointer"
                    >
                      <div className="p-8 flex-grow flex flex-col items-center">
                        <div className="bg-gray-100 p-4 rounded-full mb-4"><IconComponent className={`w-8 h-8 ${titleColor}`} /></div>
                        <h4 className="text-xl font-bold text-gray-900">{subject.name}</h4>
                        <p className="text-sm text-gray-500 mt-2 flex-grow">{subject.description}</p>
                        <div className="w-full flex justify-center space-x-6 mt-6 pt-4 border-t">
                          {/* Diperbarui sesuai dokumentasi API */}
                          [cite_start]<div className="flex items-center space-x-2 text-sm text-gray-600"><FileText className="w-4 h-4" /><span>30 Soal</span></div> [cite: 29]
                          [cite_start]<div className="flex items-center space-x-2 text-sm text-gray-600"><Clock className="w-4 h-4" /><span>30 Menit</span></div> [cite: 29]
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div key="confirmation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">Konfirmasi Simulasi</h2>
                <p className="mt-2 text-gray-600">Anda akan memulai simulasi untuk mata pelajaran:</p>
                <div className={`my-6 p-6 rounded-lg ${category === 'wajib' ? 'bg-blue-50' : 'bg-green-50'}`}>
                  <h3 className={`text-3xl font-bold ${titleColor}`}>{selectedSubject.name}</h3>
                  <p className="mt-2 text-gray-700">{selectedSubject.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-left p-4 bg-gray-50 rounded-lg">
                   {/* Diperbarui sesuai dokumentasi API */}
                  [cite_start]<div className="font-semibold text-gray-800">Jumlah Soal:</div><div className="text-gray-600">30 Soal</div> [cite: 29]
                  [cite_start]<div className="font-semibold text-gray-800">Alokasi Waktu:</div><div className="text-gray-600">30 Menit</div> [cite: 29]
                  <div className="font-semibold text-gray-800">Kategori:</div><div className="text-gray-600">{pageTitle}</div>
                </div>
                <div className="mt-8 flex justify-between items-center">
                  <button onClick={() => setSelectedSubject(null)} className="flex items-center space-x-2 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium">
                    <ArrowLeft className="w-5 h-5" /><span>Batal</span>
                  </button>
                  <button onClick={() => navigate(`/exam/${selectedSubject.id}`)} className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                    <span>Mulai Simulasi</span><Play className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default SubjectSelectionPage;

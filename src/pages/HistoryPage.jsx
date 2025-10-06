import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, History, Calendar, Clock, Star, FileText } from 'lucide-react';

const HistoryPage = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // 1. Ambil nama pengguna yang sedang login
        const authData = JSON.parse(localStorage.getItem('userAuth'));
        const loggedInUserName = authData ? authData.name : null;

        if (!loggedInUserName) {
          throw new Error('Tidak dapat mengidentifikasi pengguna. Silakan login kembali.');
        }

        // 2. Ambil semua data dari API
        const response = await fetch('https://api-tka.resa.my.id/api/db/getscore');
        if (!response.ok) {
          throw new Error('Gagal mengambil data riwayat dari server.');
        }
        const data = await response.json();

        if (data.status && Array.isArray(data.data)) {
          // 3. Filter data berdasarkan nama pengguna, LALU urutkan
          const userHistory = data.data
            .filter(item => item.userName === loggedInUserName)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          
          setHistory(userHistory);
        } else {
          throw new Error('Format data dari API tidak sesuai.');
        }
      } catch (err) {
        setError(err.message);
        console.error("Gagal mengambil data riwayat:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-3"><History className="text-blue-500" /> Riwayat Ujian Saya</h1>
            <button onClick={() => navigate('/dashboard')} className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium">
              <ArrowLeft className="w-5 h-5" /><span>Kembali</span>
            </button>
          </div>
        </div>
      </div>
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center text-gray-600">Memuat riwayat Anda...</div>
        ) : error ? (
          <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg">{error}</div>
        ) : history.length === 0 ? (
          <div className="text-center text-gray-600 bg-white p-8 rounded-lg shadow">
            <FileText size={48} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800">Anda Belum Memiliki Riwayat</h2>
            <p className="text-gray-500 mt-2">Selesaikan sebuah simulasi untuk melihat riwayatnya di sini.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
            className="space-y-4"
          >
            {history.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
              >
                <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex-grow">
                    <p className="text-lg font-bold text-blue-600">{item.subjectId}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <Calendar size={14} />
                      <span>{formatDate(item.createdAt)}</span>
                    </div>
                  </div>
                  <div className="w-full sm:w-auto grid grid-cols-2 gap-4 text-center sm:text-right">
                    <div className="flex flex-col items-center sm:items-end">
                      <div className={`text-3xl font-bold ${getScoreColor(item.score)}`}>{item.score}</div>
                      <div className="text-xs text-gray-500 font-semibold uppercase flex items-center gap-1"><Star size={12} />SKOR</div>
                    </div>
                    <div className="flex flex-col items-center sm:items-end">
                      <div className="text-3xl font-bold text-gray-700">{formatTime(item.timeSpent)}</div>
                      <div className="text-xs text-gray-500 font-semibold uppercase flex items-center gap-1"><Clock size={12} />WAKTU</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default HistoryPage;
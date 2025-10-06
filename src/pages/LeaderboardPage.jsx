import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, Trophy, UserCircle, Clock, Star } from 'lucide-react';

const LeaderboardPage = () => {
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('https://api-tka.resa.my.id/api/db/leaderboard');
        if (!response.ok) {
          throw new Error('Gagal mengambil data dari server.');
        }
        const data = await response.json();
        if (data.status) {
          setLeaderboard(data.leaderboard);
        } else {
          throw new Error('API mengembalikan status false.');
        }
      } catch (err) {
        setError(err.message);
        console.error("Gagal mengambil data leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  const PodiumItem = ({ user, rank }) => {
    const styles = {
      1: { color: 'bg-yellow-400', ring: 'ring-yellow-400', text: 'text-yellow-800', icon: <Trophy size={40} className="fill-yellow-400 text-white" /> },
      2: { color: 'bg-gray-300', ring: 'ring-gray-300', text: 'text-gray-800', icon: <Trophy size={32} className="fill-gray-400 text-white" /> },
      3: { color: 'bg-yellow-600', ring: 'ring-yellow-600', text: 'text-yellow-900', icon: <Trophy size={28} className="fill-yellow-700 text-white" /> },
    };
    const style = styles[rank];

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: rank * 0.15 }}
        className={`w-full p-6 rounded-xl shadow-lg flex flex-col items-center text-center relative ${style.color}`}
        style={{ order: rank === 1 ? 2 : (rank === 2 ? 1 : 3) }} // Rank 1 di tengah
      >
        <div className={`absolute -top-6 ${rank === 1 ? 'scale-125' : ''}`}>
          {style.icon}
        </div>
        <UserCircle size={rank === 1 ? 80 : 70} className="mt-8 mb-4 text-white/80" />
        <h3 className={`text-xl font-bold ${style.text}`}>{user.userName}</h3>
        <div className="mt-4 bg-white/30 backdrop-blur-sm rounded-lg px-4 py-2 w-full">
          <p className={`text-2xl font-bold ${style.text}`}>{user.score}</p>
          <p className={`text-xs font-semibold uppercase ${style.text}`}>Skor</p>
        </div>
        <div className="mt-2 text-sm text-white/90">{formatTime(user.timeSpent)} menit</div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-3"><Award className="text-yellow-500" /> Papan Peringkat</h1>
            <button onClick={() => navigate('/dashboard')} className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium">
              <ArrowLeft className="w-5 h-5" /><span>Kembali</span>
            </button>
          </div>
        </div>
      </div>
      
      <main className="max-w-5xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center text-gray-600">Memuat data peringkat...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : leaderboard.length === 0 ? (
          <div className="text-center text-gray-600">Belum ada data peringkat yang tersedia.</div>
        ) : (
          <>
            {/* Podium for Top 3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-2 items-end mb-12">
              {top3.map(user => <PodiumItem key={user.rank} user={user} rank={user.rank} />)}
            </div>
            
            {/* List for the rest */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="space-y-3"
            >
              {rest.map((user, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-4 flex items-center justify-between transition-transform hover:scale-102">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold bg-gray-100 text-gray-700">
                      {user.rank}
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">{user.userName}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1"><Star size={12} className="text-yellow-500" /> Skor: {user.score}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-700">{formatTime(user.timeSpent)}</div>
                    <div className="text-xs text-gray-400">Menit</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </>
        )}
      </main>
    </div>
  );
};

export default LeaderboardPage;
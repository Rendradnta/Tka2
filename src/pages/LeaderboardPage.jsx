import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Award, Trophy, User, Clock, Star } from 'lucide-react';

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

  const getRankStyling = (rank) => {
    if (rank === 1) return {
      card: 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white shadow-lg ring-4 ring-yellow-200',
      rank: 'bg-white/20 text-white',
      name: 'text-white',
      score: 'text-white'
    };
    if (rank === 2) return {
      card: 'bg-white border-l-4 border-gray-400',
      rank: 'bg-gray-200 text-gray-700',
      name: 'text-gray-800',
      score: 'text-gray-800'
    };
    if (rank === 3) return {
      card: 'bg-white border-l-4 border-amber-600',
      rank: 'bg-amber-100 text-amber-800',
      name: 'text-gray-800',
      score: 'text-gray-800'
    };
    return {
      card: 'bg-white',
      rank: 'bg-gray-100 text-gray-600',
      name: 'text-gray-700',
      score: 'text-gray-700'
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800 flex items-center gap-3"><Award className="text-yellow-500" /> Papan Peringkat</h1>
            <button onClick={() => navigate('/dashboard')} className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium">
              <ArrowLeft className="w-5 h-5" /><span>Kembali</span>
            </button>
          </div>
        </div>
      </div>
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center text-gray-600">Memuat data peringkat...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : leaderboard.length === 0 ? (
          <div className="text-center text-gray-600">Belum ada data peringkat yang tersedia.</div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.08 } }
            }}
            className="space-y-4"
          >
            {leaderboard.map((user) => {
              const styling = getRankStyling(user.rank);
              const isChampion = user.rank === 1;

              return (
                <motion.div
                  key={user.rank}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className={`rounded-xl shadow-md p-4 flex items-center ${styling.card}`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 ${styling.rank}`}>
                    {user.rank}
                  </div>
                  
                  <div className="ml-4 flex-grow">
                    <div className={`font-bold text-lg ${styling.name}`}>{user.userName}</div>
                    <div className="flex items-center gap-4 text-sm mt-1">
                      <span className={`flex items-center gap-1.5 font-semibold ${styling.score}`}>
                        <Star size={14} className={isChampion ? 'text-white' : 'text-yellow-500'} /> 
                        {user.score}
                      </span>
                      <span className={`flex items-center gap-1.5 ${isChampion ? 'text-white/80' : 'text-gray-500'}`}>
                        <Clock size={14} /> 
                        {formatTime(user.timeSpent)}
                      </span>
                    </div>
                  </div>

                  {isChampion && <Trophy size={40} className="text-yellow-300 opacity-80 flex-shrink-0 ml-4" />}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default LeaderboardPage;
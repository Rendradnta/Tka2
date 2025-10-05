import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, Eye, EyeOff } from 'lucide-react';

const TokenAuth = ({ onAuthenticated }) => {
  const [formData, setFormData] = useState({ name: '', token: '' });
  const [showToken, setShowToken] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validTokens = ['RESA25', 'SMANSAWIRA'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!formData.name.trim()) {
      setError('Nama lengkap harus diisi');
      setIsLoading(false);
      return;
    }

    if (!validTokens.includes(formData.token.toUpperCase())) {
      setError('Token tidak valid. Gunakan RESA25 atau SMANSAWIRA');
      setIsLoading(false);
      return;
    }

    // Simulate authentication delay
    setTimeout(() => {
      localStorage.setItem('userAuth', JSON.stringify({
        name: formData.name,
        token: formData.token.toUpperCase(),
        timestamp: Date.now()
      }));
      onAuthenticated(formData.name);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
      >
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <img 
            src="https://raw.githubusercontent.com/Rendradnta/BoboiboyDB/main/database/7beaae1d85aa9e9f.jpeg" 
            alt="RESABELAJAR Logo" 
            className="w-20 h-20 mx-auto mb-4 rounded-full object-cover shadow-md"
          />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">RESABELAJAR</h1>
          <p className="text-gray-600 text-sm">Aplikasi TKA - SMA Sederajat</p>
        </div>

        {/* Authentication Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Lengkap
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Masukkan nama lengkap Anda"
                required
              />
            </div>
          </div>

          {/* Token Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Token Akses
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showToken ? 'text' : 'password'}
                value={formData.token}
                onChange={(e) => setFormData(prev => ({ ...prev, token: e.target.value }))}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Masukkan token akses"
                required
              />
              <button
                type="button"
                onClick={() => setShowToken(!showToken)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showToken ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Token valid: RESA25 atau SMANSAWIRA
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Memverifikasi...</span>
              </>
            ) : (
              <span>Masuk ke Aplikasi</span>
            )}
          </button>
        </form>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            Pastikan Anda memiliki token yang valid untuk mengakses simulasi TKA
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default TokenAuth;
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, AlertTriangle } from 'lucide-react';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AlertTriangle className="mx-auto h-16 w-16 text-yellow-500 mb-4" />
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-700">Halaman Tidak Ditemukan</h2>
        <p className="mt-2 text-gray-500 max-w-sm mx-auto">
          Ngapain dekk wkwkwkwk, ga ada tuh page nya, mending pulang sono. 
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-8 inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Home className="w-5 h-5" />
          <span>Kembali ke Dashboard</span>
        </button>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;

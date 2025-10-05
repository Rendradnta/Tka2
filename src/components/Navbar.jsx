import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Home, User } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-blue-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <BookOpen className="h-8 w-8 text-white" />
            <div className="text-white">
              <div className="font-bold text-lg">TKA Simulator</div>
              <div className="text-xs text-blue-200">Pusat Penilaian Pendidikan</div>
            </div>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                isActive('/') ? 'bg-blue-700 text-white' : 'text-blue-100 hover:text-white hover:bg-blue-700'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Beranda</span>
            </Link>
            
            <div className="flex items-center space-x-2 text-blue-100">
              <User className="h-4 w-4" />
              <span className="text-sm">Peserta Ujian</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
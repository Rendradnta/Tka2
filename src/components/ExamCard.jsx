import React from 'react';
import { motion } from 'framer-motion';
import { Clock, BookOpen, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExamCard = ({ exam }) => {
  const navigate = useNavigate();

  const handleStartExam = () => {
    navigate(`/exam/${exam.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{exam.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{exam.description}</p>
          </div>
          <div className="bg-blue-100 p-2 rounded-lg">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{exam.duration} menit</span>
          </div>
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">{exam.totalQuestions} soal</span>
          </div>
        </div>

        {/* Subjects */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">Mata Pelajaran:</p>
          <div className="flex flex-wrap gap-2">
            {exam.subjects.map((subject, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleStartExam}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center space-x-2"
        >
          <Play className="w-4 h-4" />
          <span>Mulai Simulasi</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ExamCard;
import React from 'react';
import { motion } from 'framer-motion';

const QuestionNavigation = ({ 
  totalQuestions, 
  currentQuestion, 
  answeredQuestions, 
  flaggedQuestions, 
  onQuestionSelect 
}) => {
  const getQuestionStatus = (questionIndex) => {
    if (flaggedQuestions.includes(questionIndex)) return 'flagged';
    if (answeredQuestions.includes(questionIndex)) return 'answered';
    return 'unanswered';
  };

  const getStatusColor = (status, isActive) => {
    if (isActive) return 'bg-green-600 text-white border-green-600';
    
    switch (status) {
      case 'answered':
        return 'bg-blue-600 text-white border-blue-600';
      case 'flagged':
        return 'bg-yellow-500 text-white border-yellow-500';
      default:
        return 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="font-semibold text-gray-900 mb-4">Navigasi Soal</h3>
      
      <div className="grid grid-cols-5 gap-2 mb-4">
        {Array.from({ length: totalQuestions }, (_, index) => {
          const questionNumber = index + 1;
          const status = getQuestionStatus(index);
          const isActive = currentQuestion === index;
          
          return (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onQuestionSelect(index)}
              className={`w-10 h-10 rounded-md border-2 font-medium text-sm transition-colors ${
                getStatusColor(status, isActive)
              }`}
            >
              {questionNumber}
            </motion.button>
          );
        })}
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded"></div>
          <span className="text-gray-600">Belum dijawab</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-600 rounded"></div>
          <span className="text-gray-600">Sudah dijawab</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span className="text-gray-600">Ditandai</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-600 rounded"></div>
          <span className="text-gray-600">Soal aktif</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionNavigation;
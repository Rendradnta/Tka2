import React, { useState, useEffect } from 'react'; // Sesuai permintaan Anda
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, BookOpen, Home, RotateCcw, UserCheck, UserX, HelpCircle } from 'lucide-react';

import examData from '../utils/examData';
const { questionPools } = examData;

import { TextWithMath } from '../components/MathRenderer';

// Helper function untuk membandingkan jawaban
const areAnswersEqual = (userAnswer, correctAnswer, questionType, statements = []) => {
  if (questionType === 'multiple-true-false') {
    if (typeof userAnswer !== 'object' || userAnswer === null) return false;
    if (statements.length !== Object.keys(userAnswer).length) return false;
    return statements.every((statement, index) => userAnswer[index] === statement.answer);
  }
  if (Array.isArray(correctAnswer)) {
    if (!Array.isArray(userAnswer)) return false;
    if (userAnswer.length !== correctAnswer.length) return false;
    const sortedUserAnswer = [...userAnswer].sort();
    const sortedCorrectAnswer = [...correctAnswer].sort();
    return sortedUserAnswer.every((val, index) => val === sortedCorrectAnswer[index]);
  }
  return userAnswer === correctAnswer;
};

const ResultPage = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [fullExamData, setFullExamData] = useState(null);
  const [score, setScore] = useState(0);
  const [showExplanations, setShowExplanations] = useState(false);

  useEffect(() => {
    try {
      const savedResults = localStorage.getItem('examResults');
      const questionMaster = questionPools[subjectId];

      if (savedResults && questionMaster) {
        const parsedResults = JSON.parse(savedResults);
        
        if (parsedResults.subject === subjectId) {
          setResults(parsedResults);

          const hydratedQuestions = parsedResults.questions
            .map(qFromStorage => {
              const originalQuestion = questionMaster.find(qMaster => qMaster.id === qFromStorage.id);
              return originalQuestion ? { ...originalQuestion, ...qFromStorage } : null;
            })
            .filter(Boolean);

          const examObject = {
            id: parsedResults.examId,
            title: parsedResults.examTitle,
            questions: hydratedQuestions,
          };
          setFullExamData(examObject);
          
          let correctAnswers = 0;
          examObject.questions.forEach(question => {
            const userAnswer = parsedResults.answers[question.id];
            const correctAnswer = question.type === 'multiple-choice-complex' ? question.correctAnswers : question.correctAnswer;
            if (areAnswersEqual(userAnswer, correctAnswer, question.type, question.statements)) {
              correctAnswers++;
            }
          });
          setScore(examObject.questions.length > 0 ? (correctAnswers / examObject.questions.length) * 100 : 0);

        } else {
          navigate('/dashboard');
        }
      } else {
        navigate('/dashboard');
      }
    } catch (e) {
      console.error("Gagal memproses hasil ujian:", e);
      navigate('/dashboard');
    }
  }, [subjectId, navigate]);

  const getAnswerStatus = (question) => {
    const userAnswer = results?.answers[question.id];
    if (userAnswer === undefined || (Array.isArray(userAnswer) && userAnswer.length === 0) || (typeof userAnswer === 'object' && userAnswer !== null && Object.keys(userAnswer).length === 0) ) {
        return 'not-answered';
    }
    const correctAnswer = question.type === 'multiple-choice-complex' ? question.correctAnswers : question.correctAnswer;
    return areAnswersEqual(userAnswer, correctAnswer, question.type, question.statements) ? 'correct' : 'incorrect';
  };
  
  if (!fullExamData || !results) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat hasil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <img src="https://raw.githubusercontent.com/Rendradnta/BoboiboyDB/main/database/7beaae1d85aa9e9f.jpeg" alt="RESABELAJAR Logo" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h1 className="text-xl font-bold text-gray-800">{fullExamData.title}</h1>
                <p className="text-sm text-gray-600">RESABELAJAR - Hasil Simulasi</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button onClick={() => navigate('/dashboard')} className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Home className="w-4 h-4" /><span>Dashboard</span>
              </button>
              <button onClick={() => navigate(`/exam/${subjectId}`)} className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                <RotateCcw className="w-4 h-4" /><span>Ulangi</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className={`rounded-lg border-2 p-8 mb-8 ${score >= 80 ? 'bg-green-50 border-green-200' : score >= 60 ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200'}`}>
          <div className="text-center">
            <div className={`text-6xl font-bold mb-4 ${score >= 80 ? 'text-green-600' : score >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>{Math.round(score)}</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Skor Anda</h2>
            <p className="text-gray-600 mb-6">{score >= 80 ? 'Kelass! Keren kamuu.' : score >= 60 ? 'Masih Jelek! Belajar lagi dek.' : 'SDM rendah!!'}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-white rounded-lg p-4 shadow-sm"><CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" /><div className="text-2xl font-bold text-gray-900">{fullExamData.questions.filter(q => getAnswerStatus(q) === 'correct').length}</div><div className="text-sm text-gray-600">Benar</div></div>
              <div className="bg-white rounded-lg p-4 shadow-sm"><XCircle className="w-6 h-6 text-red-600 mx-auto mb-2" /><div className="text-2xl font-bold text-gray-900">{fullExamData.questions.filter(q => getAnswerStatus(q) === 'incorrect').length}</div><div className="text-sm text-gray-600">Salah</div></div>
              <div className="bg-white rounded-lg p-4 shadow-sm"><BookOpen className="w-6 h-6 text-gray-600 mx-auto mb-2" /><div className="text-2xl font-bold text-gray-900">{fullExamData.questions.length}</div><div className="text-sm text-gray-600">Total Soal</div></div>
              <div className="bg-white rounded-lg p-4 shadow-sm"><Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" /><div className="text-2xl font-bold text-gray-900">{Math.floor(results.timeSpent / 60)}:{String(results.timeSpent % 60).padStart(2, '0')}</div><div className="text-sm text-gray-600">Waktu</div></div>
            </div>
          </div>
        </motion.div>

        <div className="mb-6"><button onClick={() => setShowExplanations(!showExplanations)} className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">{showExplanations ? 'Sembunyikan' : 'Tampilkan'} Pembahasan</button></div>

        {showExplanations && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
            {fullExamData.questions.map((question, index) => {
              const status = getAnswerStatus(question);
              const userAnswer = results.answers[question.id];
              return (
                <div key={question.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="font-semibold text-gray-800 mb-3">Soal {index + 1}</div>
                  <div className="mb-4 text-gray-800 leading-relaxed break-words"><TextWithMath text={question.question} /></div>
                  
                  {question.type === 'multiple-choice' || question.type === 'multiple-choice-complex' ? (
                     <div className="space-y-2 mb-4">
                      {question.options.map((option, optionIndex) => {
                        const correctAnswer = question.type === 'multiple-choice-complex' ? question.correctAnswers : question.correctAnswer;
                        const isCorrect = Array.isArray(correctAnswer) ? correctAnswer.includes(optionIndex) : correctAnswer === optionIndex;
                        const isUserAnswer = Array.isArray(userAnswer) ? userAnswer?.includes(optionIndex) : userAnswer === optionIndex;
                        return (
                          <div key={optionIndex} className={`p-3 rounded-lg border-2 flex items-center space-x-3 ${isCorrect ? 'border-green-500 bg-green-50' : isUserAnswer ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'}`}>
                            <div className="flex-shrink-0">{isCorrect ? <CheckCircle className="w-5 h-5 text-green-600" /> : isUserAnswer ? <XCircle className="w-5 h-5 text-red-600" /> : <div className="w-5 h-5" />}</div>
                            <span className="text-gray-800 break-words"><TextWithMath text={`${String.fromCharCode(65 + optionIndex)}. ${option}`} /></span>
                          </div>
                        );
                      })}
                    </div>
                  ) : null}

                  {question.type === 'multiple-true-false' && (
                    <div className="mb-4 overflow-x-auto">
                      <table className="w-full border-collapse min-w-[400px]">
                        <thead><tr className="bg-gray-50"><th className="border p-2 text-left">Pernyataan</th><th className="border p-2 text-center">Jawaban Anda</th><th className="border p-2 text-center">Kunci</th><th className="border p-2 text-center">Hasil</th></tr></thead>
                        <tbody>
                          {question.statements.map((statement, idx) => {
                            const userChoice = userAnswer?.[idx];
                            const isCorrect = userChoice === statement.answer;
                            return (
                              <tr key={idx}>
                                <td className="border p-2"><TextWithMath text={statement.text} /></td>
                                <td className="border p-2 text-center">{userChoice === undefined ? '-' : userChoice ? 'Benar' : 'Salah'}</td>
                                <td className="border p-2 text-center">{statement.answer ? 'Benar' : 'Salah'}</td>
                                <td className={`border p-2 text-center font-semibold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>{isCorrect ? <CheckCircle size={20} className="mx-auto" /> : <XCircle size={20} className="mx-auto" />}</td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Pembahasan:</h4>
                    <div className="text-blue-800 leading-relaxed overflow-x-auto"><TextWithMath text={question.explanation} /></div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ResultPage;

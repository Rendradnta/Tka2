import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Flag, ArrowLeft, ArrowRight, CheckCircle, Square, Circle } from 'lucide-react';
import { TextWithMath } from '../components/MathRenderer';
import ConfirmationModal from '../components/ConfirmationModal';

const ExamPage = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        // Panggil API untuk mendapatkan set ujian berdasarkan subjectId
        const response = await fetch(`https://api-tka.resa.my.id/api/db/soal?subjectId=${subjectId}`);
        const data = await response.json();
        
        if (data.status) {
          setExam(data); // Simpan seluruh data ujian dari API
          setTimeLeft(data.duration * 60); // Atur waktu dari durasi yang diberikan API
        } else {
          throw new Error(data.error || 'Gagal memuat data ujian.');
        }
      } catch (error) {
        console.error('Gagal memuat ujian:', error);
        // Jika gagal, kembalikan pengguna ke halaman pemilihan mapel
        navigate('/subject-selection/wajib'); 
      } finally {
        setLoading(false);
      }
    };
    
    fetchExam();
  }, [subjectId, navigate]);

  useEffect(() => {
    if (timeLeft > 0 && exam) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && exam) {
      handleTimeUp();
    }
  }, [timeLeft, exam]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId, answer, questionType, statementIndex = null) => {
    if (questionType === 'multiple-choice-complex') {
      setAnswers(prev => {
        const currentAnswers = prev[questionId] || [];
        const newAnswers = currentAnswers.includes(answer)
          ? currentAnswers.filter(idx => idx !== answer)
          : [...currentAnswers, answer];
        return { ...prev, [questionId]: newAnswers };
      });
    } else if (questionType === 'multiple-true-false') {
      setAnswers(prev => ({
        ...prev,
        [questionId]: {
          ...(prev[questionId] || {}),
          [statementIndex]: answer
        }
      }));
    } else {
      setAnswers(prev => ({ ...prev, [questionId]: answer }));
    }
  };

  const handleFlagToggle = (questionId) => {
    setFlagged(prev => {
      const newFlagged = new Set(prev);
      if (newFlagged.has(questionId)) {
        newFlagged.delete(questionId);
      } else {
        newFlagged.add(questionId);
      }
      return newFlagged;
    });
  };

  const handleSubmitExam = () => {
    setShowConfirmModal(false);
    const results = {
      examId: exam.id,
      examTitle: exam.title,
      subject: exam.id, // Gunakan exam.id dari API sebagai subject
      answers,
      // PENTING: Simpan semua data soal agar ResultPage bisa mengakses kunci jawaban & pembahasan
      questions: exam.questions,
      totalQuestions: exam.questions.length,
      timeSpent: (exam.duration * 60) - timeLeft,
      submittedAt: new Date().toISOString()
    };
    localStorage.setItem('examResults', JSON.stringify(results));
    navigate(`/result/${exam.id}`);
  };

  const handleFinishClick = () => setShowConfirmModal(true);
  const handleTimeUp = () => handleSubmitExam();

  const getQuestionStatus = (questionId) => {
    if (flagged.has(questionId)) return 'flagged';
    if (answers.hasOwnProperty(questionId)) {
        const answer = answers[questionId];
        if (typeof answer === 'object' && answer !== null && Object.keys(answer).length === 0) return 'unanswered';
        if (Array.isArray(answer) && answer.length === 0) return 'unanswered';
        return 'answered';
    }
    return 'unanswered';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'answered': return 'bg-blue-600 text-white';
      case 'flagged': return 'bg-yellow-500 text-white';
      default: return 'bg-white text-gray-700 border border-gray-300';
    }
  };

  const renderQuestionInput = (question) => {
    const questionId = question.id;
    const userAnswer = answers[questionId];

    if (question.type === 'multiple-choice') {
      return (
        <div className="space-y-3 mb-8">
          {question.options.map((option, index) => (
            <label key={index} className={`block p-4 rounded-lg border-2 cursor-pointer transition-colors ${userAnswer === index ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}>
              <div className="flex items-center space-x-3">
                <div className="relative"><Circle className={`w-5 h-5 ${userAnswer === index ? 'text-blue-600' : 'text-gray-400'}`} />{userAnswer === index && (<div className="absolute inset-0 flex items-center justify-center"><div className="w-2 h-2 bg-blue-600 rounded-full"></div></div>)}</div>
                <input type="radio" name={`question-${questionId}`} value={index} checked={userAnswer === index} onChange={() => handleAnswerSelect(questionId, index, question.type)} className="sr-only" />
                <span className="flex-1 text-gray-800"><TextWithMath text={`${String.fromCharCode(65 + index)}. ${option}`} /></span>
              </div>
            </label>
          ))}
        </div>
      );
    }
    
    if (question.type === 'multiple-choice-complex') {
      const selectedAnswers = userAnswer || [];
      return (
        <div className="space-y-3 mb-8">
          <div className="text-sm text-blue-600 font-medium mb-3">Pilih semua jawaban yang benar (dapat lebih dari satu)</div>
          {question.options.map((option, index) => (
            <label key={index} className={`block p-4 rounded-lg border-2 cursor-pointer transition-colors ${selectedAnswers.includes(index) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}>
              <div className="flex items-center space-x-3">
                <div className="relative"><Square className={`w-5 h-5 ${selectedAnswers.includes(index) ? 'text-blue-600' : 'text-gray-400'}`} />{selectedAnswers.includes(index) && (<div className="absolute inset-0 flex items-center justify-center"><CheckCircle className="w-3 h-3 text-blue-600" /></div>)}</div>
                <input type="checkbox" checked={selectedAnswers.includes(index)} onChange={() => handleAnswerSelect(questionId, index, question.type)} className="sr-only" />
                <span className="flex-1 text-gray-800"><TextWithMath text={`${String.fromCharCode(65 + index)}. ${option}`} /></span>
              </div>
            </label>
          ))}
        </div>
      );
    }

    if (question.type === 'true-false') {
      return (
        <div className="space-y-4 mb-8">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead><tr className="bg-gray-50"><th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900">Pernyataan</th><th className="border border-gray-300 px-4 py-3 text-center font-medium text-gray-900 w-24">Benar</th><th className="border border-gray-300 px-4 py-3 text-center font-medium text-gray-900 w-24">Salah</th></tr></thead>
              <tbody><tr><td className="border border-gray-300 px-4 py-3 text-gray-800"><TextWithMath text={question.question} /></td><td className="border border-gray-300 px-4 py-3 text-center"><input type="radio" name={`question-${questionId}`} checked={userAnswer === true} onChange={() => handleAnswerSelect(questionId, true, question.type)} className="h-5 w-5 accent-green-600" /></td><td className="border border-gray-300 px-4 py-3 text-center"><input type="radio" name={`question-${questionId}`} checked={userAnswer === false} onChange={() => handleAnswerSelect(questionId, false, question.type)} className="h-5 w-5 accent-red-600" /></td></tr></tbody>
            </table>
          </div>
        </div>
      );
    }
    
    if (question.type === 'multiple-true-false') {
      return (
        <div className="space-y-4 mb-8">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead><tr className="bg-gray-50"><th className="border border-gray-300 px-4 py-3 text-left font-medium text-gray-900">Pernyataan</th><th className="border border-gray-300 px-4 py-3 text-center font-medium text-gray-900 w-24">Benar</th><th className="border border-gray-300 px-4 py-3 text-center font-medium text-gray-900 w-24">Salah</th></tr></thead>
              <tbody>
                {question.statements.map((statement, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-3 text-gray-800"><TextWithMath text={statement.text} /></td>
                    <td className="border border-gray-300 px-4 py-3 text-center"><input type="radio" name={`question-${questionId}-statement-${index}`} checked={userAnswer?.[index] === true} onChange={() => handleAnswerSelect(questionId, true, question.type, index)} className="h-5 w-5 accent-green-600" /></td>
                    <td className="border border-gray-300 px-4 py-3 text-center"><input type="radio" name={`question-${questionId}-statement-${index}`} checked={userAnswer?.[index] === false} onChange={() => handleAnswerSelect(questionId, false, question.type, index)} className="h-5 w-5 accent-red-600" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  };

  if (loading || !exam) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Menyiapkan soal ujian...</p>
        </div>
      </div>
    );
  }

  const question = exam.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-3 min-w-0">
              <img src="https://raw.githubusercontent.com/Rendradnta/BoboiboyDB/main/database/7beaae1d85aa9e9f.jpeg" alt="RESABELAJAR Logo" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0" />
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg font-bold text-gray-800 truncate">{exam.title}</h1>
                <p className="text-xs sm:text-sm text-gray-600">Soal {currentQuestion + 1} dari {exam.questions.length}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center space-x-2 bg-red-50 px-2 sm:px-3 py-2 rounded-lg">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                <span className="font-mono text-red-600 font-medium text-sm sm:text-base">{formatTime(timeLeft)}</span>
              </div>
              <button onClick={handleFinishClick} className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 text-sm sm:text-base">
                <CheckCircle className="w-4 h-4" />
                <span>Selesai</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Navigasi Soal</h3>
              <div className="grid grid-cols-5 gap-2">
                {exam.questions.map((q, index) => (
                  <button key={q.id} onClick={() => setCurrentQuestion(index)} className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${getStatusColor(getQuestionStatus(q.id))} ${currentQuestion === index ? 'ring-2 ring-blue-500' : ''}`}>
                    {index + 1}
                  </button>
                ))}
              </div>
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex items-center space-x-2"><div className="w-4 h-4 bg-white border border-gray-300 rounded"></div><span className="text-gray-600">Belum dijawab</span></div>
                <div className="flex items-center space-x-2"><div className="w-4 h-4 bg-blue-600 rounded"></div><span className="text-gray-600">Sudah dijawab</span></div>
                <div className="flex items-center space-x-2"><div className="w-4 h-4 bg-yellow-500 rounded"></div><span className="text-gray-600">Ditandai</span></div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <motion.div key={currentQuestion} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center space-x-2 mb-2 flex-wrap gap-y-2">
                    <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">{question.subject}</span>
                    <span className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${question.type === 'multiple-choice' ? 'bg-purple-100 text-purple-800' : question.type === 'multiple-choice-complex' ? 'bg-orange-100 text-orange-800' : question.type === 'multiple-true-false' ? 'bg-teal-100 text-teal-800' : 'bg-green-100 text-green-800'}`}>
                      {question.type === 'multiple-choice' ? 'Pilihan Ganda' : question.type === 'multiple-choice-complex' ? 'Pilihan Ganda Kompleks' : question.type === 'multiple-true-false' ? 'Benar-Salah Ganda' : 'Benar Salah'}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Soal {currentQuestion + 1}</h2>
                </div>
                <button onClick={() => handleFlagToggle(question.id)} className={`p-2 rounded-lg transition-colors ${flagged.has(question.id) ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  <Flag className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-6"><TextWithMath text={question.question} className="text-gray-800 leading-relaxed break-words" /></div>
              {renderQuestionInput(question)}

              <div className="flex justify-between border-t pt-4 mt-4">
                <button onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))} disabled={currentQuestion === 0} className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  <ArrowLeft className="w-4 h-4" /><span>Sebelumnya</span>
                </button>
                <button onClick={() => setCurrentQuestion(Math.min(exam.questions.length - 1, currentQuestion + 1))} disabled={currentQuestion === exam.questions.length - 1} className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  <span>Selanjutnya</span><ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <ConfirmationModal isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)} onConfirm={handleSubmitExam} title="Konfirmasi Selesai Ujian" message={`Apakah Anda yakin ingin menyelesaikan ujian? Anda telah menjawab ${Object.keys(answers).length} dari ${exam.questions.length} soal.`} />
    </div>
  );
};

export default ExamPage;
import { useDispatch, useSelector } from 'react-redux';
import { fetchAFPSATData } from '../features/afp/afpsatSlice';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const AFPSAT = () => {
  const dispatch = useDispatch();
  const { questions, loading, error } = useSelector((state) => state.afpsat);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    dispatch(fetchAFPSATData());
  }, [dispatch]);

  useEffect(() => {
    if (Array.isArray(questions) && questions.length > 0) {
      const shuffled = [...questions].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 10);
      setShuffledQuestions(selected);
    }
  }, [questions]);

  const handleAnswerChange = (questionIndex, selectedChoice) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedChoice,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('SUBMITTED');
    console.log('ANSWERS:', answers);

    let newScore = 0;

    shuffledQuestions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        newScore += 1;
      }
    });

    setScore(newScore);
    setShowResults(true);

    Swal.fire({
      title: 'Result',
      text: `You scored ${newScore} out of ${shuffledQuestions.length}`,
      icon: 'success',
    });
  };

  const handleRetry = () => {
    const reshuffled = [...questions].sort(() => 0.5 - Math.random());
    const newSelected = reshuffled.slice(0, 10);
    setShuffledQuestions(newSelected);
    setAnswers({});
    setScore(null);
    setShowResults(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">AFPSAT Reviewer</h2>
      <p className="text-gray-600 mb-4">Welcome to the Armed Forces of the Philippines reviewer section.</p>

      {loading ? (
        <p className="text-center text-gray-500">Loading questions...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error loading questions.</p>
      ) : shuffledQuestions.length === 0 ? (
        <p className="text-center text-gray-500">No questions available.</p>
      ) : (
        <>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {shuffledQuestions.map((question, questionIndex) => (
              <div key={questionIndex} className="bg-gray-50 px-6 py-4 rounded-md shadow-sm">
                <p className="font-semibold text-gray-800 mb-3">
                  {questionIndex + 1}. {question.question}
                </p>

                <div className="space-y-1">
                  {question.choices.map((choice, choiceIndex) => {
                    const isSelected = answers[questionIndex] === choice;
                    const isCorrect = question.answer === choice;
                    const isWrong = isSelected && !isCorrect;

                    return (
                      <label
                        key={choiceIndex}
                        className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer
                          ${showResults && isCorrect ? 'bg-green-100 border border-green-500' : ''}
                          ${showResults && isWrong ? 'bg-red-100 border border-red-500' : ''}
                        `}
                      >
                        <input
                          type="radio"
                          name={`question-${questionIndex}`}
                          value={choice}
                          checked={isSelected}
                          disabled={showResults}
                          onChange={() => handleAnswerChange(questionIndex, choice)}
                          className="form-radio text-blue-600"
                        />
                        <span className="text-gray-700">{choice}</span>
                        {showResults && isCorrect && <span className="text-green-600 font-medium ml-2">(Correct Answer)</span>}
                        {showResults && isWrong && <span className="text-red-600 font-medium ml-2">(Your Answer)</span>}
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}

            {!showResults && (
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 mt-2 rounded-lg transition duration-200"
                >
                  Submit
                </button>
              </div>
            )}
          </form>

          {showResults && (
            <div className="text-center mt-6">
              <button
                onClick={handleRetry}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-6 py-2 rounded-lg transition duration-200"
              >
                Try Again
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AFPSAT;

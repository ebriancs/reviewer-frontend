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

  useEffect(() => {
    dispatch(fetchAFPSATData());
  }, [dispatch]);

  useEffect(() => {
    if (questions.length > 0) {
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

    Swal.fire({
      title: 'Result',
      text: `You scored ${newScore} out of ${shuffledQuestions.length}`,
      icon: 'success',
    }).then(() => {
      if (questions.length > 0) {
        const reshuffled = [...questions].sort(() => 0.5 - Math.random());
        const newSelected = reshuffled.slice(0, 10);
        setShuffledQuestions(newSelected);
        setAnswers({});
        setScore(null);
      }
      
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">AFPSAT Reviewer</h2>
      <p className="text-gray-600 mb-4">Welcome to the Armed Forces of the Philippines reviewer section.</p>

      <form className="space-y-2" onSubmit={handleSubmit}>
        {shuffledQuestions.map((question, questionIndex) => (
          <div key={questionIndex} className="bg-gray-50 px-6 py-4 rounded-md shadow-sm">
            <p className="font-semibold text-gray-800 mb-3">
              {questionIndex + 1}. {question.question}
            </p>

            <div className="space-y-1">
              {question.choices.map((choice, choiceIndex) => (
                <label key={choiceIndex} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${questionIndex}`}
                    value={choice}
                    checked={answers[questionIndex] === choice}
                    onChange={() => handleAnswerChange(questionIndex, choice)}
                    className="form-radio text-blue-600 focus:ring-blue-400"
                  />
                  <span className="text-gray-700">{choice}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 mt-2 rounded-lg transition duration-200">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AFPSAT;

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

interface Question {
    id: number;
    text: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }

type UserData = {
  streak: number;
  coins: number;
  lastPlayed: string | null;
  answeredToday: boolean;
};

// Animations
const flameAnimation = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const coinAnimation = keyframes`
  0% { transform: rotate(0deg) scale(1); }
  25% { transform: rotate(10deg) scale(1.2); }
  50% { transform: rotate(0deg) scale(1.3); }
  75% { transform: rotate(-10deg) scale(1.2); }
  100% { transform: rotate(0deg) scale(1); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styled Components
const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
  font-family: 'Georgia', serif;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #2c3e50;
  color: white;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StreakContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FlameIcon = styled.div<{ $active: boolean }>`
  font-size: 24px;
  animation: ${({ $active }) => ($active ? `${flameAnimation} 1s infinite` : 'none')};
  color: ${({ $active }) => ($active ? '#e74c3c' : '#95a5a6')};
`;

const CoinContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CoinIcon = styled.div<{ $animate: boolean }>`
  font-size: 24px;
  animation: ${({ $animate }) => ($animate ? `${coinAnimation} 0.5s` : 'none')};
  color: #f1c40f;
`;

const QuizCard = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  animation: ${pulseAnimation} 0.5s;
`;

const QuestionText = styled.h3`
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.2rem;
  line-height: 1.5;
`;

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
`;

const OptionButton = styled.button<{ $isSelected: boolean; $isCorrect: boolean | null }>`
  padding: 12px 15px;
  border: 2px solid ${({ $isSelected, $isCorrect }) => 
    $isCorrect === true ? '#2ecc71' : 
    $isCorrect === false ? '#e74c3c' : 
    $isSelected ? '#3498db' : '#bdc3c7'};
  border-radius: 8px;
  background-color: ${({ $isSelected, $isCorrect }) => 
    $isCorrect === true ? 'rgba(46, 204, 113, 0.1)' : 
    $isCorrect === false ? 'rgba(231, 76, 60, 0.1)' : 
    $isSelected ? 'rgba(52, 152, 219, 0.1)' : 'white'};
  color: #2c3e50;
  font-size: 1rem;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ $isCorrect }) => 
      $isCorrect === null ? '#3498db' : ''};
  }
`;

const Explanation = styled.div<{ $show: boolean }>`
  margin-top: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-left: 4px solid #3498db;
  border-radius: 0 4px 4px 0;
  display: ${({ $show }) => ($show ? 'block' : 'none')};
  animation: fadeIn 0.3s;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const LegalIcon = styled.span`
  font-size: 20px;
  margin-right: 10px;
`;

const CompleteMessage = styled.div`
  text-align: center;
  padding: 30px;
  background-color: #2ecc71;
  color: white;
  border-radius: 8px;
  margin-top: 20px;
`;

const ResetButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c0392b;
  }
`;

// Sample questions
const legalQuestions: Question[] = [
  {
    id: 1,
    text: "In contract law, what does 'consideration' refer to?",
    options: [
      "The meeting of minds between parties",
      "Something of value exchanged between parties to a contract",
      "The legal capacity to enter into a contract",
      "The intention to create legal relations"
    ],
    correctAnswer: 1,
    explanation: "Consideration refers to something of value that is exchanged between parties to a contract. It's one of the essential elements for a contract to be legally binding."
  },
  {
    id: 2,
    text: "What is the principle of 'stare decisis'?",
    options: [
      "The right to remain silent",
      "The obligation to tell the truth in court",
      "The legal doctrine of following precedent",
      "The power of judicial review"
    ],
    correctAnswer: 2,
    explanation: "Stare decisis is the legal principle of determining points in litigation according to precedent. It means 'to stand by things decided' and promotes consistency in the legal system."
  },
  {
    id: 3,
    text: "Which amendment to the U.S. Constitution guarantees the right to a speedy trial?",
    options: [
      "First Amendment",
      "Fourth Amendment",
      "Sixth Amendment",
      "Fourteenth Amendment"
    ],
    correctAnswer: 2,
    explanation: "The Sixth Amendment guarantees the rights of criminal defendants, including the right to a speedy and public trial by an impartial jury."
  }
];

// Component
const LegalQuizApp: React.FC = () => {
  const [userData, setUserData] = useState<UserData>(() => {
    // Load from localStorage or initialize
    const savedData = localStorage.getItem('legalQuizUserData');
    return savedData ? JSON.parse(savedData) : {
      streak: 0,
      coins: 0,
      lastPlayed: null,
      answeredToday: false
    };
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [animateCoin, setAnimateCoin] = useState(false);
  const [animateFlame, setAnimateFlame] = useState(false);

  // Check if user has already played today
  useEffect(() => {
    const today = new Date().toDateString();
    if (userData.lastPlayed === today) {
      setUserData(prev => ({ ...prev, answeredToday: true }));
    }
  }, [userData.lastPlayed]);

  // Save to localStorage whenever userData changes
  useEffect(() => {
    localStorage.setItem('legalQuizUserData', JSON.stringify(userData));
  }, [userData]);

  const handleOptionSelect = (optionIndex: number) => {
    if (userData.answeredToday) return;
    setSelectedOption(optionIndex);
  };

  const checkAnswer = () => {
    if (selectedOption === null || userData.answeredToday) return;

    const currentQuestion = legalQuestions[currentQuestionIndex];
    const correct = selectedOption === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowExplanation(true);

    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toDateString();

    if (correct) {
      setAnimateCoin(true);
      setTimeout(() => setAnimateCoin(false), 500);

      // Update user data
      setUserData(prev => {
        let newStreak = prev.streak;
        
        // If first answer today or maintained streak
        if (prev.lastPlayed === yesterdayString || prev.lastPlayed === today) {
          newStreak = prev.lastPlayed === yesterdayString ? prev.streak + 1 : prev.streak;
        } else {
          newStreak = 1; // Reset streak if broken
        }

        return {
          streak: newStreak,
          coins: prev.coins + 10,
          lastPlayed: today,
          answeredToday: true
        };
      });

      if (userData.lastPlayed === yesterdayString || userData.lastPlayed === today) {
        setAnimateFlame(true);
        setTimeout(() => setAnimateFlame(false), 1000);
      }
    }
  };

  const resetDailyQuiz = () => {
    setSelectedOption(null);
    setIsCorrect(null);
    setShowExplanation(false);
    setUserData(prev => ({ ...prev, answeredToday: false }));
    setCurrentQuestionIndex(prev => (prev + 1) % legalQuestions.length);
  };

  const currentQuestion = legalQuestions[currentQuestionIndex];

  return (
    <AppContainer>
      <Header>
        <StreakContainer>
          <LegalIcon>⚖️</LegalIcon>
          <h1>LegalEagle Quiz</h1>
        </StreakContainer>
        
        <StreakContainer>
          <FlameIcon $active={animateFlame || userData.streak > 0}>🔥</FlameIcon>
          <span>{userData.streak} day streak</span>
        </StreakContainer>

        <CoinContainer>
          <CoinIcon $animate={animateCoin}>🪙</CoinIcon>
          <span>{userData.coins}</span>
        </CoinContainer>
      </Header>

      {!userData.answeredToday ? (
        <QuizCard>
          <QuestionText>
            <LegalIcon>📜</LegalIcon>
            {currentQuestion.text}
          </QuestionText>

          <OptionsContainer>
            {currentQuestion.options.map((option, index) => (
              <OptionButton
                key={index}
                onClick={() => handleOptionSelect(index)}
                $isSelected={selectedOption === index}
                $isCorrect={isCorrect}
              >
                {option}
              </OptionButton>
            ))}
          </OptionsContainer>

          <button 
            onClick={checkAnswer} 
            disabled={selectedOption === null}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: selectedOption === null ? '#bdc3c7' : '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: selectedOption === null ? 'not-allowed' : 'pointer',
              fontSize: '1rem'
            }}
          >
            Submit Answer
          </button>

          <Explanation $show={showExplanation}>
            <strong>Explanation:</strong> {currentQuestion.explanation}
          </Explanation>
        </QuizCard>
      ) : (
        <>
          <CompleteMessage>
            <h2><LegalIcon>🎉</LegalIcon> Daily Quiz Complete!</h2>
            <p>You've earned 10 coins today.</p>
            <p>Come back tomorrow to continue your streak!</p>
          </CompleteMessage>

          <div style={{ textAlign: 'center' }}>
            <ResetButton onClick={resetDailyQuiz}>
              Practice More Questions
            </ResetButton>
          </div>
        </>
      )}
    </AppContainer>
  );
};

export default LegalQuizApp;  

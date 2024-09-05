import {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {resolver} from '../../metro.config';
import {GeneralQuiz, SpecificQuiz} from '../assets/data/QuizQuestions';
import Question from '../components/Question';

const QuizScreen = ({navigation}) => {
  const [questionLoaded, setQuestionLoaded] = useState(false);
  const [totalScore, setTotalScore] = useState(100);
  const [completedQuiz, setCompletedQuiz] = useState(false);
  const [questList, setQuestList] = useState([]);
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [questionAnswered, setQuestionAnswered] = useState(1);
  const [questionWorth, setQuestionWorth] = useState(0);
  const [selectedQuiz, setSelectedQuiz] = useState('');

  const setupQuiz = async () => {
    let quizData = new Promise((resolve, reject) => {
      const quizzes = [GeneralQuiz, SpecificQuiz];
      console.log('QUIZZES', quizzes);
      let selected = quizzes[Math.floor(Math.random() * quizzes.length)];
      console.log('SELECTED', selected);
      let choice = selected;
      console.log('CHOICE', choice);
      setQuestionLoaded(true);
      resolve(choice);
    });

    console.log('QUIZ DATA', quizData);

    let chosenQuiz: any = await quizData;
    console.log('CHOSEN QUIZ', chosenQuiz);
    let quizTitle = await chosenQuiz.title[0];
    console.log('QUIZ TITLE', quizTitle);
    let quizContent = await chosenQuiz.question;
    console.log('quizContent', quizContent);
    let questionCount = await quizContent.length;
    console.log('questionCount', questionCount);
    setSelectedQuiz(quizTitle);
    setQuestList(quizContent);
    setQuestionWorth(Math.floor(100 / questionCount));
    setNumberOfQuestions(questionCount);
  };

  useEffect(() => {
    setupQuiz();
  }, []);

  const updateScore = (penalty: any) => {
    let tempScore = totalScore;
    let missed = incorrect;
    let questioTotal = numberOfQuestions;
    let questionDone = questionAnswered;
    setTotalScore(tempScore - penalty);
    setIncorrect(penalty ? missed + 1 : missed);
    setQuestionAnswered(questionDone + 1);
    if (questionAnswered === questioTotal) {
      setCompletedQuiz(true);
    }
  };

  const finishQuiz = () => {
    navigation.navigate('QuizFinish', {
      score: totalScore,
      missed: incorrect,
      questions: numberOfQuestions,
    });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 30,
    },
    enabled: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#90ee90',
      height: '10%',
    },
    disabled: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#d3d3d3',
      height: '10%',
    },
  });

  return (
    <View style={styles.container}>
      <Text>{selectedQuiz}</Text>
      {questionLoaded && (
        <FlatList
          keyExtractor={item => item.key.toString()}
          data={questList}
          renderItem={({item}) => (
            <Question
              question={item.question}
              answer1={item.answer1}
              answer2={item.answer2}
              answer3={item.answer3}
              answer4={item.answer4}
              correctAnswer={item.correctAnswer}
              scoreUpdate={updateScore}
              worth={questionWorth}
            />
          )}
        />
      )}
      {completedQuiz && (
        <TouchableHighlight onPress={finishQuiz} style={styles.enabled}>
          <Text>Touch to Finish</Text>
        </TouchableHighlight>
      )}

      {!completedQuiz && (
        <TouchableHighlight style={styles.disabled}>
          <Text>Answer all the questions</Text>
        </TouchableHighlight>
      )}

      {!questionLoaded && <Text>Loading...</Text>}
    </View>
  );
};
export default QuizScreen;

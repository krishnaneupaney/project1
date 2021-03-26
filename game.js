
prompt('Have you over wonder what it takes to serve your country?', 'yes/no')
alert('Awesome- click Start below to get started')

const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const ansbtnElement = document.getElementById('ans-btns')

let shuffledQuestions, currentQuestionIndex

const userAnswers = []


startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})
function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}
function showQuestion(question) {
  questionElement.innerText = question.question
  question.anss.forEach(ans => {
    const button = document.createElement('button')
    button.innerText = ans.text
    button.classList.add('btn')
    if (ans.correct) {
      button.dataset.correct = ans.correct
    }
    button.addEventListener('click', selectans)
    ansbtnElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (ansbtnElement.firstChild) {
    ansbtnElement.removeChild(ansbtnElement.firstChild)
  }
}

function selectans(e) {
  const selectedButton = e.target
  console.log(selectedButton);
  const correct = selectedButton.dataset.correct
  const trueAns = shuffledQuestions[currentQuestionIndex].anss.filter((arm)=> {
      return selectedButton.innerText === arm.text;
  })[0];
  userAnswers.push(trueAns);
  console.log(userAnswers)
  setStatusClass(document.body, correct)
  Array.from(ansbtnElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    youQualify();
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

const resultsContainer = document.getElementById('result');

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
} 

function youQualify() {
 const correctAnswers = userAnswers.filter((item)=> { return item.correct
    })
    if (correctAnswers.length > 3) {
        alert('you can join');
    } else  {
        alert('you cannot')
    }
}

const questions = [
  {
    question: 'Are you U.S. Citizen or Permanent resident?',
    anss: [
      { text: 'Yes', correct: true },
      { text: 'NO', correct: false },
     
    ]
  },
  {
    question: 'select your height range?',
    anss: [
      { text: '200 cms', correct: false },
      { text: '157 cms', correct: true },
      { text: '149 cms', correct: false },
      { text: '199 cms', correct: false }
    ]
  },
  {
    question: 'What is your age range?',
    anss: [
      { text: '18 - 34', correct: false },
      { text: '34 - 44', correct: false },
      { text: '44 - 53', correct: false },
      { text: '24 - 34', correct: true }
    ]
  },
  {
    question: 'Why you want to be in army?',
    anss: [
      { text: 'Military Discount?', correct: false },
      { text: 'I want to travel abroad?', correct: false },
      { text: 'I want to protect my country', correct: true },
      { text: 'Free college education?', correct: false },
    ]
  },
]

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

// restartGame.addEventListener('click', showResults);

// var GameScore = 0;
// var Level = 0;

const imdbLinks = {
  "The Dark Knight": "https://m.imdb.com/es/title/tt0468569",
  "Batman v Superman: Dawn of Justice": "https://www.imdb.com/title/tt2975590/",
  "The Batman": "https://www.imdb.com/title/tt1877830/",
  "Spiderman: Into the Spider-Verse": "https://www.imdb.com/es/title/tt4633694",
  "Spiderman 2": "https://www.imdb.com/es/title/tt0316654",
  "The Amazing Spider-Man": "https://www.imdb.com/es/title/tt0948470",
  "Justice League": "https://www.imdb.com/es/title/tt0974015",
  "The Flashpoint Paradox": "https://www.imdb.com/es/title/tt2820466",
  "The Flash (2023)": "https://www.imdb.com/title/tt0439572/",
  "Mission: Impossible - Fallout": "https://www.imdb.com/title/tt4912910/",
  "A Few Good Men": "https://www.imdb.com/es/title/tt0104257",
  "The Hunt for Red October": "https://www.imdb.com/es/title/tt0099810",
  "Once Upon a Time in Hollywood": "https://www.imdb.com/es/title/tt7131622",
  "Deadpool 2": "https://www.imdb.com/es/title/tt5463162",
  "John Wick": "https://www.imdb.com/title/tt2911666",
  "Avengers: Endgame": "https://www.imdb.com/es/title/tt4154796",
  "Guardians of the Galaxy Vol. 2": "https://www.imdb.com/es/title/tt3896198",
  "Doctor Strange in the Multiverse of Madness": "https://www.imdb.com/es/title/tt9419884",
  "A Walk to Remember": "https://www.imdb.com/title/tt0281358/",
  "The Vow": "https://www.imdb.com/es/title/tt1606389",
  "Dear John": "https://www.imdb.com/es/title/tt0989757",
  "Avengers: Infinity War": "https://www.imdb.com/es/title/tt4154756",
  "Captain Marvel": "https://www.imdb.com/es/title/tt4154664",
  "Shang-Chi and the Legend of the Ten Rings": "https://www.imdb.com/es/title/tt9376612",
  "Goodfellas": "https://www.imdb.com/es/title/tt0099685",
  "Casino": "https://www.imdb.com/es/title/tt0112641",
  "Scarface": "https://www.imdb.com/es/title/tt0086250"
};

document.addEventListener('DOMContentLoaded', function () {
    let movieOptions = {};  
  
    fetch('movieOptions.json')
      .then(response => response.json()) 
      .then(data => {
        movieOptions = data;  
        initializeQuiz(movieOptions);  
      })
      .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
      });
  
    const progressSteps = document.querySelectorAll('.progress-step');
    const questions = Array.from(document.querySelectorAll('.question'));
    const optionsContainers = questions.map(q => q.querySelector('.options'));
    const cta = document.querySelector('.cta');
    const ctaButton = document.getElementById('ctaButton');
    const header = document.querySelector('h2');
  
    let lastSelectedMovie = '';
  
    function updateHeader(index) {
      if (header) {
        header.textContent = `Question ${index + 1} of ${questions.length}`;
      }
    }
  
    function showNextQuestion(currentIndex, nextIndex) {
      questions[currentIndex].style.display = 'none';
      if (nextIndex !== null) {
        questions[nextIndex].style.display = 'block';
        progressSteps[nextIndex].classList.add('active');
        updateHeader(nextIndex);
      } else {
        cta.style.display = 'block';
        progressSteps.forEach(step => step.classList.add('complete'));
      }
    }
  
    function handleOptionClick(e, currentIndex, movieOptions) {
      const option = e.target.closest('.option');
      if (!option) return;
  
      const selectedMovie = option.getAttribute('data-value');
      lastSelectedMovie = selectedMovie;
  
      if (currentIndex < questions.length - 1) {
        const nextIndex = currentIndex + 1;
        const options = movieOptions[selectedMovie];
        optionsContainers[nextIndex].innerHTML = options
          .map(movie => `
            <div class="option" data-value="${movie.name}">
              <img src="${movie.image}" alt="${movie.name}" class="visible">
            </div>
          `).join('');
        showNextQuestion(currentIndex, nextIndex);
      } else {
        ctaButton.addEventListener('click', () => {
          window.open(imdbLinks[selectedMovie], '_blank');
        });
        showNextQuestion(currentIndex, null);
      }
    }
  
    questions.forEach((question, index) => {
      question.addEventListener('click', (e) => handleOptionClick(e, index, movieOptions)); 
    });
  
    function initializeQuiz(movieOptions) {
      updateHeader(0);
      questions.forEach((q, i) => (q.style.display = i === 0 ? 'block' : 'none'));
      document.querySelectorAll('.option img').forEach(img => img.classList.add('visible'));
      questions.forEach((question, index) => {
        question.addEventListener('click', (e) => handleOptionClick(e, index, movieOptions)); 
      });
    }
  });


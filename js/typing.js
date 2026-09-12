// ===========================
// TYPING ANIMATION
// ===========================

const typingText = document.querySelector("#typing-text");

if(typingText){

  const words = [

    "Software Engineer",

    "Full-Stack Web Developer",

    "Backend Developer",

    "Node.js Developer",

    "JavaScript Developer",

    "REST API Developer",
    
    "Web Application Developer"

  ];


  let wordIndex = 0;

  let charIndex = 0;

  let isDeleting = false;

  let typingSpeed = 150;


  function typeWord(){

    const currentWord = words[wordIndex];

    typingText.textContent = currentWord.slice(0, charIndex);


    if(!isDeleting){

      // Typing
      charIndex++;

      typingSpeed = 150;


      if(charIndex > currentWord.length){

        isDeleting = true;

        typingSpeed = 2000;

      }

    }else{

      // Deleting
      charIndex--;

      typingSpeed = 80;


      if(charIndex < 0){

        isDeleting = false;

        wordIndex++;

        if(wordIndex >= words.length){

          wordIndex = 0;

        }

        charIndex = 0;

        typingSpeed = 500;

      }

    }


    setTimeout(typeWord, typingSpeed);

  }


  typeWord();

}




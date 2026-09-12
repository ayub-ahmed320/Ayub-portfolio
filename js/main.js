// Hamburger Menu

const menuToggle = document.querySelector(".menu-toggle");

const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", function () {

  navLinks.classList.toggle("active");

});

// ===========================
// THEME TOGGLE
// ===========================

const themeToggle = document.querySelector("#theme-toggle");

// ===========================
// LOAD SAVED THEME
// ===========================

const savedTheme = localStorage.getItem("theme");

if(savedTheme === "dark"){

  document.body.classList.add("dark-mode");

}

themeToggle.addEventListener("click", function(){

  document.body.classList.toggle("dark-mode");

  if(document.body.classList.contains("dark-mode")){

    localStorage.setItem("theme","dark");

  }else{

  localStorage.setItem("theme","light");

  }

});


// Active Navigation

const sections = document.querySelectorAll("section");

const navItems = document.querySelectorAll(".nav-links a");

let activeLink = null;

let ticking = false;


function updateActiveNavigation(){

  let current = "";

  const scrollPosition = window.scrollY;


  sections.forEach(function(section){

    const sectionTop = section.offsetTop;

    if(scrollPosition >= sectionTop - 150){

      current = section.getAttribute("id");

    }

  });


  const newActiveLink = document.querySelector(
    `.nav-links a[href="#${current}"]`
  );


  if(newActiveLink !== activeLink){

    if(activeLink){

      activeLink.classList.remove("active");

    }

    if(newActiveLink){

      newActiveLink.classList.add("active");

    }

    activeLink = newActiveLink;

  }

  ticking = false;

}


window.addEventListener("scroll", function(){

  if(!ticking){

    window.requestAnimationFrame(updateActiveNavigation);

    ticking = true;

  }

});



// ===========================
// PROJECT FILTER
// ===========================

// Select all filter buttons
const filterButtons = document.querySelectorAll(".filter-btn");

// Select all project cards
const projectCards = document.querySelectorAll(".project-card");

// Loop through every button
filterButtons.forEach(function(button){

  button.addEventListener("click", function(){

    // Remove active class from every button
    filterButtons.forEach(function(btn){

      btn.classList.remove("active");

    });

    // Highlight the clicked button
    button.classList.add("active");

    // Get the selected category
    const filterValue = button.dataset.filter;

    // Loop through every project
    projectCards.forEach(function(card){

      const category = card.dataset.category;

      // Show matching cards
      if(filterValue === "all" || filterValue === category){

        card.classList.remove("hide");

      }

      // Hide non-matching cards
      else{

        card.classList.add("hide");

      }

    });

  });

});


// ===========================
// CONTACT FORM VALIDATION
// ===========================

// Select the form

const contactForm = document.querySelector("#contact-form");

// Select the inputs
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const subjectInput = document.querySelector("#subject");
const messageInput = document.querySelector("#message");

const formMessage = document.querySelector("#form-message");



// Listen for form submission
contactForm.addEventListener("submit", function(event){

    // Stop the browser from submitting immediately
  event.preventDefault();


  // Get the values entered by the user
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const subject = subjectInput.value.trim();
  const message = messageInput.value.trim();


  // Assume everything is valid
  let isValid = true;

  const errors = [];

 // Name validation
   if(name === ""){

    // console.log("Name is required.");
    errors.push("Name is required.");

    isValid = false;

  }

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(email === ""){

    // console.log("Email is required.");
    errors.push("Email is required.");

    isValid = false;

  }else if(!emailPattern.test(email)){

    // console.log("Please enter a valid email.");
    errors.push("Please enter a valid email address.");

    isValid = false;

  }

  // Subject validation
  if(subject === ""){

    // console.log("Subject is required.");
    errors.push("Subject is required.");

    isValid = false;

  }


  // Message validation
  if(message === ""){

    // console.log("Message is required.");
    errors.push("Message is required.");

    isValid = false;

  }else if(message.length < 10){

    // console.log("Message must be at least 10 characters.");
    errors.push("Message must be at least 10 characters.");

    isValid = false;

  } 




  if(isValid){

    formMessage.textContent = "Sending message...";

    formMessage.classList.remove("error");

    formMessage.classList.add("success");

    fetch(contactForm.action, {
      method: "POST",
      body: new FormData(contactForm),
      headers: {
      "Accept": "application/json"
      }
    })

    .then(function(response){

      if(response.ok){

        formMessage.textContent = "Message sent successfully!";

        contactForm.reset();

      }else{

        formMessage.textContent = "Something went wrong. Please try again.";

        formMessage.classList.remove("success");

        formMessage.classList.add("error");

      }

    })

    .catch(function(){

      formMessage.textContent = "Unable to send message. Please try again.";

      formMessage.classList.remove("success");

      formMessage.classList.add("error");

    });

  }else{

    formMessage.textContent = errors.join(" ");

    formMessage.classList.remove("success");

    formMessage.classList.add("error");

  }


});




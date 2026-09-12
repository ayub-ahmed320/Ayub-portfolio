// ===========================
// SCROLL TO TOP BUTTON
// ===========================

const scrollTopBtn = document.querySelector("#scrollTopBtn");

if(scrollTopBtn){

  let ticking = false;


  function updateScrollTopButton(){

    if(window.scrollY > 300){

      scrollTopBtn.classList.add("show");

    }else{

      scrollTopBtn.classList.remove("show");

    }

    ticking = false;

  }


  window.addEventListener("scroll", function(){

    if(!ticking){

      window.requestAnimationFrame(updateScrollTopButton);

      ticking = true;

    }

  });


  // ===========================
  // SCROLL BACK TO TOP
  // ===========================

  scrollTopBtn.addEventListener("click", function(){

    window.scrollTo({

      top:0,

      behavior:"smooth"

    });

  });

}








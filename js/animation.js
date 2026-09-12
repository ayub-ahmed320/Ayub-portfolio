// ===========================
// SCROLL REVEAL
// ===========================

// Select all hidden elements
const hiddenElements = document.querySelectorAll(".hidden");

// Create Observer
const observer = new IntersectionObserver(function(entries){

  entries.forEach(function(entry){

    if(entry.isIntersecting){

      entry.target.classList.add("show");

      // Animate only once
      observer.unobserve(entry.target);

    }

  });

},{
  root: null,
  rootMargin: "0px 0px -100px 0px",
  threshold: 0.15
});

// Observe every hidden element
hiddenElements.forEach(function(element){

    observer.observe(element);

});


// ===========================
// SKILL BAR ANIMATION
// ===========================

const progressBars = document.querySelectorAll(".skill-progress");

const skillObserver = new IntersectionObserver(function(entries){

  entries.forEach(function(entry){

    if(entry.isIntersecting){

      const bar = entry.target;

      const level = bar.dataset.level;

      // Animate this individual bar
      bar.style.width = level + "%";

      // Animate only once
      skillObserver.unobserve(bar);

    }

  });

},{
  threshold:0.3
});


// Observe every skill bar individually
progressBars.forEach(function(bar){

  skillObserver.observe(bar);

});




// ===========================
// COUNTER ANIMATION
// ===========================

const counters = document.querySelectorAll(".counter");

const statsGrid = document.querySelector(".stats-grid");

const counterObserver = new IntersectionObserver(function(entries){

  entries.forEach(function(entry){

    if(entry.isIntersecting){

      counters.forEach(function(counter){

        const target = Number(counter.dataset.target);

        const duration = 1500; // 1.5 seconds
        const startTime = performance.now();

        function updateCounter(currentTime){

          const elapsed = currentTime - startTime;

          const progress = Math.min(elapsed / duration, 1);

          // Smooth animation
          const current = Math.floor(progress * target);

          counter.textContent = current.toLocaleString() + "+";

          if(progress < 1){

            requestAnimationFrame(updateCounter);

          }else{

            counter.textContent = target.toLocaleString() + "+";

          }

        }

        requestAnimationFrame(updateCounter);

      });

      // Animate only once
      counterObserver.unobserve(entry.target);

    }

  });

},{
  threshold:0.3
});


// Observe statistics
if(statsGrid){

  counterObserver.observe(statsGrid);

}



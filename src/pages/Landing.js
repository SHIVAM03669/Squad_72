export function Landing() {
  function initializeAnimations() {
    const logo = document.querySelector('.logo-container');
    const content = document.querySelector('.content-container');
    const letter = document.querySelector('.letter-overlay');
    
    if (logo && content && letter) {
      // Add class to hide scrollbar during animation
      document.body.classList.add('animating');
      
      // Auto-scroll animation
      let startTime;
      const totalDuration = 5000; // Increased to 5 seconds for smoother animation
      const totalScroll = window.innerHeight * 1.5;

      function autoScroll(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / totalDuration;

        if (progress < 1) {
          const scrollY = progress * totalScroll;
          window.scrollTo(0, scrollY);
          
          // Calculate scroll percentage and apply animations
          const scrollPercent = scrollY / totalScroll;
          
          const maxLogoScale = 3;
          const maxLetterScale = 5;
          
          // Phase 1: Logo scaling and fading (0-50%)
          if (scrollPercent <= 0.5) {
            const scale = 1 + Math.min(scrollPercent, maxLogoScale - 1);
            const opacity = Math.max(1 - scrollPercent * 2, 0);
            
            logo.style.transform = `scale(${scale})`;
            logo.style.opacity = opacity;
            
            letter.style.transform = 'scale(1)';
            letter.style.opacity = '0';
            
            content.style.opacity = '0';
            content.style.transform = 'translateY(50px)';
          } 
          // Phase 2: Letter scaling (50-80%)
          else if (scrollPercent <= 0.8) {
            const letterProgress = (scrollPercent - 0.5) * (1/0.3); // Adjusted for smoother scaling
            const letterScale = 1 + Math.min(letterProgress * maxLetterScale, maxLetterScale);
            
            logo.style.opacity = '0';
            letter.style.transform = `scale(${letterScale})`;
            letter.style.opacity = Math.min(letterProgress * 2, 1);
            
            const redOpacity = Math.min(letterProgress, 1);
            letter.querySelector('.number').style.color = `rgba(255, 57, 57, ${redOpacity})`;
            
            content.style.opacity = '0';
            content.style.transform = 'translateY(50px)';
          }
          // Phase 3: Content reveal (80-100%)
          else {
            const contentProgress = (scrollPercent - 0.8) * 5;
            
            logo.style.opacity = '0';
            letter.style.transform = `scale(${maxLetterScale})`;
            letter.style.opacity = '1';
            letter.querySelector('.number').style.color = '#FF3939';
            
            content.style.opacity = Math.min(contentProgress, 1);
            content.style.transform = `translateY(${Math.max(50 - contentProgress * 25, 0)}px)`;
          }

          requestAnimationFrame(autoScroll);
        } else {
          // Remove the animating class when animation is complete
          document.body.classList.remove('animating');
        }
      }

      // Start the animation after a short delay
      setTimeout(() => {
        requestAnimationFrame(autoScroll);
      }, 500);
    }
  }

  setTimeout(initializeAnimations, 100);

  import('../components/ExploreButton.js').then(module => {
    const buttonWrapper = document.querySelector('.explore-button-wrapper');
    if (buttonWrapper) {
      buttonWrapper.innerHTML = module.ExploreButton();
    }
  });

  return `
    <div class="relative min-h-[400vh] bg-gray-900 overflow-hidden">
      <!-- Initial Logo -->
      <div class="logo-container fixed top-0 left-0 w-full h-screen flex items-center justify-center z-30 pointer-events-none transition-all duration-300 ease-out">
        <img 
          src="/logo.png" 
          alt="Squad 72 Logo" 
          class="w-48 h-48 md:w-64 md:h-64 transform transition-transform object-contain">
      </div>
      
      <!-- Content Container -->
      <div class="content-container fixed top-0 left-0 w-full h-screen opacity-0 transition-all duration-500 ease-out z-20">
        <div class="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">Welcome to Squad 72</h1>
          <p class="text-xl text-gray-300 mb-8 max-w-2xl">
            A collective of passionate developers pushing the boundaries of technology and innovation.
          </p>
          <div class="explore-button-wrapper">
            <!-- Button will be dynamically inserted here -->
          </div>
        </div>
      </div>

      <!-- Letter Overlay -->
      <div class="letter-overlay fixed top-0 left-0 w-full h-screen z-10 pointer-events-none opacity-0 transition-all duration-500 ease-out">
        <div class="number absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vh] font-bold text-white/5 transition-colors duration-500">
          72
        </div>
      </div>
    </div>
  `;
}
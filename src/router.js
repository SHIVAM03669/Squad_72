// Implement lazy loading for routes
const lazyLoad = (importFn) => {
  return importFn().then(module => module.default || module);
};

export function router() {
  const routes = {
    '/': () => lazyLoad(() => import('./pages/Landing.js')).then(m => m.Landing()),
    '/home': () => lazyLoad(() => import('./pages/Home.js')).then(m => m.Home()),
    '/mentors': () => lazyLoad(() => import('./pages/Mentors.js')).then(m => m.Mentors()),
    '/students': () => lazyLoad(() => import('./pages/Students.js')).then(m => m.Students()),
    '/projects': () => lazyLoad(() => import('./pages/Projects.js')).then(m => m.Projects()),
    '/memories': () => lazyLoad(() => import('./pages/Memories.js')).then(m => m.Memories()),
    '/about': () => lazyLoad(() => import('./pages/About.js')).then(m => m.About()),
    '/memory/:id': (params) => lazyLoad(() => import('./pages/MemoryDetail.js')).then(m => m.MemoryDetail(params))
  };

  // Cache route components
  const componentCache = new Map();

  function setupMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');

    if (mobileMenuButton && mobileMenu && menuIcon && closeIcon) {
      const toggleMenu = () => {
        mobileMenu.classList.toggle('hidden');
        menuIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
      };

      mobileMenuButton.addEventListener('click', toggleMenu);

      document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && 
            !mobileMenuButton.contains(e.target) && 
            !mobileMenu.classList.contains('hidden')) {
          toggleMenu();
        }
      });

      mobileMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
          toggleMenu();
        }
      });
    }
  }

  function initializePageAnimations() {
    const path = window.location.pathname;
    
    // Landing page animations
    if (path === '/') {
      const initLandingAnimations = () => {
        const logo = document.querySelector('.logo-container');
        const content = document.querySelector('.content-container');
        const letter = document.querySelector('.letter-overlay');
        const scrollIndicator = document.querySelector('.scroll-indicator');
        
        if (logo && content && letter && scrollIndicator) {
          const handleScroll = () => {
            // Adjusted multiplier to 1.5 so the animations trigger sooner
            const scrollPercent = window.scrollY / (window.innerHeight * 1.5);
            const maxLogoScale = 3;
            const maxLetterScale = 5;
            
            scrollIndicator.style.opacity = scrollPercent > 0.1 ? '0' : '1';
            
            if (scrollPercent <= 0.5) {
              const scale = 1 + Math.min(scrollPercent, maxLogoScale - 1);
              logo.style.transform = `scale(${scale})`;
              logo.style.opacity = Math.max(1 - scrollPercent * 2, 0);
              letter.style.transform = 'scale(1)';
              letter.style.opacity = '0';
              content.style.opacity = '0';
              content.style.transform = 'translateY(50px)';
            } else if (scrollPercent <= 0.75) {
              const letterProgress = (scrollPercent - 0.5) * 2;
              const letterScale = 1 + Math.min(letterProgress * maxLetterScale, maxLetterScale);
              
              logo.style.opacity = '0';
              letter.style.transform = `scale(${letterScale})`;
              letter.style.opacity = Math.min(letterProgress * 2, 1);
              letter.querySelector('.number').style.color = `rgba(255, 57, 57, ${Math.min(letterProgress, 1)})`;
              content.style.opacity = '0';
              content.style.transform = 'translateY(50px)';
            } else {
              const contentProgress = (scrollPercent - 0.75) * 2;
              
              logo.style.opacity = '0';
              letter.style.transform = `scale(${maxLetterScale})`;
              letter.style.opacity = '1';
              letter.querySelector('.number').style.color = '#FF3939';
              content.style.opacity = Math.min(contentProgress * 2, 1);
              content.style.transform = `translateY(${Math.max(50 - contentProgress * 100, 0)}px)`;
            }
          };

          window.addEventListener('scroll', handleScroll);
          handleScroll(); // Initialize state
          
          // Reset scroll position
          window.scrollTo(0, 0);
        }
      };

      setTimeout(initLandingAnimations, 100);
    }
    
    // Home page animations
    if (path === '/home') {
      const initHomeAnimations = () => {
        const typingText = document.querySelector('.typing-text');
        if (typingText) {
          const text = 'Learning to be the crème de la crème of the web developing world.';
          typingText.textContent = '';
          typingText.style.opacity = '1';
          
          let i = 0;
          const typeWriter = () => {
            if (i < text.length) {
              typingText.textContent += text.charAt(i);
              i++;
              setTimeout(typeWriter, 50);
            }
          };
          
          typeWriter();
        }
      };

      setTimeout(initHomeAnimations, 100);
    }
  }

  async function handleRoute() {
    const path = window.location.pathname;
    let matchedRoute = null;
    let params = {};

    window.scrollTo(0, 0);

    for (const [route, handler] of Object.entries(routes)) {
      if (route.includes(':')) {
        const routeParts = route.split('/');
        const pathParts = path.split('/');
        
        if (routeParts.length === pathParts.length) {
          const match = routeParts.every((part, i) => {
            if (part.startsWith(':')) {
              params[part.slice(1)] = pathParts[i];
              return true;
            }
            return part === pathParts[i];
          });
          
          if (match) {
            matchedRoute = handler;
            break;
          }
        }
      } else if (route === path) {
        matchedRoute = handler;
        params = {};
        break;
      }
    }

    const page = matchedRoute || routes['/'];
    const cacheKey = `${path}-${JSON.stringify(params)}`;
    let content;
    
    if (componentCache.has(cacheKey)) {
      content = componentCache.get(cacheKey);
    } else {
      content = await page(params);
      componentCache.set(cacheKey, content);
    }
    
    const app = document.querySelector('#app');
    const navigation = path === '/' ? '' : 
      await lazyLoad(() => import('./components/Navigation.js')).then(m => m.Navigation());
    const footer = path === '/' ? '' : 
      await lazyLoad(() => import('./components/Footer.js')).then(m => m.Footer());
    
    app.innerHTML = `
      <div class="min-h-screen bg-gray-900 geometric-pattern">
        ${navigation}
        ${content}
        ${footer}
      </div>
    `;

    setupMobileMenu();
    initializePageAnimations();

    // Updated click event listener to force a full reload when navigating to the landing page ("/")
    app.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="/"]');
      if (link) {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href === '/students') {
          window.location.href = href;
        } else if (href === '/') {
          // Force a full reload when clicking on the landing page link (e.g., the logo)
          if (window.location.pathname === '/') {
            window.location.reload();
          } else {
            window.location.href = '/';
          }
        } else {
          window.history.pushState({}, '', href);
          handleRoute();
        }
      }
    });
  }

  window.addEventListener('popstate', handleRoute);
  handleRoute();

  document.documentElement.classList.add('dark');
}

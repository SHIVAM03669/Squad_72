// Implement lazy loading for routes
const lazyLoad = (importFn) => {
  return importFn().then(module => module.default || module);
};

export function router() {
  // Cache for rendered components and event listeners
  const componentCache = new Map();
  let currentPath = window.location.pathname;
  let isNavigating = false;

  // Clean up function for event listeners
  const cleanupListeners = new Set();

  const routes = {
    '/': () => lazyLoad(() => import('./pages/Landing.js')).then(m => m.Landing()),
    '/home': () => lazyLoad(() => import('./pages/Home.js')).then(m => m.Home()),
    '/mentors': () => lazyLoad(() => import('./pages/Mentors.js')).then(m => m.Mentors()),
    '/students': () => lazyLoad(() => import('./pages/Students.js')).then(m => m.Students()),
    '/projects': () => lazyLoad(() => import('./pages/Projects.js')).then(m => m.Projects()),
    '/memories': () => lazyLoad(() => import('./pages/Memories.js')).then(m => m.Memories()),
    '/about': () => lazyLoad(() => import('./pages/About.js')).then(m => m.About()),
    '/memory/:id': (params) =>
      lazyLoad(() => import('./pages/MemoryDetail.js')).then(m => m.MemoryDetail(params))
  };

  function cleanupCurrentPage() {
    cleanupListeners.forEach(cleanup => cleanup());
    cleanupListeners.clear();
  }

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

      const handleClickOutside = (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
          toggleMenu();
        }
      };

      const handleMenuClick = (e) => {
        if (e.target.tagName === 'A') {
          toggleMenu();
        }
      };

      mobileMenuButton.addEventListener('click', toggleMenu);
      document.addEventListener('click', handleClickOutside);
      mobileMenu.addEventListener('click', handleMenuClick);

      // Add cleanup functions
      cleanupListeners.add(() => {
        mobileMenuButton.removeEventListener('click', toggleMenu);
        document.removeEventListener('click', handleClickOutside);
        mobileMenu.removeEventListener('click', handleMenuClick);
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
            requestAnimationFrame(() => {
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
            });
          };

          window.addEventListener('scroll', handleScroll);
          handleScroll();

          // Add cleanup function
          cleanupListeners.add(() => {
            window.removeEventListener('scroll', handleScroll);
          });
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
    if (isNavigating) return;
    isNavigating = true;

    try {
      const path = window.location.pathname;
      let matchedRoute = null;
      let params = {};

      // Only scroll to top if the path has changed
      if (currentPath !== path) {
        window.scrollTo(0, 0);
        currentPath = path;
      }

      // Match static and parameterized routes
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
      
      // Clean up current page
      cleanupCurrentPage();

      let content;
      if (componentCache.has(cacheKey)) {
        content = componentCache.get(cacheKey);
      } else {
        content = await page(params);
        componentCache.set(cacheKey, content);

        // Cache management: limit cache size
        if (componentCache.size > 10) {
          const firstKey = componentCache.keys().next().value;
          componentCache.delete(firstKey);
        }
      }

      const app = document.querySelector('#app');
      const navigation = path === '/' ? '' : await lazyLoad(() => import('./components/Navigation.js')).then(m => m.Navigation());
      const footer = path === '/' ? '' : await lazyLoad(() => import('./components/Footer.js')).then(m => m.Footer());

      app.innerHTML = `
        <div class="min-h-screen bg-gray-900 geometric-pattern">
          ${navigation}
          ${content}
          ${footer}
        </div>
      `;

      setupMobileMenu();
      initializePageAnimations();

    } catch (error) {
      console.error('Navigation error:', error);
    } finally {
      isNavigating = false;
    }
  }

  // Debounced click handler for navigation
  function handleNavigationClick(e) {
    const link = e.target.closest('a[href^="/"]');
    if (!link) return;

    e.preventDefault();
    const href = link.getAttribute('href');

    if (href === '/') {
      if (window.location.pathname === '/') {
        window.location.reload();
      } else {
        window.location.href = '/';
      }
    } else if (!isNavigating) {
      window.history.pushState({}, '', href);
      handleRoute();
    }
  }

  // Event Listeners
  window.addEventListener('popstate', handleRoute);
  document.addEventListener('click', handleNavigationClick);

  // Initial route
  handleRoute();

  // Set dark mode
  document.documentElement.classList.add('dark');
}
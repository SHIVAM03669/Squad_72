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

      // Use event delegation for better performance
      document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && 
            !mobileMenuButton.contains(e.target) && 
            !mobileMenu.classList.contains('hidden')) {
          toggleMenu();
        }
      });

      // Event delegation for mobile menu links
      mobileMenu.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
          toggleMenu();
        }
      });
    }
  }

  async function handleRoute() {
    const path = window.location.pathname;
    let matchedRoute = null;
    let params = {};

    // Check for dynamic routes
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
    
    // Check cache first
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

    // Use event delegation for navigation
    app.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="/"]');
      if (link) {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href === '/students') {
          window.location.href = href;
        } else {
          window.history.pushState({}, '', href);
          handleRoute();
        }
      }
    });
  }

  window.addEventListener('popstate', handleRoute);
  handleRoute();

  // Force dark theme
  document.documentElement.classList.add('dark');
}
import { projects } from '../data/projects.js';

export function Projects() {
  return `
    <section class="pt-32 pb-20 px-4 relative overflow-hidden">
      <div class="container mx-auto relative z-10 max-w-5xl">
        <h2 class="text-4xl font-bold text-center mb-16 text-white">Our Projects</h2>
        <div class="grid md:grid-cols-2 gap-8 md:gap-12">
          ${projects.map(project => `
            <div class="bg-gray-800/50 backdrop-blur-lg rounded-xl overflow-hidden border border-gray-700 hover:border-gray-600 hover:transform hover:scale-[1.02] hover:shadow-xl transition-all duration-300 group">
              <div class="aspect-video">
                <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover">
              </div>
              <div class="p-6 space-y-4">
                <h3 class="text-2xl font-semibold text-white">${project.title}</h3>
                <p class="text-gray-400 text-base leading-relaxed">${project.description}</p>
                <div class="flex flex-wrap gap-2">
                  ${project.tech.map(tech => `
                    <span class="bg-[#FF3939]/10 text-[#FF3939] px-3 py-1 rounded-full text-sm font-medium">
                      ${tech}
                    </span>
                  `).join('')}
                </div>
                <p class="text-sm text-gray-500">${project.students.join(', ')}</p>
                <a href="${project.link}" target="_blank" rel="noopener noreferrer" 
                   class="inline-flex items-center bg-[#FF3939] hover:bg-[#FF6347] text-white px-6 py-2.5 rounded-lg text-sm transition-all duration-300 group-hover:scale-105">
                  View Project
                  <svg class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </a>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Loader Section -->
        <div class="mt-20 text-center">
          <p class="text-gray-400 text-lg mb-8">On the horizon: even more!</p>
          <div class="flex justify-center items-center">
            <div class="loader">
              <svg viewBox="0 0 80 80">
                <circle id="test" cx="40" cy="40" r="32" />
              </svg>
            </div>
            <div class="loader triangle">
              <svg viewBox="0 0 86 80">
                <polygon points="43 8 79 72 7 72" />
              </svg>
            </div>
            <div class="loader">
              <svg viewBox="0 0 80 80">
                <rect x="8" y="8" width="64" height="64" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Background Elements -->
      <div class="absolute top-20 right-0 w-72 h-72 bg-[#FF3939]/10 rounded-full filter blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 left-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
    </section>
  `;
}
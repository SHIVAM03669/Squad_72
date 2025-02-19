import { projects } from '../data/projects.js';

export function Projects() {
  return `
    <section class="pt-24 pb-16 px-4 relative overflow-hidden">
      <div class="container mx-auto relative z-10">
        <h2 class="text-3xl font-bold text-center mb-12 text-white">Our Projects</h2>
        <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
          ${projects.map(project => `
            <div class="bg-gray-800/50 backdrop-blur-lg rounded-xl overflow-hidden border border-gray-700 hover:border-gray-600 hover:transform hover:scale-[1.02] hover:shadow-xl transition-all duration-300 group">
              <img src="${project.image}" alt="${project.title}" class="w-full h-40 object-cover object-top">
              <div class="p-4">
                <h3 class="text-xl font-semibold mb-2 text-white">${project.title}</h3>
                <p class="text-gray-400 text-sm mb-3 line-clamp-2">${project.description}</p>
                <div class="flex flex-wrap gap-2 mb-3">
                  ${project.tech.map(tech => `
                    <span class="bg-[#FF3939]/10 text-[#FF3939] px-2.5 py-0.5 rounded-full text-xs font-medium">
                      ${tech}
                    </span>
                  `).join('')}
                </div>
                <p class="text-xs text-gray-500 mb-3 truncate">${project.students.join(', ')}</p>
                <a href="${project.link}" target="_blank" rel="noopener noreferrer" 
                   class="bg-[#FF3939] hover:bg-[#FF6347] text-white px-4 py-1.5 rounded-lg text-sm transition-all duration-300 inline-flex items-center gap-1">
                  View Project
                  <svg class="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      
      <!-- Background Elements -->
      <div class="absolute top-20 right-0 w-72 h-72 bg-[#FF3939]/10 rounded-full filter blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 left-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
    </section>
  `;
}
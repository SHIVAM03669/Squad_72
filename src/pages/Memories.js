import { memories } from '../data/memories.js';

export function Memories() {
  setTimeout(() => {
    document.querySelectorAll('.memory-card').forEach(card => {
      const link = card.querySelector('.view-more-link');
      const coverImage = card.querySelector('.cover-image');
      if (link && coverImage) {
        coverImage.addEventListener('click', (e) => {
          e.preventDefault();
          link.click();
        });
      }
    });
  }, 100);

  return `
    <section class="pt-32 pb-20 px-4 relative overflow-hidden">
      <div class="container mx-auto relative z-10">
        <h2 class="text-4xl font-bold text-center mb-16 text-white">Our Memories</h2>
        
        <!-- Hero Group Photo Section -->
        <div class="max-w-3xl mx-auto mb-12">
          <div class="bg-gray-800/50 backdrop-blur-lg rounded-xl overflow-hidden border border-gray-700 hover:shadow-xl transition-all duration-500">
            <div class="h-[300px] relative">
              <img 
                src="/groupphoo.jpg" 
                alt="Squad 72 Group Photo" 
                class="w-full h-full object-cover"
              >
            </div>
            <div class="p-4 text-center">
              <h3 class="text-2xl font-bold text-white mb-1">Squad 72</h3>
              <p class="text-gray-400">Together we learn, together we grow. Our journey at Kalvium.</p>
            </div>
          </div>
        </div>

        <!-- Memory Albums Grid -->
        <div class="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto px-4">
          ${memories.map(memory => `
            <div class="memory-card bg-gray-800/50 backdrop-blur-lg rounded-xl overflow-hidden border border-gray-700 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <div class="h-72 overflow-hidden cursor-pointer">
                <img src="${memory.coverImage}" alt="${memory.title}" class="cover-image w-full h-full object-cover transition-transform duration-500 hover:scale-110">
              </div>
              <div class="p-8">
                <div class="text-sm text-[#F3B15C] mb-3">${memory.date}</div>
                <h3 class="text-2xl font-bold mb-4 text-white">${memory.title}</h3>
                <p class="text-gray-400 mb-6">${memory.description}</p>
                <a href="/memory/${memory.id}" class="view-more-link inline-flex items-center bg-[#FF3939] hover:bg-[#FF6347] text-white px-6 py-3 rounded-lg transition-all duration-300">
                  View More
                  <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
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
      <div class="absolute bottom-20 left-0 w-96 h-96 bg-[#FF3939]/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
    </section>
  `;
}
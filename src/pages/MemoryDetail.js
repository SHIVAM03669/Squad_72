import { memories } from '../data/memories.js';

export function MemoryDetail(params) {
  const memory = memories.find(m => m.id === params.id);
  
  if (!memory) {
    return `
      <div class="pt-32 pb-20 px-4">
        <div class="container mx-auto text-center">
          <h2 class="text-2xl font-bold text-white mb-4">Memory not found</h2>
          <a href="/memories" class="inline-block bg-[#FF3939] hover:bg-[#FF6347] text-white px-6 py-2 rounded-lg transition-all duration-300">
            Back to Memories
          </a>
        </div>
      </div>
    `;
  }

  return `
    <section class="pt-32 pb-20 px-4 relative overflow-hidden">
      <div class="container mx-auto relative z-10 max-w-4xl">
        <div class="mb-8">
          <a href="/memories" class="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-300">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Memories
          </a>
        </div>

        <div class="bg-gray-800/50 backdrop-blur-lg rounded-xl overflow-hidden border border-gray-700 mb-8">
          <div class="h-96 overflow-hidden">
            <img src="${memory.coverImage}" alt="${memory.title}" class="w-full h-full object-cover">
          </div>
          <div class="p-8">
            <div class="text-sm text-[#F3B15C] mb-2">${memory.date}</div>
            <h1 class="text-3xl font-bold mb-4 text-white">${memory.title}</h1>
            <p class="text-gray-300 mb-8">${memory.content.description}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8" id="media-gallery">
          ${memory.content.media.map((item, index) => `
            <div class="media-item cursor-pointer" data-index="${index}">
              ${item.type === 'image' ? `
                <div class="bg-gray-800/50 backdrop-blur-lg rounded-xl overflow-hidden border border-gray-700 hover:shadow-lg transition-all duration-300">
                  <div class="aspect-w-16 aspect-h-9">
                    <img src="${item.url}" alt="${item.caption}" class="w-full h-full object-cover">
                  </div>
                  ${item.caption ? `
                    <div class="p-4">
                      <p class="text-gray-300 text-sm">${item.caption}</p>
                    </div>
                  ` : ''}
                </div>
              ` : `
                <div class="bg-gray-800/50 backdrop-blur-lg rounded-xl overflow-hidden border border-gray-700">
                  <video controls class="w-full">
                    <source src="${item.url}" type="video/mp4">
                    Your browser does not support the video tag.
                  </video>
                  ${item.caption ? `
                    <div class="p-4">
                      <p class="text-gray-300 text-sm">${item.caption}</p>
                    </div>
                  ` : ''}
                </div>
              `}
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Lightbox -->
      <div id="lightbox" class="fixed inset-0 bg-black/90 z-50 hidden">
        <button id="close-lightbox" class="absolute top-4 right-4 text-white p-2">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <button id="prev-image" class="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button id="next-image" class="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <div class="flex items-center justify-center h-full">
          <img id="lightbox-image" src="" alt="" class="max-h-[90vh] max-w-[90vw] object-contain">
        </div>
        <div id="lightbox-caption" class="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center bg-black/50 px-4 py-2 rounded-lg"></div>
      </div>
    </section>

    <script>
      // Lightbox functionality
      const lightbox = document.getElementById('lightbox');
      const lightboxImage = document.getElementById('lightbox-image');
      const lightboxCaption = document.getElementById('lightbox-caption');
      const mediaItems = document.querySelectorAll('.media-item');
      const closeButton = document.getElementById('close-lightbox');
      const prevButton = document.getElementById('prev-image');
      const nextButton = document.getElementById('next-image');
      let currentImageIndex = 0;

      const mediaArray = ${JSON.stringify(memory.content.media)};

      function showImage(index) {
        const item = mediaArray[index];
        if (item.type === 'image') {
          lightboxImage.src = item.url;
          lightboxImage.alt = item.caption || '';
          lightboxCaption.textContent = item.caption || '';
          lightbox.classList.remove('hidden');
          currentImageIndex = index;
        }
      }

      mediaItems.forEach((item, index) => {
        if (mediaArray[index].type === 'image') {
          item.addEventListener('click', () => showImage(index));
        }
      });

      closeButton.addEventListener('click', () => {
        lightbox.classList.add('hidden');
      });

      prevButton.addEventListener('click', () => {
        let newIndex = currentImageIndex - 1;
        while (newIndex >= 0 && mediaArray[newIndex].type !== 'image') {
          newIndex--;
        }
        if (newIndex >= 0) {
          showImage(newIndex);
        }
      });

      nextButton.addEventListener('click', () => {
        let newIndex = currentImageIndex + 1;
        while (newIndex < mediaArray.length && mediaArray[newIndex].type !== 'image') {
          newIndex++;
        }
        if (newIndex < mediaArray.length) {
          showImage(newIndex);
        }
      });

      // Close lightbox on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          lightbox.classList.add('hidden');
        }
      });
    </script>
  `;
}
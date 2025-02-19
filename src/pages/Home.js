export function Home() {
  return `
    <div class="min-h-screen bg-gray-900">
      <!-- Animation Styles -->
      <style>
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }
        
        @keyframes blink-cursor {
          from, to { border-color: transparent; }
          50% { border-color: #FF3939; }
        }
        
        .type-animation {
          overflow: hidden;
          white-space: nowrap;
          display: inline-block;
          position: relative;
          padding-right: 2px;
          animation: typing 4s steps(40, end), blink-cursor 0.75s step-end infinite;
        }

        @media (max-width: 768px) {
          .type-animation {
            white-space: normal;
            animation: none;
            border-right: none;
            display: block;
          }
        }
      </style>

      <!-- Hero Section -->
      <section class="pt-24 md:pt-32 pb-12 md:pb-20 px-4 relative overflow-hidden">
        <div class="container mx-auto relative z-10 max-w-6xl">
          <div class="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div class="space-y-6 md:space-y-8">
              <h1 class="text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight">
                Welcome to <span class="text-[#FF3939]">Squad 72</span>
              </h1>
              <p class="text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed">
                <span class="type-animation border-r-2 border-[#FF3939]">
                  Learning to be the <span class="text-[#FF3939]">crème de la crème</span> of the web developing world.
                </span>
              </p>
              <div class="flex flex-col sm:flex-row gap-4 md:gap-6">
                <a href="/projects" class="bg-[#FF3939] hover:bg-[#FF6347] text-white px-6 py-3 rounded-lg transition-all duration-300 text-center">View Projects</a>
                <a href="/about" class="outline-button text-center border border-[#FF3939] text-[#FF3939] hover:bg-[#FF3939] hover:text-white px-6 py-3 rounded-lg transition-all duration-300">Learn More</a>
              </div>
            </div>
            <div class="relative hidden md:block">
              <div class="absolute top-0 right-0 w-72 h-72 bg-[#FF3939]/10 rounded-full filter blur-3xl animate-pulse"></div>
              <div class="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-12 md:py-20 px-4">
        <div class="container mx-auto max-w-6xl">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
            <div class="bg-gray-800/50 backdrop-blur-lg rounded-xl md:rounded-2xl p-6 md:p-8 transform hover:scale-105 transition-all duration-300">
              <div class="w-12 h-12 md:w-14 md:h-14 bg-[#FF3939]/10 rounded-xl flex items-center justify-center mb-6">
                <svg class="w-6 h-6 md:w-8 md:h-8 text-[#FF3939]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-4">Innovation Hub</h3>
              <p class="text-gray-400">Where creativity meets technology to build the future of web development.</p>
            </div>

            <div class="bg-gray-800/50 backdrop-blur-lg rounded-xl md:rounded-2xl p-6 md:p-8 transform hover:scale-105 transition-all duration-300">
              <div class="w-12 h-12 md:w-14 md:h-14 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
                <svg class="w-6 h-6 md:w-8 md:h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-4">Learning Together</h3>
              <p class="text-gray-400">Collaborative environment where knowledge sharing drives our growth.</p>
            </div>

            <div class="bg-gray-800/50 backdrop-blur-lg rounded-xl md:rounded-2xl p-6 md:p-8 transform hover:scale-105 transition-all duration-300">
              <div class="w-12 h-12 md:w-14 md:h-14 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                <svg class="w-6 h-6 md:w-8 md:h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-4">Fast Development</h3>
              <p class="text-gray-400">Rapid prototyping and development with cutting-edge tools and practices.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="py-12 md:py-20 px-4">
        <div class="container mx-auto max-w-6xl">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div class="text-center p-4">
              <div class="text-2xl md:text-4xl font-bold text-[#FF3939] mb-2">18</div>
              <div class="text-sm md:text-base text-gray-400">Team Members</div>
            </div>
            <div class="text-center p-4">
              <div class="text-2xl md:text-4xl font-bold text-purple-500 mb-2">20+</div>
              <div class="text-sm md:text-base text-gray-400">Projects</div>
            </div>
            <div class="text-center p-4">
              <div class="text-2xl md:text-4xl font-bold text-blue-500 mb-2">3+</div>
              <div class="text-sm md:text-base text-gray-400">Hackathons</div>
            </div>
            <div class="text-center p-4">
              <div class="text-2xl md:text-4xl font-bold text-green-500 mb-2">100%</div>
              <div class="text-sm md:text-base text-gray-400">Passion</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}
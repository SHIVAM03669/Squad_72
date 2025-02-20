export function About() {
  const teamMembers = [
    {
      name: 'Shivam Singh',
      role: 'Lead Developer',
      photo: '/Profile photo.jpg',
      description: 'FinTech developer with expertise in React and Node.js. Developed the website from scratch.'
    },
    {
      name: 'Heramb Inamke',
      role: 'Frontend Developer',
      photo: '/hem.jpg',
      description: 'Fintech geek with a passion for creating WEB-services. He has given ideas for the website.'
    }
  ];

  return `
    <section class="pt-32 pb-20 px-4 relative overflow-hidden">
      <div class="container mx-auto relative z-10 max-w-6xl">
        <h2 class="text-4xl font-bold text-center mb-16 text-white">About Squad 72</h2>
        <div class="max-w-4xl mx-auto space-y-12">
          <div class="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 shadow-xl border border-gray-700">
            <h3 class="text-2xl font-bold mb-4 text-white">Our Vision</h3>
            <p class="text-gray-400 mb-6">
              Squad 72 represents a collective of ambitious developers committed to pushing the boundaries of technology and innovation. We're not just learning to code; we're learning to create solutions that matter.
            </p>
            <div class="grid md:grid-cols-3 gap-6">
              <div class="text-center p-6 bg-gray-800/50 backdrop-blur-lg rounded-lg border border-gray-700">
                <div class="text-3xl mb-2 text-[#FF3939]">18</div>
                <div class="text-white">Active Members</div>
              </div>
              <div class="text-center p-6 bg-gray-800/50 backdrop-blur-lg rounded-lg border border-gray-700">
                <div class="text-3xl mb-2 text-[#FF3939]">20+</div>
                <div class="text-white">Projects Completed</div>
              </div>
              <div class="text-center p-6 bg-gray-800/50 backdrop-blur-lg rounded-lg border border-gray-700">
                <div class="text-3xl mb-2 text-[#FF3939]">3+</div>
                <div class="text-white">Hackathons Won/Participated</div>
              </div>
            </div>
          </div>

          <div class="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 shadow-xl border border-gray-700">
            <h3 class="text-2xl font-bold mb-4 text-white">Our Journey</h3>
            <div class="space-y-6">
              <div class="flex gap-4">
                <div class="w-12 h-12 bg-[#FF3939] rounded-full flex items-center justify-center text-white">1</div>
                <div>
                  <h4 class="text-xl font-semibold mb-2 text-white">Foundation Phase</h4>
                  <p class="text-gray-400">Started with fundamentals of programming and web development, building strong basics in HTML, CSS, and JavaScript.</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="w-12 h-12 bg-[#FF3939] rounded-full flex items-center justify-center text-white">2</div>
                <div>
                  <h4 class="text-xl font-semibold mb-2 text-white">Advanced Technologies</h4>
                  <p class="text-gray-400">Mastered modern frameworks and tools like React, Node.js, and cloud platforms.</p>
                </div>
              </div>
              <div class="flex gap-4">
                <div class="w-12 h-12 bg-[#FF3939] rounded-full flex items-center justify-center text-white">3</div>
                <div>
                  <h4 class="text-xl font-semibold mb-2 text-white">Real-world Projects</h4>
                  <p class="text-gray-400">Worked on industry-level projects, solving real problems and building practical solutions.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Team Section -->
          <div class="bg-gray-800/50 backdrop-blur-lg rounded-xl p-12 shadow-xl border border-gray-700">
            <h3 class="text-3xl font-bold mb-12 text-white text-center">Meet the Creators</h3>
            <div class="grid md:grid-cols-2 gap-12">
              ${teamMembers.map(member => `
                <div class="bg-gray-800/50 backdrop-blur-lg rounded-lg p-8 border border-gray-700 hover:shadow-lg transition-all duration-300 flex flex-col items-center">
                  <div class="w-40 h-40 mb-6 rounded-full overflow-hidden border-4 border-[#FF3939] transform hover:scale-105 transition-transform duration-300">
                    <img src="${member.photo}" alt="${member.name}" class="w-full h-full object-cover">
                  </div>
                  <h4 class="text-2xl font-semibold text-white text-center mb-3">${member.name}</h4>
                  <p class="text-[#FF3939] text-lg text-center mb-4">${member.role}</p>
                  <p class="text-gray-300 text-center leading-relaxed">${member.description}</p>
                </div>
              `).join('')}
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

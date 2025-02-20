import { mentors } from '../data/mentors.js';
import { MentorCard } from '../components/MentorCard.js';

export function Mentors() {
  return `
    <section class="pt-32 pb-20 px-4 relative overflow-hidden">
      <div class="container mx-auto relative z-10">
        <h2 class="text-4xl font-bold text-center mb-16 text-white">Our Mentors</h2>
        
        <!-- Mobile instruction -->
        <div class="md:hidden text-center mb-8">
          <div class="inline-block bg-gray-800/50 backdrop-blur-lg rounded-lg px-4 py-2 text-gray-300 text-sm">
            <span class="animate-pulse inline-block mr-2">👆</span>
            Tap cards to see more details
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto justify-items-center">
          ${mentors.map(mentor => MentorCard({ mentor })).join('')}
        </div>
      </div>

      <!-- Background Elements -->
      <div class="absolute top-20 right-0 w-72 h-72 bg-[#FF3939]/10 rounded-full filter blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 left-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
    </section>
  `;
}
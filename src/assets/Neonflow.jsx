import React from 'react';

const NeonFlowPage = () => {
  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Section 1 */}
      <section className="relative flex flex-col items-center py-16">
        <div className="w-full h-0.9 bg-gradient  via-indigo-600  mb-16" />

        <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-[90%] max-w-7xl">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold mb-4"> Empower Your Legal Mind</h2>
            <p className="text-gray-300 text-lg">
            Unlock the power of AI-driven insights and take charge of your legal research with TALQS
            </p>
          </div>

          <div className="bg-black border-2 border-purple-500 rounded-2xl p-4 w-[350px] h-[300px] relative shadow-[0_0_30px_purple]">
            <img src="src\assets\WhatsApp Image 2025-04-23 at 13.05.07_43d1ca11.jpg" alt="Automation" className="w-full h-full object-contain" />
          </div>
        </div>
        <br/>
        <br/>
        <br/>



        <div className="w-full h-1 bg-gradient-to-r  via-indigo-500  mt-16" />
      </section>

      {/* Section 2 */}
      <section className="relative flex flex-col items-center py-16">
        <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-12 w-[90%] max-w-7xl">
          <div className="bg-black border-2 border-yellow-400 rounded-2xl p-4 w-[350px] h-[300px] relative shadow-[0_0_30px_yellow]">
            <img src="src\assets\WhatsApp Image 2025-04-23 at 14.09.21_46f30497.jpg" alt="Imagination" className="w-full h-full object-contain" />
          </div>

          <div className="max-w-xl">
            <h2 className="text-4xl font-bold mb-4">⚖️ Simplify Legal Complexity</h2>
            <p className="text-gray-300 text-lg">
              Leon is built on a modular architecture that gives you the flexibility to create or use packages/modules (skills) that fit your need. Be creative.
            </p>
          </div>
        </div>
        <br/>
        <br/>
        <br/>


        <div className="w-full h-1 bg-gradient-to-r via-orange-400  mt-16" />
      </section>

      {/* Section 3 - Add your next flow here */}
      <section className="relative flex flex-col items-center py-16">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-[90%] max-w-7xl">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold mb-4">🔍 Your Law, Just One Search Away</h2>
            <p className="text-gray-300 text-lg">
            Ask, search, and explore IPC sections, legal summaries, and more — effortlessly.
            </p>
          </div>

          <div className="bg-black border-2 border-cyan-400 rounded-2xl p-4 w-[350px] h-[300px] relative shadow-[0_0_30px_cyan]">
            <img src="src\assets\WhatsApp Image 2025-04-23 at 14.08.07_27b14471.jpg" alt="Explore" className="w-full h-full object-contain" />
          </div>
        </div>
        <br/>
        <br/>
        <br/>

        <div className="w-full h-1 bg-gradient-to-r via-blue-400  mt-16" />
      </section>
    </div>
  );
};

export default NeonFlowPage;

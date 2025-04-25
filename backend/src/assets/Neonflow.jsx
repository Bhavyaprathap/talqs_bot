import React from 'react';

const NeonFlowPage = () => {
  return (
    <div className="bg-black text-white min-h-screen font-sans">
      {/* Section 1 */}
      <section className="relative flex flex-col items-center py-16">
        <div className="w-full h-0.9 bg-gradient  via-indigo-600  mb-16" />

        <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-[90%] max-w-7xl">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold mb-4">Automate your virtual life</h2>
            <p className="text-gray-300 text-lg">
              Remove the hassle of your virtual life by automating stuff. You can think of Leon as your virtual brain.
            </p>
          </div>

          <div className="bg-black border-2 border-purple-500 rounded-2xl p-4 w-[350px] h-[300px] relative shadow-[0_0_30px_purple]">
            <img src="/assets/automation.png" alt="Automation" className="w-full h-full object-contain" />
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
            <img src="/assets/imagination.png" alt="Imagination" className="w-full h-full object-contain" />
          </div>

          <div className="max-w-xl">
            <h2 className="text-4xl font-bold mb-4">Imagination is the only limit</h2>
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
            <h2 className="text-4xl font-bold mb-4">Continue Your Journey</h2>
            <p className="text-gray-300 text-lg">
              Keep exploring features and dive deeper into the virtual assistant experience.
            </p>
          </div>

          <div className="bg-black border-2 border-cyan-400 rounded-2xl p-4 w-[350px] h-[300px] relative shadow-[0_0_30px_cyan]">
            <img src="/assets/explore.png" alt="Explore" className="w-full h-full object-contain" />
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

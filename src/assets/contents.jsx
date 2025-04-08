import React, { useState } from 'react';

const contents = [
  {
    question: 'What are chatbots for lawyers?',
    answer:
      'Chatbots for lawyers are AI-powered tools designed to interact with clients or users to provide basic legal information, automate administrative tasks, and guide users through legal processes.',
  },
  {
    question: 'Benefits of chatbots for lawyers',
    answer:
      'They save time, improve client experience, provide 24/7 support, reduce operational costs, and enhance access to justice by making legal information more accessible.',
  },
  {
    question: 'Applications of chatbots for lawyers',
    answer:
      'Legal chatbots can be used for client intake, answering FAQs, scheduling appointments, document review, and even preliminary legal advice in some cases.',
  },
  {
    question: 'Ethical considerations for using chatbots for lawyers',
    answer:
      'Lawyers must ensure that the chatbot respects client confidentiality, avoids unauthorized practice of law, and provides clear disclaimers about the bot’s limitations.',
  },
  {
    question: 'How to make the most of chatbots for lawyers',
    answer:
      'To leverage chatbots effectively, law firms should clearly define the chatbot’s role, provide regular updates, integrate it with their systems, and monitor its performance.',
  },
  {
    question: 'Your law firm can benefit from using chatbots',
    answer:
      'Chatbots can streamline law firm operations, provide better client engagement, and act as the first point of contact for potential clients, improving lead conversion.',
  },
];

const ExploreModelsFlow = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] text-white flex flex-col lg:flex-row pt-40 px-4 lg:px-12 relative">
      {/* Left - Contents */}
      <br/>
      <div className="w-full lg:w-1/2 p-6 z-10 mt-100">
        <div className="bg-[#111] p-10 rounded-lg shadow-lg border border-cyan-400">
            
          <h2 className="text-4xl font-bold mb-6 text-cyan-400">Contents</h2>
          <ul className="space-y-6 text-xl">
            {contents.map((item, index) => (
              <li
                key={index}
                className={`cursor-pointer hover:text-cyan-300 transition ${selectedIndex === index ? 'text-cyan-300 font-semibold' : 'text-gray-300'}`}
                onClick={() => setSelectedIndex(index)}
              >
                {item.question}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right - All Answers */}
      <div className="w-full lg:w-1/2 p-6 z-10 flex flex-col gap-8">
        {contents.map((item, index) => (
          <div
            key={index}
            id={`answer-${index}`}
            className={`bg-[#111] p-8 rounded-lg shadow-lg border transition-all border-pink-400 ${selectedIndex === index ? 'ring-2 ring-cyan-400' : 'opacity-60'}`}
          >
            <h2 className="text-2xl font-bold text-cyan-400 mb-2">{item.question}</h2>
            <p className="text-lg text-gray-300 leading-relaxed">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreModelsFlow;

import React from 'react';

function Component() {
  return (
    <nav className="bg-white mb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:w-8/12">
        <div className="flex items-center justify-between h-16">
         
          <div className="flex items-center gap-5">
          <img src="img.jpg" className='w-10 rounded-xl' alt="logo" />
            <a href="#" className="text-slate-800 text-2xl font-bold">
         
              A-To-Z 
            </a>
          </div>
         
          {/* GitHub button on the right */}
          <div className="ml-4 flex items-center md:ml-6">
            <a href="https://github.com/omkar-107/"  target="_blank" className="text-white bg-orange-600 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              GitHub
            </a>
          </div>
         
         
        </div>
      </div>
     
    </nav>
  );
}

export default Component;

import React from 'react';

function AboutSection() {
  return (
    <div className="bg-white  rounded-lg p-8 mx-4 sm:mx-auto max-w-4xl mt-20">
      <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">About A-TO-Z Fileconverter</h2>
      <p className="text-lg text-gray-700 ">
      A-TO-Z Fileconverter is your go-to platform for seamless multimedia file conversion. Whether you're looking to tweak images, remix audio, or edit videos, A-TO-Z Fileconverter has you covered. Our user-friendly interface and powerful conversion algorithms ensure that you can unleash your creativity without any hassle.
      </p>
      <p className="text-lg text-gray-700 mb-8">
        At A-TO-Z Fileconverter, your privacy is our priority. We understand the importance of keeping your data secure, which is why all conversions are performed locally on your device. With no data leaving your control and no server interaction required, you can convert your files with peace of mind.
      </p>
      <div className="border-t border-gray-200 pt-6 ">
        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Meet the author</h3>
        <div className="flex items-center justify-center mb-4">
          <img src="/omkar.jpg" alt="Author Avatar" className=" rounded-full w-40 h-40 m-4  object-cover" />
          <div>
            <p className="text-gray-800 font-semibold m-4">Omkar Salunkhe</p>
            <p className="text-gray-700 m-4"> Developer</p>
          </div>
        </div>
       
       
      </div>
      <div className="mt-6 text-center">
        <a href="https://github.com/omkar-107" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 font-semibold inline-block">
          Visit On GitHub
        </a>
        
      </div>
    </div>
  );
}

export default AboutSection;

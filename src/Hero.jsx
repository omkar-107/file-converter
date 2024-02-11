import React from 'react';

function Hero() {
  return (
    <div className="bg-white  rounded-lg p-8 mx-4 sm:mx-auto max-w-4xl mt-3">
      <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">Free Unlimited File Converter</h2>
      <p className="text-lg text-gray-700 ">
        Unleash your creativity with A-TO-Z Fileconverter – the ultimate online tool for unlimited and free multimedia conversion. Transform images, audio, and videos effortlessly, without restrictions.
      </p>
      <p className="text-lg text-gray-700 mb-8">
        Convert your files with confidence! With A-TO-Z Fileconverter, your data never leaves your device, and no server is required. Enjoy secure and private conversions every time.
      </p>
      {/* Add conversion tool or button here if needed */}
    </div>
  );
}

export default Hero;

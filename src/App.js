import React, { useState, useEffect } from 'react';
import './App.css';

import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import FileConverter from './FileConverter';
import Navbar from './Navbar';
import Hero from './Hero';
import AboutSection from './About';
import Footer from './Footer';
const ffmpeg = createFFmpeg({ log: true });

function App() {
  const [ready, setReady] = useState(false);
 

  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  }

  useEffect(() => {
    load();
  }, [])

  
  return(
    <div>
      <Navbar/>
      
      <Hero/>
      <FileConverter/>
      {!ready &&
       <p>Loading...</p>
      }
      <AboutSection/>
      <Footer/>
    </div>)
}

export default App;

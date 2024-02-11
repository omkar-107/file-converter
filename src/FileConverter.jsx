import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({ log: true });

const FileConverter = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [outputFormat, setOutputFormat] = useState(null);
  const [convertedFileUrl, setConvertedFileUrl] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState(null);

  const handleFileDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedFile(file);
    setOutputFormat(getDefaultOutputFormat(file));
    setConvertedFileUrl(null); // Clear previous converted file URL
  };

  const getDefaultOutputFormat = (file) => {
    if (file.type.startsWith('image/')) {
      return 'jpeg';
    } else if (file.type.startsWith('video/')) {
      return 'mp4';
    } else if (file.type.startsWith('audio/')) {
      return 'mp3';
    }
    return null;
  };

  const handleOutputFormatChange = (e) => {
    setOutputFormat(e.target.value);
  };

  const convertFile = async () => {
    setIsConverting(true);
    try {
      if (!ffmpeg.isLoaded()) {
        await ffmpeg.load();
      }
      ffmpeg.FS('writeFile', selectedFile.name, await fetchFile(selectedFile));
      if (outputFormat === 'gif') {
        await ffmpeg.run('-i', selectedFile.name, '-vf', 'scale=320:-1', '-t', '10', '-r', '10', 'output.gif');
      } else {
        await ffmpeg.run('-i', selectedFile.name, `output.${outputFormat}`);
      }
      if (!ffmpeg.FS('readFile', outputFormat === 'gif' ? 'output.gif' : `output.${outputFormat}`)) {
        throw new Error('Failed to convert the file.');
      }
      const data = ffmpeg.FS('readFile', outputFormat === 'gif' ? 'output.gif' : `output.${outputFormat}`);
      const convertedBlob = new Blob([data.buffer], { type: `${selectedFile.type.split('/')[0]}/${outputFormat}` });
      const convertedUrl = URL.createObjectURL(convertedBlob);
      setConvertedFileUrl(convertedUrl);
      setIsConverting(false);
      setError(null);
    } catch (err) {
      setIsConverting(false);
      setError(err.message);
    }
  };

  const renderFormatOptions = () => {
    if (selectedFile) {
      if (selectedFile.type.startsWith('image/')) {
        return (
          <>
            <option value="jpeg">JPEG</option>
            <option value="png">PNG</option>
            <option value="bmp">BMP</option>
            <option value="gif">GIF</option>
            <option value="tiff">TIFF</option>
            <option value="webp">WEBP</option>
          </>
        );
      } else if (selectedFile.type.startsWith('video/')) {
        return (
          <>
            <option value="mp4">MP4</option>
            <option value="webm">WebM</option>
            <option value="avi">AVI</option>
            <option value="mkv">MKV</option>
            <option value="mov">MOV</option>
            <option value="flv">FLV</option>
            <option value="gif">GIF</option>
          </>
        );
      } else if (selectedFile.type.startsWith('audio/')) {
        return (
          <>
            <option value="mp3">MP3</option>
            <option value="ogg">OGG</option>
            <option value="wav">WAV</option>
            <option value="aac">AAC</option>
            <option value="flac">FLAC</option>
            <option value="m4a">M4A</option>
          </>
        );
      }
    }
    return null;
  };
  
  return (
    <div className="container mx-auto p-6 mt-3 h-auto flex justify-center items-center flex-col">
      <Dropzone  onDrop={handleFileDrop} accept="image/*, video/*, audio/*">
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className="flex justify-center items-center flex-col border-2 border-dashed border-gray-300 p-4 text-center h-64">
            <input {...getInputProps()} />
            <p className='text-xl text-slate-500 font-mono font-semibold'>Drag & drop a file here, or click to select one</p>
            <img src="./cloud.png" className ="w-12" alt="cloud-upload" />
          </div>
        )}
      </Dropzone>
      {selectedFile && (
        <div className="mt-6">
          <p>Selected File: {selectedFile.name}</p>
          <select
            value={outputFormat}
            onChange={handleOutputFormatChange}
            className="m-2 border border-gray-300 p-2"
          >
            {renderFormatOptions()}
          </select>
          <button onClick={convertFile} disabled={isConverting} className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Convert
          </button>
        </div>
      )}
      {isConverting && <p className="mt-4">Converting...</p>}
      {error && <p className="mt-4 text-red-500">Error: {error}</p>}
      {convertedFileUrl && (
        <div className="mt-6">
          <p>Converted File:</p>
          {selectedFile.type.startsWith('image/') && (
            <img src={convertedFileUrl} alt="Converted" className="mt-2 max-w-full" />
          )}
          {selectedFile.type.startsWith('video/') && (
            <video controls className="mt-2 max-w-full">
              <source src={convertedFileUrl} type={`video/${outputFormat}`} />
              Your browser does not support the video tag.
            </video>
          )}
          {selectedFile.type.startsWith('audio/') && (
            <audio controls className="mt-2">
              <source src={convertedFileUrl} type={`audio/${outputFormat}`} />
              Your browser does not support the audio element.
            </audio>
          )}
          <a href={convertedFileUrl} download={`converted.${outputFormat}`} className="mt-2 block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Download Converted File
          </a>
        </div>
      )}
    </div>
  );
};

export default FileConverter;

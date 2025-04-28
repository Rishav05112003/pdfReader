import React, { useState } from 'react';
// import axios from 'axios'; // Removed axios
import { FiUploadCloud, FiFile, FiX } from 'react-icons/fi';

const FileUpload = ({ onSuccess }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    console.log(e.target.files);
    setFiles(Array.from(e.target.files));
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      setError('Please select PDF files to upload.');
      return;
    }

    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
   

    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const responseData = await res.json();
      onSuccess(responseData.session_id);


    } catch (err) {
      setError('Error uploading files. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <h1 className='text-center mt-10 text-3xl font-bold bg-blue-200'>PDF Reader</h1>
    <div className="max-w-2xl  mt-10 mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Upload PDF Files</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-6">
          <input
            type="file" 
            multiple
            onChange={handleFileChange}
            accept="application/pdf"
            className="mb-4"
          />
          <p className="text-gray-600 text-sm">
            Select PDF files to upload.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {files.length > 0 && (
          <div className="mb-6">
            <h3 className="font-medium mb-2 text-gray-700">Selected Files:</h3>
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                >
                  <div className="flex items-center">
                    <FiFile className="mr-2 text-gray-500" />
                    <span className="text-gray-700">{file.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="submit"
          disabled={files.length === 0 || loading}
          className={`w-full py-3 px-6 rounded-md font-medium text-white transition-colors
          ${files.length === 0 || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </div>
          ) : 'Upload & Process'}
        </button>
      </form>
    </div>
    </>
  );
};

export default FileUpload;

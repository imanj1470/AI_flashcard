"use client"
import React, { useState } from 'react';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const PdfUploader = () => {
    const [text, setText] = useState('');
  
    const handlePdfUpload = async (event) => {
      const file = event.target.files[0];
  
      if (file && file.type === 'application/pdf') {
        const fileReader = new FileReader();
  
        fileReader.onload = async (e) => {
          const typedArray = new Uint8Array(e.target.result);
          const pdf = await pdfjs.getDocument(typedArray).promise;
  
          let extractedText = '';
  
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map((item) => item.str).join(' ');
            extractedText += ` ${pageText}`;
          }
  
          setText(extractedText);
        };
  
        fileReader.readAsArrayBuffer(file);
      }
    };
  
    return (
      <div>
        <input type="file" accept="application/pdf" onChange={handlePdfUpload} />
        <div>
          <h2>Extracted Text:</h2>
          <p>{text}</p>
        </div>
      </div>
    );
  };
  
  export default PdfUploader;
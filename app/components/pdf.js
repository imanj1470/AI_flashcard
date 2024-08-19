"use client"
import React, { useState } from 'react';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const PdfUploader = ({ onTextExtracted }) => {

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
  
          // Pass the extracted text to the parent component
          onTextExtracted(extractedText);
        };
  
        fileReader.readAsArrayBuffer(file);
      }
    };
  
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <input
          type="file"
          accept="application/pdf"
          onChange={handlePdfUpload}
          id="file-upload"
          style={{ display: 'none' }}
        />
        <label htmlFor="file-upload" style={{ cursor: 'pointer', display: 'inline-block', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', borderRadius: '4px' }}>
          Choose file
        </label>
      </div>
    );
  };
  
  export default PdfUploader;
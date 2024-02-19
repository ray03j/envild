'use client'

import { useState } from 'react';
import SimpleMde from 'react-simplemde-editor';
import "easymde/dist/easymde.min.css";


export default function Form() {
  const [content, setContent] = useState('');
  
  const [markdown, setMarkdown] = useState('');
  
  const handleChange = (v) => {
    setContent(v);
  };
  
  // const [previewMode, setPreviewMode] = useState(false);
  // const togglePreview = () => {
  //   setPreviewMode(!previewMode);
  // };
  
  return (
    <div className="max-w-screen-md mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Create Post</h1>

        
        <div className="mb-8">
          <label htmlFor="content" className="block text-lg font-semibold mb-2 text-gray-800">Content</label>
          <SimpleMde
            id="content"
            value={content}
            onChange={handleChange}
            className="text-gray-800"
            placeholder="Write your article here..."
          />
        </div>

        <div className="mb-8 flex justify-between">
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">Create Post</button>
        </div>
    </div>

      </div>
  );
}

import React, {useState} from 'react';
import './App.css';
import ImageContainer from './ImageConatiner';
import {ImageData} from './types';

import {
  useProfileImage,
} from './hooks';

function App() {
  const images = useProfileImage<ImageData>();

  return (
    <div className="App">
      <ImageContainer images={images} minImageCount={3} />
    </div>
  );
}


export default App;

import React, { useState } from 'react';
import './App.css';
import ImageContainer from './ImageConatiner';
import { ImageData } from './types';

import { useProfileImage } from './hooks';
import Username from './Username';

function App() {
  const images = useProfileImage<ImageData>();

  return (
    <div className="App">
      <Username />
      <ImageContainer images={images} minImageCount={3} maxImageCount={12} />
    </div>
  );
}

export default App;

import React from 'react';
import ImageContainer from './ImageConatiner';
import { ImageData } from './types';

import { useProfileImage } from './hooks';
import UsernameContainer from './UsernameContainer';

const App = () => {
  const images = useProfileImage<ImageData>();

  return (
    <div className="App">
      <UsernameContainer name={'김태연'} maxLength={12} />
      <ImageContainer images={images} minImageCount={3} maxImageCount={12} />
    </div>
  );
};

export default App;

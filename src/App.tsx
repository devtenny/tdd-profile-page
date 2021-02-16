import React, { useState } from 'react';
import ImageContainer from './ImageConatiner';
import styled from 'styled-components';
import { ImageData } from './types';
import ColorPicker from 'react-pick-color';

import { useProfileImage } from './hooks';
import UsernameContainer from './UsernameContainer';
import DisplayShortBio from './DisplayShortBio';

const App = () => {
  const images = useProfileImage<ImageData>();
  const [backgroundColor, setBackgroundColor] = useState<string>('white');

  return (
    <Container style={{ backgroundColor: backgroundColor }}>
      <UsernameContainer name={'김태연'} maxLength={12} />
      <DisplayShortBio />

      <BackgroundColorPicker
        color={backgroundColor}
        onChange={(color) => {
          setBackgroundColor(color.hex);
        }}
      />

      <ImageContainer images={images} minImageCount={3} maxImageCount={12} />
    </Container>
  );
};

export default App;

export const Container = styled.div``;
export const BackgroundColorPicker = styled(ColorPicker)``;

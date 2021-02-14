import React, { useState } from 'react';
import styled from 'styled-components';

export const BorderRadius = {
  SQUARE: 0,
  ROUNDED_SQUARE: 30,
  CIRCLE: 100,
} as const;

const ImageEditor = () => {
  const [borderRadius, setBorderRadius] = useState<number>(0);
  const onClick = (value: typeof BorderRadius[keyof typeof BorderRadius]) => {
    setBorderRadius(value);
  };

  return (
    <Container>
      <CustomImageContainer>
        {borderRadius === BorderRadius.SQUARE ? (
          <SquareImage></SquareImage>
        ) : borderRadius === BorderRadius.ROUNDED_SQUARE ? (
          <RoundedSquareImage></RoundedSquareImage>
        ) : (
          <CircleImage></CircleImage>
        )}
      </CustomImageContainer>
      <BorderRadiusBtnContainer>
        {Object.entries(BorderRadius).map(([key, value]) => (
          <BorderRadiusBtn
            type="button"
            key={key}
            onClick={() => onClick(value)}
          >
            {value}
          </BorderRadiusBtn>
        ))}
      </BorderRadiusBtnContainer>
    </Container>
  );
};

export default ImageEditor;

const Container = styled.div``;
export const CustomImageContainer = styled.div``;
export const SquareImage = styled.img`
  border-radius: ${BorderRadius.SQUARE}px;
`;
export const RoundedSquareImage = styled.img`
  border-radius: ${BorderRadius.ROUNDED_SQUARE}px;
`;
export const CircleImage = styled.img`
  border-radius: ${BorderRadius.CIRCLE}%;
`;
export const BorderRadiusBtnContainer = styled.div``;
const BorderRadiusBtn = styled.input``;

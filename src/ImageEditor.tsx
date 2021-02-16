import React, { useState } from 'react';
import styled from 'styled-components';
import ColorPicker from 'react-pick-color';
import { PaletteColor } from './PaletteColor';

export const BorderRadius = {
  SQUARE: 0,
  ROUNDED_SQUARE: 30,
  CIRCLE: 100,
} as const;

export const BorderWidth = {
  NONE: 0,
  THIN: 3,
  MEDIUM: 15,
  THICK: 30,
} as const;

const ImageEditor = () => {
  const [borderRadius, setBorderRadius] = useState<number>(0);
  const [borderWidth, setBorderWidth] = useState<number>(0);
  const [borderColor, setBorderColor] = useState<string>('BLACK');

  const onClick = (type: string, value: any) => {
    if (type === 'radius') setBorderRadius(value);
    else if (type === 'width') setBorderWidth(value);
  };

  const onPaletteColorClick = (color: any) => {
    setBorderColor(color);
  };

  return (
    <Container>
      <CustomImageContainer>
        <CustomImage
          style={{
            borderRadius: `${borderRadius}%`,
            borderWidth: `${borderWidth}px`,
            borderColor: `${borderColor}`,
          }}
        ></CustomImage>
      </CustomImageContainer>

      <BorderRadiusBtnContainer>
        {Object.entries(BorderRadius).map(([key, value]) => (
          <BorderRadiusBtn
            type="button"
            key={key}
            onClick={() => onClick('radius', value)}
          >
            {key}
          </BorderRadiusBtn>
        ))}
      </BorderRadiusBtnContainer>

      <BorderWidthBtnContainer>
        {Object.entries(BorderWidth).map(([key, value]) => (
          <BorderWidthBtn
            type="button"
            key={key}
            onClick={() => onClick('width', value)}
          >
            {key}
          </BorderWidthBtn>
        ))}
      </BorderWidthBtnContainer>

      <PaletteBorderColorBtnContainer>
        {Object.entries(PaletteColor).map(([key, value]) => (
          <PaletteBorderColorBtn
            type="button"
            key={key}
            style={{ backgroundColor: key }}
            onClick={() => onPaletteColorClick(key)}
          >
            {value}
          </PaletteBorderColorBtn>
        ))}
        <BorderColorPicker
          color={borderColor}
          onChange={(color) => {
            setBorderColor(color.hex);
          }}
        />
      </PaletteBorderColorBtnContainer>
    </Container>
  );
};

export default ImageEditor;

const Container = styled.div``;
export const CustomImageContainer = styled.div``;
export const CustomImage = styled.img``;
export const BorderRadiusBtnContainer = styled.div``;
const BorderRadiusBtn = styled.input``;
export const BorderWidthBtnContainer = styled.div``;
const BorderWidthBtn = styled.input``;
export const PaletteBorderColorBtn = styled.input``;
export const PaletteBorderColorBtnContainer = styled.div``;
export const BorderColorPicker = styled(ColorPicker)``;

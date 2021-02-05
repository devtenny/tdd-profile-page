import React from 'react';
import styled from 'styled-components';
import {ImageData} from './types';

interface PropType {
  images: ImageData[],
  minImageCount: number,
}

const ImageContainer: React.FC<PropType> = ({
  images,
  minImageCount,
  ...props
}) => {
  return (
    <Container>
      {images.length < minImageCount && <PleaseUploadImages>이미지를 3개 이상 올려 프로필을 완성해보세요.</PleaseUploadImages>}
      {images.map((item: ImageData, index) => <ImageCard key={`${index}`} src={item.url} />)}
    </Container>
  );
};

export const Container = styled.div``;
export const ImageCard = styled.img``;
export const PleaseUploadImages = styled.div``;

export default ImageContainer;

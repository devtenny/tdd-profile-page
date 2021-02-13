import React from 'react';
import styled from 'styled-components';
import { ImageData } from './types';

interface PropType {
  images: ImageData[];
  minImageCount: number;
  maxImageCount: number;
}

const ImageContainer: React.FC<PropType> = ({
  images,
  minImageCount,
  maxImageCount,
  ...props
}) => {
  return (
    <Container className="ImageContainer">
      {images.length < minImageCount && (
        <PleaseUploadImages>
          이미지를 <MinImageCount>{minImageCount}</MinImageCount>개 이상 올려
          프로필을 완성해보세요.
        </PleaseUploadImages>
      )}
      {images.slice(0, maxImageCount).map((item: ImageData) => (
        <ImageCard key={item.uid} src={item.url} />
      ))}
    </Container>
  );
};

export const Container = styled.div``;
export const ImageCard = styled.img``;
export const PleaseUploadImages = styled.div``;
export const MinImageCount = styled.span``;
export default ImageContainer;

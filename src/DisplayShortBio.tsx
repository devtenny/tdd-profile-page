import React from 'react';
import styled from 'styled-components';

export const Color = {
  RED: '빨강색',
  ORANGE: '주황색',
  YELLOW: '노랑색',
  GREEN: '초록색',
  BLUE: '파랑색',
} as const;

export const Mbti = {
  INTP: 'INTP',
  INTJ: 'INTJ',
  ENFP: 'ENFP',
  ENFJ: 'ENFJ',
} as const;

export interface SentenceKeywordType {
  color: typeof Color[keyof typeof Color];
  mbti: typeof Mbti[keyof typeof Mbti];
  lastName: string;
}

export const makeSentence = (keywords: SentenceKeywordType) => {
  const { color, mbti, lastName } = keywords;

  return `${color}을 좋아하는 ${mbti}인 ${lastName}씨`;
};

const DisplayShortBio = () => {
  return (
    <Container>
      {Object.entries(Color).map(([key, value]) => (
        <ColorBtn key={key}>{value}</ColorBtn>
      ))}
    </Container>
  );
};

export default DisplayShortBio;

const Container = styled.div``;
export const ColorBtn = styled.button``;

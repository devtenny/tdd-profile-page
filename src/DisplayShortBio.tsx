import React, { useState } from 'react';
import styled from 'styled-components';
import { onClick } from './UsernameContainer';

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

export const Lastname = {
  KIM: '김',
  LEE: '이',
  PARK: '박',
  CHOI: '최',
} as const;

export interface SentenceKeywordType {
  color: typeof Color[keyof typeof Color] | null;
  mbti: typeof Mbti[keyof typeof Mbti] | null;
  lastname: typeof Lastname[keyof typeof Lastname] | null;
}

export const makeSentence = (keywords: SentenceKeywordType) => {
  const { color, mbti, lastname } = keywords;

  return `${color}을 좋아하는 ${mbti}인 ${lastname}씨`;
};

const DisplayShortBio = () => {
  // 비동기로 처리되는 useState를 어떻게 해결할 수 있을까?
  // const [keyword, setKeyword] = useState<SentenceKeywordType>({
  //   color: null,
  //   mbti: null,
  //   lastname: null,
  // });

  const [color, setColor] = useState<typeof Color[keyof typeof Color] | null>(
    null
  );
  const [mbti, setMbti] = useState<typeof Mbti[keyof typeof Mbti] | null>(null);
  const [lastname, setLastname] = useState<
    typeof Lastname[keyof typeof Lastname] | null
  >(null);

  let keyword = {
    color: color,
    mbti: mbti,
    lastname: lastname,
  };
  const onClick = (type: string, value: any) => {
    if (type === 'color') setColor(value);
    else if (type === 'mbti') setMbti(value);
    else setLastname(value);
  };

  return (
    <Container>
      <UserSentence>
        {color && mbti && lastname && makeSentence(keyword)}
      </UserSentence>
      <ColorBtnContainer>
        {Object.entries(Color).map(([key, value]) => (
          <ColorBtn
            type="button"
            key={key}
            onClick={() => onClick('color', value)}
          >
            {value}
          </ColorBtn>
        ))}
      </ColorBtnContainer>
      <MbtiBtnContainer>
        {Object.entries(Mbti).map(([key, value]) => (
          <MbtiBtn
            type="button"
            key={key}
            onClick={() => onClick('mbti', value)}
          >
            {value}
          </MbtiBtn>
        ))}
      </MbtiBtnContainer>
      <LastnameBtnContainer>
        {Object.entries(Lastname).map(([key, value]) => (
          <LastnameBtn
            type="button"
            key={key}
            onClick={() => onClick('lastname', value)}
          >
            {value}
          </LastnameBtn>
        ))}
      </LastnameBtnContainer>
    </Container>
  );
};

export default DisplayShortBio;

const Container = styled.div``;
export const UserSentence = styled.div``;
export const ColorBtn = styled.input``;
export const MbtiBtn = styled.input``;
export const LastnameBtn = styled.input``;

export const ColorBtnContainer = styled.div``;
export const MbtiBtnContainer = styled.div``;
export const LastnameBtnContainer = styled.div``;

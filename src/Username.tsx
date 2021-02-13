import React, { useState } from 'react';
import styled from 'styled-components';

type Props = {
  name: string;
  maxLength: number;
};

export const onClick = () => {};

const Username = ({ name, maxLength }: Props) => {
  const [inputValue, setInputValue] = useState<string>('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value.slice(0, maxLength));
  };

  return (
    <Container className="Username">
      <UsernameContainer>{name.slice(0, maxLength)}</UsernameContainer>
      <UsernameInput
        value={inputValue}
        onChange={(event) => onChange(event)}
      ></UsernameInput>
      <SubmitBtn onClick={() => onClick()}>등록</SubmitBtn>
    </Container>
  );
};

export default Username;

const Container = styled.div``;
export const UsernameContainer = styled.input``;
export const UsernameInput = styled.input``;
export const SubmitBtn = styled.button``;

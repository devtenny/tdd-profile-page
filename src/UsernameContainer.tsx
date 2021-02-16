import React, { useState } from 'react';
import { ColorPicker } from 'react-pick-color';
import styled from 'styled-components';

type Props = {
  name: string;
  maxLength: number;
};

export const onClick = () => {};

const UsernameContainer = ({ name, maxLength }: Props) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [usernameColor, setUsernameColor] = useState<string>('BLACK');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value.slice(0, maxLength));
  };

  return (
    <Container>
      <Username style={{ color: usernameColor }}>
        {name.slice(0, maxLength)}
      </Username>
      <UsernameInput
        value={inputValue}
        onChange={(event) => onChange(event)}
      ></UsernameInput>
      <SubmitBtn onClick={() => onClick()}>등록</SubmitBtn>
      <UsernameColorPicker
        color={usernameColor}
        onChange={(color) => {
          setUsernameColor(color.hex);
        }}
      />
    </Container>
  );
};

export default UsernameContainer;

export const Container = styled.div``;
export const Username = styled.input``;
export const UsernameInput = styled.input``;
export const SubmitBtn = styled.button``;
export const UsernameColorPicker = styled(ColorPicker)``;

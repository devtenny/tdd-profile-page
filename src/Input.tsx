import React from 'react';
import styled from 'styled-components';

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

const Input = ({ value, onChange }: Props) => {
  return (
    <UsernameInput
      value={value}
      onChange={(event) => onChange(event)}
    ></UsernameInput>
  );
};

export default Input;

export const UsernameInput = styled.input``;

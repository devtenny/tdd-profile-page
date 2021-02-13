import React from 'react';
import { onClick, SubmitBtn } from './UsernameContainer';

interface PropType {
  defaultValue: string;
  placeholder: string;
  onChange: (value: string) => void;
}

const UsernameInput: React.FC<PropType> = (props) => {
  const { onChange } = props;
  return (
    <>
      <input onChange={(e) => onChange(e.target.value)} />
      <SubmitBtn onClick={() => onClick()}>등록</SubmitBtn>
    </>
  );
};

export default UsernameInput;

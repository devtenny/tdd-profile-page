import React from 'react';

type Props = {
  name: string;
  maxLength: number;
};

const Username = ({ name, maxLength }: Props) => {
  return <>{name.slice(0, maxLength)}</>;
};

export default Username;

import React, {useState} from 'react';

export function useProfileImage<T>(items?: T[]) {
  const [images, setImages] = useState<T[]>(items || []);
  // return [images, setImages];
  return images;
};


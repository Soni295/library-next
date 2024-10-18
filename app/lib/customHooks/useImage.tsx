import { useState, useEffect } from 'react';
import { ChangeInputElement } from '../definitions';

export function useImg(link: string = '') {
  const [img, setImg] = useState<imgState>({
    link: link,
    file: null,
  });

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(img.link);
    };
  }, [img.link]);

  const handleImageChange = (e: ChangeInputElement) => {
    if (!e.target.files) return;
    const file = Array.from(e.target.files)[0];
    const link = URL.createObjectURL(file);
    setImg({ link, file });
  };

  const reset = () => {
    URL.revokeObjectURL(img.link);
    setImg(initialState);
  };

  return [img, handleImageChange, reset] as const;
}

interface imgState {
  link: string;
  file: File | null;
}

const initialState: imgState = {
  link: '',
  file: null,
};

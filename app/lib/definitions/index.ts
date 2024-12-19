import { ChangeEvent, FormEvent } from 'react';

export interface Props {
  children?: React.ReactNode;
}
/*
export interface PropsWithIsMobile extends Props {
  isMobile?: boolean;
}
*/

export interface PropsWithClassName extends Props {
  className?: string;
}

export type ChangeInputElement = ChangeEvent<HTMLInputElement>;
export type ChangeSelectElement = ChangeEvent<HTMLSelectElement>;
export type SubmitEvent = FormEvent<HTMLFormElement>;

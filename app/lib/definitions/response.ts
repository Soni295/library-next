import { NextResponse } from 'next/server';
import { ErrDesc } from '../errors/serverErr';

export interface ResError {
  data: null;
  errors: ErrDesc[];
}

export interface ResSuccess<T> {
  data: T;
  error: null;
}
export type NextRes<T = null> =
  | NextResponse<ResError>
  | NextResponse<ResSuccess<T>>;

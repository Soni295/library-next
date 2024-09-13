import { NextResponse } from 'next/server';
import { ERR_USER_EXIST, ErrDesc } from '../errors/serverErr';
import { NextRes } from '../definitions/response';

export class Responses {
  static success = <T>(data: T, status: number = 200): NextRes<T> =>
    NextResponse.json({ data, error: null }, { status });

  static error = (status: number = 500, errors: ErrDesc[]): NextRes =>
    NextResponse.json({ data: null, errors }, { status });

  static serverError = (desc: string = 'Unknow error') =>
    Responses.error(500, [{ type: 'server Error', desc }]);
}

export const ERR_USER_DOESNT_EXIST = Responses.error(401, [
  {
    type: 'ERR_USER_DOESNT_EXIST',
    desc: 'El usuario o la contrasenia no coinciden',
  },
]);

export interface ErrDesc {
  type: string;
  desc: string;
}

export class ServerErr {
  constructor(
    public type: string,
    public desc: string,
  ) {}
}
export const ERR_USER_EXIST = new ServerErr(
  'Err_User_Exist',
  'Usuario existente.',
);

export const ERR_SERVER_INTERNAL = new ServerErr(
  'Err_Server_Internal',
  'Error desconocido',
);

export const ERR_WRONG_PASSWORD = new ServerErr(
  'Err_Wrong_Password',
  'El usuario puede no existir o la contraseña es incorrecta',
);

export const ERR_DOESNT_EXIST_USER = new ServerErr(
  'Err_Doesnt_Exist_User',
  'El usuario puede no existir o la contraseña es incorrecta',
);

export const ERR_NOT_AUTHORIZATION_TOKEN = new ServerErr(
  'ERR_AUTHORIZATION',
  'Token not allow',
);

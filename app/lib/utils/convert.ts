/*
 * stringtoNumber es una funcion que utilizo
 * para convertir el id del path (string) en
 * a numero para poderlo buscar el id del modelo.
 */
export function stringToNumber(str: string) {
  const a = parseInt(str, 10);
  return isNaN(a) ? -1 : a;
}

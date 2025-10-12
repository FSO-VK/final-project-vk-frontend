/** Http protocol status codes */
export const HttpStatusCode = {
  Ok: 200,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  Notfound: 404,
  InternalServerError: 500,
};

/** isSuccessfulCode checks if given HttpStatusCode is referred
 * to success response
 */
export function isSuccessfulStatusCode(code: number): boolean {
  return code >= 200 && code < 300;
}

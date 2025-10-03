import { ResponseError } from './errors';
import { UnmarshallError } from '@shared/fetch_utils/errors';
import { isSuccessfulStatusCode } from '@shared/fetch_utils/http_status_code';

/** A basic json response body of backend api */
export interface BaseResponseBody {
  // backend operation status code
  readonly statusCode: number;
  // error identifier
  readonly error?: string;
  // generalized response body
  readonly body: Record<string, unknown>;
}

/** unpackResponse checks if api response is correct and returns parsed
 * response. It throws error if something is wrong
 */
export async function unpackResponse(response: Response): Promise<Record<string, unknown>> {
  let responseBody: BaseResponseBody;

  try {
    responseBody = await response.json();
  } catch {
    throw new UnmarshallError('Failed to unmarshall json');
  }

  if (!responseBody.statusCode) {
    throw new UnmarshallError('Expected statusCode field in json, but not found');
  }
  if (!responseBody.body) {
    throw new UnmarshallError('Expected body field in json, but not found');
  }

  if (!isSuccessfulStatusCode(responseBody.statusCode)) {
    if (!responseBody.error) {
      throw new UnmarshallError('Expected error field in json, but not found');
    }
    throw new ResponseError(responseBody.error, responseBody.body);
  }

  return responseBody.body;
}

import { assertIfError } from '@/shared/lib';
import { TransportError } from './errors';

/** Enum representing possible http methods */
export enum HttpMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
}

/** Parameters used when fetching http api */
export interface FetchOptions {
  method: HttpMethod;
  credentials?: RequestCredentials;
  body?: BodyInit;
  headers?: HeadersInit;
}

/** Binds fetch with non-changing request parameters
 * @param url The url where fetch goes
 * @param method Http method
 * @param credentials Fetch credentials policy
 * @param body Request body
 * @returns A promise that resolves to the raw http response
 */
export async function fetchJsonCors(
  url: URL,
  { method = HttpMethod.Get, credentials, body, headers }: FetchOptions,
): Promise<Response> {
  try {
    return await fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        ...headers,
      },
      mode: 'cors',
      credentials,
      body,
    });
  } catch (error: unknown) {
    assertIfError(error);
    throw new TransportError((error as Error).message);
  }
}

/** Make query parameters with given object. If some parameter is undefined,
 * it will be excluded
 * @param queryObject An object whose key and values will be transformed into URLSearchParams
 */
export function makeQueryParams(queryObject: { [key: string]: unknown }): URLSearchParams {
  const definedQueries = Object.entries(queryObject).reduce(
    (definedQueries: { [key: string]: string }, [name, value]) => {
      if (value === undefined) {
        return definedQueries;
      }
      definedQueries[name] = String(value);
      return definedQueries;
    },
    {},
  );
  return new URLSearchParams(definedQueries);
}

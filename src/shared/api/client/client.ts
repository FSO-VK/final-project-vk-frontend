/** @fileoverview Backend API Client module. */

import { HttpMethod } from './fetch_utils';
import { fetchJsonCors, makeQueryParams } from './fetch_utils';
import { sharedConfig } from '@/shared/config';
import { unpackResponse } from './response_unpack';

interface BaseOptions {
  query?: Record<string, string>;
  useCredentials?: boolean;
}

type GetOptions = BaseOptions;

interface BodyRequestOptions extends BaseOptions {
  // JSON.stringify takes any, so we should too
  body?: unknown;
}

class Client {
  private backendOrigin_: string;

  constructor(backendOrigin: string) {
    this.backendOrigin_ = backendOrigin;
  }

  public get = async (endpoint: string, { query, useCredentials }: GetOptions = {}) => {
    const response = await fetchJsonCors(this.makeUrl_(endpoint, query), {
      method: HttpMethod.Get,
      credentials: useCredentials ? 'include' : 'omit',
    });
    return unpackResponse(response);
  };

  public post = async (endpoint: string, options: BodyRequestOptions = {}) => {
    return this.bodyRequest_(endpoint, HttpMethod.Post, options);
  };

  public put = async (endpoint: string, options: BodyRequestOptions = {}) => {
    return this.bodyRequest_(endpoint, HttpMethod.Put, options);
  };

  public delete = async (endpoint: string, options: BodyRequestOptions = {}) => {
    return this.bodyRequest_(endpoint, HttpMethod.Delete, options);
  };

  private bodyRequest_ = async (
    endpoint: string,
    method: HttpMethod,
    { query, useCredentials, body }: BodyRequestOptions,
  ) => {
    const response = await fetchJsonCors(this.makeUrl_(endpoint, query), {
      method,
      body: JSON.stringify(body),
      credentials: useCredentials ? 'include' : 'omit',
    });
    return unpackResponse(response);
  };

  private makeUrl_ = (endpoint: string, query: Record<string, string> | undefined = undefined) => {
    if (query !== undefined) {
      return new URL(this.backendOrigin_ + endpoint + '?' + makeQueryParams(query).toString());
    } else {
      return new URL(this.backendOrigin_ + endpoint);
    }
  };
}

export const backendClient = new Client(sharedConfig.backendOrigin);

/** @fileoverview A file containing common errors for responses and requests */

/** TransportError happens when fetch fails to get to the server */
export class TransportError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, TransportError.prototype);
  }
}

/** UnmarshallError happens when json parsing failed or json body is not correct */
export class UnmarshallError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, UnmarshallError.prototype);
  }
}

/** ResponseError happens when there is protocol error, but not http error */
export class ResponseError extends Error {
  public readonly reason: object;

  constructor(message: string, reason: object) {
    super(message);
    this.reason = reason;
    Object.setPrototypeOf(this, ResponseError.prototype);
  }
}

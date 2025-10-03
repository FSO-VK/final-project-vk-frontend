/** ResponseError happens when there is protocol error, but not http error */
export class ResponseError extends Error {
  public readonly reason: object;

  constructor(message: string, reason: object) {
    super(message);
    this.reason = reason;
    Object.setPrototypeOf(this, ResponseError.prototype);
  }
}

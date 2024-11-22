export default class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;

    // Maintain proper stack trace for where the error was thrown (only available in V8 engines like Node.js)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

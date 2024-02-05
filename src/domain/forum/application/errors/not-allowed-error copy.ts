import { ApplicationError } from "@/core/errors/application-error";

export class NotAllowedError extends Error implements ApplicationError {
  constructor() {
    super('Not allowed')
  }
}
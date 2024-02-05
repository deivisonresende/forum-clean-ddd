import { ApplicationError } from "@/core/errors/application-error";

export class ResourceNotFoundError extends Error implements ApplicationError {
  constructor() {
    super('Resource not found')
  }
}
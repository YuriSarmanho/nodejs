import { UseCaseError } from "@/core/errors/use-case-erro";

export class WrongCredentialsError extends Error implements UseCaseError {
  constructor() {
    super('Credentials are not valid')
  }
}
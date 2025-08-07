import { UseCaseError } from '@/core/errors/use-case-erro'

export class StudentAlreadyExistsError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Student "${identifier}" already exists.`)
  }
}

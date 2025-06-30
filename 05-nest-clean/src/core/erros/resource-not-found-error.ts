import type { UseCaseError } from '@/core/errors/use-case-erro'

export class ResouceNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Resource not found')
  }
}

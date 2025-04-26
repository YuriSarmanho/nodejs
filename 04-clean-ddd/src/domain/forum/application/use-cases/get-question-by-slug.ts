import type { QuestionRepository } from '../repositories/question-repository'
import { Question } from '../../enterprise/entities/question'
import { left, right, type Either } from '@/core/either'
import { ResouceNotFoundError } from './erros/resource-not-found-error'

interface GetQuestionSlugUseCaseRequest {
  slug: string
}

type GetQuestionSlugUseCaseResponse = Either<
  ResouceNotFoundError,
  {
    question: Question
  }
>

export class GetQuestionSlugUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    slug,
  }: GetQuestionSlugUseCaseRequest): Promise<GetQuestionSlugUseCaseResponse> {
    const question = await this.questionRepository.findBySlug(slug)

    if (!question) {
      return left(new ResouceNotFoundError())
    }
    return right({
      question,
    })
  }
}

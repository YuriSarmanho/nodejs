import { QuestionRepository } from '../repositories/question-repository'
import { left, right, type Either } from '@/core/either'
import { ResourceNotFoundError } from '@/core/erros/resource-not-found-error'
import { Injectable } from '@nestjs/common'
import { QuestionDetails } from '../../enterprise/entities/value-objects/question-details'

interface GetQuestionSlugUseCaseRequest {
  slug: string
}

type GetQuestionSlugUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    question: QuestionDetails
  }
>

@Injectable()
export class GetQuestionBySlugUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    slug,
  }: GetQuestionSlugUseCaseRequest): Promise<GetQuestionSlugUseCaseResponse> {
    const question = await this.questionRepository.findDetailsBySlug(slug)

    if (!question) {
      return left(new ResourceNotFoundError())
    }
    return right({
      question,
    })
  }
}

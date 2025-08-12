import { QuestionRepository } from '../repositories/question-repository'
import { Question } from '../../enterprise/entities/question'
import { left, right, type Either } from '@/core/either'
import { ResouceNotFoundError } from '@/core/erros/resource-not-found-error'
import { Injectable } from '@nestjs/common'

interface GetQuestionSlugUseCaseRequest {
  slug: string
}

type GetQuestionSlugUseCaseResponse = Either<
  ResouceNotFoundError,
  {
    question: Question
  }
>

@Injectable()
export class GetQuestionBySlugUseCase {
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

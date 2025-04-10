import type { QuestionRepository } from '../repositories/question-repository'
import { Question } from '../../enterprise/entities/question'

interface GetQuestionSlugUseCaseRequest {
  slug: string
}

interface GetQuestionSlugUseCaseResponse {
  question: Question
}

export class GetQuestionSlugUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    slug,
  }: GetQuestionSlugUseCaseRequest): Promise<GetQuestionSlugUseCaseResponse> {
    const question = await this.questionRepository.findBySlug(slug)

    if (!question) {
      throw new Error('Question not found.')
    }
    return {
      question,
    }
  }
}

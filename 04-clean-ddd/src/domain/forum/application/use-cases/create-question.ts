import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import type { QuestionRepository } from '../repositories/question-repository'
import { Question } from '../../enterprise/entities/question'
import { MakeQuestion } from 'tests/factories/make-questions'

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
}

interface CreateQuestionUseCaseResponse {
  question: Question
}

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = MakeQuestion()

    await this.questionRepository.create(question)

    return {
      question,
    }
  }
}

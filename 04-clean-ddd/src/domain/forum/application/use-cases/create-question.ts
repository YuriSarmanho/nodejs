import type { QuestionRepository } from '../repositories/question-repository'
import { Question } from '../../enterprise/entities/question'
import { MakeQuestion } from 'tests/factories/make-questions'
import { right, type Either } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
  attachmentIds: string[]
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question
  }
>

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    title,
    content,
    attachmentIds,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const questionAttachment = attachmentIds.map(attachmentId => {
      return QuestionAttachment.create({
        attachmentId,
        questionId:
      })
    })

    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content
    })

    await this.questionRepository.create(question)

    return right({
      question,
    })
  }
}

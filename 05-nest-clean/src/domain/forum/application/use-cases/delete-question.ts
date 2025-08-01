import { Either, left, right } from '@/core/either'
import { QuestionRepository } from '../repositories/question-repository'
import { NotAllowedError } from '@/core/erros/not-allowed-error'
import { ResouceNotFoundError } from '@/core/erros/resource-not-found-error'

interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

type DeleteQuestionUseCaseResponse = Either<
  ResouceNotFoundError | NotAllowedError,
  null
>

export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      return left(new ResouceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.questionRepository.delete(question)

    return right(null)
  }
}

import { left, right, type Either } from '@/core/either'
import { AnswersRepository } from '../repositories/answers-repository'
import { ResouceNotFoundError } from './erros/resource-not-found-error'
import { NotAllowedError } from './erros/not-allowed-error'

interface DeleteAnswersUseCaseRequest {
  authorId: string
  answersId: string
}

type DeleteAnswersUseCaseResponse = Either<
  ResouceNotFoundError | NotAllowedError,
  {}
>

export class DeleteAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answersId,
  }: DeleteAnswersUseCaseRequest): Promise<DeleteAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findById(answersId)

    if (!answers) {
      return left(new ResouceNotFoundError())
    }

    if (authorId !== answers.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.answersRepository.delete(answers)

    return right({})
  }
}

import { left, right, type Either } from '@/core/either'
import { AnswersRepository } from '../repositories/answers-repository'
import { ResouceNotFoundError } from '@/core/erros/resource-not-found-error'
import { NotAllowedError } from '@/core/erros/not-allowed-error'
import { Injectable } from '@nestjs/common'

interface DeleteAnswersUseCaseRequest {
  authorId: string
  answerId: string
}

type DeleteAnswersUseCaseResponse = Either<
  ResouceNotFoundError | NotAllowedError,
  null
>

@Injectable()
export class DeleteAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswersUseCaseRequest): Promise<DeleteAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findById(answerId)

    if (!answers) {
      return left(new ResouceNotFoundError())
    }

    if (authorId !== answers.authorId.toString()) {
      return left(new NotAllowedError())
    }

    await this.answersRepository.delete(answers)

    return right(null)
  }
}

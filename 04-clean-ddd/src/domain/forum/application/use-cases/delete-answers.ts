import { AnswersRepository } from '../repositories/answers-repository'

interface DeleteAnswersUseCaseRequest {
  authorId: string
  answersId: string
}

interface DeleteAnswersUseCaseResponse {}

export class DeleteAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorId,
    answersId,
  }: DeleteAnswersUseCaseRequest): Promise<DeleteAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findById(answersId)

    if (!answers) {
      throw new Error('Answers not found.')
    }

    if (authorId !== answers.authorId.toString()) {
      throw new Error('Not allowed.')
    }

    await this.answersRepository.delete(answers)

    return {}
  }
}

import type { QuestionComment } from '../../enterprise/entities/question-comment'
import type { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface FetchQustionCommentUseCaseRequest {
  questionId: string
  page: number
}

interface FetchQustionCommentUseCaseResponse {
  questionComments: QuestionComment[]
}

export class FetchQustionCommentUseCase {
  constructor(private questionCommentRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQustionCommentUseCaseRequest): Promise<FetchQustionCommentUseCaseResponse> {
    const questionComments =
      await this.questionCommentRepository.findManyByQuestionId(questionId, {
        page,
      })

    return {
      questionComments,
    }
  }
}

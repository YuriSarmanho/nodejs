import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionCommentsRepository } from 'tests/repository/in-memory-question-comment-repository'
import { FetchQustionCommentUseCase } from './fetch-question-comments'
import { MakeQuestionComment } from 'tests/factories/make-question-comment'

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentsRepository
let sut: FetchQustionCommentUseCase

describe('Fetch Questions Comment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentsRepository()
    sut = new FetchQustionCommentUseCase(inMemoryQuestionCommentRepository)
  })

  it('should be able to fetch question comment', async () => {
    await inMemoryQuestionCommentRepository.create(
      MakeQuestionComment({
        questionId: new UniqueEntityID('question-1'),
      }),
    )
    await inMemoryQuestionCommentRepository.create(
      MakeQuestionComment({
        questionId: new UniqueEntityID('question-1'),
      }),
    )
    await inMemoryQuestionCommentRepository.create(
      MakeQuestionComment({
        questionId: new UniqueEntityID('question-1'),
      }),
    )

    const { questionComments } = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(questionComments).toHaveLength(3)
  })

  it('should be able to fetch paginated  questions comment', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentRepository.create(
        MakeQuestionComment({
          questionId: new UniqueEntityID('question-1'),
        }),
      )
    }
    const { questionComments } = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(questionComments).toHaveLength(2)
  })
})

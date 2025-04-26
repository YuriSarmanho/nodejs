import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionCommentsRepository } from 'tests/repository/in-memory-question-comment-repository'
import { MakeQuestionComment } from 'tests/factories/make-question-comment'
import { FetchQuestionCommentUseCase } from './fetch-question-comments'

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionCommentUseCase

describe('Fetch Questions Comment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentsRepository()
    sut = new FetchQuestionCommentUseCase(inMemoryQuestionCommentRepository)
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

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(result.value?.questionComments).toHaveLength(3)
  })

  it('should be able to fetch paginated  questions comment', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentRepository.create(
        MakeQuestionComment({
          questionId: new UniqueEntityID('question-1'),
        }),
      )
    }
    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.value?.questionComments).toHaveLength(2)
  })
})

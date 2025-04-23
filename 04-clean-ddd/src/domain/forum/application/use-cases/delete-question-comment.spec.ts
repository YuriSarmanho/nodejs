import { InMemoryQuestionCommentsRepository } from 'tests/repository/in-memory-question-comment-repository'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { MakeQuestionComment } from 'tests/factories/make-question-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: DeleteQuestionCommentUseCase

describe('Delete Question Comment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()

    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to delete a question comment', async () => {
    const questionComment = MakeQuestionComment()

    await inMemoryQuestionCommentsRepository.create(questionComment)

    await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: questionComment.authorId.toString(),
    })

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0)
  })
  it('should not be able to delete another user question comment', async () => {
    const questionComment = MakeQuestionComment({
      authorId: new UniqueEntityID('author-1')
    })

    await inMemoryQuestionCommentsRepository.create(questionComment)

    
    expect(() => {
      return  sut.execute({
        questionCommentId: questionComment.id.toString(),    
        authorId: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)

  })
})

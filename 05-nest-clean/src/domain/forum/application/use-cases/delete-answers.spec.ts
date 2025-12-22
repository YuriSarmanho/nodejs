import { InMemoryAnswersRepository } from 'test/repository/in-memory-answers-repository'
import { MakeAnswers } from 'test/factories/make-answers'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteAnswersUseCase } from './delete-answers'
import { NotAllowedError } from '@/core/erros/not-allowed-error'
import { InMemoryAnswerAttachmentsRepository } from 'test/repository/in-memory-answer-attachment-repository'
import { MakeAnswerAttachment } from 'test/factories/make-answer-attachment'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswersUseCase

describe('Delete Answers', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    sut = new DeleteAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to delete a answers', async () => {
    const newAnswers = MakeAnswers(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answers-1'),
    )

    await inMemoryAnswersRepository.create(newAnswers)

    inMemoryAnswerAttachmentsRepository.items.push(
      MakeAnswerAttachment({
        answerId: newAnswers.id,
        attachmentId: new UniqueEntityID('1'),
      }),
      MakeAnswerAttachment({
        answerId: newAnswers.id,
        attachmentId: new UniqueEntityID('2'),
      }),
    )

    await sut.execute({
      answerId: 'answers-1',
      authorId: 'author-1',
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
    expect(inMemoryAnswerAttachmentsRepository.items).toHaveLength(0)
  })
  it('should not be able to delete a answers from another user', async () => {
    const newAnswers = MakeAnswers(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answers-1'),
    )

    inMemoryAnswersRepository.create(newAnswers)

    const result = await sut.execute({
      answerId: 'answers-1',
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})

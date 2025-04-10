import { InMemoryAnswersRespository } from 'tests/repository/in-memory-answers-repository'
import { MakeAnswers } from 'tests/factories/make-answers'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteAnswersUseCase } from './delete-answers'

let inMemoryAnswersRepository: InMemoryAnswersRespository
let sut: DeleteAnswersUseCase

describe('Delete Answers', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRespository()
    sut = new DeleteAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to delete a answers', async () => {
    const newAnswers = MakeAnswers(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answers-1'),
    )

    inMemoryAnswersRepository.create(newAnswers)

    await sut.execute({
      answersId: 'answers-1',
      authorId: 'author-1',
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })
  it('should not be able to delete a answers from another user', async () => {
    const newAnswers = MakeAnswers(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answers-1'),
    )

    inMemoryAnswersRepository.create(newAnswers)

    expect(() => {
      return sut.execute({
        answersId: 'answers-1',
        authorId: 'author-2',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})

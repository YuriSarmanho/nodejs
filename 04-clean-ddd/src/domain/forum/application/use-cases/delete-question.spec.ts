import { InMemoryQuestionRespository } from 'tests/repository/in-memory-questions-resitory'
import { MakeQuestion } from 'tests/factories/make-questions'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteQuestionUseCase } from './delete-question'

let inMemoryQuestionsRepository: InMemoryQuestionRespository
let sut: DeleteQuestionUseCase

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionRespository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to delete a question', async () => {
    const newQuestion = MakeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: 'question-1',
      authorId: 'author-1',
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })
  it('should not be able to delete a question from another user', async () => {
    const newQuestion = MakeQuestion(
      {
        authorId: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    inMemoryQuestionsRepository.create(newQuestion)

    expect(() => {
      return sut.execute({
        questionId: 'question-1',
        authorId: 'author-2',
      })
    }).rejects.instanceOf(Error)
  })
})

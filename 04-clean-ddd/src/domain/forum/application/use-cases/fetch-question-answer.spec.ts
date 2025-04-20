import { InMemoryAnswersRepository } from 'tests/repository/in-memory-answers-repository'
import { FetchQuestionAnswersUseCase } from './fetch-question-answer'
import { MakeAnswers } from 'tests/factories/make-answers'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch Questions Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to fetch recent questions', async () => {
    await inMemoryAnswersRepository.create(
      MakeAnswers({
        questionId: new UniqueEntityID('question-1'),
      }),
    )
    await inMemoryAnswersRepository.create(
      MakeAnswers({
        questionId: new UniqueEntityID('question-1'),
      }),
    )
    await inMemoryAnswersRepository.create(
      MakeAnswers({
        questionId: new UniqueEntityID('question-1'),
      }),
    )

    const { answers } = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(answers).toHaveLength(3)
  })

  it('should be able to fetch paginated  questions answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        MakeAnswers({
          questionId: new UniqueEntityID('question-1'),
        }),
      )
    }
    const { answers } = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(answers).toHaveLength(2)
  })
})

import { InMemoryQuestionRespository } from 'tests/repository/in-memory-questions-resitory'
import { GetQuestionSlugUseCase } from './get-question-by-slug'
import { MakeQuestion } from 'tests/factories/make-questions'
import { Slug } from '../../enterprise/entities/value-objects/slug'

let inMemoryQuestionsRepository: InMemoryQuestionRespository
let sut: GetQuestionSlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionRespository()
    sut = new GetQuestionSlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question using slug', async () => {
    const newQuestion = MakeQuestion({
      slug: Slug.create('example-question'),
    })

    inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: 'example-question',
    })

    expect(question.content).toBeTruthy()
    expect(question.title).toEqual(newQuestion.title)
  })
})

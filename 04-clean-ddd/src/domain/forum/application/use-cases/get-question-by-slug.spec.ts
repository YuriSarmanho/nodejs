import { InMemoryQuestionRepository } from 'tests/repository/in-memory-questions-resitory'
import { GetQuestionSlugUseCase } from './get-question-by-slug'
import { MakeQuestion } from 'tests/factories/make-questions'
import { Slug } from '../../enterprise/entities/value-objects/slug'

let inMemoryQuestionsRepository: InMemoryQuestionRepository
let sut: GetQuestionSlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionRepository()
    sut = new GetQuestionSlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question using slug', async () => {
    const newQuestion = MakeQuestion({
      slug: Slug.create('example-question'),
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      slug: 'example-question',
    })

    expect(result.value?.question.id).toBeTruthy()
    expect(result.value?.question.title).toEqual(newQuestion.title)
  })
})

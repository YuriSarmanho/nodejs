import { InMemoryQuestionRespository } from 'tests/repository/in-memory-questions-resitory'
import { GetQuestionSlugUseCase } from './get-question-by-slug'
import { Question } from '../../enterprise/entities/question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionRespository
let sut: GetQuestionSlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionRespository()
    sut = new GetQuestionSlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question using slug', async () => {
    const newQuestion = Question.create({
      authorId: new UniqueEntityID(),
      title: 'Example question',
      slug: Slug.create('example-question'),
      content: 'Example content',
    })

    inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: 'example-question',
    })

    expect(question.content).toBeTruthy()
    expect(question.title).toEqual(newQuestion.title)
  })
})

import { InMemoryQuestionRepository } from 'test/repository/in-memory-questions-resitory'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { MakeQuestion } from 'test/factories/make-questions'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { InMemoryQuestionAttachmentsRepository } from 'test/repository/in-memory-question-attachments-repository'
import { Question } from '../../enterprise/entities/question'

let inMemoryQuestionAttachmentsRespository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRespository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentsRespository,
    )
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question using slug', async () => {
    const newQuestion = MakeQuestion({
      slug: Slug.create('example-question'),
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      slug: 'example-question',
    })

    expect(result.value).toMatchObject({
      question: expect.objectContaining({
        title: newQuestion.title,
      }),
    })
  })
})

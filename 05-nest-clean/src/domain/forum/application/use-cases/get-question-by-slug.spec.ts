import { InMemoryQuestionRepository } from 'test/repository/in-memory-questions-resitory'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { MakeQuestion } from 'test/factories/make-questions'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { InMemoryQuestionAttachmentsRepository } from 'test/repository/in-memory-question-attachments-repository'
import { Question } from '../../enterprise/entities/question'
import { InMemoryStudentsRepository } from 'test/repository/in-memory-students-repository'
import { InMemoryAttachmentsRepository } from 'test/repository/in-memory-attachments-repository'
import { MakeStudent } from 'test/factories/make-student'
import { MakeAttachment } from 'test/factories/make-attachment'
import { MakeQuestionAttachment } from 'test/factories/make-question-attachment'

let inMemoryQuestionAttachmentsRespository: InMemoryQuestionAttachmentsRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    inMemoryQuestionAttachmentsRespository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentsRespository,
      inMemoryAttachmentsRepository,
      inMemoryStudentsRepository
    )
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question using slug', async () => {
    const student = MakeStudent({ name: 'John Doe'})

    inMemoryStudentsRepository.items.push(student)

    const newQuestion = MakeQuestion({
      authorId: student.id,
      slug: Slug.create('example-question'),
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const attachment = MakeAttachment({
      title: 'Some Attachment'
    })

    inMemoryAttachmentsRepository.items.push(attachment)

    inMemoryQuestionAttachmentsRespository.items.push(
      MakeQuestionAttachment({
        attachmentId: attachment.id,
        questionId: newQuestion.id
      })
    )

    const result = await sut.execute({
      slug: 'example-question',
    })

    expect(result.value).toMatchObject({
      question: expect.objectContaining({
        title: newQuestion.title,
        author: 'John Doe',
        attachment: [
          expect.objectContaining({
            title: 'Some Attachemnt',
          })
        ]
      }),
    })
  })
})

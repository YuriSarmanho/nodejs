import { InMemoryQuestionRepository } from 'test/repository/in-memory-questions-resitory'
import { MakeQuestion } from 'test/factories/make-questions'
import { InMemoryQuestionCommentsRepository } from 'test/repository/in-memory-question-comment-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'
import { InMemoryQuestionAttachmentsRepository } from 'test/repository/in-memory-question-attachments-repository'
import { InMemoryAttachmentsRepository } from 'test/repository/in-memory-attachments-repository'
import { InMemoryStudentsRepository } from 'test/repository/in-memory-students-repository'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryQuestionAttachmentsRespository: InMemoryQuestionAttachmentsRepository
let inMemoryAttachmentsRepository: InMemoryAttachmentsRepository
let inMemoryStudentsRepository: InMemoryStudentsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: CommentOnQuestionUseCase

describe('Comment On Question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRespository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryAttachmentsRepository = new InMemoryAttachmentsRepository()
    inMemoryStudentsRepository = new InMemoryStudentsRepository()
    
    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentsRespository,
      inMemoryAttachmentsRepository,
      inMemoryStudentsRepository
    )
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository(inMemoryStudentsRepository)

    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionCommentsRepository,
    )
  })

  it('should be able to comment on question', async () => {
    const question = MakeQuestion()

    await inMemoryQuestionRepository.create(question)

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'Comentario teste',
    })

    expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual(
      'Comentario teste',
    )
  })
})

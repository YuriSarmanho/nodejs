import { InMemoryAnswersRepository } from 'tests/repository/in-memory-answers-repository'
import { MakeAnswers } from 'tests/factories/make-answers'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionRepository } from 'tests/repository/in-memory-questions-resitory'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { MakeQuestion } from 'tests/factories/make-questions'
import { NotAllowedError } from '@/core/erros/not-allowed-error'
import { InMemoryAnswerAttachmentsRepository } from 'tests/repository/in-memory-answer-attachment-repository'
import { InMemoryQuestionAttachmentsRepository } from 'tests/repository/in-memory-question-attachments-repository'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    inMemoryQuestionsRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentsRepository,
    )

    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository,
    )
  })

  it('should be able to choose the question best answer', async () => {
    const question = MakeQuestion()

    const answer = MakeAnswers({
      questionId: question.id,
    })

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    console.log(inMemoryQuestionsRepository.items[0])

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    })

    expect(inMemoryQuestionsRepository.items[0].bestAnswerId).toEqual(answer.id)
  })

  it('should not be able to to choose another user question best answer', async () => {
    const question = MakeQuestion({
      authorId: new UniqueEntityID('author-1'),
    })

    const answer = MakeAnswers({
      questionId: question.id,
    })

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    const result = await sut.execute({
      answerId: answer.id.toString(),
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})

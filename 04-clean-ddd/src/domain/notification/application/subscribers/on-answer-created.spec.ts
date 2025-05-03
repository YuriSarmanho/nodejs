import { MakeAnswers } from 'tests/factories/make-answers'
import { OnAnswerCreated } from './on-answer-created'
import { InMemoryAnswersRepository } from 'tests/repository/in-memory-answers-repository'
import { InMemoryAnswerAttachmentsRepository } from 'tests/repository/in-memory-answer-attachment-repository'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository

describe('On Answer Created', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
  })
  it('should send a notification when an asnwer is created', () => {
    const onAsnwerCreated = new OnAnswerCreated()

    const answer = MakeAnswers()

    inMemoryAnswersRepository.create(answer)
  })
})

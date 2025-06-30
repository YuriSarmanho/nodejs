import { MakeAnswers } from 'tests/factories/make-answers'
import { OnAnswerCreated } from './on-answer-created'
import { InMemoryAnswersRepository } from 'tests/repository/in-memory-answers-repository'
import { InMemoryAnswerAttachmentsRepository } from 'tests/repository/in-memory-answer-attachment-repository'
import { InMemoryQuestionRepository } from 'tests/repository/in-memory-questions-resitory'
import { InMemoryQuestionAttachmentsRepository } from 'tests/repository/in-memory-question-attachments-repository'
import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from '../use-cases/send-notification'
import { InMemoryNotificationRepository } from 'tests/repository/in-memory-notification-repository'
import { MakeQuestion } from 'tests/factories/make-questions'
import { MockInstance } from 'vitest'
import { waitFor } from 'tests/utils/wait-for'

let inMemoryQuestionsAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemomoryNotificationRepository: InMemoryNotificationRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: MockInstance<
  (
    request: SendNotificationUseCaseRequest,
  ) => Promise<SendNotificationUseCaseResponse>
>

describe('On Answer Created', () => {
  beforeEach(() => {
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemomoryNotificationRepository,
    )
    inMemoryQuestionsAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionRepository(
      inMemoryQuestionsAttachmentsRepository,
    )
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    inMemomoryNotificationRepository = new InMemoryNotificationRepository()

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnAnswerCreated(inMemoryQuestionsRepository, sendNotificationUseCase)
  })
  it('should send a notification when an asnwer is created', async () => {
    const question = MakeQuestion()
    const answer = MakeAnswers({ questionId: question.id })

    inMemoryQuestionsRepository.create(question)
    inMemoryAnswersRepository.create(answer)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})

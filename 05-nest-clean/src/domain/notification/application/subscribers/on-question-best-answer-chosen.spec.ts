import { MakeAnswers } from 'tests/factories/make-answers'
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
import { OnQuestionBestAnswerChosen } from './on-question-best-answer-chosen'
import { DomainEvents } from '@/core/events/domain-events'

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

describe('On Question Best Answer Chosen', () => {
  beforeEach(() => {
    inMemomoryNotificationRepository = new InMemoryNotificationRepository()

    sendNotificationUseCase = new SendNotificationUseCase(
      inMemomoryNotificationRepository,
    )

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

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

    new OnQuestionBestAnswerChosen(
      inMemoryAnswersRepository,
      sendNotificationUseCase,
    )
  })

  it('should send a notification when topic has new best answer chosen', async () => {
    const question = MakeQuestion()
    const answer = MakeAnswers({ questionId: question.id })

    inMemoryQuestionsRepository.create(question)
    inMemoryAnswersRepository.create(answer)

    question.bestAnswerId = answer.id

    inMemoryQuestionsRepository.save(question)

    await DomainEvents.dispatchEventsForAggregate(question.id)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
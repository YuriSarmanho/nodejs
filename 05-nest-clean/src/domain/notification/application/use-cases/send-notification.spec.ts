import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { SendNotificationUseCase } from './send-notification'
import { InMemoryNotificationRepository } from 'tests/repository/in-memory-notification-repository'

let inMemoryNotificationsRepository: InMemoryNotificationRepository
let sut: SendNotificationUseCase

describe('Send Notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationRepository()
    sut = new SendNotificationUseCase(inMemoryNotificationsRepository)
  })

  it('should be able to create a notification', async () => {
    const result = await sut.execute({
      recipientId: '1',
      title: 'Nova Notificacao',
      content: 'Conteudo da nova notificacao',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationsRepository.items[0]).toEqual(
      result.value?.notification,
    )
  })
})

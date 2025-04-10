import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionRespository } from 'tests/repository/in-memory-questions-resitory'

let inMemoryQuestionsRepository: InMemoryQuestionRespository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionRespository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create a question', async () => {
    const { question } = await sut.execute({
      authorId: '1',
      title: 'Nova Pergunta',
      content: 'Conteudo da nova pergunta',
    })

    expect(question.content).toBeTruthy()
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id)
  })
})

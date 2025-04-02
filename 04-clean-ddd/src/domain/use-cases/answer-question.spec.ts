import { AnswerQuestionUseCase } from './answer-question'
import type { AnswerRepository } from '../repositories/answers-repository'
import type { Answer } from '../entities/answer'

const fakeAnswerRepository: AnswerRepository = {
  create: async (answer: Answer) => {
    return 
  }
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)

  const answer = await answerQuestion.execute({
    questionId: '1',
    instructorId: '1',
    content: 'Nova Resposta',
  })

  expect(answer.content).toEqual('Nova Resposta')
})
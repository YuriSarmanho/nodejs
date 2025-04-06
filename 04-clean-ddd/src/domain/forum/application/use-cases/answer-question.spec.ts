import { AnswerQuestionUseCase } from './answer-question'
import type { AnswerRepository } from '@/domain/forum/application/repositories/answers-repository'
import type { Answer } from '../../enterprise/entities/answer'

const fakeAnswerRepository: AnswerRepository = {
  create: async (answer: Answer) => {},
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

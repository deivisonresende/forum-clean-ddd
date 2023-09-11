import { Answer } from '../entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { AnswerQuestionUseCase as SUT } from './answer-question'

const InMemoryAnswerRepository: AnswersRepository = {
  create: async (answer: Answer): Promise<Answer> => {
    return answer
  }
}

test('create an answer', async () => {
  const answerQuestion = new SUT(InMemoryAnswerRepository)

  const answer = await answerQuestion.execute({ questionId: '1', instructorId: '1', content: 'new answer' })

  expect(answer.content).toEqual('new answer')
})

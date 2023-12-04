import { beforeEach, vi } from 'vitest'

import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let SUT: FetchQuestionAnswersUseCase
let questionId: string

describe('Get question by slug use case', () => {
  beforeEach(async () => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()

    const SUTQuestion = await inMemoryQuestionsRepository.create(makeQuestion())
    const anotherQuestion = await inMemoryQuestionsRepository.create(makeQuestion())

    questionId = SUTQuestion.id.toString()

    await Promise.all([
      inMemoryAnswersRepository.create(makeAnswer({ questionId: SUTQuestion.id })),
      inMemoryAnswersRepository.create(makeAnswer({ questionId: SUTQuestion.id })),
      inMemoryAnswersRepository.create(makeAnswer({ questionId: SUTQuestion.id })),
      inMemoryAnswersRepository.create(makeAnswer({ questionId: anotherQuestion.id })),
    ])

    SUT = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })


  it('should be able to fetch the answers of a question', async () => {
    const { answers } = await SUT.execute({ questionId, cursor: { page: 1 } })

    expect(answers).toHaveLength(3)
  })


  it('should be able to fetch for a number of answers of a question', async () => {
    const { answers } = await SUT.execute({ questionId, cursor: { page: 1, amountItems: 2 } })

    expect(answers).toHaveLength(2)
  })

  it('should return a empty list when there are no answers on the selected page', async () => {
    const { answers } = await SUT.execute({ questionId, cursor: { page: 2 } })

    expect(answers).toHaveLength(0)
  })
})

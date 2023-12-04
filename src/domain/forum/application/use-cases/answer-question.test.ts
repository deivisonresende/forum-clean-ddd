import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { faker } from '@faker-js/faker'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let SUT: AnswerQuestionUseCase

describe('Answer question use case', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()

    SUT = new AnswerQuestionUseCase(inMemoryAnswersRepository, inMemoryQuestionsRepository)
  })

  it('should be able to create an answer to a question', async () => {
    const newQuestion = makeQuestion()

    const question = await inMemoryQuestionsRepository.create(newQuestion)

    const { answer } = await SUT.execute({
      questionId: question.id.toString(),
      authorId: 'author',
      content: 'new answer'
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(1)
    expect(inMemoryAnswersRepository.items[0]).toHaveProperty('id')
    expect(inMemoryAnswersRepository.items[0].id.toString()).toEqual(answer.id.toString())
    expect(inMemoryAnswersRepository.items[0]).toHaveProperty('authorId')
    expect(inMemoryAnswersRepository.items[0].authorId.toString()).toEqual(answer.authorId.toString())
    expect(inMemoryAnswersRepository.items[0]).toHaveProperty('questionId')
    expect(inMemoryAnswersRepository.items[0].questionId.toString()).toEqual(answer.questionId.toString())
    expect(inMemoryAnswersRepository.items[0]).toHaveProperty('content')
    expect(inMemoryAnswersRepository.items[0].content).toEqual(answer.content)
  })

  it('should throw an error when the question does not found', async () =>
    expect(async () => await SUT.execute({ questionId: faker.lorem.text(), authorId: '1', content: 'new answer' }))
      .rejects.toThrowError('Pergunta não encontrada.')
  )
})


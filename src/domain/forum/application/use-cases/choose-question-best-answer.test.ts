import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'
import { makeAnswer } from 'test/factories/make-answer'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let SUT: ChooseQuestionBestAnswerUseCase

describe('Answer question use case', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()

    SUT = new ChooseQuestionBestAnswerUseCase(inMemoryAnswersRepository, inMemoryQuestionsRepository)
  })

  it('should be able to choose the best answer for a question', async () => {
    const question = await inMemoryQuestionsRepository.create(makeQuestion())

    await inMemoryAnswersRepository.create(makeAnswer({ questionId: question.id }))
    const bestAnswer = await inMemoryAnswersRepository.create(makeAnswer({ questionId: question.id }))

    await SUT.execute({
      authorId: question.authorId.toString(),
      answerId: bestAnswer.id.toString()
    })

    expect(inMemoryQuestionsRepository.questions).toHaveLength(1)
    expect(inMemoryQuestionsRepository.questions[0]).toHaveProperty('id')
    expect(inMemoryQuestionsRepository.questions[0].id.toString()).toEqual(question.id.toString())
    expect(inMemoryQuestionsRepository.questions[0]).toHaveProperty('authorId')
    expect(inMemoryQuestionsRepository.questions[0].authorId.toString()).toEqual(question.authorId.toString())
    expect(inMemoryQuestionsRepository.questions[0]).toHaveProperty('bestAnswerId')
    expect(inMemoryQuestionsRepository.questions[0].bestAnswerId?.toString()).toEqual(bestAnswer.id.toString())
  })

  it('should throw an error when the answer does not found', async () =>
    expect(async () => await SUT.execute({ answerId: faker.lorem.text(), authorId: new UniqueEntityID().toString() }))
      .rejects.toThrowError('Resposta não encontrada.')
  )

  it('should throw an error when the question does not found', async () => {
    const answer = await inMemoryAnswersRepository.create(makeAnswer())

    expect(async () => await SUT.execute({ answerId: answer.id.toString(), authorId: new UniqueEntityID().toString() }))
      .rejects.toThrowError('Pergunta não encontrada.')
  })

  it('should NOT be able to to choose the best answer for a question of another authors', async () => {
    const question = await inMemoryQuestionsRepository.create(makeQuestion())

    await inMemoryAnswersRepository.create(makeAnswer({ questionId: question.id }))
    const answer = await inMemoryAnswersRepository.create(makeAnswer({ questionId: question.id }))

    await SUT.execute({
      authorId: question.authorId.toString(),
      answerId: answer.id.toString()
    })

    expect(async () => await SUT.execute({ answerId: answer.id.toString(), authorId: new UniqueEntityID().toString() }))
      .rejects.toThrowError('Não é permitido selecionar melhor resposta para perguntas de outros autores.')
  })
})


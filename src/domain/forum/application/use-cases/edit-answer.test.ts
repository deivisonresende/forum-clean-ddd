import { EditAnswerUseCase } from './edit-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let SUT: EditAnswerUseCase

describe('Edit answer use case', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    SUT = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit a answer by id', async () => {
    const newAnswer = makeAnswer({ authorId: new UniqueEntityID('author-1') })

    inMemoryAnswersRepository.create(newAnswer)

    const content = faker.lorem.paragraph()

    await SUT.execute({
      authorId: 'author-1',
      answerId: newAnswer.id.toString(),
      content
    })

    expect(inMemoryAnswersRepository.items[0]).toHaveProperty('id')
    expect(inMemoryAnswersRepository.items[0].id.toString()).toEqual(newAnswer.id.toString())
    expect(inMemoryAnswersRepository.items[0]).toHaveProperty('content')
    expect(inMemoryAnswersRepository.items[0].content).toEqual(content)
  })


  it('should NOT be able to edit a answer of another author', async () => {
    const answer = makeAnswer({
      authorId: new UniqueEntityID('author-1'),
      content: faker.lorem.paragraph()
    })

    inMemoryAnswersRepository.create(answer)

    const params = {
      authorId: 'author-2',
      answerId: answer.id.toString(),
      content: faker.lorem.paragraph()
    }

    expect(async () => await SUT.execute(params))
      .rejects
      .toThrow('Não é permitido editar respostas de outros autores.')
  })

  it('should throw an error when the answer does not found', async () => {
    const params = {
      authorId: 'unknown',
      answerId: faker.lorem.text(),
      content: faker.lorem.paragraph()
    }

    expect(async () => await SUT.execute(params))
      .rejects
      .toThrowError('Resposta não encontrada.')
  })
})


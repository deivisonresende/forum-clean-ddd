import { DeleteQuestionUseCase } from './delete-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'
import { makeQuestion } from 'test/factories/make-question'
import { rejects } from 'assert'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let SUT: DeleteQuestionUseCase

describe('Delete Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    SUT = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to delete a question by id', async () => {
    const question = makeQuestion({ authorId: new UniqueEntityID('author-1') })

    inMemoryQuestionsRepository.create(question)

    const countQuestionsBefore = inMemoryQuestionsRepository.questions.length

    await SUT.execute({ questionId: question.id.toString(), authorId: 'author-1' })

    expect(countQuestionsBefore).toBe(1)
    expect(inMemoryQuestionsRepository.questions).toHaveLength(0)
  })


  it('should NOT be able to delete a question of another author', async () => {
    const question = makeQuestion({ authorId: new UniqueEntityID('author-1') })

    inMemoryQuestionsRepository.create(question)

    expect(async () => await SUT.execute({ questionId: question.id.toString(), authorId: 'author-2' }))
      .rejects.toThrow('Não é permitido apagar perguntas de outros autores.')
  })

  it('should throw an error when the question does not found', async () =>
    expect(async () => await SUT.execute({ questionId: faker.lorem.text(), authorId: '1' }))
      .rejects.toThrowError('Pergunta não encontrada.')
  )
})


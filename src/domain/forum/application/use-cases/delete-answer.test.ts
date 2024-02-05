import { DeleteAnswerUseCase } from './delete-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'
import { makeAnswer } from 'test/factories/make-answer'
import { NotAllowedError } from '../errors/not-allowed-error copy'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let SUT: DeleteAnswerUseCase

describe('Delete Answer Use Case', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    SUT = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to delete a answer by id', async () => {
    const answer = makeAnswer({ authorId: new UniqueEntityID('author-1') })

    inMemoryAnswersRepository.create(answer)

    const countAnswersBefore = inMemoryAnswersRepository.items.length

    await SUT.execute({ answerId: answer.id.toString(), authorId: 'author-1' })

    expect(countAnswersBefore).toBe(1)
    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })


  it('should NOT be able to delete a answer of another author', async () => {
    const answer = makeAnswer({ authorId: new UniqueEntityID('author-1') })

    inMemoryAnswersRepository.create(answer)

    const result = await SUT.execute({ answerId: answer.id.toString(), authorId: 'author-2' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

  it('should throw an error when the answer does not found', async () => {

    const result = await SUT.execute({ answerId: faker.lorem.text(), authorId: '1' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})


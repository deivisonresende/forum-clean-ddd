import { EditAnswerUseCase } from './edit-answer'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'
import { makeAnswer } from 'test/factories/make-answer'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { NotAllowedError } from '../errors/not-allowed-error copy'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'
import { makeAnswerAttachment } from 'test/factories/make-answer-attachment'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let SUT: EditAnswerUseCase

describe('Edit answer use case', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryAnswerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
    SUT = new EditAnswerUseCase(inMemoryAnswersRepository, inMemoryAnswerAttachmentsRepository)
  })

  it('should be able to edit a answer by id', async () => {
    const newAnswer = makeAnswer({ authorId: new UniqueEntityID('author-1') })

    inMemoryAnswersRepository.create(newAnswer)

    const answerId = newAnswer.id

    inMemoryAnswerAttachmentsRepository.items.push(
      makeAnswerAttachment({ answerId, attachmentId: new UniqueEntityID('1') }),
      makeAnswerAttachment({ answerId, attachmentId: new UniqueEntityID('2') }),
    )

    const content = faker.lorem.paragraph()

    await SUT.execute({
      authorId: 'author-1',
      answerId: newAnswer.id.toString(),
      content,
      attachmentIds: ['1', '3']
    })

    expect(inMemoryAnswersRepository.items[0]).toHaveProperty('id')
    expect(inMemoryAnswersRepository.items[0].id.toString()).toEqual(newAnswer.id.toString())
    expect(inMemoryAnswersRepository.items[0]).toHaveProperty('content')
    expect(inMemoryAnswersRepository.items[0].content).toEqual(content)
    expect(inMemoryAnswersRepository.items[0]).toHaveProperty('attachments')
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems).toHaveLength(2)
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems[0]).toHaveProperty('attachmentId')
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems[0].attachmentId.toString()).toEqual('1')
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems[0]).toHaveProperty('createdAt')
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems[0].createdAt).toBeTruthy()
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems[1]).toHaveProperty('attachmentId')
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems[1].attachmentId.toString()).toEqual('3')
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems[1]).toHaveProperty('createdAt')
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems[1].createdAt).toBeTruthy()
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
      content: faker.lorem.paragraph(),
      attachmentIds: []
    }

    const result = await SUT.execute(params)

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

  it('should throw an error when the answer does not found', async () => {
    const params = {
      authorId: 'unknown',
      answerId: faker.lorem.text(),
      content: faker.lorem.paragraph(),
      attachmentIds: []
    }

    const result = await SUT.execute(params)

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})


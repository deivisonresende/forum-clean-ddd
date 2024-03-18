import { DeleteQuestionUseCase } from './delete-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'
import { makeQuestion } from 'test/factories/make-question'
import { NotAllowedError } from '../errors/not-allowed-error copy'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { makeQuestionAttachment } from 'test/factories/make-question-attachment'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let SUT: DeleteQuestionUseCase

describe('Delete Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()

    SUT = new DeleteQuestionUseCase(inMemoryQuestionsRepository, inMemoryQuestionAttachmentsRepository)
  })

  it('should be able to delete a question by id', async () => {
    const question = makeQuestion({ authorId: new UniqueEntityID('author-1') })

    inMemoryQuestionsRepository.create(question)

    const questionId = question.id

    inMemoryQuestionAttachmentsRepository.items.push(
      makeQuestionAttachment({ questionId, attachmentId: new UniqueEntityID('1') }),
      makeQuestionAttachment({ questionId, attachmentId: new UniqueEntityID('2') }),
    )

    const countQuestionsBefore = inMemoryQuestionsRepository.items.length

    await SUT.execute({ questionId: question.id.toString(), authorId: 'author-1' })

    expect(countQuestionsBefore).toBe(1)
    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
    expect(inMemoryQuestionAttachmentsRepository.items).toHaveLength(0)
  })


  it('should NOT be able to delete a question of another author', async () => {
    const question = makeQuestion({ authorId: new UniqueEntityID('author-1') })

    inMemoryQuestionsRepository.create(question)

    const result = await SUT.execute({ questionId: question.id.toString(), authorId: 'author-2' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

  it('should throw an error when the question does not found', async () => {
    const result = await SUT.execute({ questionId: faker.lorem.text(), authorId: '1' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  }) 
})

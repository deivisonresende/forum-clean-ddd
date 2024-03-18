import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { faker } from '@faker-js/faker'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let SUT: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => { 
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    SUT = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })


  it('should be able to create a question', async () => {
    const content = faker.lorem.words({ min: 120, max: 130 })

    const result = await SUT.execute({
      authorId: '1',
      title: 'title of my question',
      content,
      attachmentIds: ['1', '2']
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionsRepository.items).toHaveLength(1)
    expect(inMemoryQuestionsRepository.items[0]).toHaveProperty('id')
    expect(inMemoryQuestionsRepository.items[0].id).toBeTruthy()
    expect(inMemoryQuestionsRepository.items[0]).toHaveProperty('title')
    expect(inMemoryQuestionsRepository.items[0].title).toEqual(result.value?.question.title)
    expect(inMemoryQuestionsRepository.items[0]).toHaveProperty('authorId')
    expect(inMemoryQuestionsRepository.items[0].authorId).toEqual(result.value?.question.authorId)
    expect(inMemoryQuestionsRepository.items[0]).toHaveProperty('content')
    expect(inMemoryQuestionsRepository.items[0].content).toEqual(content)
    expect(inMemoryQuestionsRepository.items[0].attachments.currentItems).toHaveLength(2)
    expect(inMemoryQuestionsRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('2') })
    ])
    expect(inMemoryQuestionsRepository.items[0]).toHaveProperty('excerpt')
    expect(inMemoryQuestionsRepository.items[0].excerpt).toEqual(content.substring(0, 120).trimEnd().concat('...'))
    expect(inMemoryQuestionsRepository.items[0]).toHaveProperty('createdAt')
    expect(inMemoryQuestionsRepository.items[0].createdAt).toBeTruthy()
    expect(inMemoryQuestionsRepository.items[0]).toHaveProperty('updatedAt')
    expect(inMemoryQuestionsRepository.items[0].updatedAt).toBeFalsy()
  })
})


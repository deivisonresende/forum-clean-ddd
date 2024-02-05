import { EditQuestionUseCase } from './edit-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'
import { makeQuestion } from 'test/factories/make-question'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { NotAllowedError } from '../errors/not-allowed-error copy'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let SUT: EditQuestionUseCase

describe('Edit question use case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    SUT = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question by id', async () => {
    const newQuestion = makeQuestion({ authorId: new UniqueEntityID('author-1') })

    inMemoryQuestionsRepository.create(newQuestion)

    const title = faker.lorem.text()
    const content = faker.lorem.paragraph()

    await SUT.execute({
      questionId: newQuestion.id.toString(),
      authorId: 'author-1',
      title,
      content
    })

    expect(inMemoryQuestionsRepository.items[0]).toHaveProperty('id')
    expect(inMemoryQuestionsRepository.items[0].id.toString()).toEqual(newQuestion.id.toString())
    expect(inMemoryQuestionsRepository.items[0]).toHaveProperty('title')
    expect(inMemoryQuestionsRepository.items[0].title).toEqual(title)
    expect(inMemoryQuestionsRepository.items[0]).toHaveProperty('content')
    expect(inMemoryQuestionsRepository.items[0].content).toEqual(content)
    expect(inMemoryQuestionsRepository.items[0]).toHaveProperty('slug')
    expect(inMemoryQuestionsRepository.items[0].slug.value).toEqual(Slug.createFromText(title).value)
  })


  it('should NOT be able to edit a question of another author', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityID('author-1'),
      title: faker.lorem.text(),
      content: faker.lorem.paragraph()
    })

    inMemoryQuestionsRepository.create(question)

    const params = {
      questionId: question.id.toString(),
      authorId: 'author-2',
      title: faker.lorem.text(),
      content: faker.lorem.paragraph()
    }

    const result = await SUT.execute(params)

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

  it('should throw an error when the question does not found', async () => {
    const params = {
      questionId: faker.lorem.text(),
      authorId: 'unknown',
      title: faker.lorem.text(),
      content: faker.lorem.paragraph()
    }

    const result = await SUT.execute(params)

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})


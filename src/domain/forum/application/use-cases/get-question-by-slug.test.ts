import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { faker } from '@faker-js/faker'
import { makeQuestion } from 'test/factories/make-question'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let SUT: GetQuestionBySlugUseCase

describe('Get question by slug use case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    SUT = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })


  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion()

    inMemoryQuestionsRepository.create(newQuestion)

    const result = await SUT.execute({ slug: newQuestion.slug.value })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(inMemoryQuestionsRepository.items).toHaveLength(1)

      expect(result).toHaveProperty('value')
      expect(result.value).toHaveProperty('question')
      expect(result.value.question).toHaveProperty('id')
      expect(result.value.question.id).toBeTruthy()
      expect(result.value.question).toHaveProperty('title')
      expect(result.value.question.title).toEqual(newQuestion.title)
      expect(result.value.question).toHaveProperty('content')
      expect(result.value.question.content).toEqual(newQuestion.content)
      expect(result.value.question).toHaveProperty('slug')
      expect(result.value.question.slug).toHaveProperty('value')
      expect(result.value.question.slug.value).toEqual(Slug.createFromText(newQuestion.title).value)
    }
  })

  it('should throw an error when the question does not found', async () => {
    const result = await SUT.execute({ slug: faker.lorem.slug() })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})

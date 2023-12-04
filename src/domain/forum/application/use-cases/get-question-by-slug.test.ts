import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { faker } from '@faker-js/faker'
import { makeQuestion } from 'test/factories/make-question'

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

    const { question } = await SUT.execute({ slug: newQuestion.slug.value })

    expect(inMemoryQuestionsRepository.items).toHaveLength(1)
    expect(question).toHaveProperty('id')
    expect(question.id).toBeTruthy()
    expect(question).toHaveProperty('title')
    expect(question.title).toEqual(newQuestion.title)
    expect(question).toHaveProperty('content')
    expect(question.content).toEqual(newQuestion.content)
    expect(question).toHaveProperty('slug')
    expect(question.slug).toHaveProperty('value')
    expect(question.slug.value).toEqual(Slug.createFromText(newQuestion.title).value)
  })

  it('should throw an error when the question does not found', async () =>
    expect(async () => await SUT.execute({ slug: faker.lorem.slug() }))
      .rejects.toThrowError('Pergunta não encontrada.')
  )
})

import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { Question } from '../../enterprise/entities/question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let SUT: GetQuestionBySlugUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    SUT = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })


  it('should be able to get a question by slug', async () => {
    const newQuestion = Question.create({
      title: 'Example question',
      content: '',
      authorId: new UniqueEntityID(),
    })

    inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await SUT.execute({ slug: 'example-question' })

    expect(inMemoryQuestionsRepository.questions).toHaveLength(1)
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
})


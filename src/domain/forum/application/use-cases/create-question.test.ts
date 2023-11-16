import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let SUT: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => { 
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    SUT = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })


  it('should be able to create a question', async () => {
    const { question } = await SUT.execute({
      authorId: '1',
      title: 'title of my question',
      content: 'this is my question'
    })

    expect(inMemoryQuestionsRepository.questions).toHaveLength(1)
    expect(question).toHaveProperty('id')
    expect(question.id).toBeTruthy()
    expect(question).toHaveProperty('title')
    expect(question.title).toEqual('title of my question')
    expect(question).toHaveProperty('content')
    expect(question.content).toEqual('this is my question')
  })
})


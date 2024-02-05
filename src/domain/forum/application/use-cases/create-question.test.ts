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
    const result = await SUT.execute({
      authorId: '1',
      title: 'title of my question',
      content: 'this is my question'
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionsRepository.items).toHaveLength(1)
    expect(result.value?.question).toHaveProperty('id')
    expect(result.value?.question.id).toBeTruthy()
    expect(result.value?.question).toHaveProperty('title')
    expect(result.value?.question.title).toEqual('title of my question')
    expect(result.value?.question).toHaveProperty('content')
    expect(result.value?.question.content).toEqual('this is my question')
  })
})


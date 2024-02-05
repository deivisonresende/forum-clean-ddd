import { CommentOnQuestionUseCase } from './comment-on-question'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { faker } from '@faker-js/faker'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository

let SUT: CommentOnQuestionUseCase

describe('Comment on question', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()

    SUT = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    )
  })


  it('should be able to comment on question', async () => {
    const question = makeQuestion()

    await inMemoryQuestionsRepository.create(question)

    const result = await SUT.execute({
      authorId: '1',
      questionId: question.id.toString(),
      content: 'this is the comment of the question'
    })


    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(inMemoryQuestionCommentsRepository.items).toHaveLength(1)
      expect(inMemoryQuestionCommentsRepository.items[0]).toHaveProperty('id')
      expect(inMemoryQuestionCommentsRepository.items[0].id).toBeTruthy()
      expect(inMemoryQuestionCommentsRepository.items[0]).toHaveProperty('questionId')
      expect(inMemoryQuestionCommentsRepository.items[0].questionId.toString()).toEqual(question.id.toString())
      expect(inMemoryQuestionCommentsRepository.items[0]).toHaveProperty('authorId')
      expect(inMemoryQuestionCommentsRepository.items[0].authorId.toString()).toEqual(result.value.comment.authorId.toString())
      expect(inMemoryQuestionCommentsRepository.items[0]).toHaveProperty('content')
      expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual(result.value.comment.content)
    }
  })

  it('should throw an error when the question does not found', async () => {
    const result = await SUT.execute({ questionId: faker.lorem.text(), authorId: '1', content: 'new answer' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

})


import { CommentOnAnswerUseCase } from './comment-on-answer'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { NotAllowedError } from '../errors/not-allowed-error copy'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { faker } from '@faker-js/faker'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository

let SUT: CommentOnAnswerUseCase

describe('Comment on answer', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()

    SUT = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository,
    )
  })


  it('should be able to comment on answer', async () => {
    const answer = makeAnswer()

    await inMemoryAnswersRepository.create(answer)

    const result = await SUT.execute({
      authorId: '1',
      answerId: answer.id.toString(),
      content: 'this is the comment of the answer'
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(inMemoryAnswerCommentsRepository.items).toHaveLength(1)
      expect(inMemoryAnswerCommentsRepository.items[0]).toHaveProperty('id')
      expect(inMemoryAnswerCommentsRepository.items[0].id).toBeTruthy()
      expect(inMemoryAnswerCommentsRepository.items[0]).toHaveProperty('answerId')
      expect(inMemoryAnswerCommentsRepository.items[0].answerId.toString()).toEqual(answer.id.toString())
      expect(inMemoryAnswerCommentsRepository.items[0]).toHaveProperty('authorId')
      expect(inMemoryAnswerCommentsRepository.items[0].authorId.toString()).toEqual(result.value?.comment.authorId.toString())
      expect(inMemoryAnswerCommentsRepository.items[0]).toHaveProperty('content')
      expect(inMemoryAnswerCommentsRepository.items[0].content).toEqual(result.value?.comment.content)
    }
  })

  it('should throw an error when the answer does not found', async () => {
    const result = await SUT.execute({ answerId: faker.lorem.text(), authorId: '1', content: 'new answer' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)

  })
})


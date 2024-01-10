import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { beforeEach } from 'vitest'
import { makeAnswer } from 'test/factories/make-answer'
import { makeAnswerComment } from 'test/factories/make-answer-comment'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository

let SUT: FetchAnswerCommentsUseCase
let answerId: string

describe('Fetch answer comment', () => {
  beforeEach(async () => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()


    const targetAnswer = await inMemoryAnswersRepository.create(makeAnswer())
    const anotherAnswer = await inMemoryAnswersRepository.create(makeAnswer())

    answerId = targetAnswer.id.toString()

    await Promise.all([
      inMemoryAnswerCommentsRepository.create(makeAnswerComment({ answerId: targetAnswer.id })),
      inMemoryAnswerCommentsRepository.create(makeAnswerComment({ answerId: targetAnswer.id })),
      inMemoryAnswerCommentsRepository.create(makeAnswerComment({ answerId: targetAnswer.id })),
      inMemoryAnswerCommentsRepository.create(makeAnswerComment({ answerId: anotherAnswer.id })),
    ])

    SUT = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })


  it('should be able to fetch the comments of a answer', async () => {
    const { comments } = await SUT.execute({ answerId, cursor: { page: 1 } })

    expect(comments).toHaveLength(3)
  })


  it('should be able to fetch for a number of comments of a answer', async () => {
    const { comments } = await SUT.execute({ answerId, cursor: { page: 1, amountItems: 2 } })

    expect(comments).toHaveLength(2)
  })

  it('should return a empty list when there are no comments on the selected page', async () => {
    const { comments } = await SUT.execute({ answerId, cursor: { page: 2 } })

    expect(comments).toHaveLength(0)
  })
})

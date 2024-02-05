import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { NotAllowedError } from '../errors/not-allowed-error copy'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { faker } from '@faker-js/faker'
import { makeAnswerComment } from 'test/factories/make-answer-comment'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository

let SUT: DeleteAnswerCommentUseCase

describe('Comment on answer', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()

    SUT = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository)
  })


  it('should be able to delete the comment of a answer', async () => {
    const comment = makeAnswerComment()

    await inMemoryAnswerCommentsRepository.create(comment)

    const result = await SUT.execute({
      authorId: comment.authorId.toString(),
      answerCommentId: comment.id.toString()
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toStrictEqual({})
    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0)
  })

  it('should NOT be able to delete a comment of the another user', async () => {
    const comment = makeAnswerComment()

    await inMemoryAnswerCommentsRepository.create(comment)

    const result = await SUT.execute({ answerCommentId: comment.id.toString(), authorId: faker.lorem.text() })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)

  })

  it('should throw an error when the comment does not found', async () => {
    const result = await SUT.execute({ answerCommentId: faker.lorem.text(), authorId: faker.lorem.text() })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})

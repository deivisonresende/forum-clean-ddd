import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { faker } from '@faker-js/faker'
import { makeQuestionComment } from 'test/factories/make-question-comment'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository

let SUT: DeleteQuestionCommentUseCase

describe('Comment on question', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()

    SUT = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository)
  })


  it('should be able to delete the comment of a question', async () => {
    const comment = makeQuestionComment()

    await inMemoryQuestionCommentsRepository.create(comment)

    await SUT.execute({
      authorId: comment.authorId.toString(),
      questionCommentId: comment.id.toString()
    })

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0)
  })

  it('should NOT be able to delete a comment of the another user', async () => {
    const comment = makeQuestionComment()

    await inMemoryQuestionCommentsRepository.create(comment)

    expect(async () => await SUT.execute({ questionCommentId: comment.id.toString(), authorId: faker.lorem.text() }))
      .rejects.toThrowError('Não é permitido apagar comentários de outro usuário.')

  })

  it('should throw an error when the comment does not found', async () =>
    expect(async () => await SUT.execute({ questionCommentId: faker.lorem.text(), authorId: faker.lorem.text() }))
      .rejects.toThrowError('Comentário não encontrado.')
  )
})

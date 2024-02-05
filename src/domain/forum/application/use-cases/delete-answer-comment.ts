import { Either, left, right } from '@/core/either'

import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { NotAllowedError } from '../errors/not-allowed-error copy'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface IDeleteAnswerCommentUseCaseParams {
  authorId: string
  answerCommentId: string
}

type DeleteAnswerCommentResponse = Either<ResourceNotFoundError | NotAllowedError, NonNullable<object>>

export class DeleteAnswerCommentUseCase {
  constructor(
    private answerCommentsRepository: AnswerCommentsRepository
  ) { }

  async execute({ authorId, answerCommentId }: IDeleteAnswerCommentUseCaseParams): Promise<DeleteAnswerCommentResponse> {
    const comment = await this.answerCommentsRepository.findById(answerCommentId)
    if (!comment) return left(new ResourceNotFoundError())

    if (comment.authorId.toString() !== authorId) return left(new NotAllowedError())

    await this.answerCommentsRepository.deleteOne(answerCommentId)

    return right({})
  }
}

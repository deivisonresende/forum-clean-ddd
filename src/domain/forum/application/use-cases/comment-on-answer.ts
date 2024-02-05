import { Either, left, right } from '@/core/either'

import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { AnswersRepository } from '../repositories/answers-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface ICommentOnAnswerUseCaseParams {
  authorId: string
  answerId: string
  content: string
}

type CommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError,
  { comment: AnswerComment }
>

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerCommentsRepository: AnswerCommentsRepository
  ) { }

  async execute({ authorId, answerId, content }: ICommentOnAnswerUseCaseParams): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)
    if (!answer) return left(new ResourceNotFoundError())

    const comment = AnswerComment.create({
      content,
      answerId: new UniqueEntityID(answerId),
      authorId: new UniqueEntityID(authorId)
    })

    await this.answerCommentsRepository.create(comment)

    return right({ comment })
  }
}

import { Either, left, right } from '@/core/either'

import { NotAllowedError } from '../errors/not-allowed-error copy'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface IDeleteQuestionCommentUseCaseParams {
  authorId: string
  questionCommentId: string
}

type DeleteQuestionCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  NonNullable<object>
>

export class DeleteQuestionCommentUseCase {
  constructor(
    private questionCommentsRepository: QuestionCommentsRepository
  ) { }

  async execute({ authorId, questionCommentId }: IDeleteQuestionCommentUseCaseParams): Promise<DeleteQuestionCommentUseCaseResponse> {
    const comment = await this.questionCommentsRepository.findById(questionCommentId)
    if (!comment) return left(new ResourceNotFoundError())

    if (comment.authorId.toString() !== authorId) return left(new NotAllowedError())

    await this.questionCommentsRepository.deleteOne(questionCommentId)

    return right({})
  }
}

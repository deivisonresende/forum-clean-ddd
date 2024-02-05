import { Either, left, right } from '@/core/either'

import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface ICommentOnQuestionUseCaseParams {
  authorId: string
  questionId: string
  content: string
}

type CommentOnQuestionUseCaseResponse = Either<
  ResourceNotFoundError,
  { comment: QuestionComment }
>

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentsRepository: QuestionCommentsRepository
  ) { }

  async execute({ authorId, questionId, content }: ICommentOnQuestionUseCaseParams): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)
    if (!question) return left(new ResourceNotFoundError())

    const comment = QuestionComment.create({
      content,
      questionId: new UniqueEntityID(questionId),
      authorId: new UniqueEntityID(authorId)
    })

    await this.questionCommentsRepository.create(comment)

    return right({ comment })
  }
}

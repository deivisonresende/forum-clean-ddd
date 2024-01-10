import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'
import { AnswersRepository } from '../repositories/answers-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface ICommentOnAnswerUseCaseParams {
  authorId: string
  answerId: string
  content: string
}

interface ICommentOnAnswerUseCaseResponse {
  comment: AnswerComment
}


export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerCommentsRepository: AnswerCommentsRepository
  ) { }

  async execute({ authorId, answerId, content }: ICommentOnAnswerUseCaseParams): Promise<ICommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)
    if (!answer) throw new Error('Resposta não encontrada.')

    const comment = AnswerComment.create({
      content,
      answerId: new UniqueEntityID(answerId),
      authorId: new UniqueEntityID(authorId)
    })

    await this.answerCommentsRepository.create(comment)

    return { comment }
  }
}

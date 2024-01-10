import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface IDeleteAnswerCommentUseCaseParams {
  authorId: string
  answerCommentId: string
}

export class DeleteAnswerCommentUseCase {
  constructor(
    private answerCommentsRepository: AnswerCommentsRepository
  ) { }

  async execute({ authorId, answerCommentId }: IDeleteAnswerCommentUseCaseParams): Promise<void> {
    const comment = await this.answerCommentsRepository.findById(answerCommentId)
    if (!comment) throw new Error('Comentário não encontrado.')

    if(comment.authorId.toString() !== authorId) throw new Error('Não é permitido apagar comentários de outro usuário.')

    return await this.answerCommentsRepository.deleteOne(answerCommentId)
  }
}

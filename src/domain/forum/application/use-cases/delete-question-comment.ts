import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface IDeleteQuestionCommentUseCaseParams {
  authorId: string
  questionCommentId: string
}

export class DeleteQuestionCommentUseCase {
  constructor(
    private questionCommentsRepository: QuestionCommentsRepository
  ) { }

  async execute({ authorId, questionCommentId }: IDeleteQuestionCommentUseCaseParams): Promise<void> {
    const comment = await this.questionCommentsRepository.findById(questionCommentId)
    if (!comment) throw new Error('Comentário não encontrado.')

    if(comment.authorId.toString() !== authorId) throw new Error('Não é permitido apagar comentários de outro usuário.')

    return await this.questionCommentsRepository.deleteOne(questionCommentId)
  }
}

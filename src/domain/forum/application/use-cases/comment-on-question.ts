import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface ICommentOnQuestionUseCaseParams {
  authorId: string
  questionId: string
  content: string
}

interface ICommentOnQuestionUseCaseResponse {
  comment: QuestionComment
}


export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentsRepository: QuestionCommentsRepository
  ) { }

  async execute({ authorId, questionId, content }: ICommentOnQuestionUseCaseParams): Promise<ICommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)
    if (!question) throw new Error('Pergunta não encontrada.')

    const comment = QuestionComment.create({
      content,
      questionId: new UniqueEntityID(questionId),
      authorId: new UniqueEntityID(authorId)
    })

    await this.questionCommentsRepository.create(comment)

    return { comment }
  }
}

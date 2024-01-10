import { AnswerComment } from "../../enterprise/entities/answer-comment"

export interface AnswerCommentsRepository {
  create(answerComment: AnswerComment): Promise<AnswerComment>
  findById(id: string): Promise<AnswerComment | undefined>
  deleteOne(id: string): Promise<void>
}

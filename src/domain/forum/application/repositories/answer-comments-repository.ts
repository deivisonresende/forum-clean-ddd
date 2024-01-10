import { AnswerComment } from "../../enterprise/entities/answer-comment"
import { IPaginationParams } from "@/core/repositories/pagination-params"

export interface AnswerCommentsRepository {
  create(answerComment: AnswerComment): Promise<AnswerComment>
  findById(id: string): Promise<AnswerComment | undefined>
  findManyByAnswerId(answerId: string, cursor: IPaginationParams): Promise<AnswerComment[]>
  deleteOne(id: string): Promise<void>
}

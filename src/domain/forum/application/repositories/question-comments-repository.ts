import { IPaginationParams } from "@/core/repositories/pagination-params"
import { QuestionComment } from "../../enterprise/entities/question-comment"

export interface QuestionCommentsRepository {
  create(questionComment: QuestionComment): Promise<QuestionComment>
  findById(id: string): Promise<QuestionComment | undefined>
  findManyByQuestionId(questionId: string, cursor: IPaginationParams): Promise<QuestionComment[]>
  deleteOne(id: string): Promise<void>
}

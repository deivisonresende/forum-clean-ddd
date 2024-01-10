import { QuestionComment } from "../../enterprise/entities/question-comment"

export interface QuestionCommentsRepository {
  create(questionComment: QuestionComment): Promise<QuestionComment>
  findById(id: string): Promise<QuestionComment | undefined>
  deleteOne(id: string): Promise<void>
}

import { IPaginationParams } from "@/core/repositories/pagination-params"
import { Question } from "../../enterprise/entities/question"

export interface QuestionsRepository {
  create(question: Question): Promise<Question>
  findBySlug(slug: string): Promise<Question | undefined>
  findById(questionId: string): Promise<Question | undefined>
  findManyRecent(params: IPaginationParams): Promise<Question[]>
  deleteOne(questionId: string): Promise<void>
  updateOne(questionId: string, body: Question): Promise<void>
}

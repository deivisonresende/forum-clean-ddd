import { Question } from "../../enterprise/entities/question"

export interface QuestionsRepository {
  create(question: Question): Promise<Question>
  findBySlug(slug: string): Promise<Question | undefined>
  findById(questionId: string): Promise<Question | undefined>
  deleteOne(questionId: string): Promise<void>
}

import { Answer } from '../../enterprise/entities/answer'
import { IPaginationParams } from '@/core/repositories/pagination-params'

export interface AnswersRepository {
  create(answer: Answer): Promise<Answer>
  findById(answerId: string): Promise<Answer | undefined>
  findManyByQuestionId(questionId: string, cursor: IPaginationParams): Promise<Answer[]>
  deleteOne(answerId: string): Promise<void>
  updateOne(answerId: string, body: Answer): Promise<void>
}

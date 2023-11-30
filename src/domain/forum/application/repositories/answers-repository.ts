import { Answer } from '../../enterprise/entities/answer'

export interface AnswersRepository {
  create(answer: Answer): Promise<Answer>
  findById(answerId: string): Promise<Answer | undefined>
  deleteOne(answerId: string): Promise<void>
  updateOne(answerId: string, body: Answer): Promise<void>
}

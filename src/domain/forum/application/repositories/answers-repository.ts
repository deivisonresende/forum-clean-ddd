import { Answer } from '../../enterprise/entities/answer'

export interface AnswersRepository {
  create(answer: Answer): Promise<Answer>
  findById(questionId: string): Promise<Answer | undefined>
  deleteOne(questionId: string): Promise<void>
}

import { Answer } from '../entities/answer'

export interface AnswersRepository {
  create(answer: Answer): Promise<Answer>
}

import { Answer } from "@/domain/forum/enterprise/entities/answer"
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository"
import { IPaginationParams } from "@/core/repositories/pagination-params"
import { Repository } from "./repository"

export class InMemoryAnswersRepository extends Repository<Answer> implements AnswersRepository {
  async findManyByQuestionId(questionId: string, { page, amountItems }: IPaginationParams): Promise<Answer[]> {
    const answers = this.items.filter(item => item.questionId.toString() === questionId)

    return this.toPaginated(answers, page, amountItems)
  }
}
import { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment"
import { AnswerCommentsRepository } from "@/domain/forum/application/repositories/answer-comments-repository"
import { IPaginationParams } from "@/core/repositories/pagination-params"
import { Repository } from "./repository"

export class InMemoryAnswerCommentsRepository extends Repository<AnswerComment> implements AnswerCommentsRepository {
  async findManyByAnswerId(answerId: string, { page, amountItems }: IPaginationParams): Promise<AnswerComment[]> {
    const comments = this.items.filter(item => item.answerId.toString() === answerId)

    return this.toPaginated(comments, page, amountItems)
  }
}

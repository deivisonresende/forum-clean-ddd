import { IPaginationParams } from "@/core/repositories/pagination-params"
import { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment"
import { QuestionCommentsRepository } from "@/domain/forum/application/repositories/question-comments-repository"
import { Repository } from "./repository"

export class InMemoryQuestionCommentsRepository extends Repository<QuestionComment> implements QuestionCommentsRepository {
  async findManyByQuestionId(questionId: string, { page, amountItems }: IPaginationParams): Promise<QuestionComment[]> {
    const comments = this.items.filter(item => item.questionId.toString() === questionId)

    return this.toPaginated(comments, page, amountItems)
  }
}

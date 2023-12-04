import { IPaginationParams } from "@/core/repositories/pagination-params"
import { Question } from "@/domain/forum/enterprise/entities/question"
import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository"
import { Repository } from "./repository"

export class InMemoryQuestionsRepository extends Repository<Question> implements QuestionsRepository {
  async findBySlug(slug: string): Promise<Question | undefined> {
    return this.items.find(q => q.slug.value === slug)
  }

  async findManyRecent({ page, amountItems = 20 }: IPaginationParams): Promise<Question[]> {
    const sortedQuestions = this.sortByCreatedAt(this.items, 'desc')

    const selectStart = (page - 1) * amountItems
    const selectEnd = page * amountItems

    return sortedQuestions.slice(selectStart, selectEnd)
  }
}

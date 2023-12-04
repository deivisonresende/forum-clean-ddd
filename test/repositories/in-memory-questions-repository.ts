import { IPaginationParams } from "@/core/repositories/pagination-params"
import { Question } from "@/domain/forum/enterprise/entities/question"
import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository"
import { Repository } from "./repository"

export class InMemoryQuestionsRepository extends Repository<Question> implements QuestionsRepository {
  async findBySlug(slug: string): Promise<Question | undefined> {
    return this.items.find(q => q.slug.value === slug)
  }

  async findManyRecent({ page }: IPaginationParams): Promise<Question[]> {
    const sortedQuestions = this.sortByCreatedAt(this.items, 'desc')

    return sortedQuestions.slice((page - 1) * 20, page * 20)
  }
}
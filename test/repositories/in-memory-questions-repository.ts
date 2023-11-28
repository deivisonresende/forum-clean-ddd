import { Question } from "@/domain/forum/enterprise/entities/question";
import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository";

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public questions: Question[] = []

  async create(question: Question): Promise<Question> {
    this.questions.push(question)

    return question
  }

  async findBySlug(slug: string): Promise<Question | undefined> {
    return this.questions.find(q => q.slug.value === slug)
  }
}
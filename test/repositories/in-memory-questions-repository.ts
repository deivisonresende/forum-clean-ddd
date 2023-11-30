import { Question } from "@/domain/forum/enterprise/entities/question"
import { QuestionsRepository } from "@/domain/forum/application/repositories/questions-repository"

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public questions: Question[] = []

  async create(question: Question): Promise<Question> {
    this.questions.push(question)

    return question
  }

  async findBySlug(slug: string): Promise<Question | undefined> {
    return this.questions.find(q => q.slug.value === slug)
  }

  async findById(questionId: string): Promise<Question | undefined> {
    return this.questions.find(q => q.id.toString() === questionId)
  }

  async deleteOne(questionId: string): Promise<void> {
    const indexOfTarget = this.questions.findIndex(q => q.id.toString() === questionId)
    const amountToDelete = 1

    if(indexOfTarget !== -1) this.questions.splice(indexOfTarget, amountToDelete)
  }

  async updateOne(questionId: string, body: Question): Promise<void> {
    const indexOfTarget = this.questions.findIndex(q => q.id.toString() === questionId)

    if(indexOfTarget !== -1) this.questions[indexOfTarget] = body
  }
}
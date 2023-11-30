import { Answer } from "@/domain/forum/enterprise/entities/answer"
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository"

export class InMemoryAnswersRepository implements AnswersRepository {
  public answers: Answer[] = []

  async create(answer: Answer): Promise<Answer> {
    this.answers.push(answer)

    return answer
  }

  async findById(answerId: string): Promise<Answer | undefined> {
    return this.answers.find(q => q.id.toString() === answerId)
  }

  async deleteOne(answerId: string): Promise<void> {
    const indexOfTarget = this.answers.findIndex(q => q.id.toString() === answerId)
    const amountToDelete = 1

    if (indexOfTarget !== -1) this.answers.splice(indexOfTarget, amountToDelete)
  }

  async updateOne(answerId: string, body: Answer): Promise<void> {
    const indexOfTarget = this.answers.findIndex(q => q.id.toString() === answerId)

    if(indexOfTarget !== -1) this.answers[indexOfTarget] = body
  }
}
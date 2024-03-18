import { QuestionAttachmentsRepository } from "@/domain/forum/application/repositories/question-attachments-repository"
import { Repository } from "./repository"
import { QuestionAttachment } from "@/domain/forum/enterprise/entities/question-attachment"

export class InMemoryQuestionAttachmentsRepository
  extends Repository<QuestionAttachment>
  implements QuestionAttachmentsRepository {
  async deleteManyByQuestionId(questionId: string): Promise<void> {
    this.items = this.items.filter(item => item.questionId.toString() !== questionId)
  }

  async findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]> {
    return this.items.filter(item => item.questionId.toString() === questionId)
  }
}

import { AnswerAttachmentsRepository } from "@/domain/forum/application/repositories/answer-attachments-repository"
import { Repository } from "./repository"
import { AnswerAttachment } from "@/domain/forum/enterprise/entities/answer-attachment"

export class InMemoryAnswerAttachmentsRepository
  extends Repository<AnswerAttachment>
  implements AnswerAttachmentsRepository {
  async deleteManyByAnswerId(answerId: string): Promise<void> {
    this.items = this.items.filter(item => item.answerId.toString() !== answerId)
  }

  async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    return this.items.filter(item => item.answerId.toString() === answerId)
  }
}

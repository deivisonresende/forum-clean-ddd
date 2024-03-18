import { AnswerAttachment, AnswerAttachmentProps } from "@/domain/forum/enterprise/entities/answer-attachment"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"

export function makeAnswerAttachment(keysToOverride: Partial<AnswerAttachmentProps> = {}, id?: UniqueEntityID) {
  return AnswerAttachment.create(
    {
      answerId: new UniqueEntityID(),
      attachmentId: new UniqueEntityID(),
      ...keysToOverride
    },
    id
  )
}
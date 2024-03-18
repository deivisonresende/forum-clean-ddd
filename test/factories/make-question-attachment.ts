import { QuestionAttachmentProps, QuestionAttachment } from "@/domain/forum/enterprise/entities/question-attachment"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"


export function makeQuestionAttachment(keysToOverride: Partial<QuestionAttachmentProps> = {}, id?: UniqueEntityID) {
  return QuestionAttachment.create(
    {
      questionId: new UniqueEntityID(),
      attachmentId: new UniqueEntityID(),
      ...keysToOverride
    },
    id
  )
}
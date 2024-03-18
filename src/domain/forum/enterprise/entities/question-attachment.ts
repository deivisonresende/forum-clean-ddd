import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

export interface QuestionAttachmentProps {
  questionId: UniqueEntityID
  attachmentId: UniqueEntityID
  createdAt: Date
}

export class QuestionAttachment extends Entity<QuestionAttachmentProps>{
  get questionId() {
    return this.props.questionId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(props: Optional<QuestionAttachmentProps, 'createdAt'>, id?: UniqueEntityID) {
    return new QuestionAttachment({ ...props, createdAt: new Date() }, id)
  }
}
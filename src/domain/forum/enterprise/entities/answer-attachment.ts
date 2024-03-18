import { Entity } from "@/core/entities/entity";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Optional } from "@/core/types/optional";

export interface AnswerAttachmentProps {
  answerId: UniqueEntityID
  attachmentId: UniqueEntityID
  createdAt: Date
}

export class AnswerAttachment extends Entity<AnswerAttachmentProps>{
  get answerId() {
    return this.props.answerId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(props: Optional<AnswerAttachmentProps, 'createdAt'>, id?: UniqueEntityID) {
    return new AnswerAttachment({ ...props, createdAt: new Date() }, id)
  }
}
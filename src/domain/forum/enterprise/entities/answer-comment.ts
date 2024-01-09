import { Comment, ICommentProps } from './comment'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface IAnswerCommentProps extends ICommentProps {
  answerId: UniqueEntityID
}

export class AnswerComment extends Comment<IAnswerCommentProps> {

  get answerId() {
    return this.props.answerId
  }

  static create(props: IAnswerCommentProps, id?: UniqueEntityID) {
    return new AnswerComment({ ...props, createdAt: new Date() }, id)
  }
}

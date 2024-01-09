import { Entity } from '@/core/entities/entity'
import { ICommentProps } from './comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface IQuestionCommentProps extends ICommentProps {
  questionId: UniqueEntityID
}

export class QuestionComment extends Entity<IQuestionCommentProps> {
  get questionId(){
    return this.props.questionId
  }

  static create(props: IQuestionCommentProps, id?: UniqueEntityID) {
    return new QuestionComment({ ...props, createdAt: new Date() }, id)
  }
}

import { IQuestionCommentProps, QuestionComment } from "@/domain/forum/enterprise/entities/question-comment"

import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { faker } from '@faker-js/faker'

export function makeQuestionComment(keysToOverride: Partial<IQuestionCommentProps> = {}, id?: UniqueEntityID) {
  return QuestionComment.create(
    {
      questionId: new UniqueEntityID(),
      content: faker.lorem.text(),
      authorId: new UniqueEntityID(),
      ...keysToOverride
    },
    id
  )
}
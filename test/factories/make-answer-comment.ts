import { AnswerComment, IAnswerCommentProps } from "@/domain/forum/enterprise/entities/answer-comment"

import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { faker } from '@faker-js/faker'

export function makeAnswerComment(keysToOverride: Partial<IAnswerCommentProps> = {}, id?: UniqueEntityID) {
  return AnswerComment.create(
    {
      answerId: new UniqueEntityID(),
      content: faker.lorem.text(),
      authorId: new UniqueEntityID(),
      ...keysToOverride
    },
    id
  )
}
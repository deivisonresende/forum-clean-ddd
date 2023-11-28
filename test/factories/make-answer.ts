import { Answer, IAnswerProps } from "@/domain/forum/enterprise/entities/answer"

import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { faker } from '@faker-js/faker'

export function makeAnswer(keysToOverride: Partial<IAnswerProps> = {}, id?: UniqueEntityID) {
  return Answer.create(
    {
      questionId: new UniqueEntityID(),
      authorId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...keysToOverride
    },
    id
  )
}
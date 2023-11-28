import { IQuestionProps, Question } from "@/domain/forum/enterprise/entities/question"

import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { faker } from '@faker-js/faker'

export function makeQuestion(keysToOverride: Partial<IQuestionProps> = {}, id?: UniqueEntityID) {
  return Question.create(
    {
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      authorId: new UniqueEntityID(),
      ...keysToOverride
    },
    id
  )
}
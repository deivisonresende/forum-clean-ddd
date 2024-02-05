import { Either, right } from '@/core/either'

import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface ICreateQuestionUseCaseParams {
  authorId: string
  title: string
  content: string
}

type CreateQuestionUseCaseResponse = Either<
  null,
  { question: Question }
>


export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) { }

  async execute({ authorId, title, content }: ICreateQuestionUseCaseParams): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({ title, content, authorId: new UniqueEntityID(authorId) })

    await this.questionsRepository.create(question)

    return right({ question })
  }
}

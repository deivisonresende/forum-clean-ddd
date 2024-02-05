import { Either, left, right } from '@/core/either'

import { NotAllowedError } from '../errors/not-allowed-error copy'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface IEditQuestionUseCaseParams {
  authorId: string
  questionId: string
  title: string
  content: string
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { question: Question }
>

export class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) { }

  async execute(params: IEditQuestionUseCaseParams): Promise<EditQuestionUseCaseResponse> {
    const { authorId, questionId, title, content } = params

    const questionFound = await this.questionsRepository.findById(questionId)
    if (!questionFound) return left(new ResourceNotFoundError())

    if (authorId !== questionFound.authorId.toString()) return left(new NotAllowedError())

    questionFound.title = title
    questionFound.content = content

    await this.questionsRepository.updateOne(questionId, questionFound)

    return right({ question: questionFound })
  }
}

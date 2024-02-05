import { Either, left, right } from '@/core/either'

import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { NotAllowedError } from '../errors/not-allowed-error copy'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface IEditAnswerUseCaseParams {
  authorId: string
  answerId: string
  content: string
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { answer: Answer }
>

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) { }

  async execute(params: IEditAnswerUseCaseParams): Promise<EditAnswerUseCaseResponse> {
    const { authorId, answerId, content } = params

    const answerFound = await this.answersRepository.findById(answerId)
    if (!answerFound) return left(new ResourceNotFoundError())

    if (authorId !== answerFound.authorId.toString()) return left(new NotAllowedError())

    answerFound.content = content

    await this.answersRepository.updateOne(answerId, answerFound)

    return right({ answer: answerFound })
  }
}

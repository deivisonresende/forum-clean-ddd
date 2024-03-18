import { Either, left, right } from '@/core/either';

import { AnswersRepository } from '../repositories/answers-repository'
import { NotAllowedError } from '../errors/not-allowed-error copy';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { AnswerAttachmentsRepository } from '../repositories/answer-attachments-repository';

interface IDeleteAnswerUseCaseParams {
  authorId: string;
  answerId: string
}

type DeleteAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  NonNullable<object>
>

export class DeleteAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerAttachmentsRepository : AnswerAttachmentsRepository
    ) { }

  async execute({ authorId, answerId }: IDeleteAnswerUseCaseParams): Promise<DeleteAnswerUseCaseResponse> {
    const answerFound = await this.answersRepository.findById(answerId)
    if (!answerFound) return left(new ResourceNotFoundError())

    if (authorId !== answerFound.authorId.toString()) return left(new NotAllowedError())

    await this.answersRepository.deleteOne(answerId)
    await this.answerAttachmentsRepository.deleteManyByAnswerId(answerId)

    return right({})
  }
}

import { Either, left, right } from '@/core/either';

import { AnswersRepository } from '../repositories/answers-repository'
import { NotAllowedError } from '../errors/not-allowed-error copy';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface IDeleteAnswerUseCaseParams {
  authorId: string;
  answerId: string
}

type DeleteAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  NonNullable<object>
>

export class DeleteAnswerUseCase {
  constructor(private questionsRepository: AnswersRepository) { }

  async execute({ authorId, answerId }: IDeleteAnswerUseCaseParams): Promise<DeleteAnswerUseCaseResponse> {
    const questionFound = await this.questionsRepository.findById(answerId)
    if (!questionFound) return left(new ResourceNotFoundError())

    if (authorId !== questionFound.authorId.toString()) return left(new NotAllowedError())

    await this.questionsRepository.deleteOne(answerId)

    return right({})
  }
}

import { Either, left, right } from '@/core/either';

import { NotAllowedError } from '../errors/not-allowed-error copy';
import { QuestionsRepository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { QuestionAttachmentsRepository } from '../repositories/question-attachments-repository';

interface IDeleteQuestionUseCaseParams {
  authorId: string;
  questionId: string
}

type DeleteQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  NonNullable<object>
>

export class DeleteQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionAttachmentsRepository: QuestionAttachmentsRepository
    ) { }

  async execute({ authorId, questionId }: IDeleteQuestionUseCaseParams): Promise<DeleteQuestionUseCaseResponse> {
    const questionFound = await this.questionsRepository.findById(questionId)
    if (!questionFound) return left(new ResourceNotFoundError())

    if (authorId !== questionFound.authorId.toString()) return left(new NotAllowedError())

    await this.questionsRepository.deleteOne(questionId)
    await this.questionAttachmentsRepository.deleteManyByQuestionId(questionId)

    return right({})
  }
}

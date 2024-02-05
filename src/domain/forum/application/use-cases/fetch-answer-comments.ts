import { Either, right } from "@/core/either"

import { AnswerComment } from "../../enterprise/entities/answer-comment"
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository"
import { IPaginationParams } from "@/core/repositories/pagination-params"

interface IFetchAnswerCommentsUseCaseParams {
  answerId: string
  cursor: IPaginationParams
}

type FetchAnswerCommentsUseCaseResponse = Either<
  null,
  { comments: AnswerComment[] }
>

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) { }

  async execute(params: IFetchAnswerCommentsUseCaseParams): Promise<FetchAnswerCommentsUseCaseResponse> {
    const { answerId, cursor } = params
    const comments = await this.answerCommentsRepository.findManyByAnswerId(answerId, cursor)

    return right({ comments })
  }
}

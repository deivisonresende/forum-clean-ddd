import { AnswerComment } from "../../enterprise/entities/answer-comment"
import { AnswerCommentsRepository } from "../repositories/answer-comments-repository"
import { IPaginationParams } from "@/core/repositories/pagination-params"

interface IFetchAnswerCommentsUseCaseParams {
  answerId: string
  cursor: IPaginationParams
}

interface IFetchAnswerCommentsUseCaseResponse {
  comments: AnswerComment[]
}

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) { }

  async execute(params: IFetchAnswerCommentsUseCaseParams): Promise<IFetchAnswerCommentsUseCaseResponse> {
    const { answerId, cursor } = params
    const comments = await this.answerCommentsRepository.findManyByAnswerId(answerId, cursor)

    return { comments }
  }
}

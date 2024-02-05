import { Either, right } from "@/core/either"

import { IPaginationParams } from "@/core/repositories/pagination-params"
import { QuestionComment } from "../../enterprise/entities/question-comment"
import { QuestionCommentsRepository } from "../repositories/question-comments-repository"

interface IFetchQuestionCommentsUseCaseParams {
  questionId: string
  cursor: IPaginationParams
}

type FetchQuestionCommentsUseCaseResponse = Either<
  null,
  { comments: QuestionComment[] }
>

export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) { }

  async execute(params: IFetchQuestionCommentsUseCaseParams): Promise<FetchQuestionCommentsUseCaseResponse> {
    const { questionId, cursor } = params
    const comments = await this.questionCommentsRepository.findManyByQuestionId(questionId, cursor)

    return right({ comments })
  }
}

import { Either, right } from "@/core/either"

import { Answer } from "../../enterprise/entities/answer"
import { AnswersRepository } from "../repositories/answers-repository"
import { IPaginationParams } from "@/core/repositories/pagination-params"

interface IFetchQuestionAnswersUseCaseParams {
  questionId: string
  cursor: IPaginationParams
}

type FetchQuestionAnswersUseCaseResponse = Either<
  null,
  { answers: Answer[] }
>

export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) { }

  async execute(params: IFetchQuestionAnswersUseCaseParams): Promise<FetchQuestionAnswersUseCaseResponse> {
    const { questionId, cursor } = params
    const answers = await this.answersRepository.findManyByQuestionId(questionId, cursor)

    return right({ answers })
  }
}

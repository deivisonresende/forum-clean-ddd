import { Either, right } from "@/core/either";

import { IPaginationParams } from "@/core/repositories/pagination-params";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";

interface IFetchRecentQuestionUseCaseParams {
  cursor: IPaginationParams
}

type FetchRecentQuestionUseCaseResponse = Either<
  null,
  { questions: Question[] }
>

export class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) { }

  async execute({ cursor }: IFetchRecentQuestionUseCaseParams): Promise<FetchRecentQuestionUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({ ...cursor })

    return right({ questions })
  }

}
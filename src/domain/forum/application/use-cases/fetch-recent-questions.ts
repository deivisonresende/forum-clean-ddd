import { IPaginationParams } from "@/core/repositories/pagination-params";
import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";

interface IFetchRecentQuestionUseCaseParams {
  cursor: IPaginationParams
}

interface IFetchRecentQuestionUseCaseResponse {
  questions: Question[]
}

export class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) { }

  async execute({ cursor }: IFetchRecentQuestionUseCaseParams): Promise<IFetchRecentQuestionUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecent({ ...cursor })

    return { questions }
  }

}
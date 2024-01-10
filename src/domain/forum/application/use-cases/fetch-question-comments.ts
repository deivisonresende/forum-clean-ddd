import { IPaginationParams } from "@/core/repositories/pagination-params"
import { QuestionComment } from "../../enterprise/entities/question-comment"
import { QuestionCommentsRepository } from "../repositories/question-comments-repository"

interface IFetchQuestionCommentsUseCaseParams {
  questionId: string
  cursor: IPaginationParams
}

interface IFetchQuestionCommentsUseCaseResponse {
  comments: QuestionComment[]
}

export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) { }

  async execute(params: IFetchQuestionCommentsUseCaseParams): Promise<IFetchQuestionCommentsUseCaseResponse> {
    const { questionId, cursor } = params
    const comments = await this.questionCommentsRepository.findManyByQuestionId(questionId, cursor)

    return { comments }
  }
}

import { Either, left, right } from "@/core/either";

import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface IGetQuestionBySlugUseCaseParams {
  slug: string
}

type GetQuestionBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  { question: Question }
>

export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) { }

  async execute({ slug }: IGetQuestionBySlugUseCaseParams): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) return left(new ResourceNotFoundError())

    return right({ question })
  }
}
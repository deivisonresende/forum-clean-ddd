import { Question } from "../../enterprise/entities/question";
import { QuestionsRepository } from "../repositories/questions-repository";

interface IGetQuestionBySlugUseCaseParams {
  slug: string
}

interface IGetQuestionBySlugUseCaseResponse {
  question: Question
}

export class GetQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) { }

  async execute({ slug }: IGetQuestionBySlugUseCaseParams): Promise<IGetQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) throw new Error('Pergunta não encontrada.')

    return { question }
  }
}
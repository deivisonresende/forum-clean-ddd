import { Either, left, right } from '@/core/either'

import { AnswersRepository } from '../repositories/answers-repository'
import { NotAllowedError } from '../errors/not-allowed-error copy'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface IChooseQuestionBestAnswerParams {
  authorId: string
  answerId: string
}

type ChooseQuestionBestAnswerResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { question: Question }
>

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private questionsRepository: QuestionsRepository
  ) { }

  async execute({ authorId, answerId }: IChooseQuestionBestAnswerParams): Promise<ChooseQuestionBestAnswerResponse> {
    const answerFound = await this.answersRepository.findById(answerId)
    if (!answerFound) return left(new ResourceNotFoundError())

    const questionFound = await this.questionsRepository.findById(answerFound.questionId.toString())
    if (!questionFound) return left(new ResourceNotFoundError())

    if (authorId !== questionFound.authorId.toString()) return left(new NotAllowedError())

    questionFound.bestAnswerId = answerFound.id

    await this.questionsRepository.updateOne(questionFound.id.toString(), questionFound)

    return right({ question: questionFound })
  }
}

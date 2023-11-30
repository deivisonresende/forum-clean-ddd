import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface IAnswerQuestionUseCaseParams {
  authorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private questionsRepository: QuestionsRepository
  ) { }

  async execute({ content, questionId, authorId }: IAnswerQuestionUseCaseParams) {
    const questionFound = await this.questionsRepository.findById(questionId)
    if (!questionFound) throw new Error('Pergunta não encontrada.')

    const answer = Answer.create({
      content,
      questionId: new UniqueEntityID(questionId),
      authorId: new UniqueEntityID(authorId),
    })

    await this.answersRepository.create(answer)

    return { answer }
  }
}

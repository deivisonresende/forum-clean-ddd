import { AnswersRepository } from '../repositories/answers-repository'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface IChooseQuestionBestAnswerParams {
  authorId: string
  answerId: string
}

interface IChooseQuestionBestAnswerResponse {
  question: Question
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private questionsRepository: QuestionsRepository
  ) { }

  async execute({ authorId, answerId }: IChooseQuestionBestAnswerParams): Promise<IChooseQuestionBestAnswerResponse> {
    const answerFound = await this.answersRepository.findById(answerId)
    if (!answerFound) throw new Error('Resposta não encontrada.')

    const questionFound = await this.questionsRepository.findById(answerFound.questionId.toString())
    if (!questionFound) throw new Error('Pergunta não encontrada.')

    if (authorId !== questionFound.authorId.toString())
      throw new Error('Não é permitido selecionar melhor resposta para perguntas de outros autores.')

    questionFound.bestAnswerId = answerFound.id

    await this.questionsRepository.updateOne(questionFound.id.toString(), questionFound)

    return { question: questionFound }
  }
}

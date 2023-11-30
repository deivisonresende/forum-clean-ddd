import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface IEditAnswerUseCaseParams {
  authorId: string
  answerId: string
  content: string
}

interface IEditAnswerUseCaseResponse {
  answer: Answer
}

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) { }

  async execute(params: IEditAnswerUseCaseParams): Promise<IEditAnswerUseCaseResponse> {
    const { authorId, answerId, content } = params

    const answerFound = await this.answersRepository.findById(answerId)
    if (!answerFound) throw new Error('Resposta não encontrada.')

    if (authorId !== answerFound.authorId.toString()) throw new Error('Não é permitido editar respostas de outros autores.')

    answerFound.content = content

    await this.answersRepository.updateOne(answerId, answerFound)

    return { answer: answerFound }
  }
}

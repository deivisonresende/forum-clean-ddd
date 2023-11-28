import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface IEditQuestionUseCaseParams {
  authorId: string
  questionId: string
  title: string
  content: string
}

interface IEditQuestionUseCaseResponse {
  question: Question
}

export class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) { }

  async execute(params: IEditQuestionUseCaseParams): Promise<IEditQuestionUseCaseResponse> {
    const { authorId, questionId, title, content } = params

    const questionFound = await this.questionsRepository.findById(questionId)
    if (!questionFound) throw new Error('Pergunta não encontrada.')

    if (authorId !== questionFound.authorId.toString())
      throw new Error('Não é permitido editar perguntas de outros autores.')

    questionFound.title = title
    questionFound.content = content

    await this.questionsRepository.updateOne(questionId, questionFound)

    return { question: questionFound}
  }
}

import { QuestionsRepository } from '../repositories/questions-repository'

interface IDeleteQuestionUseCaseParams {
  authorId: string;
  questionId: string
}

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) { }

  async execute({ authorId, questionId }: IDeleteQuestionUseCaseParams): Promise<void> {
    const questionFound = await this.questionsRepository.findById(questionId)

    if (!questionFound) throw new Error('Pergunta não encontrada.')

    if (authorId !== questionFound.authorId.toString())
      throw new Error('Não é permitido apagar perguntas de outros autores.')

    await this.questionsRepository.deleteOne(questionId)
  }
}

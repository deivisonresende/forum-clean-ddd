import { AnswersRepository } from '../repositories/answers-repository'

interface IDeleteAnswerUseCaseParams {
  authorId: string;
  answerId: string
}

export class DeleteAnswerUseCase {
  constructor(private questionsRepository: AnswersRepository) { }

  async execute({ authorId, answerId }: IDeleteAnswerUseCaseParams): Promise<void> {
    const questionFound = await this.questionsRepository.findById(answerId)

    if (!questionFound) throw new Error('Resposta não encontrada.')

    if (authorId !== questionFound.authorId.toString())
      throw new Error('Não é permitido apagar respostas de outros autores.')

    await this.questionsRepository.deleteOne(answerId)
  }
}

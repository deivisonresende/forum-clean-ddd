import { Either, left, right } from '@/core/either'

import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list'

interface IAnswerQuestionUseCaseParams {
  authorId: string
  questionId: string
  content: string
  attachmentIds: string[]
}

type AnswerQuestionUseCaseResponse = Either<ResourceNotFoundError, { answer: Answer }>

export class AnswerQuestionUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private questionsRepository: QuestionsRepository
  ) { }

  async execute({ content, questionId, authorId, attachmentIds }: IAnswerQuestionUseCaseParams): Promise<AnswerQuestionUseCaseResponse> {
    const questionFound = await this.questionsRepository.findById(questionId)
    if (!questionFound) return left(new ResourceNotFoundError())

    const answer = Answer.create({
      content,
      questionId: new UniqueEntityID(questionId),
      authorId: new UniqueEntityID(authorId)
    })

    const answerAttachments = attachmentIds.map(id => AnswerAttachment.create({
      attachmentId: new UniqueEntityID(id),
      answerId: answer.id
    }))

    answer.attachments = new AnswerAttachmentList(answerAttachments)

    await this.answersRepository.create(answer)

    return right({ answer })
  }
}

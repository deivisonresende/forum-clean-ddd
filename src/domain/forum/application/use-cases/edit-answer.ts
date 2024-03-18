import { Either, left, right } from '@/core/either'

import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'
import { NotAllowedError } from '../errors/not-allowed-error copy'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { AnswerAttachmentsRepository } from '../repositories/answer-attachments-repository'
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list'
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface IEditAnswerUseCaseParams {
  authorId: string
  answerId: string
  content: string
  attachmentIds: string[]
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { answer: Answer }
>

export class EditAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerAttachmentsRepository: AnswerAttachmentsRepository
  ) { }

  async execute(params: IEditAnswerUseCaseParams): Promise<EditAnswerUseCaseResponse> {
    const { authorId, answerId, content, attachmentIds } = params

    const answerFound = await this.answersRepository.findById(answerId)
    if (!answerFound) return left(new ResourceNotFoundError())

    if (authorId !== answerFound.authorId.toString()) return left(new NotAllowedError())

    answerFound.content = content

    const currentAttachments = await this.answerAttachmentsRepository.findManyByAnswerId(answerId)

    const questionAttachmentList = new AnswerAttachmentList(currentAttachments)

    const inputAttachments = attachmentIds.map(id => AnswerAttachment.create({
      attachmentId: new UniqueEntityID(id),
      answerId: answerFound.id
    }))

    questionAttachmentList.update(inputAttachments)

    answerFound.attachments = questionAttachmentList

    await this.answersRepository.updateOne(answerId, answerFound)

    return right({ answer: answerFound })
  }
}

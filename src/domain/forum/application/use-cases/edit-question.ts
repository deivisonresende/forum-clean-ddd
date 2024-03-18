import { Either, left, right } from '@/core/either'

import { NotAllowedError } from '../errors/not-allowed-error copy'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { QuestionAttachmentsRepository } from '../repositories/question-attachments-repository'
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment'

interface IEditQuestionUseCaseParams {
  authorId: string
  questionId: string
  title: string
  content: string
  attachmentIds: string[]
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { question: Question }
>

export class EditQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionAttachmentsRepository: QuestionAttachmentsRepository
  ) { }

  async execute(params: IEditQuestionUseCaseParams): Promise<EditQuestionUseCaseResponse> {
    const { authorId, questionId, title, content, attachmentIds } = params

    const questionFound = await this.questionsRepository.findById(questionId)
    if (!questionFound) return left(new ResourceNotFoundError())

    if (authorId !== questionFound.authorId.toString()) return left(new NotAllowedError())

    questionFound.title = title
    questionFound.content = content

    const currentAttachments = await this.questionAttachmentsRepository.findManyByQuestionId(questionId)

    const questionAttachmentList = new QuestionAttachmentList(currentAttachments)

    const inputAttachments = attachmentIds.map(id => QuestionAttachment.create({
      attachmentId: new UniqueEntityID(id),
      questionId: questionFound.id
    }))

    questionAttachmentList.update(inputAttachments)

    questionFound.attachments = questionAttachmentList

    await this.questionsRepository.updateOne(questionId, questionFound)

    return right({ question: questionFound })
  }
}

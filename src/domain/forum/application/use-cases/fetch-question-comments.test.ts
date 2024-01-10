import { FetchQuestionCommentsUseCase } from './fetch-question-comments'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { beforeEach } from 'vitest'
import { makeQuestion } from 'test/factories/make-question'
import { makeQuestionComment } from 'test/factories/make-question-comment'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository

let SUT: FetchQuestionCommentsUseCase
let questionId: string

describe('Fetch question comment', () => {
  beforeEach(async () => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionCommentsRepository = new InMemoryQuestionCommentsRepository()


    const targetQuestion = await inMemoryQuestionsRepository.create(makeQuestion())
    const anotherQuestion = await inMemoryQuestionsRepository.create(makeQuestion())

    questionId = targetQuestion.id.toString()

    await Promise.all([
      inMemoryQuestionCommentsRepository.create(makeQuestionComment({ questionId: targetQuestion.id })),
      inMemoryQuestionCommentsRepository.create(makeQuestionComment({ questionId: targetQuestion.id })),
      inMemoryQuestionCommentsRepository.create(makeQuestionComment({ questionId: targetQuestion.id })),
      inMemoryQuestionCommentsRepository.create(makeQuestionComment({ questionId: anotherQuestion.id })),
    ])

    SUT = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository)
  })


  it('should be able to fetch the comments of a question', async () => {
    const { comments } = await SUT.execute({ questionId, cursor: { page: 1 } })

    expect(comments).toHaveLength(3)
  })


  it('should be able to fetch for a number of comments of a question', async () => {
    const { comments } = await SUT.execute({ questionId, cursor: { page: 1, amountItems: 2 } })

    expect(comments).toHaveLength(2)
  })

  it('should return a empty list when there are no comments on the selected page', async () => {
    const { comments } = await SUT.execute({ questionId, cursor: { page: 2 } })

    expect(comments).toHaveLength(0)
  })
})

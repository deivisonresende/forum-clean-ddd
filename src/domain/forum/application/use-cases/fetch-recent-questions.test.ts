import { beforeEach, vi } from 'vitest'

import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let SUT: FetchRecentQuestionsUseCase

describe('Get question by slug use case', () => {
  beforeEach(async () => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    SUT = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository)

    vi.setSystemTime(new Date(2023, 0, 20))
    await inMemoryQuestionsRepository.create(makeQuestion())

    vi.setSystemTime(new Date(2023, 0, 18))
    await inMemoryQuestionsRepository.create(makeQuestion())

    vi.setSystemTime(new Date(2023, 0, 23))
    await inMemoryQuestionsRepository.create(makeQuestion())
  })


  it('should be able to fetch the questions ordering by descending "createdAt" field', async () => {
    const result = await SUT.execute({ cursor: { page: 1 } })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(result.value).toHaveProperty('questions')
      expect(result.value.questions).toHaveLength(3)
      expect(result.value.questions).toEqual([
        expect.objectContaining({ createdAt: new Date(2023, 0, 23) }),
        expect.objectContaining({ createdAt: new Date(2023, 0, 20) }),
        expect.objectContaining({ createdAt: new Date(2023, 0, 18) })
      ])
    }
  })

  it('should be able to fetch for a number of questions, ordered by descending "createdAt" field', async () => {
    const result = await SUT.execute({ cursor: { page: 1, amountItems: 2 } })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(result.value).toHaveProperty('questions')
      expect(result.value.questions).toHaveLength(2)
      expect(result.value.questions).toEqual([
        expect.objectContaining({ createdAt: new Date(2023, 0, 23) }),
        expect.objectContaining({ createdAt: new Date(2023, 0, 20) })
      ])
    }
  })

  it('should return a empty list when there are no questions on the selected page', async () => {
    const result = await SUT.execute({ cursor: { page: 2 } })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(result.value).toHaveProperty('questions')
      expect(result.value.questions).toHaveLength(0)
    }
  })
})

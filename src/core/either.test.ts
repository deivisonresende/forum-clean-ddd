import { Either, left, right } from "./either"

const returnEither = (shouldSuccess: boolean): Either<string, string> => {
  return shouldSuccess ? left('success') : right('error')
}

test('success result', () => {
  const result = returnEither(true)

  expect(result.isLeft()).toBe(true)
  expect(result.isRight()).toBe(false)
  expect(result.value).toEqual('success')
})

test('error result', () => {
  const result = returnEither(false)
  
  expect(result.isLeft()).toBe(false)
  expect(result.isRight()).toBe(true)
  expect(result.value).toEqual('error')
})

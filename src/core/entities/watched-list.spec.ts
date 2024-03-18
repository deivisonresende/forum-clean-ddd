import { WatchedList } from "./watched-list";

class NumberWatchedList extends WatchedList<number>{
  compareItems(a: number, b: number): boolean {
    return a === b
  }
}

let list: NumberWatchedList

describe('NumberWatchedList', () => {
  beforeEach(() => {
    list = new NumberWatchedList([1, 2, 3])
  })

  it('should be able to create a watched list with initial items', () => {
    expect(list.currentItems).toHaveLength(3)
  })

  it('should be able to "add" new items to the list', () => {
    list = new NumberWatchedList()

    list.add(4)

    expect(list.currentItems).toHaveLength(1)
    expect(list.getNewItems()).toEqual([4])
  })

  it('should be able to "remove" items from the list', () => {
    list.remove(2)

    expect(list.currentItems).toHaveLength(2)
    expect(list.getRemovedItems()).toEqual([2])
  })

  it('should be able to "add" an item even if it was "removed" before', () => {
    list.remove(2)
    list.add(2)


    expect(list.currentItems).toHaveLength(3)
    expect(list.getRemovedItems()).toEqual([])
    expect(list.getNewItems()).toEqual([])
  })

  it('should be able to "remove" an item even if it was "add" before', () => {
    list.add(4)
    list.remove(4)


    expect(list.currentItems).toHaveLength(3)
    expect(list.getRemovedItems()).toEqual([])
    expect(list.getNewItems()).toEqual([])
  })

  it('should be able to "update" watched list items', () => {
    list.update([1, 3, 4])


    expect(list.currentItems).toHaveLength(3)
    expect(list.getRemovedItems()).toEqual([2])
    expect(list.getNewItems()).toEqual([4])
  })
})
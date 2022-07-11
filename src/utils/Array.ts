export {}

declare global {
  export interface Array<T> {
    remove(...element: T[]): T[]
    getFirst(): T
    getLast(): T
    addAt(index: number, ...elements: T[]): T[]
    removeAt(index: number, ...elements: T[]): T
    exclusivePush(...elements: T[]): T[]
  }
}

Array.prototype.remove = function <T>(...elements: T[]) {
  for (const element of elements) {
    this.includes(element) && this.splice(this.indexOf(element), 1)
  }
  return elements
}
Array.prototype.getLast = function () {
  return this[this.length - 1]
}
Array.prototype.getFirst = function () {
  return this[0]
}
Array.prototype.addAt = function <T>(index: number, ...elements: T[]) {
  this.splice(index, 0, ...elements)
  return this
}

Array.prototype.removeAt = function (index: number) {
  this.splice(index, 1)
  return this
}
Array.prototype.exclusivePush = function <T>(...elements: T[]) {
  for (const element of elements) {
    !this.includes(element) && this.push(element)
  }
  return this
}

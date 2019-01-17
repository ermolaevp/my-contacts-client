import { assert } from 'chai'
import {
  readCookie,
  createCookie,
  eraseCookie,
} from '../../utils/manage-cookies'

describe('manage cookies util', () => {
  it('read write erase', () => {
    const cName = 'test'
    const cVal = 'value'
    assert.equal(cVal, createCookie(cName, cVal))
    assert.equal(cVal, readCookie(cName))
    eraseCookie(cName)
    assert.equal(null, readCookie(cName))
  })
})

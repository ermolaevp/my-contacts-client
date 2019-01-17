import { assert } from 'chai'
import { titleize, capitalize } from '../../utils/text-transform'

describe('text transform util', () => {
  it('titlize', () => {
    assert.equal('Lorem Ip Sum', titleize('lorem ip sum'))
  })
  it('capitalize', () => {
    assert.equal('Lorem ip sum', capitalize('lorem IP sum'))
  })
})

import { describe, it, expect } from 'vitest'
import en from '../../messages/en.json'
import no from '../../messages/no.json'
import se from '../../messages/se.json'

function getDeepKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  return Object.keys(obj).reduce((res: string[], el: string) => {
    const val = obj[el]
    const key = prefix ? `${prefix}.${el}` : el
    if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
      res.push(...getDeepKeys(val as Record<string, unknown>, key))
    } else {
      res.push(key)
    }
    return res
  }, [])
}

describe('i18n Message Parity and Completeness', () => {
  const enKeys = getDeepKeys(en as Record<string, unknown>).sort()
  const noKeys = getDeepKeys(no as Record<string, unknown>).sort()
  const seKeys = getDeepKeys(se as Record<string, unknown>).sort()

  it('verifies Norwegian dictionary has 100% key parity with English', () => {
    expect(noKeys).toEqual(enKeys)
  })

  it('verifies Northern Sámi dictionary has 100% key parity with English', () => {
    expect(seKeys).toEqual(enKeys)
  })

  it('verifies Norwegian content is actually translated and not raw English copy', () => {
    expect(no.Index.collection_heading).toBe('SKINNY UTVALG')
    expect(no.Index.smart_drinking_title).toBe('BEDRE drikking')
    expect(no.BBS.research_shows_heading).toBe('Forskning viser')
    expect(no.Partner.contact).toBe('kontakt oss')
    expect(no.Inquiry.topic_label).toBe('Tema')
    expect(no.Restrictions.welcome).toBe('Velkommen!')
  })

  it('verifies Northern Sámi content is actually translated and not raw English copy', () => {
    expect(se.Index.collection_heading).toBe('SKINNY VÁLLJUMAT')
    expect(se.Index.smart_drinking_title).toBe('BUORET juhkan')
    expect(se.BBS.research_shows_heading).toBe('Dutkan čájeha')
    expect(se.Partner.contact).toBe('váldde oktavuođa')
    expect(se.Inquiry.topic_label).toBe('Fáddá')
    expect(se.Restrictions.welcome).toBe('Bures boahtin!')
  })
})

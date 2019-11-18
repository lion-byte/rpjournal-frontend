import React from 'react'
import { convertFromRaw } from 'draft-js'
import { convertToHTML } from 'draft-convert'
import { BLOCK_TYPE, ENTITY_TYPE, INLINE_STYLE } from 'draftail'

/** @type {import('draft-convert').IConvertToHTMLConfig} */
const convertDataConfig = {
  blockToHTML (block) {
    // @ts-ignore
    switch (block.type) {
      case BLOCK_TYPE.ATOMIC:
        return { start: '', end: '' }
      default:
        return null
    }
  },

  entityToHTML (entity, originalText) {
    switch (entity.type) {
      case ENTITY_TYPE.HORIZONTAL_RULE:
        return <hr />

      default:
        return originalText
    }
  },

  styleToHTML (style) {
    switch (style) {
      case INLINE_STYLE.STRIKETHROUGH:
        return <s />

      default:
    }
  }
}

/**
 * @param {string} [jsonData]
 * @returns {string}
 */
export function dataToHTML (jsonData = null) {
  const content = JSON.parse(jsonData)

  if (!content) {
    return ''
  }

  const data = convertFromRaw(content)
  return convertToHTML(convertDataConfig)(data)
}

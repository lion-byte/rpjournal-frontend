import React from 'react'
import { convertFromRaw } from 'draft-js'
import { convertToHTML } from 'draft-convert'
import { BLOCK_TYPE, ENTITY_TYPE, INLINE_STYLE } from 'draftail'

const defaultExportConfig = {
  blockToHTML (block) {
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
 * @param {import('draft-js').RawDraftContentState} contentState
 * @param {any} [exportConfig]
 * @returns {string} HTML
 */
export const exportHTML = (contentState, exportConfig = {}) => {
  const config = { ...defaultExportConfig, ...exportConfig }

  if (!contentState) {
    return ''
  }

  return convertToHTML(config)(convertFromRaw(contentState))
}

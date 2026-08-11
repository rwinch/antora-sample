'use strict'

const toProc = require('./util/to-proc')

function register (registry, context) {
  if (!(registry && context)) return
  registry.$groups().$store('springio/include-partial', toProc(groupFn))
  return registry
}

function groupFn () {
  const PreprocessorReader = global.Opal.Asciidoctor.PreprocessorReader
  this.blockMacro(function () {
    this.named('include-partial')
    this.process((parent, target) => {
      const doc = parent.getDocument()
      const cursor = doc.getReader().$cursor_at_mark()
      const lines = PreprocessorReader.$new(doc, [`include::partial$${target}[]`], cursor).readLines()
      return this.createBlock(parent, 'paragraph', lines)
    })
  })
}

module.exports = { register }

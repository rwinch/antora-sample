'use strict'

;(() => {
    const asciidoctor = require('asciidoctor')()
    const baseConverter = asciidoctor.Html5Converter.$new()
    const scope = Opal.klass(
        Opal.module(null),
        Opal.module(null, 'Asciidoctor').Converter.Html5Converter,
        'MyHtml5Converter'
    )

    scope.$register_for('html5')

    Opal.defn(scope, '$convert_listing', function (node, transform) {
        const originalListing = baseConverter.convert(node, transform)
        return originalListing.replace("// @fold:on", "// FIXME: Implement code folding")
    })

    return scope
})()
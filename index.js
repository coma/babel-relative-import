var p = require('path');

module.exports = function () {

    'use strict';

    return {
        visitor: {
            ImportDeclaration: function ImportDeclaration (path, state) {

                var ph = state.opts.placeholder || '~';

                if (path.node.source.value.indexOf(ph) === 0) {

                    var src = state.opts.src || 'src',
                        dir = p.dirname(state.file.opts.filename),
                        dep = p.join(src, path.node.source.value.substring(ph.length));

                    path.node.source.value = './' + p.relative(dir, dep);
                }
            }
        }
    };
};
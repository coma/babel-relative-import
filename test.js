var test   = require('tape'),
    plugin = require('.')().visitor.ImportDeclaration;

function check (t, dep, file, expected, src, ph) {

    var state = {opts: {src: src, placeholder: ph}, file: {opts: {filename: file}}},
        path  = {node: {source: {value: dep}}};

    plugin(path, state);

    t.plan(1);
    t.equal(path.node.source.value, expected || dep);
    t.end();
}

test('won\'t replace a path not starting with ~', function (t) {

    check(t, 'some/dep', 'src/some/file.js');
});

test('replaces a path starting with ~', function (t) {

    check(t, '~/some/dep', 'src/some/file.js', './dep');
});

test('replaces a nested path starting with ~', function (t) {

    check(t, '~/some/dep', 'src/some/deep/nested/file.js', './../../dep');
});

test('the source directory can be configured', function (t) {

    check(t, '~/dep', 'src/some/file.js', './dep', 'src/some');
});

test('the placeholder can be configured', function (t) {

    check(t, 'app/dep', 'src/some/file.js', './dep', 'src/some', 'app');
});

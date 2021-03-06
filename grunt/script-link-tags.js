module.exports = {
    options: {
        scriptTemplate: '<script src="{{path}}"></script>',
        linkTemplate: '<link rel="stylesheet" href="{{path}}">'
    },
    js: {
        options: {
            openTag: '<!-- SCRIPTS_START -->',
            closeTag: '<!-- SCRIPTS_END -->'
        },
        src: ['build/atlas.js'],
        dest: 'build/index.html'
    },
    css: {
        options: {
            openTag: '<!-- STYLESHEETS_START -->',
            closeTag: '<!-- STYLESHEETS_END -->'
        },
        src: ['build/atlas.css'],
        dest: 'build/index.html'
    }
};
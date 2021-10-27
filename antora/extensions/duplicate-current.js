'use strict'

module.exports.register = (pipeline, { playbook, config }) => {

    pipeline.on('contentClassified',  (args) => {
        const contentCatalog = args.contentCatalog;

        const alllatest = [];
        contentCatalog.getComponents().forEach(ca => {
            out(ca);
            const latest = ca.latest;
            alllatest.push(latest);
            const descriptor = Object.assign({}, latest);
            contentCatalog.registerComponentVersion(latest.name, 'current', {displayVersion: 'current', asciidoc: latest.asciidoc, prerelase: latest.prerelease, startPage: latest.startPage});
        });
        alllatest.forEach(latest => {
            args.contentCatalog.getFiles().filter(f => f.src.component === latest.name && f.src.version === latest.version ).forEach(f => {
                const toAdd = Object.assign({}, f, {src: f.src }, {contents: f.contents });
                const originalVersion = latest.version;
                const newVersion = 'current';
                const originalVersionSegment = `/${originalVersion}`
                const newVersionSegment = `/${newVersion}`
                toAdd.src.version = newVersion
                if (toAdd.out) {
                    const dirname = toAdd.out.dirname
                    toAdd.out.dirname = toAdd.out.dirname.replace(originalVersionSegment, newVersionSegment)
                    toAdd.out.path = toAdd.out.path.replace(originalVersionSegment, newVersionSegment);
                    // toAdd.out.rootPath = '..';
                }
                if (toAdd.pub) {
                    toAdd.pub.url = toAdd.pub.url.replace(originalVersionSegment, newVersionSegment);
                    // toAdd.pub.rootPath = '..';
                }
                // console.log("original...")
                // console.log(f);
                // console.log("duplicate..")
                // console.log(toAdd);
                contentCatalog.addFile(toAdd);
            });
        });
        // args.contentCatalog.getFiles().forEach(f => out(f));

    });

}

function out(args) {
    console.log(JSON.stringify(args, no_data, 2));
}


function no_data(key, value) {
    if (key == "data" || key == "files") {
        return value ? "__data__" : value;
    }
    return value;
}

const Vinyl = require('vinyl')

class File extends Vinyl {
    get path () {
        return this.history[this.history.length - 1]
    }

    set path (path_) {
        this.history.push(path_)
    }

    get relative () {
        return this.history[this.history.length - 1]
    }
}

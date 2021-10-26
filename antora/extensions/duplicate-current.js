'use strict'

module.exports.register = (pipeline, { playbook, config }) => {

    pipeline.on('contentAggregated',  ({contentAggregate}) => {
        contentAggregate.forEach(ca => {
            out(ca);
        });
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
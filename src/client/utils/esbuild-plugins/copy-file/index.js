const copy = require('./copy.js');

const CopyFilePlugin = ({ source, target, copyWithFolder }) => {
    return {
        name: 'copy',
        setup(build) {
            build.onEnd(() => copy({ source, target, copyWithFolder }));
        },
    };
};

module.exports = CopyFilePlugin
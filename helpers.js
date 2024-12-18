function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function toFriendlyFilename(str) {
    return str
        .trim() // Remove leading and trailing whitespace
        .toLowerCase() // Convert to lowercase
        .replace(/[^a-z0-9\s]/g, '') // Remove non-alphanumeric characters except spaces
        .replace(/\s+/g, '_'); // Replace spaces with underscores
}

module.exports = {
    wait,
    toFriendlyFilename
};
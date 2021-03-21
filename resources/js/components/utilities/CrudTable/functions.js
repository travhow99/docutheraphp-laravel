/**
 * 
 * @param {String} type Action type
 * @returns string
 */
function generateColor(type) {
    let color;

    switch (type) {
        case 'view':
            color = 'primary';
            break;
        case 'add':
            color = 'success';
            break;
        case 'edit':
            color = 'warning';
            break;
        case 'delete':
            color = 'danger';
            break;
        default:
            color = 'primary';
            break;
    }

    return color;
}

/**
 * 
 * @param {String} attr Attribute
 * @param {Object} data Table action data
 * @returns string
 */
function getDataAttribute(attr, data) {
    return data[`data-${attr}`];
}

function generateUrl(url, data = [], obj) {
    data.forEach((d, index) => {
        url = url.replace(`$${index + 1}`, getDataAttribute(d, obj));
    });

    return url;
}

module.exports = { generateColor, getDataAttribute, generateUrl };
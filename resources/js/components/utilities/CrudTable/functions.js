function generateColor(type) {
    let color;

    switch (type) {
        case 'view':
            color = 'primary';
            break;
        case 'edit':
            color = 'success';
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

module.exports = { generateColor };
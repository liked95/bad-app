export function formatDate(date) {
    return new Date(date).toLocaleString('en-US')
}

export function stripHTML(html) {
    return html.replace(/<[^>]*>/g, '');
}

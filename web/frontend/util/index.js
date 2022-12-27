export function formatDate(date) {
    return new Date(date).toLocaleString('en-US')
}

export function stripHTML(html) {
    return html.replace(/<[^>]*>/g, '');
}



export function hsvToHex(h, s, v) {
    // Convert the hue to a range from 0 to 360
    h = h % 360;
    if (h < 0) h += 360;

    // Convert the saturation and value to a range from 0 to 100
    s /= 100;
    v /= 100;

    // Calculate the RGB values based on the HSV values
    let r, g, b;
    const i = Math.floor(h / 60);
    const f = h / 60 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0:
            r = v;
            g = t;
            b = p;
            break;
        case 1:
            r = q;
            g = v;
            b = p;
            break;
        case 2:
            r = p;
            g = v;
            b = t;
            break;
        case 3:
            r = p;
            g = q;
            b = v;
            break;
        case 4:
            r = t;
            g = p;
            b = v;
            break;
        case 5:
            r = v;
            g = p;
            b = q;
            break;
    }

    // Convert the RGB values to hexadecimal format
    const hexR = Math.round(r * 255).toString(16);
    const hexG = Math.round(g * 255).toString(16);
    const hexB = Math.round(b * 255).toString(16);

    // Return the hexadecimal string
    return `#${hexR}${hexG}${hexB}`;
}

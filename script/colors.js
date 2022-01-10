/**
 * Converts a hex string into HSL color space.
 * 
 * @param {string} hex 
 * @returns {{h: number, s: number, l: number}} A color in HSL space (each prop ranging from [0, 1])
 */
function hexToHSL(hex) {
    const {r, g, b} = hexToRGB(hex);
    return rgbToHsl(r, g, b);
}

/**
 * Parses a hex string into RGB.
 * 
 * @param {string} hex 
 * @returns {{r: number, g: number, b: number}} A color in RGB space (each prop ranging from [0, 255])
 */
function hexToRGB(hex) {
    let fixedHex = hex;
    if (hex.includes("#")) {
        fixedHex = hex.slice(1);
    }

    const [rHex, gHex, bHex] = fixedHex.split(/([\da-fA-F]{2})/).filter((part) => !!part);

    const r = parseInt(rHex, 16);
    const g = parseInt(gHex, 16);
    const b = parseInt(bHex, 16);

    return {r, g, b};
}

/**
 * Takes a color in RGB space and moves it to HSL space.
 * 
 * Adapted from https://en.wikipedia.org/wiki/HSL_and_HSV#Color-making_attributes
 * 
 * @param {number} red [0, 255]
 * @param {number} green [0, 255]
 * @param {number} blue [0, 255]
 * @returns {{h: number, s: number, l: number}} A color in HSL space (each prop ranging from [0, 1]).
 */
function rgbToHsl(rInit, gInit, bInit) {
    const red = rInit / 255;
    const green = gInit / 255;
    const blue = bInit / 255;
    const max = Math.max(red, green, blue)
    const min = Math.min(red, green, blue)
    const chroma = max - min

    let hue, saturation, luminance;
    hue = saturation = luminance = (max + min) / 2;

    let hp;
    if (chroma == 0) {
        hp = saturation = 0;
    }
    else {
        saturation = chroma / (1 - Math.abs(2 * luminance - 1))
        if (max == red) {
            hp = ((green - blue) / chroma) % 6;
        }
        else if (max == green) {
            hp = ((blue - red) / chroma) + 2;
        }
        else { // (max == b)
            hp = ((red - green) / chroma) + 4;
        }
    }

    hue = hp / 6;

    return {h: hue, s: saturation, l: luminance};
}

/**
 * Adapted from https://en.wikipedia.org/wiki/HSL_and_HSV#To_RGB
 * 
 * @param {number} hue [0, 1]
 * @param {number} saturation [0, 1]
 * @param {number} luminance [0, 1]
 * @returns {{r: number, g: number, b: number}} A color in RGB space (each ranging from [0, 255]).
 */
function hslToRgb(hue, saturation, luminance) {
    const chroma = (1 - Math.abs(2 * luminance - 1)) * saturation;
    const hp = hue * 6;
    const min = luminance - (chroma / 2);
    const x = chroma * (1 - Math.abs((hp % 2) - 1));
    let ri, gi, bi;
    if (hp >= 0 && hp < 1) {
        ri = chroma; 
        gi = x;
        bi = 0;
    }
    else if (hp >= 1 && hp < 2) {
        ri = x;
        gi = chroma;
        bi = 0;
    }
    else if (hp >= 2 && hp < 3) {
        ri = 0;
        gi = chroma;
        bi = x;
    }
    else if (hp >= 3 && hp < 4) {
        ri = 0;
        gi = x;
        bi = chroma;
    }
    else if (hp >= 4 && hp < 5) {
        ri = x;
        gi = 0;
        bi = chroma;
    }
    else if (hp >= 5 && hp < 6) {
        ri = chroma;
        gi = 0;
        bi = x;
    }
    return {r: (ri + min) * 255, g: (gi + min) * 255, b: (bi + min) * 255};
}

/**
 * A very cursed way to convert RGB to hex. Negatives are ignored and made positive.
 * 
 * @param {number} r Red part
 * @param {number} g Green part
 * @param {number} b Blue part
 * @returns {string} A hex string that represents the given RGB value.
 */
function rgbToHex(r, g, b) {
    return `#${Math.abs(Math.round(r)).toString(16).padStart(2, "0")}${Math.abs(Math.round(g)).toString(16).padStart(2, "0")}${Math.abs(Math.round(b)).toString(16).padStart(2, "0")}`
}

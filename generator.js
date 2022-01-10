function makeColors(baseHex, luminanceShift, satLumRatio, hueShift, up, down, luminanceShiftAlt, satLumRatioAlt, hueShiftAlt, correctYellow, yellowHue, correctBlue, blueHue) {
    const hueShiftLow = hueShiftAlt == undefined ? hueShift : hueShiftAlt;
    const luminanceShiftLow = luminanceShiftAlt == undefined ? luminanceShift : luminanceShiftAlt;
    const satLumRatioLow = satLumRatioAlt == undefined ? satLumRatio : satLumRatioAlt;
    const baseRGB = hexToRGB(baseHex);
    const baseHSL = rgbToHsl(baseRGB.r, baseRGB.g, baseRGB.b);
    const stepLuminanceUp = Math.min((1.0 - baseHSL.l) / up, Math.max(luminanceShift, 0));
    const colors = [baseHSL];
    const hueShiftUp = correctYellow ? Math.min(distanceToAngle(yellowHue, baseHSL.h) / up, hueShift) : hueShift;
    const hueShiftDown = correctBlue ? Math.min(distanceToAngle(blueHue, baseHSL.h) / down, hueShiftLow) : hueShiftLow;
    for(let i = 0; i < up; i++) {
        const newColor = {...colors[0]};
        newColor.l += stepLuminanceUp;
        newColor.s = Math.min(1, newColor.s + stepLuminanceUp / satLumRatio);
        if (Math.abs(newColor.h - yellowHue) < hueShiftUp && correctYellow) {
            newColor.h = yellowHue;
        }
        else {
            newColor.h += hueShiftUp;
            while (newColor.h > 1) {
                newColor.h -= 1;
            }
        }
        colors.unshift(newColor);
    }
    const stepLuminanceDown = Math.min((baseHSL.l) / down, Math.max(luminanceShiftLow, 0));
    for(let i = 0; i < down; i++) {
        const newColor = {...colors.slice(-1)[0]};
        newColor.l -= stepLuminanceDown;
        newColor.s = Math.max(0, newColor.s - stepLuminanceDown / satLumRatioLow);
        if (Math.abs(newColor.h - blueHue) < hueShiftDown && correctBlue) {
            newColor.h = blueHue;
        }
        else {
            newColor.h -= hueShiftDown;
            while (newColor.h > 1) {
                newColor.h -= 1;
            }
        }
        while (newColor.h < 0) {
            newColor.h += 1;
        }
        colors.push(newColor);
    }
    return colors.map((item) => { 
        const hsl = {h: item.h < 0 ? item.h + 1 : item.h, s: item.s, l: item.l };
        const rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
        const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
        return {hsl, rgb, hex};
    });
}

function createColorContainersWithProps(base, luminance, satLumRatio, hue, up, down, luminanceLow, satLumRatioLow, hueLow, correctYellow, yellowHue, correctBlue, blueHue) {
    const colors = makeColors(base, luminance, satLumRatio, hue, up, down, luminanceLow, satLumRatioLow, hueLow, correctYellow, yellowHue, correctBlue, blueHue);

    const target = document.querySelector('#target');
    target.innerHTML = '';
    colors.forEach((c) => {
        const child = document.createElement('span');
        child.style.backgroundColor = c.hex;
        child.classList.add('color-container');
        if (count > 28) {
            child.classList.add('mini');
        }
        child.addEventListener('click', () => {
            navigator.clipboard.writeText(c.hex);
        })
        const lightChild = document.createElement('div');
        lightChild.innerText = c.hex;
        lightChild.classList.add('light');
        child.appendChild(lightChild);
        const darkChild = document.createElement('div');
        darkChild.innerText = c.hex;
        darkChild.classList.add('dark');
        child.appendChild(darkChild);
        target.appendChild(child);
    })
}

function generateColors() {
    const base = document.querySelector('#base').value;
    const luminance = parseFloat(document.querySelector('#luminance').value) / 100;
    const hue = parseFloat(document.querySelector('#hue').value) / 360;
    const satLumRatio = parseFloat(document.querySelector('#ratio').value) / 10;
    const count = parseInt(document.querySelector('#count').value);
    const correctYellow = document.querySelector('#correct-yellow').checked;
    const yellowHue = parseFloat(document.querySelector('#yellow-hue').value) / 360;
    const correctBlue = document.querySelector('#correct-blue').checked;
    const blueHue = parseFloat(document.querySelector('#blue-hue').value) / 360;
    const up = Math.ceil(count / 2);
    const down = Math.floor(count / 2) - 1;
    createColorContainersWithProps(base, luminance, satLumRatio, hue, up, down, luminance, satLumRatio, hue, correctYellow, yellowHue, correctBlue, blueHue);
}

// document.querySelector("#go").addEventListener('click', () => doTheThing());
document.querySelector("#base").addEventListener('change', () => generateColors());
document.querySelector("#luminance").addEventListener('change', () => generateColors());
document.querySelector("#hue").addEventListener('change', () => generateColors());
document.querySelector("#ratio").addEventListener('change', () => generateColors());
document.querySelector("#count").addEventListener('change', () => generateColors());
document.querySelector("#correct-yellow").addEventListener('change', () => generateColors());
document.querySelector("#yellow-hue").addEventListener('change', () => generateColors());
document.querySelector("#correct-blue").addEventListener('change', () => generateColors());
document.querySelector("#blue-hue").addEventListener('change', () => generateColors());
generateColors();
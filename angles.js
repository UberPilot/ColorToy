/**
 * Finds the direction towards another angle in degrees.
 * 
 * @param {number} a The first angle in degrees.
 * @param {number} b The second angle in degrees.
 * @returns {number} The direction in angle between them.
 */
function directionTowardsAngle(a, b) {
    return Math.sign(
        (Math.cos(a * (180 / Math.PI))) * (Math.sin(b * (180 / Math.PI))) - 
        (Math.sin(a * (180 / Math.PI))) * (Math.cos(b * (180 / Math.PI)))
    );
}

/**
 * Finds the number of degrees between two angles.
 * 
 * @param {number} a The first angle in degrees.
 * @param {number} b The second angle in degrees.
 * @returns {number} The change in angle between them.
 */
function distanceToAngle(a, b) {
    // Mod because in JS we can't have nice things.
    const aAdj = (((a % 360) + 360) % 360);
    const bAdj = (((b % 360) + 360) % 360);
    return Math.min(Math.abs(aAdj - bAdj), Math.abs((aAdj + 360)) - bAdj, Math.abs(aAdj - (bAdj + 360)));
}
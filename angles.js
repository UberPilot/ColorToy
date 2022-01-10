/**
 * Finds the direction in which angle a needs to rotate to reach angle b quickest.
 * 
 * @param {number} a The first angle in degrees.
 * @param {number} b The second angle in degrees.
 * @returns {number} The direction in angle between them.
 */
function directionTowardsAngle(a, b) {
    return Math.sign(
        (Math.cos(a * (Math.PI / 180))) * (Math.sin(b * (Math.PI / 180))) - 
        (Math.sin(a * (Math.PI / 180))) * (Math.cos(b * (Math.PI / 180)))
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
/**
 * Verifie la présence de propriété dans un objet
 * @param obj
 * @returns {boolean}
 */
export function isEmptyObject(obj) {
    return Object.keys(obj) === 0 && obj.constructor === Object;
};

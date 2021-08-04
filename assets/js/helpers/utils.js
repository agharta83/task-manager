/**
 * Verifie la présence de propriété dans un objet
 * @param obj
 * @returns {boolean}
 */

export function isEmptyObject(obj) {
    return Object.keys(obj) === 0 && obj.constructor === Object;
}

/**
 *
 * @param obj
 * @returns {boolean}
 */
export function isEmptyValueOfObject(obj) {

    Object.keys(obj).forEach((key) => {
            console.log('la')
            return obj[key].length === 0;
        }
    )

}

export const BASE_HREF = window.location.origin;
export const UPLOADS_PATH = '../uploads/';

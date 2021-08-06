export default  Object.freeze({
    get(key) {
        try {
            return JSON.parse(window.localStorage.getItem(key)) || {};
        } catch (err) {
            return {};
        }
    },

    set(key, state) {
        window.localStorage.setItem(key, JSON.stringify(state));
    },

    clear(key) {
        window.localStorage.removeItem(key);
    }
});

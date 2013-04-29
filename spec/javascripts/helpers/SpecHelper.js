gm_values = {};
PGNAME = '';
HOST = '';

function GM_reset() {
    gm_values = {};
}

function GM_getValue(key, default_value) {
    if (gm_values[key] !== undefined) {
        return gm_values[key];
    } else {
        return default_value;
    }
}

function GM_setValue(key, value) {
    gm_values[key] = value;
    return value;
}

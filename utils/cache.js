var e = getApp();
module.exports = {
    set: function (t, a, n) {
        e.globalData._cache[t] = {
            data: a,
            expired_at: new Date().getTime() + 1e3 * n
        };
    },
    get: function (t) {
        var a = e.globalData._cache[t];
        return a && a.expired_at > new Date().getTime() ? a.data : null;
    }
};

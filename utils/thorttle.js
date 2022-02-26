module.exports = {
    throttle: function (t, l) {
        (null != l && null != l) || (l = 2500);
        var n = null;
        return function () {
            var u = +new Date();
            (u - n > l || !n) && (t.apply(this, arguments), (n = u));
        };
    }
};

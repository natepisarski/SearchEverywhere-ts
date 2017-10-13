var Util;
(function (Util) {
    function CountOf(index, content) {
        var count = 0;
        for (var _i = 0, content_1 = content; _i < content_1.length; _i++) {
            var item = content_1[_i];
            if (item === index) {
                count++;
            }
        }
        return count;
    }
    Util.CountOf = CountOf;
})(Util || (Util = {}));
//# sourceMappingURL=util.js.map
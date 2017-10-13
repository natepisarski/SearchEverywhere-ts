"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("chrome");
var SearchAlgorithm;
(function (SearchAlgorithm) {
    SearchAlgorithm[SearchAlgorithm["OrdinalSearch"] = 0] = "OrdinalSearch";
    SearchAlgorithm[SearchAlgorithm["SubSequenceSearch"] = 1] = "SubSequenceSearch";
    SearchAlgorithm[SearchAlgorithm["ReplaceMatchSearch"] = 2] = "ReplaceMatchSearch";
    SearchAlgorithm[SearchAlgorithm["ReplaceSearch"] = 3] = "ReplaceSearch";
})(SearchAlgorithm = exports.SearchAlgorithm || (exports.SearchAlgorithm = {}));
var SearchAlgorithms = (function () {
    function SearchAlgorithms() {
    }
    SearchAlgorithms.search = function (targets, algorithm, input) {
        var results = [];
        for (var _i = 0, targets_1 = targets; _i < targets_1.length; _i++) {
            var tab = targets_1[_i];
            if (algorithm(input, tab.Tag)) {
                results.push(tab);
            }
        }
        return results;
    };
    /// Ordinal Search: input is comprised of x characters, which appear in order
    ///     within content. I.e 'cn' matches 'canada', but 'dn' does not.
    SearchAlgorithms.ordinalSearch = function (input, content) {
        var lastIndex = 0;
        for (var _i = 0, input_1 = input; _i < input_1.length; _i++) {
            var char = input_1[_i];
            var charPosition = content.indexOf(char);
            if (charPosition < 0 || charPosition < lastIndex) {
                return false;
            }
            else {
                lastIndex = charPosition;
            }
        }
        return true;
    };
    SearchAlgorithms.subSequenceSearch = function (input, content) {
        return content.indexOf(input) > 0;
    };
    SearchAlgorithms.replaceMatchSearch = function (input, content) {
        for (var _i = 0, input_2 = input; _i < input_2.length; _i++) {
            var char = input_2[_i];
            if (content.indexOf(char) < 0 || Util.CountOf(char, content) < Util.CountOf(char, input)) {
                return false;
            }
        }
    };
    SearchAlgorithms.replaceSearch = function (input, content) {
        for (var _i = 0, input_3 = input; _i < input_3.length; _i++) {
            var char = input_3[_i];
            if (content.indexOf(char) < 0) {
                return false;
            }
        }
        return true;
    };
    return SearchAlgorithms;
}());
exports.SearchAlgorithms = SearchAlgorithms;
//# sourceMappingURL=algorithm.js.map
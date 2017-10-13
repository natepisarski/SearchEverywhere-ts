import { SearchTarget} from "./searchTarget";
import 'chrome';

export interface ITextSearch {
    (input: string, content: string): boolean;
}

export enum SearchAlgorithm {
    OrdinalSearch,
    SubSequenceSearch,
    ReplaceMatchSearch,
    ReplaceSearch
}

export class SearchAlgorithms {

    /// Ordinal Search: input is comprised of x characters, which appear in order
    ///     within content. I.e 'cn' matches 'canada', but 'dn' does not.
    static ordinalSearch : ITextSearch = function(input: string, content: string): boolean {
        let lastIndex = 0;
        for(const char of input) {
            let charPosition = content.indexOf(char);
            if(charPosition < 0 || charPosition < lastIndex) {
                return false;
            } else {
                lastIndex = charPosition;
            }
        }
        return true;
    }

    static subSequenceSearch : ITextSearch = (input: string, content: string) => {
        return content.indexOf(input) > 0
    }

    static replaceMatchSearch : ITextSearch = (input: string, content: string) => {
        for(const char of input) {
            if(content.indexOf(char) < 0 || Util.CountOf(char, content) < Util.CountOf(char, input)) {
                return false;
            }
        }
    }

    static replaceSearch : ITextSearch = (input: string, content: string) => {
        for(const char of input) {
            if(content.indexOf(char) < 0) {
                return false;
            }
        }
        return true;
    }

    static search(targets: SearchTarget<chrome.tabs.Tab>[], algorithm: ITextSearch, input: string): SearchTarget<chrome.tabs.Tab>[] {
        let results = []
        for(const tab of targets) {
            if(algorithm(input, tab.Tag)) {
                results.push(tab);
            }
        }
        return results;
    }
}
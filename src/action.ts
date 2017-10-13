import {SearchTarget} from "./searchTarget";

import 'chrome';
import {ITextSearch, SearchAlgorithms} from "./algorithm";

/// <reference path="chrome" />

export class BrowserAction {
    static ReadAllTabs(): SearchTarget<chrome.tabs.Tab>[] {
        let allTabs: SearchTarget<chrome.tabs.Tab>[] = []

        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, (tabs) => {
            for(const tab of tabs) {
                allTabs.push(
                    new SearchTarget(tab.title, tab)
                );
            }
        })

        return allTabs;
    }

    static findMatchingTabs(input: string = (document.getElementById('searchBar').textContent),
                            algorithm: ITextSearch = SearchAlgorithms.subSequenceSearch)
                                : SearchTarget<chrome.tabs.Tab>[] {
        alert("Working")
        document.getElementById("tabList").appendChild(
            (() => {let x = new HTMLParagraphElement(); x.innerText = "hey"; return x;})())
        const tabs = BrowserAction.ReadAllTabs()
        const matchingTabs =  SearchAlgorithms.search(tabs, algorithm, input);

        alert("Starting Search")
        let tabList = document.getElementById('tabList');
        tabList.innerHTML = '';

        for(const tab of matchingTabs) {
            let tabSuggestion = new HTMLLIElement();
            tabSuggestion.innerText = tab.Tag;
            alert("Found Matching Item: " + tab.Tag);
            tabList.appendChild(tabSuggestion)
        }
        return matchingTabs;
    }
}

document.getElementById('searchBar').onclick = (e) => {
    BrowserAction.findMatchingTabs()
}
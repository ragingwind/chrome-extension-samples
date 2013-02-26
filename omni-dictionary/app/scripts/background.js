// CHROME EXTENSION BACKGROUND.JS

'use strict';

var dicEngines = {
    impact: { name: 'Impact', query: 'http://dic.impact.pe.kr/ecmaster-cgi/search.cgi?kwd={{query}}', dimmed: 'Search examples' },
    daum: { name: 'Daum', query: 'http://dic.daum.net/search.do?q={{query}}', dimmed: 'Find it'},
    naver: { name: 'Naver', query: 'http://dic.naver.com/search.nhn?query={{query}}', dimmed: 'Search it'},
    cambridge: { name: 'Cambridge', query: 'http://dictionary.cambridge.org/spellcheck/british/?q={{query}}', dimmed: 'English Dictionary'}
};

chrome.omnibox.getSuggestions = function( text ) {
    var suggestions = [];
    for (var e in dicEngines) {
        var url = '<url>' + dicEngines[e].name + '</url>: ';
        var dimmed = '- <dim>' + dicEngines[e].dimmed + '</dim>';
        suggestions.push({
            content: dicEngines[e].query.replace('{{query}}', text),
            description: url + text + dimmed
        });
    }
    return suggestions;
};

chrome.omnibox.setDefaultSuggestion({
    description: '<url>Google Translate:</url> Translate Text'
});

chrome.omnibox.onInputChanged.addListener(function( text, suggest) {
    suggest( chrome.omnibox.getSuggestions( text ) );
});

chrome.omnibox.onInputEntered.addListener(function( text ) {
    var url = (text.indexOf('http') >= 0) ? text : 'http://translate.google.com/#en|ko|' + text;
    chrome.tabs.create({ url: url, pinned: false });
});

chrome.omnibox.onInputChanged.addListener(function( text, suggest ) {
    suggest( chrome.omnibox.getSuggestions( text ) );
});


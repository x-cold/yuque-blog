'use strict';

const Mkit = require('markdown-it');
const hljs = require('highlight.js');
const markdownItGithubPreamble = require('markdown-it-github-preamble');
const markdownItFootnote = require('markdown-it-footnote');
const markdownItKatex = require('markdown-it-katex');

const md = new Mkit({
  html: true,
  linkify: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (err) {
        console.log(err);
      }
    }
    return ''; // use external default escaping
  },
})
  .use(markdownItGithubPreamble)
  .use(markdownItFootnote)
  .use(markdownItKatex);

module.exports = md;

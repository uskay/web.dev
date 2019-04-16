// const {html} = require('common-tags');
// const prettyDate = require('../../_filters/pretty-date');

/* eslint-disable require-jsdoc */

module.exports = ({author, showSocialMedia = false}) => {
  /* eslint-disable-next-line */
  debugger;
  if (!author) {
    throw new Error(`Can't generate AuthorInfo without author object`);
  }

  const fullName = `${author.name.given} ${author.name.family}`;

  function renderTwitter({twitter}) {
    return `
<li class="w-author__link-listitem">
  <a href="https://twitter.com/${twitter}">Twitter</a>
</li>
    `;
  }

  function renderGitHub({github}) {
    return `
<li class="w-author__link-listitem">
  <a href="https://github.com/{${github}">GitHub</a>
</li>
    `;
  }

  function renderGlitch({glitch}) {
    return `
<li class="w-author__link-listitem">
  <a href="https://glitch.com/@${glitch}">Glitch</a>
</li>
    `;
  }

  function renderSocialMedia(author) {
    return `
<ul class="w-author__link-list">
  ${author.twitter && renderTwitter(author)}
  ${author.github && renderGitHub(author)}
  ${author.glitch && renderGlitch(author)}
</ul>
    `;
  }

  return `
<div class="w-author__info">
  <cite class="w-author__name">${fullName}</cite>
  ${showSocialMedia && renderSocialMedia(author)}
</div>
  `;
};

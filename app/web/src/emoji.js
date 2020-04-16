import _ from 'lodash';

const buildIndex = emoji => {
  const categories = _.groupBy(emoji, 'category');
  const details = _.groupBy(emoji, 'browser');
  const list = emoji.map(e => e.browser);

  return {
    categories,
    list,
    details,
    emoji,
  };
}

const details = entry => window.emoji.details[entry][0];

const randFromArray = arr => arr[Math.floor(Math.random() * arr.length)];

const chooseRandom = (emoji, category='*') => {
  if (category === '*') {
    return randFromArray(_.get(emoji, 'list'));
  }

  return randFromArray(_.get(emoji.categories, category).map(item => item.browser));
};

const matrix = (emoji=window.emoji, rows=3, columns=3) => {
  const row = sz => {
    const r = [];
    for (let i=0; i<sz; i++) {
      r.push(chooseRandom(emoji));
    }
    return r;
  };

  const matrix = [];
  for (let i=0; i<rows; i++) {
    matrix.push(row(columns));
  }

  return matrix;
};

export default {
  details,
  buildIndex,
  chooseRandom,
  matrix,
};

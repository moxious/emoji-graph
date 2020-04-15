const fs = require('fs');

const header = 'column_a,code,browser,cldr_short_name';

console.log(`${header},category`);
fs.readdir("data", function(err, items) {
  items.forEach(file => {
    const category = `${file}`.replace(".csv", "");
    const data = fs.readFileSync("data/" + file, "utf8");
    const lines = data.split(/[\r\n]+/);

    lines.filter(f => f && f.indexOf(header) === -1).forEach(line => {
      console.log(`${line},${category}`);
    });
  });
});

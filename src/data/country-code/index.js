import fs from "fs";
import papa from "papaparse";

const file = fs.readFileSync(`${__dirname}/country_code.csv`).toString();
const ccData = [];

papa.parse(file, {
  header: true,
  delimiter: ",",
  linebreak: "\n",
  step: ({ data }) => {
    ccData.push(data);
  },
});

export default ccData;

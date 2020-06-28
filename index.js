const express = require("express"),
  morgan = require("morgan"),
  fs = require("fs"),
  path = require("path");

const app = express();

morgan.token("req-headers-length", function (req, res, param) {
  return Object.keys(req.headers).length;
});

/**
 * The final prepared morgan format
 * @returns {string} Morgan config in json form.
 */
const getCustomMorganFormat = () =>
  JSON.stringify({
    method: ":method",
    url: ":url",
    http_version: ":http-version",
    response_time: ":response-time",
    status: ":status",
    content_length: ":res[content-length]",
    timestamp: ":date[iso]",
    headers_count: ":req-headers-length",
  });

const httpLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

app.use(morgan(getCustomMorganFormat(), { stream: httpLogStream }));


app.get("/", (req, res) => {
  res.send("hello world!");
});

app.listen(3000);

import fs from "fs";
import xml2js from "xml2js";
import { createClient } from "redis";

const parser = new xml2js.Parser({ attrkey: "ATTR" });
const redisClient = createClient();

// Read config.xml asynchronously
const xml_string = fs.readFileSync("config.xml", "utf8");
parser.parseString(xml_string, function (error, result) {
  if (error === null) {
     redisClient.set("config", JSON.stringify(result));
  } else {
    console.log(error);
  }
});

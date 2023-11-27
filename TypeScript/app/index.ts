import axios from "axios";
import { GildedRose } from "./gilded-rose";
import { readArgs } from "./input-utils";
import { Item } from "./Item";
import { logToConsoleAndFile } from "./write-utils";

interface DataResponse {
  answer: "yes" | "no" | "maybe";
  forced: boolean;
  image: string;
}

const items = [
  new Item("+5 Dexterity Vest", 10, 20),
  new Item("Aged Brie", 2, 0),
  new Item("Elixir of the Mongoose", 5, 7),
  new Item("Sulfuras, Hand of Ragnaros", 0, 80),
  new Item("Sulfuras, Hand of Ragnaros", -1, 80),
  new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
  new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
  new Item("Conjured Mana Cake", 3, 13),
];

// Notes: it was not specified if the updated items should be logged or anything, so I do not log them out.
// I tried to make the logging of the responses a bit more informative, also added a few other events to the log for clarity.
// There were not mentions of tests for the Node part, so I didn't write any.

const fileName = "log";

export const main = async () => {
  const { updateCount, callCount } = readArgs();
  const gildedRose = new GildedRose(items);

  await logToConsoleAndFile(fileName, `Date: ${new Date().toISOString()}, starting...`);

  for (let index = 0; index < updateCount; index++) {
    let counts = callCount;
    while (counts !== 0) {
      const result = await callApi(counts);
      const positiveResponses = result.filter((x) => x.answer === "yes");

      counts = positiveResponses.length;
      await logToConsoleAndFile(
        fileName,
        `Date: ${new Date().toISOString()}, number of positive responses: ${
          positiveResponses.length
        }${counts !== 0 ? ", repeating..." : ""}`
      );
    }
    await logToConsoleAndFile(fileName, `Date: ${new Date().toISOString()}, updating items...`);

    gildedRose.updateQuality();
  }

  await logToConsoleAndFile(fileName, `Date: ${new Date().toISOString()}, finished.\n`);
};

const callApi = async (callCount: number) => {
  let promises: (() => Promise<DataResponse>)[] = [];
  for (let index = 0; index < callCount; index++) {
    promises.push(getData);
  }
  const result = await Promise.all([...promises.map((promise) => promise())]);
  return result;
};

const getData = async () => {
  const url = "https://yesno.wtf/api";
  const { data } = await axios.get<DataResponse>(url);
  // Todo some error handling?
  return data;
};

main();

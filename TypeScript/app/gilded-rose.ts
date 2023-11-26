import { Item } from "./Item";
import { updateItemFunctionByTypeDictionary, updateRegular } from "./item-update-functions";

// Notes:
// I assumed from the TextTests that all the special items all always have the same name, i.e.
// Conjured items will always be named "Conjured Mana Cake", and not "Conjured ${otherName}"
// Because it is not specified in what other way should the item type be determined

// In the task notes it said to commit often, but I forgot to do it. The scope seemed small and it's weird to commit very WIP code that full of comments and not working code.
// My first idea was basically the same as what I've done here, but it was done in a switch statement.
// I figured if in the future there might be dozens of items types, a switch statement might become unwiedly and hard to read
// So instead I created a seperate update function for each item type and mapped them to each item type with a dictionary.
// Now if a new item type needs to be handled we only need to create the update function and add it to the dictionary, no changes are needed here.

// Also wrote the tests firsts before changing the implemetation, easier this way to ensure that nothing breaks after refactoring.

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    this.items.forEach((item, index, items) => {
      let updateFunction = updateItemFunctionByTypeDictionary[item.name];
      if (!updateFunction) {
        updateFunction = updateRegular;
      }
      items[index] = updateFunction(item);
    });

    return this.items;
  }
}

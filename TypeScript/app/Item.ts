// Note: moved to seperate file to avoid circular dependencies in gilded-rose.ts file, because that file depends on item-update-functions.ts and it depends on Item.ts file
export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

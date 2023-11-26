import {
  BACKSTAGE_INCREASE_DATE_1,
  BACKSTAGE_INCREASE_DATE_2,
  MAX_QUALITY,
  MIN_QUALITY,
  AGED_BRIE,
  SULFURAS,
  PASSES,
  CONJURED,
} from "./constants";
import { Item } from "./Item";

const getBackstagePassIncreaseIncrement = (sellIn: number) => {
  if (sellIn >= BACKSTAGE_INCREASE_DATE_1) {
    return 1;
  } else if (sellIn >= BACKSTAGE_INCREASE_DATE_2) {
    return 2;
  } else {
    return 3;
  }
};

const updateAgedBrie = (item: Item) => {
  const sellIn = item.sellIn - 1;
  let quality = sellIn >= 0 ? item.quality + 1 : item.quality + 2;
  quality = quality > MAX_QUALITY ? MAX_QUALITY : quality;
  return { sellIn, quality, name: item.name };
};

const updateBackstagePasses = (item: Item) => {
  const sellIn = item.sellIn - 1;
  let quality = item.quality + getBackstagePassIncreaseIncrement(sellIn);
  quality = quality > MAX_QUALITY ? MAX_QUALITY : quality;
  quality = sellIn >= 0 ? quality : 0;
  return { sellIn, quality, name: item.name };
};

const updateSulfuras = (item: Item) => item;

const updateConjured = (item: Item) => {
  const sellIn = item.sellIn - 1;
  let quality = sellIn >= 0 ? item.quality - 2 : item.quality - 4;
  quality = quality < MIN_QUALITY ? MIN_QUALITY : quality;
  return { sellIn, quality, name: item.name };
};

export const updateRegular = (item: Item) => {
  const sellIn = item.sellIn - 1;
  let quality = sellIn >= 0 ? item.quality - 1 : item.quality - 2;
  quality = quality < MIN_QUALITY ? MIN_QUALITY : quality;
  return { sellIn, quality, name: item.name };
};

export const updateItemFunctionByTypeDictionary = {
  [AGED_BRIE]: updateAgedBrie,
  [SULFURAS]: updateSulfuras,
  [PASSES]: updateBackstagePasses,
  [CONJURED]: updateConjured,
};

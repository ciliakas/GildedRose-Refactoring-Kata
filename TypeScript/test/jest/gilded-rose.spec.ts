import { CONJURED, PASSES, SULFURAS, AGED_BRIE } from "@/constants";
import { GildedRose } from "@/gilded-rose";
import { Item } from "@/Item";

describe("Gilded Rose", () => {
  it("should not decrease quality below 0", () => {
    const gildedRose = new GildedRose([new Item("foo", 1, 1)]);
    expect(gildedRose.updateQuality()).toEqual([{ name: "foo", sellIn: 0, quality: 0 }]);
    expect(gildedRose.updateQuality()).toEqual([{ name: "foo", sellIn: -1, quality: 0 }]);
    expect(gildedRose.updateQuality()).toEqual([{ name: "foo", sellIn: -2, quality: 0 }]);
  });

  it("should decrease quality and sellIn values by 1 after every day for regular items", () => {
    const gildedRose = new GildedRose([new Item("foo", 3, 3)]);
    expect(gildedRose.updateQuality()).toEqual([{ name: "foo", sellIn: 2, quality: 2 }]);
    expect(gildedRose.updateQuality()).toEqual([{ name: "foo", sellIn: 1, quality: 1 }]);
    expect(gildedRose.updateQuality()).toEqual([{ name: "foo", sellIn: 0, quality: 0 }]);
  });

  it("if sellIn value is below 0, should decrease quality value by 2 after every day for regular items", () => {
    const gildedRose = new GildedRose([new Item("foo", 1, 6)]);
    expect(gildedRose.updateQuality()).toEqual([{ name: "foo", sellIn: 0, quality: 5 }]);
    expect(gildedRose.updateQuality()).toEqual([{ name: "foo", sellIn: -1, quality: 3 }]);
    expect(gildedRose.updateQuality()).toEqual([{ name: "foo", sellIn: -2, quality: 1 }]);
  });

  describe("Conjured", () => {
    it("should decrease quality by 2 after every day", () => {
      const gildedRose = new GildedRose([new Item(CONJURED, 3, 5)]);
      expect(gildedRose.updateQuality()).toEqual([{ name: CONJURED, sellIn: 2, quality: 3 }]);
      expect(gildedRose.updateQuality()).toEqual([{ name: CONJURED, sellIn: 1, quality: 1 }]);
      expect(gildedRose.updateQuality()).toEqual([{ name: CONJURED, sellIn: 0, quality: 0 }]);
    });

    it("if sellIn value is below 0, should decrease quality value by 4 after every day", () => {
      const gildedRose = new GildedRose([new Item(CONJURED, 1, 9)]);
      expect(gildedRose.updateQuality()).toEqual([{ name: CONJURED, sellIn: 0, quality: 7 }]);
      expect(gildedRose.updateQuality()).toEqual([{ name: CONJURED, sellIn: -1, quality: 3 }]);
      expect(gildedRose.updateQuality()).toEqual([{ name: CONJURED, sellIn: -2, quality: 0 }]);
    });
  });

  describe("Backstage passes", () => {
    it("should increase in quality by 1 everyday if sellIn value is 10 and above", () => {
      const gildedRose = new GildedRose([new Item(PASSES, 13, 5)]);
      expect(gildedRose.updateQuality()).toEqual([{ name: PASSES, sellIn: 12, quality: 6 }]);
      expect(gildedRose.updateQuality()).toEqual([{ name: PASSES, sellIn: 11, quality: 7 }]);
      expect(gildedRose.updateQuality()).toEqual([{ name: PASSES, sellIn: 10, quality: 8 }]);
    });

    it("should increase in quality by 2 everyday if sellIn value is below 10", () => {
      const gildedRose = new GildedRose([new Item(PASSES, 12, 5)]);
      expect(gildedRose.updateQuality()).toEqual([{ name: PASSES, sellIn: 11, quality: 6 }]);
      expect(gildedRose.updateQuality()).toEqual([{ name: PASSES, sellIn: 10, quality: 7 }]);
      expect(gildedRose.updateQuality()).toEqual([{ name: PASSES, sellIn: 9, quality: 9 }]);
      expect(gildedRose.updateQuality()).toEqual([{ name: PASSES, sellIn: 8, quality: 11 }]);
    });

    it("should increase in quality by 3 everyday if sellIn value is below 6", () => {
      const gildedRose = new GildedRose([new Item(PASSES, 7, 5)]);
      expect(gildedRose.updateQuality()).toEqual([{ name: PASSES, sellIn: 6, quality: 7 }]);
      expect(gildedRose.updateQuality()).toEqual([{ name: PASSES, sellIn: 5, quality: 9 }]);
      expect(gildedRose.updateQuality()).toEqual([{ name: PASSES, sellIn: 4, quality: 12 }]);
      expect(gildedRose.updateQuality()).toEqual([{ name: PASSES, sellIn: 3, quality: 15 }]);
    });

    it("should drop quality to 0 if sellIn value falls below 0", () => {
      const gildedRose = new GildedRose([new Item(PASSES, 2, 5)]);
      expect(gildedRose.updateQuality()).toEqual([{ name: PASSES, sellIn: 1, quality: 8 }]);
      expect(gildedRose.updateQuality()).toEqual([{ name: PASSES, sellIn: 0, quality: 11 }]);
      expect(gildedRose.updateQuality()).toEqual([{ name: PASSES, sellIn: -1, quality: 0 }]);
    });

    it("should not increase quality value above 50", () => {
      const gildedRose = new GildedRose([new Item(PASSES, 4, 46)]);
      expect(gildedRose.updateQuality()).toEqual([{ name: PASSES, sellIn: 3, quality: 49 }]);
      expect(gildedRose.updateQuality()).toEqual([{ name: PASSES, sellIn: 2, quality: 50 }]);
      expect(gildedRose.updateQuality()).toEqual([{ name: PASSES, sellIn: 1, quality: 50 }]);
    });
  });

  describe("Sulfuras", () => {
    it("should not change quality or sellIn as days pass", () => {
      const gildedRose = new GildedRose([new Item(SULFURAS, 2, 80)]);
      expect(gildedRose.updateQuality()).toEqual([{ name: SULFURAS, sellIn: 2, quality: 80 }]);
      expect(gildedRose.updateQuality()).toEqual([{ name: SULFURAS, sellIn: 2, quality: 80 }]);
      expect(gildedRose.updateQuality()).toEqual([{ name: SULFURAS, sellIn: 2, quality: 80 }]);
    });
  });

  describe("Aged brie", () => {
    it("should increase in quality by 1 everyday", () => {
      const gildedRose = new GildedRose([new Item(AGED_BRIE, 3, 2)]);
      expect(gildedRose.updateQuality()).toEqual([{ name: AGED_BRIE, sellIn: 2, quality: 3 }]);
      expect(gildedRose.updateQuality()).toEqual([{ name: AGED_BRIE, sellIn: 1, quality: 4 }]);
      expect(gildedRose.updateQuality()).toEqual([{ name: AGED_BRIE, sellIn: 0, quality: 5 }]);
    });

    it("if sellIn value is below 0, should increase in quality by 2 everyday", () => {
      const gildedRose = new GildedRose([new Item(AGED_BRIE, 2, 2)]);
      expect(gildedRose.updateQuality()).toEqual([{ name: AGED_BRIE, sellIn: 1, quality: 3 }]);
      expect(gildedRose.updateQuality()).toEqual([{ name: AGED_BRIE, sellIn: 0, quality: 4 }]);
      expect(gildedRose.updateQuality()).toEqual([{ name: AGED_BRIE, sellIn: -1, quality: 6 }]);
      expect(gildedRose.updateQuality()).toEqual([{ name: AGED_BRIE, sellIn: -2, quality: 8 }]);
    });

    it("should not increase quality value above 50", () => {
      const gildedRose = new GildedRose([new Item(AGED_BRIE, 5, 48)]);
      expect(gildedRose.updateQuality()).toEqual([{ name: AGED_BRIE, sellIn: 4, quality: 49 }]);
      expect(gildedRose.updateQuality()).toEqual([{ name: AGED_BRIE, sellIn: 3, quality: 50 }]);
      expect(gildedRose.updateQuality()).toEqual([{ name: AGED_BRIE, sellIn: 2, quality: 50 }]);
    });
  });
});

import { ActionTypes } from "./Enums";

export class Spell {
  name: string;
  level: number;
  castTime: ActionTypes;
  range: number;
  effect: string;
  spellLists: SpellListTag[];

  constructor(
    name: string,
    level: number,
    castTime: ActionTypes,
    range: number,
    effect: string,
    spellLists: SpellListTag[]
  ) {
    this.name = name;
    this.level = level;
    this.castTime = castTime;
    this.effect = effect;
    this.spellLists = spellLists;
  }
}

export class SpellListTag {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

export const SpellLists = {
  artificer: new SpellListTag("Artificer"),
  sorcerer: new SpellListTag("Sorcerer"),
  wizard: new SpellListTag("Wizard"),
  druid: new SpellListTag("Druid"),
  ranger: new SpellListTag("Ranger"),
};

export const Spells = {
  levitate: new Spell(
    "Levitate",
    2,
    ActionTypes.Action,
    60,
    "One creature or loose object of your choice that you can see within range rises vertically, up to 20 feet, and remains suspended there for the duration. The spell can levitate a target that weighs up to 500 pounds. An unwilling creature that succeeds on a Constitution saving throw is unaffected. \nThe target can move only by pushing or pulling against a fixed object or surface within reach (such as a wall or a ceiling), which allows it to move as if it were climbing. You can change the target's altitude by up to 20 feet in either direction on your turn. If you are the target, you can move up or down as part of your move. Otherwise, you can use your action to move the target, which must remain within the spell's range. \nWhen the spell ends, the target floats gently to the ground if it is still aloft.",
    [SpellLists.artificer, SpellLists.sorcerer, SpellLists.wizard]
  ),
  passWithoutTrace: new Spell(
    "Pass Without Trace",
    2,
    ActionTypes.Action,
    0,
    "A veil of shadows and silence radiates from you, masking you and your companions from detection. For the duration, each creature you choose within 30 feet of you (including you) has a +10 bonus to Dexterity (Stealth) checks and can't be tracked except by magical means. A creature that receives this bonus leaves behind no tracks or other traces of its passage.",
    [SpellLists.druid, SpellLists.ranger]
  ),
};

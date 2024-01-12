import { ActionTypes } from "./Enums";

export class Spell {
  name: string;
  level: number;
  castTime: ActionTypes;
  range: number;
  effect: string;
  spellLists: SpellListTag[];
  damage;

  constructor(
    name: string,
    level: number,
    castTime: ActionTypes,
    range: number,
    effect: string,
    spellLists: SpellListTag[]
  );
  constructor(
    name: string,
    level: number,
    castTime: ActionTypes,
    range: number,
    effect: string,
    spellLists: SpellListTag[],
    damage: string
  );
  constructor(
    name: string,
    level: number,
    castTime: ActionTypes,
    range: number,
    effect: string,
    spellLists: SpellListTag[],
    damage?
  ) {
    this.name = name;
    this.level = level;
    this.castTime = castTime;
    this.range = range;
    this.effect = effect;
    this.spellLists = spellLists;
    this.damage = damage;
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
  cleric: new SpellListTag("Cleric"),
  bard: new SpellListTag("Bard"),
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
  produceFlame: new Spell(
    "Produce Flame",
    0,
    ActionTypes.Action,
    0,
    "A flickering flame appears in your hand. The flame remains there for the duration and harms neither you nor your equipment. The flame sheds bright light in a 10-foot radius and dim light for an additional 10 feet. The spell ends if you dismiss it as an action or if you cast it again.",
    [SpellLists.druid]
  ),
  burningHands: new Spell(
    "Burning Hands",
    1,
    ActionTypes.Action,
    0,
    "As you hold your hands with thumbs touching and fingers spread, a thin sheet of flames shoots forth from your outstretched fingertips. Each creature in a 15-foot cone must make a Dexterity saving throw. A creature takes 3d6 fire damage on a failed save, or half as much damage on a successful one.",
    [SpellLists.wizard, SpellLists.sorcerer],
    "3d6"
  ),
  shapeWater: new Spell(
    "Shape Water",
    0,
    ActionTypes.Action,
    30,
    "You choose an area of water that you can see within range and that fits within a 5-foot cube.",
    [SpellLists.druid, SpellLists.sorcerer, SpellLists.wizard]
  ),
  createOrDestroyWater: new Spell(
    "Create or Destroy Water",
    1,
    ActionTypes.Action,
    30,
    "You either create or destroy water.",
    [SpellLists.cleric, SpellLists.druid]
  ),
  light: new Spell(
    "Light",
    0,
    ActionTypes.Action,
    0,
    "You touch one object that is no larger than 10 feet in any dimension. Until the spell ends, the object sheds bright light in a 20-foot radius and dim light for an additional 20 feet. The light can be colored as you like. Completely covering the object with something opaque blocks the light. The spell ends if you cast it again or dismiss it as an action.",
    [
      SpellLists.artificer,
      SpellLists.bard,
      SpellLists.cleric,
      SpellLists.sorcerer,
      SpellLists.wizard,
    ]
  ),
};

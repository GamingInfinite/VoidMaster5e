import { Rests, StatNames } from "./Enums";
import type { ItemTag } from "./Items";
import { Spells, Spell } from "./Spells";
import { Skill } from "./Structures";

/**
 * Feature
 *
 * Replaces the FeatureType.Flavor from the previous system
 */
export class Feature {
  name: string;
  description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}

/**
 * ASIFeature
 *
 * Replaces the FeatureType.ASIFeature from the previous system
 */
export class ASIFeature extends Feature {
  stat: StatNames;
  value: number;

  /**
   * ASIFeature
   *
   * Default Ability Score Increase (Class Implementation)
   */
  constructor();
  /**
   * ASIFeature
   *
   * Creates a global Ability Score Increase
   * @param value Increase each Ability Score by this amount
   */
  constructor(value: number);
  /**
   * ASIFeature
   *
   * Creates a specific Ability Score Increase
   * @param value Increase specified Ability Score by this amount
   * @param stat The Ability Score to increase
   */
  constructor(value: number, stat: StatNames);
  constructor(value: number = 0, stat?: StatNames) {
    if (stat == null) {
      if (value == 0) {
        super(
          "Ability Score Increase",
          "You get 2 points to increase your stats, or you may choose a Feat"
        );
      } else {
        super(
          "Ability Score Increase",
          `Your ability scores each increase by ${value}`
        );
      }
    } else {
      super(
        "Ability Score Increase",
        `Your ${stat} score increases by ${value}`
      );
    }
    this.stat = stat;
    this.value = value;
  }
}

export class FeatureSet extends Feature {
  features: Feature[];
  expandable: boolean;
  choice: boolean;
  levels: number[];

  constructor(
    name: string,
    description: string,
    features: Feature[],
    expandable: boolean = true,
    choice: boolean = false,
    levels: number[] = []
  ) {
    super(name, description);
    this.features = features;
    this.expandable = expandable;
    this.choice = choice;
    this.levels = levels;
  }
}

export class FeatureProficiency extends Feature {
  proficiency: Skill | ItemTag;
  half: boolean;

  constructor(skill: Skill, name: string);
  constructor(item: ItemTag, name: string);
  constructor(
    proficiency: Skill | ItemTag,
    name: string,
    half: boolean = false
  ) {
    if (proficiency.constructor === Skill) {
      super(name, `You gain proficiency in the ${proficiency.name}`);
    } else {
      super(name, `You have proficiency with ${proficiency.name}`);
    }
    this.half = half;
  }
}

export class PassiveFeature extends Feature {
  constructor(name: string, description: string) {
    super(name, description);
  }
}

export class ActionFeature extends Feature {
  action;
  charges: number;
  chargeTime: Rests;

  constructor(name: string, description: string, action, charges: number, chargeTime: Rests) {
    super(name, description);
    this.action = action;
    this.charges = charges;
    this.chargeTime = chargeTime;
  }
}

export class SpellFeature extends ActionFeature {
  spellMod: StatNames;

  constructor(name: string, spell: Spell, charges: number, spellMod: StatNames);
  constructor(
    name: string,
    spell: Spell,
    charges: number,
    spellMod: StatNames,
    chargeTime: Rests
  );
  constructor(
    name: string,
    spell: Spell,
    charges: number,
    spellMod: StatNames,
    chargeTime?: Rests
  ) {
    let chargestring = "";
    switch (charges) {
      case 1:
        chargestring = "once";
        break;
      case 2:
        chargestring = "twice";
        break;
      default:
        chargestring = `${charges} times`;
        break;
    }
    if (charges == 0) {
      super(
        name,
        `You know the ${spell.name} cantrip. ${spellMod} is your spellcasting ability for these spells.`,
        spell,
        charges,
        chargeTime
      );
    } else {
      super(
        name,
        `You can cast the ${spell.name} spell ${chargestring} with this trait, requiring no material components, and you regain the ability to cast it this way when you finish a ${chargeTime}. ${spellMod} is your spellcasting ability for this spell.`,
        spell,
        charges,
        chargeTime
      );
    }
    this.spellMod = spellMod;
  }
}

export const RaceFeatures = {
  unendingBreath: new Feature(
    "Unending Breath",
    "You can hold your breath indefinitely while you're not incapacitated."
  ),
  mingleWithTheWind: new SpellFeature(
    "Mingle with the Wind",
    Spells.levitate,
    1,
    StatNames.con,
    Rests.LongRest
  ),
  earthWalk: new Feature(
    "Earth Walk",
    "You can move across difficult terrain made of earth or stone without expending extra movement."
  ),
  mergeWithStone: new SpellFeature(
    "Merge with Stone",
    Spells.passWithoutTrace,
    1,
    StatNames.con,
    Rests.LongRest
  ),
  fireResistance: new Feature(
    "Fire Resistance",
    "You have resistance to fire damage."
  ),
  reachToTheBlaze: new FeatureSet(
    "Reach to the Blaze",
    "You know the produce flame cantrip. Once you reach 3rd level, you can cast the burning hands spell once with this trait as a 1st-level spell, and you regain the ability to cast it this way when you finish a long rest. Constitution is your spellcasting ability for these spells.",
    [
      new SpellFeature("Produce Flame", Spells.produceFlame, 0, StatNames.con),
      new SpellFeature(
        "Burning Hands",
        Spells.burningHands,
        1,
        StatNames.con,
        Rests.LongRest
      ),
    ],
    false,
    false,
    [1, 3]
  ),
  acidResistance: new Feature(
    "Acid Resistance",
    "You have resistance to acid damage."
  ),
  amphibious: new Feature("Amphibious", "You can breathe air and water."),
  swim: new Feature("Swim", "You have a swimming speed of 30 feet."),
  callToTheWave: new FeatureSet(
    "Call to the Wave",
    "You know the shape water cantrip. When you reach 3rd level, you can cast the create or destroy water spell as a 2nd-level spell once with this trait, and you regain the ability to cast it this way when you finish a long rest. Constitution is your spellcasting ability for these spells.",
    [
      new SpellFeature("Shape Water", Spells.shapeWater, 0, StatNames.con),
      new SpellFeature(
        "Create or Destroy Water",
        Spells.createOrDestroyWater,
        1,
        StatNames.con,
        Rests.LongRest
      ),
    ],
    false,
    false,
    [1, 3]
  ),
  lightBearer: new SpellFeature("Light Bearer", Spells.light, 0, StatNames.cha),
  lapineHop: new Feature(
    "Lapine Hop",
    "Your maximum high jump and long jump distances are 10ft. higher than how it would be normally calculated."
  ),
  lucky: new PassiveFeature(
    "Lucky",
    "When you roll a 1 on an attack roll, ability check, or saving throw, you can re-roll the die and must use the new roll."
  ),
  maskOfTheWild: new Feature(
    "Mask of the Wild",
    "You can attempt to hide even when you are only lightly obscured by foliage, heavy rain, falling snow, mist, and other natural phenomena."
  ),
  speakWithSmallBeasts: new Feature(
    "Speak with Small Beasts",
    "Through sounds and gestures, you can communicate simple ideas with Small or smaller beasts."
  ),
};

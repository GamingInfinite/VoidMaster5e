import { FeatureType, Language, Size, StatNames, UnlockType } from "./Enums";
import { Tags, type Tag } from "./Items";

class PlayerCharacter {
  name: string;
  race: Race;
  subRace: SubRace;
  classes: Class[];

  constructor(playerData: PlayerCreationData) {
    this.name = playerData.name;
    this.race = playerData.race;
    this.classes = playerData.classes;
    this.subRace = this.race.subraces[playerData.subRace];
  }
}

export class PlayerCreationData {
  name: string;
  race: Race;
  subRace: number;
  classes: Class[] = [];
  baseStats: StatBlock;

  constructor() {
    this.baseStats = new StatBlock();
  }

  public getTotalLevel() {
    let level = 0;
    for (let classt of this.classes) {
      if (!classt) {
        continue;
      }
      level += classt.level;
    }
    return level;
  }
}

class StatBlock {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;

  constructor() {
    this.str = 10;
    this.dex = 10;
    this.con = 10;
    this.int = 10;
    this.wis = 10;
    this.cha = 10;
  }

  includes(num: number): boolean {
    if (
      this.str == num ||
      this.dex == num ||
      this.con == num ||
      this.int == num ||
      this.wis == num ||
      this.cha == num
    ) {
      return true;
    }
    return false;
  }
}

//SLATED FOR REWORK
export class Feature {
  name: string;
  description: string;
  feature: ArrayLike<unknown> | { [key: string]: unknown };
  type: FeatureType;

  constructor(
    feature: ArrayLike<unknown> | { [key: string]: unknown },
    name: string,
    description: string,
    type: FeatureType
  ) {
    this.feature = feature;
    this.name = name;
    this.description = description;
    this.type = type;
  }
}

class Skill {
  name: string;
  stat: StatNames;

  constructor(name: string, stat: StatNames) {
    this.name = name;
    this.stat = stat;
  }
}

class Race {
  name: string;
  descriptor: string;
  plural: string;
  movement: number;
  maxAge: number;
  size: Size;
  languages: Language[];
  ASIFeatures: Feature[];
  RacialAbilities: Feature[];
  subraces: SubRace[];

  constructor(
    stringArgs: { name: string; descriptor: string; plural: string },
    stats: { movement: number; maxAge: number; size: Size } = {
      movement: 30,
      maxAge: 100,
      size: Size.Medium,
    },
    ASIFeatures: Feature[] = [],
    RacialAbilities: Feature[] = [],
    languages: Language[] = [Language.Common],
    subraces: SubRace[] = []
  ) {
    this.name = stringArgs.name;
    this.descriptor = stringArgs.descriptor;
    this.plural = stringArgs.plural;
    this.movement = stats.movement;
    this.maxAge = stats.maxAge;
    this.size = stats.size;
    this.ASIFeatures = ASIFeatures;
    this.RacialAbilities = RacialAbilities;
    this.languages = languages;
    this.subraces = subraces;
  }
}

class SubRace extends Race {
  constructor(
    stringArgs: { name: string; descriptor: string; plural: string },
    stats: { movement: number; maxAge: number; size: Size } = {
      movement: 30,
      maxAge: 100,
      size: Size.Medium,
    },
    ASIFeatures: Feature[] = [],
    RacialAbilities: Feature[] = [],
    languages: Language[] = []
  ) {
    super(stringArgs, stats, ASIFeatures, RacialAbilities, languages);
  }
}

class Class {
  name: string;
  _level: number;
  features: ClassFeature[][];
  hitDice: number;
  savingThrows: StatNames[];
  skillProficiencies: Skill[];
  armorProficiencies: Tag[];
  weaponProficiencies: Tag[];
  toolProficiencies: Tag[];

  constructor(
    name: string,
    features: ClassFeature[][] = [],
    level = 1,
    dice: number,
    savingThrows: StatNames[],
    skills: Skill[],
    armor: Tag[] = [],
    weapons: Tag[] = [],
    tools: Tag[] = []
  ) {
    this.name = name;
    this.features = features;
    this._level = level;
    this.hitDice = dice;
    this.savingThrows = savingThrows;
    this.skillProficiencies = skills;
    this.armorProficiencies = armor;
    this.weaponProficiencies = weapons;
    this.toolProficiencies = tools;
  }
  public get level() {
    return this._level;
  }

  public set level(value: number) {
    this._level = value;
    let archLevelSet = 0;
    let archLevelIndex = 0;
    let indexSkip = false;
    let archLevel = 1;
    let levelIndex = 1;
    for (let list of this.features) {
      if (levelIndex > value) {
        continue;
      }
      archLevelIndex = 0;
      for (let feature of list) {
        if (feature.type == FeatureType.ArchetypeLevel) {
          archLevel++;
        }
        if (feature.type == FeatureType.Set && Array.isArray(feature.feature)) {
          for (let archetype of feature.feature) {
            if (archetype.constructor === Archetype && !indexSkip) {
              indexSkip = true;
            }
          }
        }
        if (indexSkip) {
          continue;
        }
        archLevelIndex++;
      }
      levelIndex++;
      if (indexSkip) {
        continue;
      }
      archLevelSet++;
    }
    let ArchetypeList;
    if (this.features[archLevelSet][archLevelIndex] != undefined) {
      ArchetypeList = this.features[archLevelSet][archLevelIndex].feature;
    }
    if (ArchetypeList) {
      if (Array.isArray(ArchetypeList)) {
        for (let feature of ArchetypeList) {
          if (feature.constructor === Archetype) {
            feature.level = archLevel;
          }
        }
      }
      this.features[archLevelSet][archLevelIndex].feature = ArchetypeList;
    }
  }
}

//SLATED FOR REWORK
class ClassFeature extends Feature {
  constructor(
    feature:
      | ArrayLike<FightingStyle | Archetype | ClassFeature[]>
      | { [key: string]: unknown },
    name: string,
    description: string,
    type: FeatureType
  ) {
    super(feature, name, description, type);
  }
}

export class Archetype extends ClassFeature {
  level: number;
  constructor(
    name: string,
    description: string,
    level: number,
    features: ClassFeature[][]
  ) {
    super(features, name, description, FeatureType.Archetype);
    this.level = level;
  }
}

class FightingStyle extends Feature {
  constructor(
    feature: { [key: string]: unknown },
    name: string,
    description: string,
    type: FeatureType
  ) {
    super(feature, name, description, type);
  }
}

export const Skills = {
  athletics: new Skill("Athletics", StatNames.str),
  acrobatics: new Skill("Acrobatics", StatNames.dex),
  sleightOfHand: new Skill("Sleight of Hand", StatNames.dex),
  stealth: new Skill("Stealth", StatNames.dex),
  arcana: new Skill("Arcana", StatNames.int),
  history: new Skill("History", StatNames.int),
  investigation: new Skill("Investigation", StatNames.int),
  nature: new Skill("Nature", StatNames.int),
  religion: new Skill("Religion", StatNames.int),
  animalHandling: new Skill("Animal Handling", StatNames.wis),
  insight: new Skill("Insight", StatNames.wis),
  medicine: new Skill("Medicine", StatNames.wis),
  perception: new Skill("Perception", StatNames.wis),
  survival: new Skill("Survival", StatNames.wis),
  deception: new Skill("Deception", StatNames.cha),
  intimidation: new Skill("Intimidation", StatNames.cha),
  performance: new Skill("Performance", StatNames.cha),
  persuasion: new Skill("Persuasion", StatNames.cha),
};

export const RaceFeatures = {
  lapineHop: new Feature(
    {},
    "Lapine Hop",
    "Your maximum high jump and long jump distances are 10ft. higher than how it would be normally calculated.",
    FeatureType.RaceFeature
  ),
  lucky: new Feature(
    { reroll: 1 },
    "Lucky",
    "When you roll a 1 on an attack roll, ability check, or saving throw, you can re-roll the die and must use the new roll.",
    FeatureType.RaceFeature
  ),
  maskOfTheWild: new Feature(
    {},
    "Mask of the Wild",
    "You can attempt to hide even when you are only lightly obscured by foliage, heavy rain, falling snow, mist, and other natural phenomena.",
    FeatureType.RaceFeature
  ),
  speakWithSmallAnimals: new Feature(
    {},
    "Speak with Small Beasts",
    "Through sounds and gestures, you can communicate simple ideas with Small or smaller beasts.",
    FeatureType.RaceFeature
  ),
  unendingBreath: new Feature(
    {},
    "Unending Breath",
    "You can hold your breath indefinitely while you're not incapacitated.",
    FeatureType.RaceFeature
  ),
  mingleWithTheWind: new Feature(
    {}, //add Levitate spell
    "Mingle with the Wind",
    "You can cast the levitate spell once with this trait, requiring no material components, and you regain the ability to cast it this way when you finish a long rest. Constitution is your spellcasting ability for this spell.",
    FeatureType.RaceFeature
  ),
  earthWalk: new Feature(
    {}, //Moves across difficult terrain
    "Earth Walk",
    "You can move across difficult terrain made of earth or stone without expending extra movement.",
    FeatureType.RaceFeature
  ),
  mergeWithStone: new Feature(
    {}, //add Pass Without Trace spell
    "Merge with Stone",
    "You can cast the pass without trace spell once with this trait, requiring no material components, and you regain the ability to cast it this way when you finish a long rest. Constitution is your spellcasting ability for this spell.",
    FeatureType.RaceFeature
  ),
  fireResistance: new Feature(
    {}, //Resistant to Fire Damage
    "Fire Resistance",
    "You have resistance to fire damage.",
    FeatureType.RaceFeature
  ),
  reachToTheBlaze: new Feature(
    {}, //Add spell Produce Flame and Burning Hands
    "Reach to the Blaze",
    "You know the produce flame cantrip. Once you reach 3rd level, you can cast the burning hands spell once with this trait as a 1st-level spell, and you regain the ability to cast it this way when you finish a long rest. Constitution is your spellcasting ability for these spells.",
    FeatureType.RaceFeature
  ),
  acidResistance: new Feature(
    {}, //Resistance to Acid
    "Acid Resistance",
    "You have resistance to acid damage.",
    FeatureType.RaceFeature
  ),
  amphibious: new Feature(
    {}, //Underwater breathing
    "Amphibious",
    "You can breathe air and water.",
    FeatureType.RaceFeature
  ),
  swim: new Feature(
    {}, //Underwater movement speed of 30 feet
    "Swim",
    "You have a swimming speed of 30 feet.",
    FeatureType.RaceFeature
  ),
  callToTheWave: new Feature(
    {}, //Add spell Shape Water and Create or Destory Water
    "Call to the Wave",
    "You know the shape water cantrip. When you reach 3rd level, you can cast the create or destroy water spell as a 2nd-level spell once with this trait, and you regain the ability to cast it this way when you finish a long rest. Constitution is your spellcasting ability for these spells.",
    FeatureType.RaceFeature
  ),
  darkvision: new Feature(
    {}, //Can see in d=non-magical darkness
    "Darkvision",
    "Blessed with a radiant soul, your vision can easily cut through darkness. You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
    FeatureType.RaceFeature
  ),
  celestialResistance: new Feature(
    {}, //Resistant to Necrotic and Radiant damage
    "Celestial Resistance",
    "You have resistance to necrotic damage and radiant damage.",
    FeatureType.RaceFeature
  ),
  healingHands: new Feature(
    {}, //Touching a creature heals it equal to your level
    "Healing Hands",
    "As an action, you can touch a creature and cause it to regain a number of hit points equal to your level. Once you use this trait, you can't use it again until you finish a long rest.",
    FeatureType.RaceFeature
  ),
  lightBearer: new Feature(
    {}, //Add Light cantrip
    "Light Bearer",
    "You know the light cantrip. Charisma is your spellcasting ability for it.",
    FeatureType.RaceFeature
  ),
  necroticShroud: new Feature(
    {}, //Charisma Saving Throw DC 8 + your proficiency bonus + your Charisma modifier, Starts at 3rd Level, add Frightened effect, deal extra nectoric damage by level, cant use again till taken long rest, ALL creatures within 10 feet of you become Frightned of YOU if fail save
    "Necrotic Shroud",
    "Starting at 3rd level, you can use your action to unleash the divine energy within yourself, causing your eyes to turn into pools of darkness and two skeletal, ghostly, flightless wings to sprout from your back. The instant you transform, other creatures within 10 feet of you that can see you must succeed on a Charisma saving throw (DC 8 + your proficiency bonus + your Charisma modifier) or become frightened of you until the end of your next turn.  Your transformation lasts for 1 minute or until you end it as a bonus action. During it, once on each of your turns, you can deal extra necrotic damage to one target when you deal damage to it with an attack or a spell. The extra necrotic damage equals your level. Once you use this trait, you can't use it again until you finish a long rest.",
    FeatureType.RaceFeature
  ),
  radiantSoul: new Feature(
    {}, //Flying 30 feet, starts at 3rd Level, takes an Action, lasts for 1 minute, once on each turn, extra radiant damage using a spell or attack to ONE person, recharges after long rest, damage equal to level
    "Radiant Soul",
    "Starting at 3rd level, you can use your action to unleash the divine energy within yourself, causing your eyes to glimmer and two luminous, incorporeal wings to sprout from your back. Your transformation lasts for 1 minute or until you end it as a bonus action. During it, you have a flying speed of 30 feet, and once on each of your turns, you can deal extra radiant damage to one target when you deal damage to it with an attack or a spell. The extra radiant damage equals your level. Once you use this trait, you can't use it again until you finish a long rest",
    FeatureType.RaceFeature
  ),
  radiantConsumption: new Feature(
    {}, //starts  at 3rd level, transformation lasts one minute or until you use abonus action to cancel it, shed bright light in 10 foot radius and dim light dor an adition 10 feet, at the end of each of turns do radiant damage to YOURSELF and ANY CREATURE WITHIN 10 FEET,
    "Radiant Consumtion",
    "Starting at 3rd level, you can use your action to unleash the divine energy within yourself, causing a searing light to radiate from you, pour out of your eyes and mouth, and threaten to char you. \nYour transformation lasts for 1 minute or until you end it as a bonus action. During it, you shed bright light in a 10-foot radius and dim light for an additional 10 feet, and at the end of each of your turns, you and each creature within 10 feet of you take radiant damage equal to half your level (rounded up). In addition, once on each of your turns, you can deal extra radiant damage to one target when you deal damage to it with an attack or a spell. The extra radiant damage equals your level. \nOnce you use this trait, you can't use it again until you finish a long rest.",
    FeatureType.RaceFeature
  ),
};

export const FightingStyles = {
  archery: new FightingStyle(
    { ranged: 2 },
    "Archery",
    "You gain a +2 bonus to attack rolls you make with ranged weapons.",
    FeatureType.FightingStyle
  ),
  blindFighting: new FightingStyle(
    { blindsight: 10 },
    "Blind Fighting",
    "You have blindsight with a range of 10 feet. Within that range, you can effectively see anything that isn't behind total cover, even if you're blinded or in darkness. Moreover, you can see an invisible creature within that range, unless the creature successfully hides from you.",
    FeatureType.FightingStyle
  ),
  defense: new FightingStyle(
    { armor: 1 },
    "Defense",
    "While you are wearing armor, you gain a +1 bonus to AC.",
    FeatureType.FightingStyle
  ),
  dueling: new FightingStyle(
    { sword: 2 },
    "Dueling",
    "When you are wielding a melee weapon in one hand and no other weapons, you gain a +2 bonus to damage rolls with that weapon.",
    FeatureType.FightingStyle
  ),
  greatWeaponFighting: new FightingStyle(
    {},
    "Great Weapon Fighting",
    "When you roll a 1 or 2 on a damage die for an attack you make with a melee weapon that you are wielding with two hands, you can reroll the die and must use the new roll, even if the new roll is a 1 or a 2. The weapon must have the two-handed or versatile property for you to gain this benefit.",
    FeatureType.FightingStyle
  ),
  gunner: new FightingStyle(
    {},
    "Gunner",
    "You gain a +2 bonus to attack rolls you make with your Gunner Shot Attack action.",
    FeatureType.FightingStyle
  ),
  interception: new FightingStyle(
    {},
    "Interception",
    "When a creature you can see hits a target, other than you, within 5 feet of you with an attack, you can use your reaction to reduce the damage the target takes by 1d10 + your proficiency bonus (to a minimum of 0 damage). You must be wielding a shield or a simple or martial weapon to use this reaction.",
    FeatureType.FightingStyle
  ),
  protection: new FightingStyle(
    {},
    "Protection",
    "When a creature you can see attacks a target other than you that is within 5 feet of you, you can use your reaction to impose disadvantage on the attack roll.",
    FeatureType.FightingStyle
  ),
  superiorTechnique: new FightingStyle(
    {},
    "Superior Technique",
    "You learn one maneuver of your choice from among those available to the Battle Master archetype. If a maneuver you use requires your target to make a saving throw to resist the maneuver's effects, the saving throw DC equals 8 + your proficiency bonus + your Strength or Dexterity modifier (your choice). \nYou gain one superiority die, which is a d6 (this die is added to any superiority dice you have from another source). This die is used to fuel your maneuvers. A superiority die is expended when you use it. You regain your expended superiority dice when you finish a short or long rest.",
    FeatureType.FightingStyle
  ),
  thrownWeaponFighting: new FightingStyle(
    {},
    "Thrown Weapon Fighting",
    "You can draw a weapon that has the thrown property as part of the attack you make with the weapon. \nIn addition, when you hit with a ranged attack using a thrown weapon, you gain a +2 bonus to the damage roll.",
    FeatureType.FightingStyle
  ),
  twoWeaponFighting: new FightingStyle(
    {},
    "Two-Weapon Fighting",
    "When you engage in two-weapon fighting, you can add your ability modifier to the damage of the second attack.",
    FeatureType.FightingStyle
  ),
  unarmedFighting: new FightingStyle(
    {},
    "Unarmed Fighting",
    "Your unarmed strikes can deal bludgeoning damage equal to 1d6 + your Strength modifier on a hit. If you aren't wielding any weapons or a shield when you make the attack roll, the d6 becomes a d8. \nAt the start of each of your turns, you can deal 1d4 bludgeoning damage to one creature grappled by you.",
    FeatureType.FightingStyle
  ),
};

const ArcaneShots = {
  banishing: new ClassFeature(
    {},
    "Banishing Arrow",
    "You use abjuration magic to try to temporarily banish your target to a harmless location in the Feywild. The creature hit by the arrow must also succeed on a Charisma saving throw or be banished. While banished in this way, the target's speed is 0, and it is incapacitated. At the end of its next turn, the target reappears in the space it vacated or in the nearest unoccupied space if that space is occupied.",
    FeatureType.Action
  ),
  beguiling: new ClassFeature(
    {},
    "Beguiling Arrow",
    "Your enchantment magic causes this arrow to temporarily beguile its target. The creature hit by the arrow takes an extra 2d6 psychic damage, and choose one of your allies within 30 feet of the target. The target must succeed on a Wisdom saving throw, or it is charmed by the chosen ally until the start of your next turn. This effect ends early if the chosen ally attacks the charmed target, deals damage to it, or forces it to make a saving throw.",
    FeatureType.Action
  ),
  bursting: new ClassFeature(
    {},
    "Bursting Arrow",
    "You imbue your arrow with force energy drawn from the school of evocation. The energy detonates after your attack. Immediately after the arrow hits the creature, the target and all other creatures within 10 feet of it take 2d6 force damage each.",
    FeatureType.Action
  ),
  enfeebling: new ClassFeature(
    {},
    "Enfeebling Arrow",
    "You weave necromantic magic into your arrow. The creature hit by the arrow takes an extra 2d6 necrotic damage. The target must also succeed on a Constitution saving throw, or the damage dealt by its weapon attacks is halved until the start of your next turn.",
    FeatureType.Action
  ),
  grasping: new ClassFeature(
    {},
    "Grasping Arrow",
    "When this arrow strikes its target, conjuration magic creates grasping, poisonous brambles, which wrap around the target. The creature hit by the arrow takes an extra 2d6 poison damage, its speed is reduced by 10 feet, and it takes 2d6 slashing damage the first time on each turn it moves 1 foot or more without teleporting. The target or any creature that can reach it can use its action to remove the brambles with a successful Strength (Athletics) check against your Arcane Shot save DC. Otherwise, the brambles last for 1 minute or until you use this option again.",
    FeatureType.Action
  ),
  piercing: new ClassFeature(
    {},
    "Piercing Arrow",
    "You use transmutation magic to give your arrow an ethereal quality. When you use this option, you don't make an attack roll for the attack. Instead, the arrow shoots forward in a line, which is 1 foot wide and 30 feet long, before disappearing. The arrow passes harmlessly through objects, ignoring cover. Each creature in that line must make a Dexterity saving throw. On a failed save, a creature takes damage as if it were hit by the arrow, plus an extra 1d6 piercing damage. On a successful save, a target takes half as much damage.",
    FeatureType.Action
  ),
  seeking: new ClassFeature(
    {},
    "Seeking Arrow",
    "Using divination magic, you grant your arrow the ability to seek out a target. When you use this option, you don't make an attack roll for the attack. Instead, choose one creature you have seen in the past minute. The arrow flies toward that creature, moving around corners if necessary and ignoring three-quarters cover and half cover. If the target is within the weapon's range and there is a path large enough for the arrow to travel to the target, the target must make a Dexterity saving throw. Otherwise, the arrow disappears after traveling as far as it can. On a failed save, the target takes damage as if it were hit by the arrow, plus an extra 1d6 force damage, and you learn the target's current location. On a successful save, the target takes half as much damage, and you don't learn its location.",
    FeatureType.Action
  ),
  shadow: new ClassFeature(
    {},
    "Shadow Arrow",
    "You weave illusion magic into your arrow, causing it to occlude your foe's vision with shadows. The creature hit by the arrow takes an extra 2d6 psychic damage, and it must succeed on a Wisdom saving throw or be unable to see anything farther than 5 feet away until the start of your next turn.",
    FeatureType.Action
  ),
};

const Manuevers = {
  commanderStrike: new ClassFeature(
    {},
    "Commander's Strike",
    "When you take the Attack action on your turn, you can forgo one of your attacks and use a bonus action to direct one of your companions to strike. When you do so, choose a friendly creature who can see or hear you and expend one superiority die. That creature can immediately use its reaction to make one weapon attack, adding the superiority die to the attack's damage roll.",
    FeatureType.Action
  ),
  disarmingAttack: new ClassFeature(
    {},
    "Disarming Attack",
    "When you hit a creature with a weapon attack, you can expend one superiority die to attempt to disarm the target, forcing it to drop one item of your choice that it's holding. You add the superiority die to the attack's damage roll, and the target must make a Strength saving throw. On a failed save, it drops the object you choose. The object lands at its feet.",
    FeatureType.Action
  ),
  distractingAttack: new ClassFeature(
    {},
    "Distracting Strike",
    "When you hit a creature with a weapon attack, you can expend one superiority die to distract the creature, giving your allies an opening. You add the superiority die to the attack's damage roll. The next attack roll against the target by an attacker other than you has advantage if the attack is made before the start of your next turn.",
    FeatureType.Action
  ),
  evasiveFootwork: new ClassFeature(
    {},
    "Evasive Footwork",
    "When you move, you can expend one superiority die, rolling the die and adding the number rolled to your AC until you stop moving.",
    FeatureType.Action
  ),
  feintingAttack: new ClassFeature(
    {},
    "Feinting Attack",
    "You can expend one superiority die and use a bonus action on your turn to feint, choosing one creature within 5 feet of you as your target. You have advantage on your next attack roll against that creature this turn. If that attack hits, add the superiority die to the attack's damage roll.",
    FeatureType.Action
  ),
  goadingAttack: new ClassFeature(
    {},
    "Goading Attack",
    "When you hit a creature with a weapon attack, you can expend one superiority die to attempt to goad the target into attacking you. You add the superiority die to the attack's damage roll, and the target must make a Wisdom saving throw. On a failed save, the target has disadvantage on all attack rolls against targets other than you until the end of your next turn.",
    FeatureType.Action
  ),
  lungingAttack: new ClassFeature(
    {},
    "Lunging Attack",
    "When you make a melee weapon attack on your turn, you can expend one superiority die to increase your reach for that attack by 5 feet. If you hit, you add the superiority die to the attack's damage roll.",
    FeatureType.Action
  ),
  maneuveringAttack: new ClassFeature(
    {},
    "Maneuvering Attack",
    "When you hit a creature with a weapon attack, you can expend one superiority die to maneuver one of your comrades into a more advantageous position. You add the superiority die to the attack's damage roll, and you choose a friendly creature who can see or hear you. That creature can use its reaction to move up to half its speed without provoking opportunity attacks from the target of your attack.",
    FeatureType.Action
  ),
  menacingAttack: new ClassFeature(
    {},
    "Menacing Attack",
    "When you hit a creature with a weapon attack, you can expend one superiority die to attempt to frighten the target. You add the superiority die to the attack's damage roll, and the target must make a Wisdom saving throw. On a failed save, it is frightened of you until the end of your next turn.",
    FeatureType.Action
  ),
  parry: new ClassFeature(
    {},
    "Parry",
    "When another creature damages you with a melee attack, you can use your reaction and expend one superiority die to reduce the damage by the number you roll on your superiority die + your Dexterity modifier.",
    FeatureType.Action
  ),
  precisionAttack: new ClassFeature(
    {},
    "Precision Attack",
    "When you make a weapon attack roll against a creature, you can expend one superiority die to add it to the roll. You can use this maneuver before or after making the attack roll, but before any effects of the attack are applied.",
    FeatureType.Action
  ),
  pushingAttack: new ClassFeature(
    {},
    "Pushing Attack",
    "When you hit a creature with a weapon attack, you can expend one superiority die to attempt to drive the target back. You add the superiority die to the attack's damage roll, and if the target is Large or smaller, it must make a Strength saving throw. On a failed save, you push the target up to 15 feet away from you.",
    FeatureType.Action
  ),
  rally: new ClassFeature(
    {},
    "Rally",
    "On your turn, you can use a bonus action and expend one superiority die to bolster the resolve of one of your companions. When you do so, choose a friendly creature who can see or hear you. That creature gains temporary hit points equal to the superiority die roll + your Charisma modifier",
    FeatureType.Action
  ),
  riposte: new ClassFeature(
    {},
    "Riposte",
    "When a creature misses you with a melee attack, you can use your reaction and expend one superiority die to make a melee weapon attack against the creature. If you hit, you add the superiority die to the attack's damage roll.",
    FeatureType.Action
  ),
  sweepingAttack: new ClassFeature(
    {},
    "Sweeping Attack",
    "When you hit a creature with a melee weapon attack, you can expend one superiority die to attempt to damage another creature with the same attack. Choose another creature within 5 feet of the original target and within your reach. If the original attack roll would hit the second creature, it takes damage equal to the number you roll on your superiority die. The damage is of the same type dealt by the original attack.",
    FeatureType.Action
  ),
  tripAttack: new ClassFeature(
    {},
    "Trip Attack",
    "When you hit a creature with a weapon attack, you can expend one superiority die to attempt to knock the target down. You add the superiority die to the attack's damage roll, and if the target is Large or smaller, it must make a Strength saving throw. On a failed save, you knock the target prone.",
    FeatureType.Action
  ),
  ambush: new ClassFeature(
    {},
    "Ambush",
    "When you make a Dexterity (Stealth) check or an initiative roll, you can expend one superiority die and add the die to the roll, provided you aren't incapacitated.",
    FeatureType.Action
  ),
  baitSwitch: new ClassFeature(
    {},
    "Bait and Switch",
    "When you're within 5 feet of a creature on your turn, you can expend one superiority die and switch places with that creature, provided you spend at least 5 feet of movement and the creature is willing and isn't incapacitated. This movement doesn't provoke opportunity attacks.",
    FeatureType.Action
  ),
  brace: new ClassFeature(
    {},
    "Brace",
    "When a creature you can see moves into the reach you have with the melee weapon you're wielding, you can use your reaction to expend one superiority die and make one attack against the creature, using that weapon. If the attack hits, add the superiority die to the weapon's damage roll.",
    FeatureType.Action
  ),
  commandingPresence: new ClassFeature(
    {},
    "Commanding Presence",
    "When you make a Charisma (Intimidation), a Charisma (Performance), or a Charisma (Persuasion) check, you can expend one superiority die and add the superiority die to the ability check.",
    FeatureType.Action
  ),
  grapplingStrike: new ClassFeature(
    {},
    "Grappling Strike",
    "Immediately after you hit a creature with a melee attack on your turn, you can expend one superiority die and then try to grapple the target as a bonus action (see the Player's Handbook for rules on grappling). Add the superiority die to your Strength (Athletics) check.",
    FeatureType.Action
  ),
  quickToss: new ClassFeature(
    {},
    "Quick Toss",
    "As a bonus action, you can expend one superiority die and make a ranged attack with a weapon that has the thrown property. You can draw the weapon as part of making this attack. If you hit, add the superiority die to the weapon's damage roll.",
    FeatureType.Action
  ),
  tacticalAssessment: new ClassFeature(
    {},
    "Tactical Assessment",
    "When you make an Intelligence (Investigation), an Intelligence (History), or a Wisdom (Insight) check, you can expend one superiority die and add the superiority die to the ability check.",
    FeatureType.Action
  ),
};

export const ClassFeatures = {
  //#region Gemerics
  abilityScoreImprovement: new ClassFeature(
    {},
    "Ability Score Increase/Feat",
    "You get 2 points to increase your stats or you can choose a Feat",
    FeatureType.ASIFeat
  ),
  archetypeLevel: new ClassFeature(
    {},
    "Sub Class Feature",
    "You gain a feature granted by your Sub Class.",
    FeatureType.ArchetypeLevel
  ),
  //#endregion
  //#region Fighting Style Sets
  fighterStyle: new ClassFeature(
    [
      FightingStyles.archery,
      FightingStyles.blindFighting,
      FightingStyles.defense,
      FightingStyles.dueling,
      FightingStyles.greatWeaponFighting,
      FightingStyles.interception,
      FightingStyles.protection,
      FightingStyles.superiorTechnique,
      FightingStyles.thrownWeaponFighting,
      FightingStyles.twoWeaponFighting,
      FightingStyles.unarmedFighting,
    ],
    "Fighting Style",
    "You adopt a particular style of fighting as your specialty. Choose one of the following options. You can't take the same Fighting Style option more than once, even if you get to choose again.",
    FeatureType.Set
  ),
  gunbreakerStyle: new ClassFeature(
    [
      FightingStyles.defense,
      FightingStyles.dueling,
      FightingStyles.greatWeaponFighting,
      FightingStyles.gunner,
      FightingStyles.protection,
      FightingStyles.twoWeaponFighting,
    ],
    "Fighting Style",
    "You adopt a particular style of fighting as your specialty, Choose one of the following options. You can't take a Fighting Style option more than once, even if you later get to choose again.",
    FeatureType.Set
  ),
  //#endregion
  secondWind: new ClassFeature(
    { action: "Second Wind" },
    "Second Wind",
    "You have a limited well of stamina that you can draw on to protect yourself from harm. On your turn, you can use a bonus action to regain hit points equal to 1d10 + your fighter level. \nOnce you use this feature, you must finish a short or long rest before you can use it again.",
    FeatureType.Action
  ),
  actionSurge: new ClassFeature(
    { action: "Action Surge" },
    "Action Surge",
    "You can push yourself beyond your normal limits for a moment. On your turn, you can take one additional action. \nOnce you use this feature, you must finish a short or long rest before you can use it again.",
    FeatureType.Action
  ),
  indomitable: new ClassFeature(
    {},
    "Indomitable",
    "You can reroll a saving throw that you fail. If you do so, you must use the new roll, and you can't use this feature again until you finish a long rest.",
    FeatureType.Action
  ),
  extraAttack: new ClassFeature(
    { attack: 1 },
    "Extra Attack",
    "You may make another attack roll when using your Attack action.",
    FeatureType.Action
  ),
  armsSmith: new ClassFeature(
    {},
    "Arms Smith",
    "You have learned how to modify weaponry to incorporate a gunfire into their function. You spend 1 day of time working on your weapon to complete the conversion process.",
    FeatureType.Flavor
  ),
};

export const ClassArchetypes = {
  fighterArchetypes: new ClassFeature(
    [
      new Archetype(
        "Arcane Archer",
        "An Arcane Archer studies a unique elven method of archery that weaves magic into attacks to produce supernatural effects. Arcane Archers are some of the most elite warriors among the elves. They stand watch over the fringes of elven domains, keeping a keen eye out for trespassers and using magic-infused arrows to defeat monsters and invaders before they can reach elven settlements. Over the centuries, the methods of these elf archers have been learned by members of other races who can also balance arcane aptitude with archery.",
        1,
        [
          [
            new ClassFeature(
              {
                unlocks: [
                  {
                    type: UnlockType.SkillProficiency,
                    unlock: [Skills.arcana, Skills.nature],
                  },
                  {
                    type: UnlockType.Spell,
                    unlock: [
                      //List Cantrips when added :P
                    ],
                  },
                ],
              },
              "Arcane Archer Lore",
              "At 3rd level, you learn magical theory or some of the secrets of nature—typical for practitioners of this elven martial tradition. You choose to gain proficiency in either the Arcana or the Nature skill, and you choose to learn either the prestidigitation or the druidcraft cantrip.",
              FeatureType.UnlockSet
            ),
            new ClassFeature(
              [
                ArcaneShots.banishing,
                ArcaneShots.beguiling,
                ArcaneShots.bursting,
                ArcaneShots.enfeebling,
                ArcaneShots.grasping,
                ArcaneShots.piercing,
                ArcaneShots.seeking,
                ArcaneShots.shadow,
              ],
              "Arcane Shot",
              "You learn to unleash special magical effects with some of your shots. When you gain this feature, you learn two Arcane Shot options of your choice. \nOnce per turn when you fire an arrow from a shortbow or longbow as part of the Attack action, you can apply one of your Arcane Shot options to that arrow. You decide to use the option when the arrow hits a creature, unless the option doesn't involve an attack roll. You have two uses of this ability, and you regain all expended uses of it when you finish a short or long rest.",
              FeatureType.Set
            ),
          ],
          [
            new ClassFeature(
              {},
              "Magic Arrow",
              "You gain the ability to infuse arrows with magic. Whenever you fire a nonmagical arrow from a shortbow or longbow, you can make it magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage. The magic fades from the arrow immediately after it hits or misses its target.",
              FeatureType.Action
            ),
            new ClassFeature(
              {},
              "Curving Shot",
              "You learn how to direct an errant arrow toward a new target. When you make an attack roll with a magic arrow and miss, you can use a bonus action to reroll the attack roll against a different target within 60 feet of the original target.",
              FeatureType.Action
            ),
            new ClassFeature(
              {},
              "Additional Arcane Shot Option",
              "You gain an additional Arcane Shot option of your choice",
              FeatureType.Action
            ),
          ],
          [
            new ClassFeature(
              {},
              "Additional Arcane Shot Option",
              "You gain an additional Arcane Shot option of your choice",
              FeatureType.Action
            ),
          ],
          [
            new ClassFeature(
              {},
              "Ever-Ready Shot",
              "Your magical archery is available whenever battle starts. If you roll initiative and have no uses of Arcane Shot remaining, you regain one use of it.",
              FeatureType.Action
            ),
            new ClassFeature(
              {},
              "Additional Arcane Shot Option",
              "You gain an additional Arcane Shot option of your choice",
              FeatureType.Action
            ),
          ],
          [
            new ClassFeature(
              {},
              "Additional Arcane Shot Option",
              "You gain an additional Arcane Shot option of your choice",
              FeatureType.Action
            ),
          ],
        ]
      ),
      new Archetype(
        "Battle Master",
        "Those who emulate the archetypal Battle Master employ martial techniques passed down through generations. To a Battle Master, combat is an academic field, sometimes including subjects beyond battle such as weaponsmithing and calligraphy. Not every fighter absorbs the lessons of history, theory, and artistry that are reflected in the Battle Master archetype, but those who do are well-rounded fighters of great skill and knowledge.",
        1,
        [
          [
            new ClassFeature(
              {
                unlocks: [
                  {
                    type: UnlockType.ItemProficiency,
                    unlock: Tags.artisanTools,
                  },
                ],
              },
              "Student of War",
              "At 3rd level, you gain proficiency with one type of artisan's tools of your choice.",
              FeatureType.UnlockSet
            ),
            new ClassFeature(
              [
                new ClassFeature(
                  Object.values(Manuevers),
                  "Maneuvers",
                  'You learn three maneuvers of your choice, which are listed under "Maneuvers" below. Many maneuvers enhance an attack in some way. You can use only one maneuver per attack.',
                  FeatureType.Set
                ),
                new ClassFeature(
                  {},
                  "Superiority Dice",
                  "You have four superiority dice, which are d8s. A superiority die is expended when you use it. You regain all of your expended superiority dice when you finish a short or long rest.",
                  FeatureType.Action
                ),
                new ClassFeature(
                  {},
                  "Saving Throws",
                  "Some of your maneuvers require your target to make a saving throw to resist the maneuver's effects",
                  FeatureType.Flavor
                ),
              ],
              "Combat Superiority",
              "You learn maneuvers that are fueled by special dice called superiority dice.",
              FeatureType.Set
            ),
          ],
          [
            new ClassFeature(
              {},
              "Additional Maneuvers",
              "You learn two additional maneuvers of your choice.",
              FeatureType.Action
            ),
            new ClassFeature(
              {},
              "Additional Superiority Die",
              "You gain another superiority die.",
              FeatureType.Passive
            ),
            new ClassFeature(
              {},
              "Know Your Enemy",
              "If you spend at least 1 minute observing or interacting with another creature outside combat, you can learn certain information about its capabilities compared to your own. The DM tells you if the creature is your equal, superior, or inferior in regard to two of the following characteristics of your choice:",
              FeatureType.Action
            ),
          ],
          [
            new ClassFeature(
              {},
              "Additional Maneuvers",
              "You learn two additional maneuvers of your choice.",
              FeatureType.Passive
            ),
            new ClassFeature(
              {},
              "Improved Combat Superiority",
              "Your superiority dice turn into d10s",
              FeatureType.Passive
            ),
          ],
          [
            new ClassFeature(
              {},
              "Additional Maneuvers",
              "You learn two additional maneuvers of your choice.",
              FeatureType.Action
            ),
            new ClassFeature(
              {},
              "Additional Superiority Die",
              "You gain another superiority die.",
              FeatureType.Passive
            ),
            new ClassFeature(
              {},
              "Relentless",
              "When you roll initiative and have no superiority dice remaining, you regain 1 superiority die.",
              FeatureType.Passive
            ),
          ],
          [
            new ClassFeature(
              {},
              "Improved Combat Superiority",
              "Your superiority dice turn into d12s",
              FeatureType.Passive
            ),
          ],
        ]
      ),
      new Archetype(
        "Cavalier",
        "The archetypal Cavalier excels at mounted combat. Usually born among the nobility and raised at court, a Cavalier is equally at home leading a cavalry charge or exchanging repartee at a state dinner. Cavaliers also learn how to guard those in their charge from harm, often serving as the protectors of their superiors and of the weak. Compelled to right wrongs or earn prestige, many of these fighters leave their lives of comfort to embark on glorious adventure.",
        1,
        [
          [
            new ClassFeature(
              {
                unlocks: [
                  {
                    type: UnlockType.SkillProficiency,
                    unlock: [
                      Skills.animalHandling,
                      Skills.history,
                      Skills.insight,
                      Skills.performance,
                      Skills.persuasion,
                    ],
                  },
                ],
              },
              "Bonus Proficiency",
              "When you choose this archetype at 3rd level, you gain proficiency in one of the following skills of your choice: Animal Handling, History, Insight, Performance, or Persuasion. Alternatively, you learn one language of your choice.",
              FeatureType.UnlockSet
            ),
            new ClassFeature(
              {},
              "Born to the Saddle",
              "Your mastery as a rider becomes apparent. You have advantage on saving throws made to avoid falling off your mount. If you fall off your mount and descend no more than 10 feet, you can land on your feet if you're not incapacitated. \nFinally, mounting or dismounting a creature costs you only 5 feet of movement, rather than half your speed.",
              FeatureType.Flavor
            ),
            new ClassFeature(
              {},
              "Unwavering Mark",
              "You can menace your foes, foiling their attacks and punishing them for harming others. When you hit a creature with a melee weapon attack, you can mark the creature until the end of your next turn. This effect ends early if you are incapacitated or you die, or if someone else marks the creature. \nWhile it is within 5 feet of you, a creature marked by you has disadvantage on any attack roll that doesn't target you. \nIn addition, if a creature marked by you deals damage to anyone other than you, you can make a special melee weapon attack against the marked creature as a bonus action on your next turn. You have advantage on the attack roll, and if it hits, the attack's weapon deals extra damage to the target equal to half your fighter level. \nRegardless of the number of creatures you mark, you can make this special attack a number of times equal to your Strength modifier (minimum of once), and you regain all expended uses of it when you finish a long rest.",
              FeatureType.Passive
            ),
          ],
          [
            new ClassFeature(
              {},
              "Warding Maneuver",
              "If you or a creature you can see within 5 feet of you is hit by an attack, you can roll 1d8 as a reaction if you're wielding a melee weapon or a shield. Roll the die, and add the number rolled to the target's AC against that attack. If the attack still hits, the target has resistance against the attack's damage. \nYou can use this feature a number of times equal to your Constitution modifier (minimum of once), and you regain all expended uses of it when you finish a long rest.",
              FeatureType.Action
            ),
          ],
          [
            new ClassFeature(
              {},
              "Hold the Line",
              "You become a master of locking down your enemies. Creatures provoke an opportunity attack from you when they move 5 feet or more while within your reach, and if you hit a creature with an opportunity attack, the target's speed is reduced to 0 until the end of the current turn.",
              FeatureType.Passive
            ),
          ],
          [
            new ClassFeature(
              {},
              "Ferocious Charger",
              "You can run down your foes, whether you're mounted or not. If you move at least 10 feet in a straight line right before attacking a creature and you hit it with the attack, that target must succeed on a Strength saving throw (DC 8 + your proficiency bonus + your Strength modifier) or be knocked prone. You can use this feature only once on each of your turns.",
              FeatureType.Passive
            ),
          ],
          [
            new ClassFeature(
              {},
              "Vigilant Defender",
              "You respond to danger with extraordinary vigilance. In combat, you get a special reaction that you can take once on every creature's turn, except your turn. You can use this special reaction only to make an opportunity attack, and you can't use it on the same turn that you take your normal reaction.",
              FeatureType.Action
            ),
          ],
        ]
      ),
      new Archetype( //Easiest thing
        "Champion",
        "The archetypal Champion focuses on the development of raw physical power honed to deadly perfection. Those who model themselves on this archetype combine rigorous training with physical excellence to deal devastating blows.",
        1,
        [
          [
            new ClassFeature(
              {},
              "Improved Critical",
              "Beginning when you choose this archetype at 3rd level, your weapon attacks score a critical hit on a roll of 19 or 20.",
              FeatureType.Passive
            ),
          ],
          [
            new ClassFeature(
              {
                unlocks: [
                  {
                    type: UnlockType.HalfProficiency,
                    unlock: Skills.acrobatics,
                  },
                ],
              },
              "Remarkable Athlete",
              "you can add half your proficiency bonus (round up) to any Strength, Dexterity, or Constitution check you make that doesn't already use your proficiency bonus.  In addition, when you make a running long jump, the distance you can cover increases by a number of feet equal to your Strength modifier.",
              FeatureType.UnlockSet
            ),
          ],
          [
            new ClassFeature(
              [
                FightingStyles.archery,
                FightingStyles.blindFighting,
                FightingStyles.defense,
                FightingStyles.dueling,
                FightingStyles.greatWeaponFighting,
                FightingStyles.interception,
                FightingStyles.protection,
                FightingStyles.superiorTechnique,
                FightingStyles.thrownWeaponFighting,
                FightingStyles.twoWeaponFighting,
                FightingStyles.unarmedFighting,
              ],
              "Additional Fighting Style",
              "You can choose a second option from the Fighting Style class feature.",
              FeatureType.Set
            ),
          ],
          [
            new ClassFeature(
              {},
              "Superior Critical",
              "Your weapon attacks score a critical hit on a roll of 18-20.",
              FeatureType.Passive
            ),
          ],
          [
            new ClassFeature(
              {},
              "Survivor",
              "you attain the pinnacle of resilience in battle. At the start of each of your turns, you regain hit points equal to 5 + your Constitution modifier if you have no more than half of your hit points left. You don't gain this benefit if you have 0 hit points.",
              FeatureType.Passive
            ),
          ],
        ]
      ),
      new Archetype(
        "Echo Knight",
        "A mysterious and feared frontline warrior of the Kryn Dynasty, the Echo Knight has mastered the art of using dunamis to summon the fading shades of unrealized timelines to aid them in battle. Surrounded by echoes of their own might, they charge into the fray as a cycling swarm of shadows and strikes.",
        1,
        [
          [
            new ClassFeature(
              {},
              "Manifest Echo",
              "You can use a bonus action to magically manifest an echo of yourself in an unoccupied space you can see within 15 feet of you. This echo is a magical, translucent, gray image of you that lasts until it is destroyed, until you dismiss it as a bonus action, until you manifest another echo, or until you're incapacitated.",
              FeatureType.Action
            ),
            new ClassFeature(
              {},
              "Unleash Incarnation",
              "You can heighten your echo's fury. Whenever you take the Attack action, you can make one additional melee attack from the echo's position. \nYou can use this feature a number of times equal to your Constitution modifier (a minimum of once). You regain all expended uses when you finish a long rest.",
              FeatureType.Passive
            ),
          ],
          [
            new ClassFeature(
              {},
              "Echo Avatar",
              "You can temporarily transfer your consciousness to your echo. As an action, you can see through your echo's eyes and hear through its ears. During this time, you are deafened and blinded. You can sustain this effect for up to 10 minutes, and you can end it at any time (requires no action). While your echo is being used in this way, it can be up to 1,000 feet away from you without being destroyed.",
              FeatureType.Action
            ),
          ],
          [
            new ClassFeature(
              {},
              "Shadow Martyr",
              "You can make your echo throw itself in front of an attack directed at another creature that you can see. Before the attack roll is made, you can use your reaction to teleport the echo to an unoccupied space within 5 feet of the targeted creature. The attack roll that triggered the reaction is instead made against your echo.",
              FeatureType.Action
            ),
          ],
          [
            new ClassFeature(
              {},
              "Reclaim Potential",
              "You've learned to absorb the fleeting magic of your echo. When an echo of yours is destroyed by taking damage, you can gain a number of temporary hit points equal to 2d6 + your Constitution modifier, provided you don't already have temporary hit points. \nYou can use this feature a number of times equal to your Constitution modifier (a minimum of once). You regain all expended uses when you finish a long rest.",
              FeatureType.Action
            ),
          ],
          [
            new ClassFeature(
              {},
              "Legion of One",
              "You can use a bonus action to create two echoes with your Manifest Echo feature, and these echoes can coexist. If you try to create a third echo, the previous two echoes are destroyed. Anything you can do from one echo's position can be done from the other's instead. \nIn addition, when you roll initiative and have no uses of your Unleash Incarnation feature left, you regain one use of that feature.",
              FeatureType.Passive
            ),
          ],
        ]
      ),
      new Archetype(
        "Eldritch Knight",
        "The archetypal Eldritch Knight combines the martial mastery common to all fighters with a careful study of magic. Eldritch Knights use magical techniques similar to those practiced by wizards. They focus their study on two of the eight schools of magic—abjuration and evocation. Abjuration spells grant an Eldritch Knight additional protection in battle, and evocation spells deal damage to many foes at once, extending the fighter's reach in combat. These knights learn a comparatively small number of spells, committing them to memory instead of keeping them in a spellbook.",
        1,
        [[], [], [], [], []]
      ),
      new Archetype(
        "Psi Warrior",
        "Awake to the psionic power within, a Psi Warrior is a fighter who augments their physical might with psi-infused weapon strikes, telekinetic lashes, and barriers of mental force. Many githyanki train to become such warriors, as do some of the most disciplined high elves. In the world of Eberron, many young kalashtar dream of becoming Psi Warriors. \nAs a Psi Warrior, you might have honed your psionic abilities through solo discipline, unlocked it under the tutelage of a master, or refined it at an academy dedicated to wielding the mind's power as both weapon and shield.",
        1,
        [
          [
            new ClassFeature(
              [
                new ClassFeature(
                  {},
                  "Protective Field",
                  "When you or another creature you can see within 30 feet of you takes damage, you can use your reaction to expend one Psionic Energy die, roll the die, and reduce the damage taken by the number rolled plus your Intelligence modifier (minimum reduction of 1), as you create a momentary shield of telekinetic force.",
                  FeatureType.Action
                ),
                new ClassFeature(
                  {},
                  "Psionic Strike",
                  "You can propel your weapons with psionic force. Once on each of your turns, immediately after you hit a target within 30 feet of you with an attack and deal damage to it with a weapon, you can expend one Psionic Energy die, rolling it and dealing force damage to the target equal to the number rolled plus your Intelligence modifier.",
                  FeatureType.Action
                ),
                new ClassFeature(
                  {},
                  "Telekinetic Movement",
                  "You can move an object or a creature with your mind. As an action, you target one loose object that is Large or smaller or one willing creature, other than yourself. If you can see the target and it is within 30 feet of you, you can move it up to 30 feet to an unoccupied space you can see. Alternatively, if it is a Tiny object, you can move it to or from your hand. Either way, you can move the target horizontally, vertically, or both. Once you take this action, you can't do so again until you finish a short or long rest, unless you expend a Psionic Energy die to take it again.",
                  FeatureType.Action
                ),
              ],
              "Psionic Power",
              "You harbor a wellspring of psionic energy within yourself. This energy is represented by your Psionic Energy dice, which are each a d6. You have a number of these dice equal to twice your proficiency bonus, and they fuel various psionic powers you have, which are detailed below. \nSome of your powers expend the Psionic Energy die they use, as specified in a power's description, and you can't use a power if it requires you to use a die when your dice are all expended. You regain all your expended Psionic Energy dice when you finish a long rest. In addition, as a bonus action, you can regain one expended Psionic Energy die, but you can't do so again until you finish a short or long rest.",
              FeatureType.Set
            ),
          ],
          [],
          [],
          [],
          [],
        ]
      ),
      new Archetype(
        "Purple Dragon Knight",
        "Purple Dragon Knights are warriors who hail from the kingdom of Cormyr. Pledged to protect the crown, they take the fight against evil beyond the kingdom's borders. They are tasked with wandering the land as knights errant, relying on their judgment, bravery, and fidelity to guide them in defeating evildoers. \nA Purple Dragon Knight inspires greatness in others by committing brave deeds in battle. The mere presence of a knight in a hamlet is enough to cause some orcs and bandits to seek easier prey. A lone knight is a skilled warrior, but a knight leading a band of allies can transform even the most poorly equipped militia into a ferocious war band. \nA knight prefers to lead through deeds, not words. As a knight spearheads an attack, the knight's actions can awaken reserves of courage and conviction in allies that they never suspected they had.",
        1,
        [[], [], [], [], []]
      ),
      new Archetype(
        "Rune Knight",
        "Rune Knights enhance their martial prowess using the supernatural power of runes, an ancient practice that originated with giants. Rune cutters can be found among any family of giants, and you likely learned your methods first or second hand from such a mystical artisan. Whether you found the giant's work carved into a hill or cave, learned of the runes from a sage, or met the giant in person, you studied the giant's craft and learned how to apply magic runes to empower your equipment.",
        1,
        [[], [], [], [], []]
      ),
      new Archetype(
        "Samurai",
        "The Samurai is a fighter who draws on an implacable fighting spirit to overcome enemies. A Samurai's resolve is nearly unbreakable, and the enemies in a Samurai's path have two choices: yield or die fighting.",
        1,
        [[], [], [], [], []]
      ),
    ],
    "Martial Archetype",
    "At 3rd level, you choose an archetype from the list available that you strive to emulate in your combat styles and techniques. The archetype you choose grants you features at 3rd level and again at 7th, 10th, 15th, and 18th level.",
    FeatureType.Set
  ),
  gunbreakerArchetypes: new ClassFeature(
    [],
    "Gunbreaker Archetype",
    "At 3rd level, you select select your Gunbreaker style. The Breaker style focuses on weakening foes with special Munitions, the Lionhart style which focuses on enhancing the damage dealt with the weapon's blows and the Revolver style which focuses on ranged combat.",
    FeatureType.Set
  ),
};

export const Races: Race[] = [
  new Race(
    { name: "Human", descriptor: "Human", plural: "Humans" },
    { movement: 30, maxAge: 100, size: Size.Medium },
    [new Feature({ all: 1 }, "ASI", "ASI", FeatureType.ASI)],
    [],
    [Language.Common, Language.Extra]
  ),
  //#region Viera
  new Race(
    { name: "Viera", descriptor: "Vieran", plural: "Viera" },
    { movement: 35, maxAge: 240, size: Size.Medium },
    [new Feature({ dex: 2 }, "ASI", "ASI", FeatureType.ASI)],
    [
      RaceFeatures.lapineHop,
      RaceFeatures.lucky,
      RaceFeatures.maskOfTheWild,
      RaceFeatures.speakWithSmallAnimals,
    ],
    [Language.Common, Language.Vieran],
    [
      new SubRace(
        { name: "Rava", descriptor: "Rava", plural: "Rava" },
        { movement: 35, maxAge: 240, size: Size.Medium },
        [new Feature({ wis: 1 }, "ASI", "ASI", FeatureType.ASI)],
        [
          new Feature(
            {
              type: UnlockType.SkillProficiency,
              unlock: Skills.intimidation,
            },
            "Powerful Presence",
            "You gain proficiency in the Intimidate skill",
            FeatureType.Unlock
          ),
        ]
      ),
      new SubRace(
        { name: "Veena", descriptor: "Veena", plural: "Veena" },
        { movement: 35, maxAge: 240, size: Size.Medium },
        [new Feature({ int: 1 }, "ASI", "ASI", FeatureType.ASI)],
        [
          new Feature(
            {
              type: UnlockType.SkillProficiency,
              unlock: Skills.persuasion,
            },
            "Approachable",
            "You gain proficiency in the Persuasion skill",
            FeatureType.Unlock
          ),
        ]
      ),
    ]
  ),
  //#endregion
  //#region Genasi
  new Race(
    { name: "Genasi", descriptor: "Genasi", plural: "Genasi" },
    { movement: 30, maxAge: 120, size: Size.Medium },
    [new Feature({ con: 2 }, "ASI", "ASI", FeatureType.ASI)],
    [],
    [Language.Common, Language.Primordial],
    [
      new SubRace(
        { name: "Genasi (Air)", descriptor: "Air Genasi", plural: "Genasi" },
        { movement: 30, maxAge: 120, size: Size.Medium },
        [new Feature({ dex: 1 }, "ASI", "ASI", FeatureType.ASI)],
        [RaceFeatures.unendingBreath, RaceFeatures.mingleWithTheWind]
      ),
      new SubRace(
        {
          name: "Genasi (Earth)",
          descriptor: "Earth Genasai",
          plural: "Genasai",
        },
        { movement: 30, maxAge: 120, size: Size.Medium },
        [new Feature({ str: 1 }, "ASI", "ASI", FeatureType.ASI)],
        [RaceFeatures.earthWalk, RaceFeatures.mergeWithStone]
      ),
      new SubRace(
        { name: "Genasi (Fire)", descriptor: "Fire Genasi", plural: "Genasi" },
        { movement: 30, maxAge: 120, size: Size.Medium },
        [new Feature({ int: 1 }, "ASI", "ASI", FeatureType.ASI)],
        [RaceFeatures.fireResistance, RaceFeatures.reachToTheBlaze]
      ),
      new SubRace(
        {
          name: "Genasi (Water)",
          descriptor: "Water Genasi",
          plural: "Genasi",
        },
        { movement: 30, maxAge: 120, size: Size.Medium },
        [new Feature({ wis: 1 }, "ASI", "ASI", FeatureType.ASI)],
        [
          RaceFeatures.acidResistance,
          RaceFeatures.amphibious,
          RaceFeatures.swim,
          RaceFeatures.callToTheWave,
        ]
      ),
    ]
  ),
  //#endregion
  //#region Aasimar
  new Race(
    { name: "Aasimar", descriptor: "Aasimar", plural: "Aasimar" },
    { movement: 30, maxAge: 160, size: Size.Medium },
    [new Feature({ cha: 2 }, "ASI", "ASI", FeatureType.ASI)],
    [
      RaceFeatures.darkvision,
      RaceFeatures.celestialResistance,
      RaceFeatures.healingHands,
      RaceFeatures.lightBearer,
    ],
    [Language.Common, Language.Celestial],
    [
      new SubRace(
        {
          name: "Aasimar (Fallen)",
          descriptor: "Fallen Aasimar",
          plural: "Aasimar",
        },
        { movement: 30, maxAge: 160, size: Size.Medium },
        [new Feature({ str: 1 }, "ASI", "ASI", FeatureType.ASI)],
        [RaceFeatures.necroticShroud]
      ),
      new SubRace(
        {
          name: "Aasimar (Protector)",
          descriptor: "Protector Aasimar",
          plural: "Aasimar",
        },
        { movement: 30, maxAge: 160, size: Size.Medium },
        [new Feature({ wis: 1 }, "ASI", "ASI", FeatureType.ASI)],
        [RaceFeatures.radiantSoul]
      ),
      new SubRace(
        {
          name: "Aasimar (Scourge)",
          descriptor: "Scourge Aasimar",
          plural: "Aasimar",
        },
        { movement: 30, maxAge: 160, size: Size.Medium },
        [new Feature({ con: 1 }, "ASI", "ASI", FeatureType.ASI)],
        [RaceFeatures.radiantConsumption]
      ),
    ]
  ),
  //#endregion
];
export const Classes: Class[] = [
  new Class(
    "Fighter",
    [
      [ClassFeatures.fighterStyle, ClassFeatures.secondWind],
      [ClassFeatures.actionSurge],
      [ClassArchetypes.fighterArchetypes],
      [ClassFeatures.abilityScoreImprovement],
      [ClassFeatures.extraAttack],
      [ClassFeatures.abilityScoreImprovement],
      [ClassFeatures.archetypeLevel],
      [ClassFeatures.abilityScoreImprovement],
      [ClassFeatures.indomitable],
      [ClassFeatures.archetypeLevel],
      [ClassFeatures.extraAttack],
      [ClassFeatures.abilityScoreImprovement],
      [ClassFeatures.indomitable],
      [ClassFeatures.abilityScoreImprovement],
      [ClassFeatures.archetypeLevel],
      [ClassFeatures.abilityScoreImprovement],
      [ClassFeatures.actionSurge, ClassFeatures.indomitable],
      [ClassFeatures.archetypeLevel],
      [ClassFeatures.abilityScoreImprovement],
      [ClassFeatures.extraAttack],
    ],
    1,
    10,
    [StatNames.str, StatNames.con],
    [
      Skills.acrobatics,
      Skills.animalHandling,
      Skills.athletics,
      Skills.history,
      Skills.insight,
      Skills.intimidation,
      Skills.perception,
      Skills.survival,
    ],
    [Tags.lightArmor, Tags.mediumArmor, Tags.heavyArmor, Tags.shields],
    [Tags.simpleWeapons, Tags.martialWeapons]
  ),
  new Class(
    "Gunbreaker",
    [
      [ClassFeatures.armsSmith],
      [ClassFeatures.gunbreakerStyle],
      [ClassArchetypes.gunbreakerArchetypes],
      [ClassFeatures.abilityScoreImprovement],
      [ClassFeatures.extraAttack],
      [ClassFeatures.archetypeLevel],
      [],
      [ClassFeatures.abilityScoreImprovement],
      [],
      [ClassFeatures.archetypeLevel],
      [],
      [ClassFeatures.abilityScoreImprovement],
      [],
      [ClassFeatures.archetypeLevel],
      [],
      [ClassFeatures.abilityScoreImprovement],
      [],
      [],
      [ClassFeatures.abilityScoreImprovement],
      [ClassFeatures.archetypeLevel],
    ],
    1,
    10,
    [StatNames.str, StatNames.dex],
    [
      Skills.athletics,
      Skills.acrobatics,
      Skills.history,
      Skills.investigation,
      Skills.intimidation,
      Skills.persuasion,
      Skills.stealth,
      Skills.survival,
    ],
    [Tags.lightArmor, Tags.mediumArmor, Tags.heavyArmor, Tags.shields],
    [Tags.simpleWeapons, Tags.martialWeapons, Tags.pistols, Tags.muskets],
    [Tags["Smith's Tools"]]
  ),
];

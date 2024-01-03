import { FeatureType, Language, Size, StatNames } from "./Enums";
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

export const ClassFeatures = {
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
  fighterArchetypes: new ClassFeature(
    [
      new Archetype(
        "Arcane Archer",
        "An Arcane Archer studies a unique elven method of archery that weaves magic into attacks to produce supernatural effects. Arcane Archers are some of the most elite warriors among the elves. They stand watch over the fringes of elven domains, keeping a keen eye out for trespassers and using magic-infused arrows to defeat monsters and invaders before they can reach elven settlements. Over the centuries, the methods of these elf archers have been learned by members of other races who can also balance arcane aptitude with archery.",
        1,
        [[], [], [], [], []]
      ),
      new Archetype(
        "Battle Master",
        "Those who emulate the archetypal Battle Master employ martial techniques passed down through generations. To a Battle Master, combat is an academic field, sometimes including subjects beyond battle such as weaponsmithing and calligraphy. Not every fighter absorbs the lessons of history, theory, and artistry that are reflected in the Battle Master archetype, but those who do are well-rounded fighters of great skill and knowledge.",
        1,
        [
          [
            new ClassFeature(
              {},
              "Student of War",
              "At 3rd level, you gain proficiency with one type of artisan's tools of your choice.",
              FeatureType.Proficiency
            ),
          ],
          [],
          [],
          [],
          [],
        ]
      ),
      new Archetype(
        "Cavalier",
        "The archetypal Cavalier excels at mounted combat. Usually born among the nobility and raised at court, a Cavalier is equally at home leading a cavalry charge or exchanging repartee at a state dinner. Cavaliers also learn how to guard those in their charge from harm, often serving as the protectors of their superiors and of the weak. Compelled to right wrongs or earn prestige, many of these fighters leave their lives of comfort to embark on glorious adventure.",
        1,
        [[], [], [], [], []]
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
              {},
              "Remarkable Athlete",
              "you can add half your proficiency bonus (round up) to any Strength, Dexterity, or Constitution check you make that doesn't already use your proficiency bonus.  In addition, when you make a running long jump, the distance you can cover increases by a number of feet equal to your Strength modifier.",
              FeatureType.Proficiency
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
        [[], [], [], [], []]
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
        [[], [], [], [], []]
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
  gunbreakerArchetypes: new ClassFeature(
    [],
    "Gunbreaker Archetype",
    "At 3rd level, you select select your Gunbreaker style. The Breaker style focuses on weakening foes with special Munitions, the Lionhart style which focuses on enhancing the damage dealt with the weapon's blows and the Revolver style which focuses on ranged combat.",
    FeatureType.Set
  ),
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

export const Races: Race[] = [
  new Race(
    { name: "Human", descriptor: "Human", plural: "Humans" },
    { movement: 30, maxAge: 100, size: Size.Medium },
    [new Feature({ all: 1 }, "ASI", "ASI", FeatureType.ASI)],
    [],
    [Language.Common, Language.Extra]
  ),
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
            { proficiency: Skills.intimidation },
            "Powerful Presence",
            "You gain proficiency in the Intimidate skill",
            FeatureType.Proficiency
          ),
        ]
      ),
      new SubRace(
        { name: "Veena", descriptor: "Veena", plural: "Veena" },
        { movement: 35, maxAge: 240, size: Size.Medium },
        [new Feature({ int: 1 }, "ASI", "ASI", FeatureType.ASI)],
        [
          new Feature(
            { proficiency: Skills.persuasion },
            "Approachable",
            "You gain proficiency in the Persuasion skill",
            FeatureType.Proficiency
          ),
        ]
      ),
    ]
  ),
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
    []
  ),
];
export const Classes: Class[] = [
  new Class(
    "Fighter",
    [
      [ClassFeatures.fighterStyle, ClassFeatures.secondWind],
      [ClassFeatures.actionSurge],
      [ClassFeatures.fighterArchetypes],
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
      [],
      [ClassFeatures.abilityScoreImprovement],
      [ClassFeatures.extraAttack],
      [],
      [],
      [ClassFeatures.abilityScoreImprovement],
      [],
      [],
      [],
      [ClassFeatures.abilityScoreImprovement],
      [],
      [],
      [],
      [ClassFeatures.abilityScoreImprovement],
      [],
      [],
      [ClassFeatures.abilityScoreImprovement],
      [],
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

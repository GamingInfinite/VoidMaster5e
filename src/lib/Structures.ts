import { StatNames } from "./Enums";

export class Skill {
  name: string;
  stat: StatNames;

  constructor(name: string, stat: StatNames) {
    this.name = name;
    this.stat = stat;
  }
}

export class Skills {
  static athletics = new Skill("Athletics", StatNames.str);
  static acrobatics = new Skill("Acrobatics", StatNames.dex);
  static sleightOfHand = new Skill("Sleight of Hand", StatNames.dex);
  static stealth = new Skill("Stealth", StatNames.dex);
  static arcana = new Skill("Arcana", StatNames.int);
  static history = new Skill("History", StatNames.int);
  static investigation = new Skill("Investigation", StatNames.int);
  static nature = new Skill("Nature", StatNames.int);
  static religion = new Skill("Religion", StatNames.int);
  static animalHandling = new Skill("Animal Handling", StatNames.wis);
  static insight = new Skill("Insight", StatNames.wis);
  static medicine = new Skill("Medicine", StatNames.wis);
  static perception = new Skill("Perception", StatNames.wis);
  static survival = new Skill("Survival", StatNames.wis);
  static deception = new Skill("Deception", StatNames.cha);
  static intimidation = new Skill("Intimidation", StatNames.cha);
  static performance = new Skill("Performance", StatNames.cha);
  static persuasion = new Skill("Persuasion", StatNames.cha);
}

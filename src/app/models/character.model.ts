import { Skill } from './skill.model';

export interface Character {
    id?: string;
    imagePath?: string;
    name: string;
    classLevel: string;
    race: string;
    background: string;
    alignment: string;
    ac: number;
    speed: number;
    iniciative: number;
    inspiration: number;
    proficiencyBonus: number;
    passivePerception: number;
    maxHp: number;
    currentHp: number;
    temporaryHp: number;
    stats: {
        strength: number,
        dexterity: number,
        constitution: number,
        intelligence: number,
        wisdom: number,
        charisma: number
    };
    savingThrows: {
        strength: Skill,
        dexterity: Skill,
        constitution: Skill,
        intelligence: Skill,
        wisdom: Skill,
        charisma: Skill
    };
    skills: {
        acrobatics: Skill,
        athletics: Skill,
        arcana: Skill,
        deception: Skill,
        history: Skill,
        insight: Skill,
        intimidation: Skill,
        investigation: Skill,
        medicine: Skill,
        nature: Skill,
        perception: Skill,
        performance: Skill,
        persuasion: Skill,
        religion: Skill,
        sleightOfHand: Skill,
        stealth: Skill,
        survival: Skill,
        animalHandling: Skill,
    };
    inventory: {
        items: string;
        copper: string;
        silver: string;
        gold: string;
        electrum: string;
        platinum: string;
    };
    spellsIds?: string[];
}

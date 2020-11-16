import {getRandomSpriteIndex, randomInt} from "./bodyParts";
import {generateDialogue} from "./generation";

let START_ID = 0

export class Appearance {
    constructor(eyes, brows, nose, mouth, cloth, hair, hue, clothHue) {
        this.eyes = eyes;
        this.brows = brows;
        this.nose = nose;
        this.mouth = mouth;
        this.cloth = cloth;
        this.hair = hair;
        this.hue = hue;
        this.clothHue = clothHue;
    }

    static default() {
        return new Appearance(1, 1, 1, 1, 1, 1, 1, 1)
    }

    static random() {
        return new Appearance(
            getRandomSpriteIndex('eyes'),
            getRandomSpriteIndex('brows'),
            getRandomSpriteIndex('nose'),
            getRandomSpriteIndex('mouth'),
            getRandomSpriteIndex('cloth'),
            getRandomSpriteIndex('hair'),
            randomInt(360),
            randomInt(360)
        )
    }
}

export const CHARACTER_TYPE = Object.freeze({
    "default": 0,
    "scientist": 1,
    "raider": 2,
    "marauder": 3,
    "freshman": 4,
    "cultist": 5
})
export const ATTITUDE = Object.freeze({"friend": 1, "neutral": 2, "psycho": 3, "enemy": 4})

export class Personality {
    constructor(type, attitude) {
        this.type = type;
        this.attitude = attitude;
    }
}

export class Character {
    constructor(name, appearance, dialogue) {
        this.name = name;
        this.appearance = appearance;
        this.dialogue = dialogue;
    }

    static startId() {
        return START_ID
    }
}

export class Option {
    constructor(text, reply, isEnd, options, goTo, action) {
        this.text = text;
        this.reply = reply;
        if (isEnd === undefined) {
            this.isEnd = false;
        } else {
            this.isEnd = isEnd;
        }
        if (options === undefined) {
            this.options = []
        } else {
            this.options = options;
        }
        this.goTo = goTo;
        this.action = action;
    }

    static startId() {
        return START_ID
    }

    static emptyOption() {
        return new Option('empty', 'empty', [])
    }
}

export function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

let characters = []

// characters.push(
//     new Character(
//         "Флексер",
//         Appearance.default(),
//         {
//             999999: new Option("Я бы хотел закончить этот разговор", "Я только за, умник", true),
//             0: new Option('Я бы хотел спросить ещё кое-что', 'Задавай любые вопросы.', false, [1, 2, 7]),
//             1: new Option("Я ищу своего отца. Он тоже из убежища. Не видели такого?",
//                 'Лучше всего обратиться к Мориарти. Если твой отец и был здесь, он наверняка заходил в бар Мориарти',
//                 false, [3, 4]),
//             2: new Option("А это... эм... безопасно жить вокруг бомбы?", 'А ты самый умный?', false, [5, 6]),
//             3: new Option("Хорошо, я зайду к нему. Спасибо за совет.", 'Без проблем, партнёр. Главное не дури и мы поладим.', false, [999999]),
//             4: new Option("[СИЛА] Либо ты прямо сейчас говоришь всё, что ты знаешь, либо я ломаю тебе лицо.",
//                 'Получай по роже, братишка.', false, [999999], null, {hp: -1}),
//             5: new Option("[ИНТЕЛЛЕКТ] Впрочем, насколько я понимаю, она бы давно взорвалась, если бы могла", 'Именно.', false, [999999]),
//             6: new Option("<Промолчать>", 'Мда', false, [999999]),
//             7: new Option("Как тебя зовут?", 'Не твоё дело')
//         }
//     )
// );

let dialogueMap = generateDialogue(new Personality(CHARACTER_TYPE.scientist, ATTITUDE.friend)).map;
console.log(dialogueMap)

characters.push(
    new Character(
        "Флексер",
        Appearance.default(),
        dialogueMap
    )
);

export {characters}

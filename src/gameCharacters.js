import {getRandomSpriteIndex, randomInt} from "./characterParts";

let END_ID = 999999
let START_ID = 0

export class Appearance {
    constructor(eyes, brows, nose, mouth, cloth, hair, hue) {
        this.eyes = eyes;
        this.brows = brows;
        this.nose = nose;
        this.mouth = mouth;
        this.cloth = cloth;
        this.hair = hair;
        this.hue = hue;
    }

    static default(){
        return new Appearance(1, 1, 1, 1, 1, 1, 1)
    }

    static random(){
        return new Appearance(
            getRandomSpriteIndex('eyes'),
            getRandomSpriteIndex('brows'),
            getRandomSpriteIndex('nose'),
            getRandomSpriteIndex('mouth'),
            getRandomSpriteIndex('cloth'),
            getRandomSpriteIndex('hair'),
            randomInt(360)
        )
    }
}

export class Character {
    constructor(name, appearance, dialogue) {
        this.name = name;
        this.appearance = appearance;
        this.dialogue = dialogue;
    }

    static endId() {
        return END_ID
    }

    static startId() {
        return START_ID
    }
}

export class Option {
    constructor(text, reply, options, action) {
        this.text = text;
        this.options = options;
        this.reply = reply;
        this.action = action;
    }

    static endId() {
        return END_ID
    }

    static startId() {
        return START_ID
    }

    static emptyOption(){
        return new Option('empty', 'empty', [])
    }
}

export function randomElement(array){
   return  array[Math.floor(Math.random() * array.length)];
}

let characters = []

characters.push(
    new Character(
        "Флексер",
        new Appearance(1, 1, 1, 1),
        {
            999999: new Option("Я бы хотел закончить этот разговор", "Я только за, умник", [Option.endId()]),
            0: new Option('Я бы хотел спросить ещё кое-что', 'Спрашивай, партнёр.', [1, 2]),
            1: new Option("Я ищу своего отца. Он тоже из убежища. Не видели такого?",
                'Лучше всего обратиться к Мориарти. Если твой отец и был здесь, он наверняка заходил в бар Мориарти',
                [3, 4]),
            2: new Option("А это... эм... безопасно жить вокруг бомбы?", 'А ты самый умный?', [5, 6]),
            3: new Option("Хорошо, я зайду к нему. Спасибо за совет.", 'Без проблем, партнёр. Главное не дури и мы поладим.', [Option.endId()]),
            4: new Option("[СИЛА] Либо ты прямо сейчас говоришь всё, что ты знаешь, либо я ломаю тебе лицо.",
                'Получай по роже, братишка.', [Option.endId()], {hp: -10}),
            5: new Option("[ИНТЕЛЛЕКТ] Впрочем, насколько я понимаю, она бы давно взорвалась, если бы могла", 'Именно.', [Option.endId()]),
            6: new Option("<Промолчать>", 'Мда', [Option.endId()])
        }
    )
);

export {characters}

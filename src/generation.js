import {Option, randomElement} from "./characters";


export const CHARACTER_TYPE = Object.freeze({"default": 0, "scientist": 1, "raider": 2, "marauder": 3, "freshman": 4, "cultist": 5})
export const ATTITUDE = Object.freeze({"friend": 1, "neutral": 2, "psycho": 3, "enemy": 4})

class Personality{
    constructor(type, attitude) {
        this.type = type;
        this.attitude = attitude;
    }
}

class Dialogue {
    constructor(personality, dangerLevel) {
        this.personality = personality;
        this.dangerLevel = dangerLevel;
        this.map = {}
        this.lastId = Option.startId()
    }

    addChapter(generator){
        let generatedPart = generator(this.lastId, this.personality, this.dangerLevel);
        this.lastId = generatedPart.lastId;
        this.map = new Map([...this.map, ...generatedPart.map])
    }
}

export function generateDialogue(personality, dangerLevel) {
    let dialogue = Dialogue(personality, dangerLevel);
    dialogue.addChapter(generateGreeting);

}

function generateGreeting(startPoint, personality, dangerLevel) {
    let current = startPoint;
    let helloPhrase = new Option('', '', []);
    switch (personality.type) {
        case CHARACTER_TYPE.scientist:
            switch (personality.attitude) {
                case ATTITUDE.friend:
                    helloPhrase.reply = randomElement([
                        'Хэй! Наконец-то, кто-то с IQ выше 10. Рад встретить умного человека.',
                        'Рад, что встретил тебя. С человеком твоего ума можно обсудить подробности моего исследования.',
                        'Здравствуй, путник. Хм... Ты выглядишь на удивление адекватно. '
                    ])
                    break;
                case ATTITUDE.neutral:

                    break;
                case ATTITUDE.psycho:

                    break;
                case ATTITUDE.enemy:

                    break;
                default:

                    break;
            }
            break;
        case CHARACTER_TYPE.raider:
            switch (personality.attitude) {
                case ATTITUDE.friend:

                    break;
                case ATTITUDE.neutral:

                    break;
                case ATTITUDE.psycho:

                    break;
                case ATTITUDE.enemy:

                    break;
                default:

                    break;
            }
            break;
        case CHARACTER_TYPE.marauder:
            switch (personality.attitude) {
                case ATTITUDE.friend:

                    break;
                case ATTITUDE.neutral:

                    break;
                case ATTITUDE.psycho:

                    break;
                case ATTITUDE.enemy:

                    break;
                default:

                    break;
            }
            break;
        case CHARACTER_TYPE.freshman:
            switch (personality.attitude) {
                case ATTITUDE.friend:

                    break;
                case ATTITUDE.neutral:

                    break;
                case ATTITUDE.psycho:

                    break;
                case ATTITUDE.enemy:

                    break;
                default:

                    break;
            }
            break;
        case CHARACTER_TYPE.cultist:
            switch (personality.attitude) {
                case ATTITUDE.friend:

                    break;
                case ATTITUDE.neutral:

                    break;
                case ATTITUDE.psycho:

                    break;
                case ATTITUDE.enemy:

                    break;
                default:

                    break;
            }
            break;
        default:
            break;
    }
}

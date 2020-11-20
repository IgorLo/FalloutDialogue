import {ATTITUDE, CHARACTER_TYPE, Option, randomElement} from "./characters";
import { uniqueNamesGenerator, names, adjectives } from 'unique-names-generator';
import {randomInt} from "./bodyParts";


class Dialogue {
    constructor(personality, dangerLevel, startPoint) {
        this.startId = startPoint;
        this.lastId = startPoint;
        this.personality = personality;
        this.dangerLevel = dangerLevel;
        this.map = {};
    }

    addChapter(generator) {
        let generatedPart = generator(this.lastId, this.personality, this.dangerLevel);
        this.lastId = generatedPart.lastId;
        Object.entries(generatedPart.map).forEach((value, key, map) => {
            this.map[key] = value[1]
            //TODO что это за строчка и почему она работает лол
        })
    }

    addOption(option) {
        let newId = this.lastId++;
        this.map[newId] = option;
        return newId
    }

    addBranch(id, option) {
        let newId = this.lastId++;
        this.map[id].options.push(newId);
        this.map[newId] = option;
        return newId
    }
}

export function generateDialogue(personality, dangerLevel) {
    let dialogue = new Dialogue(personality, dangerLevel, Option.startId());
    dialogue.addChapter(greeting);
    return dialogue;
}

function greeting(startPoint, personality, dangerLevel) {
    let dialoguePart = new Dialogue(personality, dangerLevel, startPoint);
    let helloPhrase = new Option('', '', []);
    let helloId = dialoguePart.addOption(helloPhrase);
    switch (personality.type) {
        case CHARACTER_TYPE.scientist:
            switch (personality.attitude) {
                case ATTITUDE.friend:
                    helloPhrase.reply = randomElement([
                        'Хэй! Наконец-то, кто-то с IQ выше 10. Рад встретить умного человека.',
                        'Рад, что встретил тебя. С человеком твоего ума можно обсудить подробности моего исследования.',
                        'Здравствуй, путник. Хм... Ты выглядишь на удивление адекватно. Возможно я расскажу тебе про свои разработки.'
                    ]);
                    let whatAreYouDoing = dialoguePart.addBranch(helloId, new Option(
                        'Что ты здесь делаешь?',
                        randomElement([
                            'Я и такие как я пытаемся собрать и восстановить останки довоенных технологий. Для этого я и путешествую.',
                            'Я занимаюсь поисками ГЭКК, слышал о таком? Искать его меня отправил смотритель нашего убежища. Эта штуковина нужна мне для выживания.',
                            'Я направляюсь на местный завод квантовой ядер-колы. Ходят слухи, что там остались очень нужные для моих экспериментов реактивы.'
                        ])
                    ));
                    dialoguePart.addBranch(whatAreYouDoing, new Option(
                        'Могу я как-то помочь тебе с этим?',
                        randomElement([
                            'Думаю нет, дружище. Спасибо за предложение, ценю.',
                            'Возможно ты продашь мне что-то, что мне пригодиться. Мне бы это помогло.'
                        ]),
                        false,
                        [],
                        helloId
                    ));
                    dialoguePart.addBranch(whatAreYouDoing, new Option(
                        'Бесполезное дерьмо.',
                        randomElement([
                            'Вообще-то это грубо.',
                            'Отчасти да. Но рано или поздно кто-то должен это сделать.'
                        ]),
                        false,
                        [],
                        helloId
                    ));
                    generateFight('Тебе конец, умнимк.', helloId, dialoguePart, personality, dangerLevel);
                    let branch3 = dialoguePart.addBranch(helloId, new Option(
                        'Я лучше пойду.',
                        '',
                        true
                    ));
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
    return dialoguePart;
}

function generateFight(optionText, helloId, dialoguePart, personality, dangerLevel) {
    let maxDamage = Math.sqrt(1 * dangerLevel)
    let maxAmmo = Math.sqrt(2 * dangerLevel)
    let maxFood = Math.sqrt(1 * dangerLevel)
    let replics = ['Тебе конец!']
    switch (personality.type) {
        case CHARACTER_TYPE.scientist:
            // maxDamage *= 0.5
            // maxFood
            replics = [...replics, ...[
                'Я испепелю тебя своим лазером!',
                'Я задавлю тебя своей силой ума!',
                'Я растопчу тебя своим IQ!'
            ]]
            break;
        case CHARACTER_TYPE.raider:

            break;
        case CHARACTER_TYPE.marauder:

            break;
        case CHARACTER_TYPE.freshman:

            break;
        case CHARACTER_TYPE.cultist:

            break;
        default:
            break;
    }
    let fight = dialoguePart.addBranch(helloId, new Option(
        '[НАПАСТЬ] ' + optionText,
        randomElement(replics),
        false,
        [],
        null,
        {
            hp: -randomInt(maxDamage),
            ammo: -randomInt(maxAmmo)
        }
    ))
    let fightEnd = dialoguePart.addBranch(fight, new Option(
        '[Обыскать]',
        '',
        false,
        [],
        null,
        {
            food: randomInt(maxFood)
        }
    ));
    dialoguePart.addBranch(fightEnd, new Option(
        '',
        '',
        true
    ))
}

export function generateName(personality){
    const config = {
        dictionaries: [adjectives, names],
        separator: ' ',
        length: 2,
    };

    return  uniqueNamesGenerator(config); // big-donkey
}

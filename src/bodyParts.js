const QUANTITY = {
    'eyes': 9,
    'brows': 7,
    'nose': 8,
    'hair': 8,
    'mouth': 11,
    'cloth': 9,
    'body': 4
}

const BASE_PATH = 'pics/'

export function getSprite(part, index){
    return BASE_PATH + `character/${part}/${index}.png`
}

export function getRandomSpriteIndex(part){
    return randomInt(QUANTITY[part])
}

export function randomInt(max) {
    return Math.floor(1 + Math.random() * max);
}
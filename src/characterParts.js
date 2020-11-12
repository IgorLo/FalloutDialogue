const QUANTITY = {
    'eyes': 3,
    'brows': 3,
    'nose': 3,
    'hair': 0,
    'mouth': 3,
    'cloth': 0
}

const BASE_PATH = 'pics/'

export function getSprite(part, index){
    return BASE_PATH + `character/${part}/${index}.png`
}

export function getRandomSpriteIndex(part){
    return getRandomInt(QUANTITY[part])
}

function getRandomInt(max) {
    return Math.floor(1 + Math.random() * max);
}
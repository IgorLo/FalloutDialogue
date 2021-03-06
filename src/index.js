import 'vue-toast-notification/dist/theme-sugar.css';
import './styles/index.css'
import './styles/character.css'
import './styles/stats.css'
import './styles/toast.css'
import Vue from 'vue'
import VueToast from 'vue-toast-notification';
import {getRandomSpriteIndex, getSprite} from "./bodyParts";
import {characters, Character, Appearance, Option, randomElement, generateCharacter} from "./characters";


Vue.use(VueToast, {
    position: 'top',
    duration: 4000
})

let character = new Vue({
    el: '#character',
    data: {
        name: '',
        displayed: false,
        appearance: Appearance.default()
    },
    methods: {
        getSprite: (part, index) => {
            return getSprite(part, index)
        }
    }
})

let app = new Vue({
    el: '#app',
    data: {
        displayReply: false,
        current_option: Option.emptyOption(),
        current_character: null
    },
    // определяйте методы в объекте `methods`
    methods: {
        choose: (id) => {
            playSound("sound__ok");
            if (app.current_character.dialogue[id].isEnd) {
                nextRandomStranger()
            } else {
                let lastOption = app.current_option;
                app.current_option = app.current_character.dialogue[id]
                handleAction(app.current_option.action);
                if (app.current_option.options.length === 0) {
                    if (app.current_option.goTo !== undefined) {
                        showReply(app.current_character.dialogue[app.current_option.goTo]);
                    } else {
                        showReply(lastOption);
                    }
                } else {
                    showReply(app.current_option)
                }
            }
        },
        hover: () => {
            playSound("sound__focus");
        },
        onOut: () => {
            stopSound("sound__focus");
        },
        textOfId: (id) => {
            if (app.current_character.dialogue[id].isEnd) {
                return '[УЙТИ] ' + app.current_character.dialogue[id].text
            } else {
                return app.current_character.dialogue[id].text
            }

        }
    }
})

let stats = new Vue({
    el: '#stats',
    data: {
        money: 100,
        food: 10,
        hp: 10,
        ammo: 30,
        dangerLevel: 1,
        enemyNumber: 1
    },
})

function showReply(option) {
    app.displayReply = true
    let speech = new SpeechSynthesisUtterance();
    speech.lang = 'ru-RU';
    speech.rate = 1.5;
    speech.pitch = -2;
    speech.volume = 1;
    speech.text = app.current_option.reply;
    speech.onend = () => {
        app.current_option = option;
        app.displayReply = false;
    }
    window.speechSynthesis.speak(speech);
}

function playSound(soundName) {
    let sound = document.getElementById(soundName);
    sound.currentTime = 0;
    sound.play();
}

function stopSound(soundName) {
    let sound = document.getElementById(soundName);
    sound.pause();
    sound.currentTime = 0;
}

function nextRandomStranger() {
    playSound('sound__steps')
    character.displayed = false;
    app.current_option = Option.emptyOption();
    // let newStranger = randomElement(characters);
    let newStranger = generateCharacter(stats.dangerLevel);
    stats.dangerLevel += 1;
    stats.enemyNumber += 1;
    if (stats.enemyNumber % 10 === 0){
        stats.dangerLevel += 10;
    }

    setTimeout(() => {
        playSound('sound__steps')
        app.current_option = newStranger.dialogue[Option.startId()];
        app.current_character = newStranger;
        showReply(app.current_option);
        // character.appearance = newStranger.appearance;
        character.appearance = newStranger.appearance;
        character.name = newStranger.name;
        character.displayed = true;
    }, 2000)
}

function notification(item, value) {
    if (value === 0)
        return
    else if (value > 0)
        Vue.$toast.default(`+ ${value} ${item}`)
    else if (value < 0)
        Vue.$toast.default(`- ${-value} ${item}`)
}

function handleAction(action) {
    if (action !== undefined) {
        if (action.money !== undefined) {
            stats.money += action.money
            notification('$', action.money)
        }
        if (action.hp !== undefined) {
            stats.hp += action.hp
            notification('HP', action.hp)
        }
        if (action.food !== undefined) {
            stats.food += action.food
            notification('еды', action.food)
        }
        if (action.ammo !== undefined) {
            stats.ammo += action.ammo
            notification('пуль', action.ammo)
        }
    }
}

document.body.addEventListener('click', () => {
    window.speechSynthesis.cancel();
    if (app.displayReply === true) {
        app.displayReply = false;
    }
}, true);


nextRandomStranger()

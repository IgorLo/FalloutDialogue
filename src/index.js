import './styles/index.css'
import Vue from 'vue'


class Option{
    constructor(text, reply, options) {
        this.text = text;
        this.options = options;
        this.reply = reply;
    }
}

let END_ID = 999999
let START_ID = 0

let ALL_QUESTIONS = {
    999999: new Option("Я бы хотел закончить этот разговор", "Я только за, умник", [END_ID]),
    0: new Option('Я бы хотел спросить ещё кое-что', 'Спрашивай, партнёр.', [1, 2]),
    1: new Option("Я ищу своего отца. Он тоже из убежища. Не видели такого?",
        'Лучше всего обратиться к Мориарти. Если твой отец и был здесь, он наверняка заходил в бар Мориарти',
        [3, 4]),
    2: new Option("А это... эм... безопасно жить вокруг бомбы?", 'А ты самый умный?', [5, 6]),
    3: new Option("Хорошо, я зайду к нему. Спасибо за совет.", 'Без проблем, партнёр. Главное не дури и мы поладим.', [START_ID]),
    4: new Option("[СИЛА] Либо ты прямо сейчас говоришь всё, что ты знаешь, либо я ломаю тебе лицо.",
        'Лучше не нарывайся, дружище. Я не хочу тратить на тебя патроны.', [START_ID]),
    5: new Option("[ИНТЕЛЛЕКТ] Впрочем, насколько я понимаю, она бы давно взорвалась, если бы могла", 'Именно.', [START_ID]),
    6: new Option("<Промолчать>", 'Мда', [START_ID])
}

let app = new Vue({
    el: '#app',
    data: {
        displayReply: false,
        current_option: ALL_QUESTIONS[START_ID]
    },
    // определяйте методы в объекте `methods`
    methods: {
        choose: (id) => {
            playSound("sound__ok");
            app.current_option = ALL_QUESTIONS[id]
            app.displayReply = true
            setTimeout(() => {
                app.displayReply = false;
            }, 1000 + ((app.current_option.reply.length/50) * 1200))
        },
        hover: () => {
            playSound("sound__focus");
        },
        onOut: () => {
            stopSound("sound__focus");
        },
        textOfId: (id) => {
            return ALL_QUESTIONS[id].text
        }
    }
})

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

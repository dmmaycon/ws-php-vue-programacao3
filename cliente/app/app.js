const app = Vue.createApp({
    template: `<div class="chat_window">
                <div class="top_menu">
                    <div class="buttons">
                        <div class="button close"></div>
                        <div class="button minimize"></div>
                        <div class="button maximize"></div>
                    </div>
                    <div class="title">Chat Programação III</div>
                </div>
                <ul class="messages">
                <div v-for="message in mensagens">
                <li class="message appeared" :class="message.class" >
                    <div class="avatar"></div>
                    <div class="text_wrapper">
                        <div class="text">
                            {{message.text}}
                        </div>
                    </div>
                </li>
                </div>
                </ul>
                <div class="bottom_wrapper clearfix">
                    <div class="message_input_wrapper">
                        <input v-model="text" class="message_input" placeholder="Escreva sua mensagem aqui..." />
                    </div>
                    <div class="send_message">
                        <div class="icon"></div>
                        <div v-on:click="send" class="text">Enviar</div>
                    </div>
                </div>
            </div>
            <div class="message_template">
                <li class="message">
                    <div class="avatar"></div>
                    <div class="text_wrapper">
                        <div class="text"></div>
                    </div>
                </li>
            </div>`,
    data() {
        return {
            mensagens: [],
            connection: null,
            text: null
        }
    },
    created() {
        this.connection = new WebSocket('ws://localhost:7777');
        this.listen()
    },
    methods: {
        send() {
            this.connection.send(this.text)
            this.mensagens.push({'class':'right', 'text': this.text})
            this.text = ''
        },
        listen() {
            this.connection.addEventListener('message', message => {
                this.mensagens.push({'class':'left', 'text': message.data})
            });
        }
    }
})
app.mount('#app')
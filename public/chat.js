const socket = io();

const chatForm = document.querySelector('.chat-form');
const chatMessageInput = chatForm.querySelector('[name="message"]');
const messagesView = document.querySelector('.chat-messages');
const email = document.querySelector('.email');

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = {
    text: chatMessageInput.value,
    email: email.textContent,
  };
  socket.emit('message', message);
  chatMessageInput.value = '';
});

const messagesTemplate = Handlebars.compile(`
  {{#if messagesExists}}
    {{#each messages}}
      <div>
        <span>{{this.email}}</span>
        <span>
          [<span>{{this.date}}</span>]:
        </span>
        <span>{{this.text}}</span>
        <br>
        <span>response: {{this.response}}</span>
        <hr>
      </div>
    {{/each}}
  {{/if}}
`);

function renderMessages(messages = []) {
  const html = messagesTemplate({
    messages,
    messagesExists: !!messages.length,
  });
  messagesView.innerHTML = html;
  messagesView.scrollTop = messagesView.scrollHeight;
}

socket.on('messages', renderMessages);

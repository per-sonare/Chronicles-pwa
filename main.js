console.log('script loaded');

const storyElem = document.getElementById('story');
const mapElem = document.getElementById('map');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

function appendStory(text) {
  console.log('appendStory:', text);
  storyElem.innerHTML += text.replace(/\n/g, '<br>') + '<br><br>';
  storyElem.scrollTop = storyElem.scrollHeight;
}

function appendMap(text) {
  console.log('appendMap:', text);
  mapElem.innerHTML = text.replace(/\n/g, '<br>');
}

function startAdventure() {
  console.log('startAdventure called');
  appendStory('今日はどんな冒険をはじめますか？');
  appendMap('地図はまだありません。');
}

function handleUserInput() {
  const input = userInput.value.trim();
  console.log('handleUserInput input:', input);
  if (!input) return;
  appendStory('あなた: ' + input);
  userInput.value = '';
}

sendBtn.addEventListener('click', handleUserInput);
userInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    handleUserInput();
  }
});

window.onload = startAdventure;

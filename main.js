console.log('script loaded');

const storyElem = document.getElementById('story');
const mapElem = document.getElementById('map');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

function appendStory(text) {
  storyElem.innerHTML += text + '<br><br>';
  storyElem.scrollTop = storyElem.scrollHeight;
}

function startAdventure() {
  appendStory('今日はどんな冒険をはじめますか？');
}

function handleUserInput() {
  const input = userInput.value.trim();
  console.log('Input:', input);
  if (!input) {
    console.log('入力が空です');
    return;
  }
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

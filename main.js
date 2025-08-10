const storyElem = document.getElementById('story');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

let step = 0;

function appendStory(text) {
  storyElem.textContent += text + '\\n';
  storyElem.scrollTop = storyElem.scrollHeight;
}

function startAdventure() {
  appendStory('今日はどんな冒険をはじめますか？');
}

function handleUserInput() {
  const input = userInput.value.trim();
  if (!input) return;
  appendStory('あなた: ' + input);
  userInput.value = '';

  step++;

  switch (step) {
    case 1:
      appendStory('AI: いいですね！あなたのお名前は？');
      break;
    case 2:
      appendStory('AI: 性別は？（答えたくなければスキップ可）');
      break;
    case 3:
      appendStory('AI: 冒険をはじめましょう！地図は必要ですか？');
      break;
    default:
      appendStory('AI: なるほど...では続きを進めます。');
      break;
  }
}

sendBtn.addEventListener('click', handleUserInput);
userInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') handleUserInput();
});

window.onload = startAdventure;

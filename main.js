const storyElem = document.getElementById('story');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

let step = 0;

function appendStory(text) {
  // 改行を<br>に変換しHTMLに追加
  storyElem.innerHTML += text.replace(/\n/g, '<br>') + '<br>';
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
      appendStory('いいですね！あなたのお名前は？');  }
}

sendBtn.addEventListener('click', handleUserInput);
userInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') handleUserInput();
});

window.onload = startAdventure;

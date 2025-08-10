const storyElem = document.getElementById('story');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

let step = 0;

function appendStory(text) {
  // テキストを安全にHTMLに変換しつつ、改行は<br>に変換する関数
  const escapedText = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");
  storyElem.innerHTML += escapedText + "<br>";
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

  // AI応答文（「AI:」表記なしで自然な感じに）
  switch (step) {
    case 1:
      appendStory('いいですね！あなたのお名前は？');
      break;
    case 2:
      appendStory('性別は？（答えたくなければスキップ可）');
      break;
    case 3:
      appendStory('冒険をはじめましょう！地図は必要ですか？');
      break;
    default:
      appendStory('なるほど...では続きを進めます。');
      break;
  }
}

sendBtn.addEventListener('click', handleUserInput);
userInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') handleUserInput();
});

window.onload = startAdventure;      break;
  }
}

sendBtn.addEventListener('click', handleUserInput);
userInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') handleUserInput();
});

window.onload = startAdventure;

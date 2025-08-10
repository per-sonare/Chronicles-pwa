const storyElem = document.getElementById('story');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const mapElem = document.getElementById('map');

let step = 0;

function appendStory(text) {
  const escapedText = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>");
  storyElem.innerHTML += escapedText + "<br><br>"; // 改行2回で行間を空ける
  storyElem.scrollTop = storyElem.scrollHeight;
}

function showMap(location) {
  const maps = {
    '学校': '🏫 学校の校庭が広がっています。周りに教室棟や体育館があります。',
    '街': '🏙️ 賑やかな街並み。商店街やカフェがあります。',
    '森': '🌲 深い森。鳥のさえずりが聞こえます。'
  };
  mapElem.innerHTML = maps[location] || '未知の場所です。';
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
      appendStory('いいですね！あなたのお名前は？');
      break;
    case 2:
      appendStory('性別は？（答えたくなければスキップ可）');
      break;
    case 3:
      appendStory('冒険をはじめましょう！地図は必要ですか？（はい/いいえ）');
      break;
    case 4:
      if (input === 'はい' || input === 'Yes') {
        appendStory('どこに行きますか？（学校、街、森など）');
      } else {
        appendStory('地図なしで冒険を続けます。');
        mapElem.innerHTML = '';
      }
      break;
    case 5:
      if (step === 5) {
        showMap(input);
        appendStory(input + 'に向かいます。');
      }
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

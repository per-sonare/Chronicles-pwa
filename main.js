const storyElem = document.getElementById('story');
const mapElem = document.getElementById('map');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

function appendStory(text) {
  storyElem.innerHTML += text.replace(/\n/g, '<br>') + '<br><br>';
  storyElem.scrollTop = storyElem.scrollHeight;
}

function appendMap(text) {
  mapElem.innerHTML = text.replace(/\n/g, '<br>');
}

function startAdventure() {
  appendStory('今日はどんな冒険をはじめますか？');
}

function handleUserInput() {
  const input = userInput.value.trim();
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
function handleUserInput() {
  const input = userInput.value.trim();
  if (!input) return;

  appendStory('あなた: ' + input);
  userInput.value = '';

  if (waitingLocation) {
    showMap(input);
    appendStory(input + 'に向かいます。');
    waitingLocation = false;
    return;
  }

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
      if (input === 'はい' || input.toLowerCase() === 'yes') {
        appendStory('どこに行きますか？（学校、街、森など）');
        waitingLocation = true;
      } else {
        appendStory('地図なしで冒険を続けます。');
        mapElem.innerHTML = '';
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

window.onload = startAdventure;  userInput.value = '';

  if (waitingLocation) {
    showMap(input);
    appendStory(input + 'に向かいます。');
    waitingLocation = false;
    return;
  }

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
        waitingLocation = true;
      } else {
        appendStory('地図なしで冒険を続けます。');
        mapElem.innerHTML = '';
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

window.onload = startAdventure;  step++;

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

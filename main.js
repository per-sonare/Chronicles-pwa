document.getElementById('sendBtn').addEventListener('click', () => {
  const input = document.getElementById('userInput');
  const action = input.value.trim();
  if (!action) return alert('行動を入力してください');

  sendAction(action);
  input.value = '';
});

async function sendAction(action) {
  const mapDiv = document.getElementById('map');
  const storyDiv = document.getElementById('story');

  // 送信中は入力禁止＆ボタン無効化
  document.getElementById('userInput').disabled = true;
  document.getElementById('sendBtn').disabled = true;

  try {
    const response = await fetch('/api/story', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action })
    });

    if (!response.ok) {
      alert('通信エラーが発生しました');
      return;
    }

    const data = await response.json();

    if (data.map) {
      mapDiv.textContent = data.map;
    } else {
      mapDiv.textContent = "地図情報が取得できませんでした。";
    }

    if (data.story) {
      storyDiv.textContent = data.story;
    } else {
      storyDiv.textContent = "物語情報が取得できませんでした。";
    }
  } catch (e) {
    alert('通信中にエラーが発生しました');
    console.error(e);
  } finally {
    document.getElementById('userInput').disabled = false;
    document.getElementById('sendBtn').disabled = false;
    document.getElementById('userInput').focus();
  }
        }

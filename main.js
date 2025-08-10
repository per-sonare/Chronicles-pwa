const apiUrl = "https://your-project.vercel.app/api/story";  // デプロイ先URLに書き換えてください

const mapDiv = document.getElementById("map");
const storyDiv = document.getElementById("story");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

function appendStory(text) {
  storyDiv.textContent += text + "\n\n";
  storyDiv.scrollTop = storyDiv.scrollHeight;
}

function appendMap(text) {
  mapDiv.textContent = text;
}

async function sendAction(action) {
  if (!action.trim()) {
    appendStory("入力が空です。何か入力してください。");
    return;
  }

  appendStory(`あなた: ${action}`);

  try {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ action })
    });

    if (!res.ok) {
      appendStory(`サーバーエラー: ${res.status} ${res.statusText}`);
      return;
    }

    const data = await res.json();

    if (data.error) {
      appendStory(`エラー: ${data.error}`);
      return;
    }

    if (data.story) appendStory(data.story);
    if (data.map) appendMap(data.map);

  } catch (error) {
    appendStory(`通信エラーが発生しました: ${error.message}`);
  }
}

sendBtn.addEventListener("click", () => {
  const action = userInput.value;
  sendAction(action);
  userInput.value = "";
});

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    sendBtn.click();
  }
});

// 最初のメッセージ表示
window.onload = () => {
  appendStory("ようこそ、あなたの旅路へ！ どんな冒険を始めますか？");
  appendMap("ここに地図が表示されます。");
};

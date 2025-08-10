const mapEl = document.getElementById("map");
const storyEl = document.getElementById("story");
const inputEl = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// 初期表示
mapEl.textContent = "現在地: 小さな村\n北には森が広がっている。";
storyEl.textContent = "あなたは村の中央に立っています。どこへ行きますか？";

// 送信処理
sendBtn.addEventListener("click", () => {
  const action = inputEl.value.trim();
  if (!action) return;

  storyEl.textContent += `\n\n> ${action}`;

  if (action.includes("森")) {
    mapEl.textContent = "現在地: 森の入り口\n薄暗く静かな森が広がっている。";
    storyEl.textContent += "\nあなたは森へ足を踏み入れました。";
  } else if (action.includes("村")) {
    mapEl.textContent = "現在地: 村の中央\n人々が行き交っている。";
    storyEl.textContent += "\nあなたは村に戻りました。";
  } else {
    storyEl.textContent += "\nその行動はよくわかりません。";
  }

  inputEl.value = "";
});

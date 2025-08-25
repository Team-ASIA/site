document.addEventListener("DOMContentLoaded", () => {
  // 1) 既存ボタンがなければ作る
  let btn = document.getElementById("backToTop");
  if (!btn) {
    btn = document.createElement("button");
    btn.id = "backToTop";
    btn.title = "上へ";
    btn.setAttribute("aria-label", "Back to top");
    btn.textContent = "▲"; // 上矢印
    document.body.appendChild(btn);
  }

  // 2) 表示/非表示を切り替える関数
  const toggleBtn = () => {
    if (window.scrollY > 1) {
      btn.classList.add("show");
    } else {
      btn.classList.remove("show");
    }
  };

  // 3) 初期判定＋スクロール監視
  toggleBtn();
  window.addEventListener("scroll", toggleBtn, { passive: true });

  // 4) クリックでトップへ
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

//最終更新日
const lastUpdate = new Date(document.lastModified);
document.getElementById("last-update").textContent =
`${lastUpdate.getFullYear()}年${lastUpdate.getMonth()+1}月${lastUpdate.getDate()}日`;

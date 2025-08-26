//表示順

const container = document.body; // news-articleがある親要素
  const articles = Array.from(document.querySelectorAll(".news-article"));
  
  function sortArticles(order) {
    // 日付を取得して Date型に変換
    articles.sort((a, b) => {
      const dateA = new Date(a.querySelector(".date").textContent.trim());
      const dateB = new Date(b.querySelector(".date").textContent.trim());
      return order === "new" ? dateB - dateA : dateA - dateB;
    });

    // 並び替えを反映
    articles.forEach(article => container.appendChild(article));
  }

  document.getElementById("sort-new").addEventListener("click", () => sortArticles("new"));
  document.getElementById("sort-old").addEventListener("click", () => sortArticles("old"));

// 表示変更

  // 日本語日付に変換する関数
  function formatDateJP(dateStr) {
    const date = new Date(dateStr);
    const youbi = ["日","月","火","水","木","金","土"];
    return `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日（${youbi[date.getDay()]}）`;
  }

  // 表示変換処理（ページ読み込み時）
  document.querySelectorAll(".date").forEach(span => {
    const raw = span.textContent.trim();     // 内部は YYYY-MM-DD
    const formatted = formatDateJP(raw);     // 表示用に変換
    span.textContent = formatted;            // 上書き
    span.dataset.rawdate = raw;              // 元の日付はdata属性に保持
  });

  // ソート関数
  function sortArticles(order) {
    const container = document.getElementById("articles-container");
    const articles = Array.from(container.querySelectorAll(".news-article"));
    const sorted = articles.sort((a, b) => {
      const dateA = new Date(a.querySelector(".date").dataset.rawdate);
      const dateB = new Date(b.querySelector(".date").dataset.rawdate);
      return order === "new" ? dateB - dateA : dateA - dateB;
    });
    sorted.forEach(article => container.appendChild(article));
  }

  document.getElementById("sort-new").addEventListener("click", () => sortArticles("new"));
  document.getElementById("sort-old").addEventListener("click", () => sortArticles("old"));

  //backToTop
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

//フィルター
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-buttons button");
  const articles = document.querySelectorAll(".news-article");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      articles.forEach(article => {
        if (filter === "all" || article.dataset.tag === filter) {
          article.style.display = "";
        } else {
          article.style.display = "none";
        }
      });
    });
  });
});

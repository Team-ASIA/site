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

//ハンバーガーメニュー
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const links = navLinks.querySelectorAll("a");

  // ハンバーガー押したら開閉
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // 各リンク押したら閉じる
  links.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
});

//フォーム
document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("form.form");

  forms.forEach(form => {
    const message = form.querySelector(".form-message");

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = new FormData(form);

      fetch(form.action, {
        method: "POST",
        body: data,
        mode: "no-cors"
      }).then(() => {
        message.textContent = "✅ 送信が完了しました！";
        form.reset();

        setTimeout(() => {
          message.textContent = "";
        }, 3000);
      }).catch(() => {
        message.textContent = "❌ エラーが発生しました";
      });
    });
  });
});

const ocrResults = [
  // left bottom to right top
  { text: "文字1", x1: 0.1, y1: 0.5, x2: 0.3, y2: 0.1 },
];

// 絶対位置を指定するためのスタイル
const textStyle = (x1, y1, x2, y2, width, height) => ({
  position: "absolute",
  left: `${x1 * width}px`,
  top: `${y1 * height}px`,
  width: `${(x2 - x1) * width}px`,
  height: `${(y1 - y2) * height}px`,
  border: "1px solid red", // ボックスを可視化するための枠線
});

function renderImage() {
  const imageContainer = document.getElementById("imageContainer");
  imageContainer.innerHTML = ""; // Clear any existing image

  const img = document.createElement("img");
  img.src = "https://picsum.photos/id/1/200/300"; // Example image URL
  img.alt = "Rendered Image";
  img.style.maxWidth = "100%";

  const textBlock = document.getElementById("text-block");

  imageContainer.appendChild(img);
  ocrResults.forEach((result) => {
    const box = document.createElement("div");
    const styles = textStyle(
      result.x1,
      result.y1,
      result.x2,
      result.y2,
      200,
      300,
    );
    box.style.position = styles.position;
    box.style.left = styles.left;
    box.style.top = styles.top;
    box.style.width = styles.width;
    box.style.height = styles.height;
    box.style.border = styles.border;

    imageContainer.appendChild(box);

    // text block
    const textItem = document.createElement("div");
    textItem.className = "text-item";
    textItem.innerText = result.text;
    textItem.onclick = function () {
      // 全てのボックスの強調表示をリセット
      document.querySelectorAll(".ocr-box").forEach((b) =>
        b.classList.remove("highlight")
      );

      // 対応するOCRボックスを強調表示
      box.classList.add("highlight");
    };

    // テキストブロックに追加
    textBlock.appendChild(textItem);
  });
}

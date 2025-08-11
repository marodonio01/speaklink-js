(() => {
  // Create toggle icon
  const toggleIcon = document.createElement('img');
  toggleIcon.id = 'speaklink-toggle-icon';
  toggleIcon.title = 'Open SpeakLink Translator';
  toggleIcon.src = 'https://marodonio01.github.io/speaklink-js/speaklinkicon.gif'; // Update if path different

  // Style toggle icon
  Object.assign(toggleIcon.style, {
    position: 'fixed',
    bottom: '20px',
    left: '20px',
    width: '200px',
    borderRadius: '24px',
    border: 'none',
    cursor: 'pointer',
    zIndex: '99999999',
    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
    userSelect: 'none',
  });

  document.body.appendChild(toggleIcon);

  // Create widget container
  const widget = document.createElement('div');
  widget.id = 'speaklink-widget';

  // Style widget container
  Object.assign(widget.style, {
    position: 'fixed',
    bottom: '20px',
    left: '20px',
    width: '480px',
    background: 'white',
    border: '2px solid #444',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.3)',
    fontFamily: 'Arial, sans-serif',
    zIndex: '9999999',
    userSelect: 'none',
    display: 'none',
  });

  // Build inner HTML without inline styles except where needed for labels
  widget.innerHTML = `
  <style>
      /* Minimal styling inside widget */
      #speaklink-widget {
        position: fixed;
        bottom: 20px;
        left: 20px;
        width: 745px !important;
        background: white;
        border: 2px solid #444;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0,0,0,0.3);
        font-family: Arial, sans-serif;
        z-index: 9999999;
        user-select: none;
      }
      #speaklink-header {
        background: #0366d6;
        color: white;
        font-weight: bold;
        padding: 8px 10px;
        cursor: move;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 6px 6px 0 0;
      }
      #speaklink-close-btn {
        background: transparent;
        border: none;
        color: white;
        font-size: 20px;
        line-height: 1;
        cursor: pointer;
      }
      #speaklink-content {
        padding: 10px;
        max-height: 480px;
        overflow-y: auto;
      }
      .image-container {
        display: flex;
        gap: 10px;
        margin-bottom: 10px;
      }
      .image-box {
        flex: 1;
        text-align: center;
      }
      .image-box img {
        max-width: 100%;
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      .text-container {
        display: flex;
        gap: 10px;
      }
      .text-box-wrapper {
        flex: 1;
        position: relative;
      }
      .text-box {
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 6px;
        max-height: 150px;
        overflow-y: auto;
        white-space: pre-wrap;
        background: #fafafa;
      }
      .line-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 4px;
      }
      .line-text {
        flex-grow: 1;
        margin-right: 6px;
        user-select: text;
      }
      .line-speak-btn {
        border: none;
        background: transparent;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
      }
      .line-speak-btn img {
        width: 100%;
        height: 100%;
      }
      select, button {
        margin-top: 6px;
        padding: 5px;
        font-size: 14px;
      }
    </style>
    <div id="speaklink-header" style="background:#0366d6; color:white; font-weight:bold; padding:8px 10px; cursor:move; display:flex; justify-content:space-between; align-items:center; border-radius: 6px 6px 0 0;">
      SpeakLink Translator
      <button id="speaklink-close-btn" title="Close widget" style="background:transparent; border:none; color:white; font-size:20px; line-height:1; cursor:pointer;">&times;</button>
    </div>
    <div id="speaklink-content" style="padding:10px; max-height:480px; overflow-y:auto;">
      <label for="uploadImage" style="display:block; margin-bottom:10px; cursor:pointer;">
        📁 Upload Image to Translate
      </label>
      <input type="file" id="uploadImage" accept="image/*" style="display:none" />
      <div class="image-container" style="display:flex; gap:10px; margin-bottom:10px;">
        <div class="image-box" style="flex:1; text-align:center;">
          <h4>Uploaded Image:</h4>
          <img id="uploaded-img" alt="Uploaded Image" style="max-width:100%; border:1px solid #ccc; border-radius:4px;" />
        </div>
        <div class="image-box" style="flex:1; text-align:center;">
          <h4>Translated Overlay Image:</h4>
          <img id="overlay-img" alt="Overlay Image" style="max-width:100%; border:1px solid #ccc; border-radius:4px;" />
        </div>
      </div>
      <h4>Extracted & Translated Text:</h4>
      <label for="target-lang" style="margin-top:6px; display:inline-block;">Translate to:</label>
      <select id="target-lang" style="margin-top:6px; padding:5px; font-size:14px;">
        <option value="tl">Filipino</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
        <option value="ja">Japanese</option>
        <option value="zh-CN">Chinese (Simplified)</option>
      </select>
      <div class="text-container" style="display:flex; gap:10px; margin-top:10px;">
        <div class="text-box-wrapper" style="flex:1; position:relative;">
          <div id="ocr-lines" class="text-box" style="border:1px solid #ddd; border-radius:4px; padding:6px; max-height:150px; overflow-y:auto; white-space:pre-wrap; background:#fafafa;">Upload an image to start OCR...</div>
        </div>
        <div class="text-box-wrapper" style="flex:1; position:relative;">
          <div id="translation-lines" class="text-box" style="border:1px solid #ddd; border-radius:4px; padding:6px; max-height:150px; overflow-y:auto; white-space:pre-wrap; background:#fafafa;">Waiting for translation...</div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(widget);

  // Show/hide logic
  toggleIcon.addEventListener('click', () => {
    widget.style.display = 'block';
    toggleIcon.style.display = 'none';
  });
  widget.querySelector('#speaklink-close-btn').addEventListener('click', () => {
    widget.style.display = 'none';
    toggleIcon.style.display = 'block';
  });

  // Dragging widget by header
  const header = widget.querySelector('#speaklink-header');
  let isDragging = false, offsetX = 0, offsetY = 0;
  header.style.cursor = 'move';
  header.addEventListener('mousedown', e => {
    isDragging = true;
    offsetX = e.clientX - widget.getBoundingClientRect().left;
    offsetY = e.clientY - widget.getBoundingClientRect().top;
    document.body.style.userSelect = 'none';
  });
  document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.userSelect = '';
  });
  document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    let left = e.clientX - offsetX;
    let top = e.clientY - offsetY;
    const maxLeft = window.innerWidth - widget.offsetWidth;
    const maxTop = window.innerHeight - widget.offsetHeight;
    left = Math.min(Math.max(left, 0), maxLeft);
    top = Math.min(Math.max(top, 0), maxTop);
    widget.style.left = left + 'px';
    widget.style.top = top + 'px';
    widget.style.bottom = 'auto';
    widget.style.right = 'auto';
  });

  // Variables to hold last data
  let lastUploadedImage = null;
  let lastOcrLines = null;
  let lastScale = 1;

  // Text-to-Speech Setup
  let voices = [];
  function loadVoices() {
    voices = speechSynthesis.getVoices() || [];
    voices.sort((a,b) => {
      const score = n => {
        n = (n || "").toLowerCase();
        if (n.includes("google")) return 3;
        if (n.includes("neural") || n.includes("wave")) return 2;
        if (n.includes("natural")) return 2;
        return 0;
      };
      return score(b.name) - score(a.name);
    });
  }
  speechSynthesis.onvoiceschanged = loadVoices;
  loadVoices();

  function getBestVoice(langCode) {
    langCode = (langCode || "").toLowerCase();
    let v = voices.find(x => x.lang && x.lang.toLowerCase().startsWith(langCode));
    if (v) return v;
    v = voices.find(x => /google|neural|natural|wave/i.test(x.name || ""));
    return v || voices[0] || null;
  }

  function speakForLine(text, ttsLang, wrapperEl) {
    if (!text || !text.trim()) return;
    try { speechSynthesis.cancel(); } catch(e){}
    const u = new SpeechSynthesisUtterance(text);
    u.lang = ttsLang || "en-US";
    const v = getBestVoice(u.lang);
    if (v) u.voice = v;
    u.rate = 1.0;
    u.pitch = 1.0;
    u.onstart = () => { if(wrapperEl) wrapperEl.classList.add("line-reading"); };
    u.onend = () => { if(wrapperEl) wrapperEl.classList.remove("line-reading"); };
    u.onerror = () => {
      if(wrapperEl) wrapperEl.classList.remove("line-reading");
      console.log("TTS error for text:", text);
    };
    speechSynthesis.speak(u);
  }

  function renderLinesInto(container, lines, ttsLang) {
    if (!container) return;
    container.innerHTML = "";
    if (!lines || !lines.length) {
      container.textContent = "No text found.";
      return;
    }
    lines.forEach(line => {
      const wrapper = document.createElement("div");
      wrapper.className = "line-item";
      const span = document.createElement("div");
      span.className = "line-text";
      span.textContent = line;
      const btn = document.createElement("button");
      btn.className = "line-speak-btn";
      btn.title = "Read this line";
      const img = document.createElement("img");
      img.src = "https://marodonio01.github.io/speaklink-js/talkperson.png";  // Update path as needed
      img.alt = "Speak";
      btn.appendChild(img);
      btn.addEventListener("click", () => speakForLine(line, ttsLang, wrapper));
      wrapper.appendChild(span);
      wrapper.appendChild(btn);
      container.appendChild(wrapper);
    });
  }

  const speechController = {
    renderOcrLines: (lines, ttsLang = "en-US") => {
      const container = widget.querySelector("#ocr-lines");
      renderLinesInto(container, lines, ttsLang);
    },
    renderTranslationLines: (lines, ttsLang = "en-US") => {
      const container = widget.querySelector("#translation-lines");
      renderLinesInto(container, lines, ttsLang);
    },
    speakLine: speakForLine,
  };

  // Translate API (MyMemory)
  async function translateTextMyMemory(text, targetLang) {
    const encodedText = encodeURIComponent(text);
    const apiUrl = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=en|${targetLang}`;
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      return data.responseData?.translatedText || "Translation failed.";
    } catch {
      return "Translation failed.";
    }
  }

 async function renderTranslation(targetLang) {
  if (!lastOcrLines || !lastUploadedImage) return;
  const overlayCanvas = document.createElement('canvas');
  const overlayCtx = overlayCanvas.getContext('2d');
  overlayCanvas.width = lastUploadedImage.width;
  overlayCanvas.height = lastUploadedImage.height;
  overlayCtx.drawImage(lastUploadedImage, 0, 0);

  const fontSize = 16;
  overlayCtx.font = `${fontSize}px Arial`;
  overlayCtx.textAlign = "center";
  overlayCtx.textBaseline = "middle";

  const translatedLines = [];

  for (let line of lastOcrLines) {
    const lineText = (line.Words || []).map(w => w.WordText).join(" ").trim();
    if (!lineText) continue;

    const translatedLine = await translateTextMyMemory(lineText, targetLang);
    translatedLines.push(translatedLine);

	// Calculate scale from original OCR image size to displayed image size
	//const lastScale = lastUploadedImage.naturalWidth / 1; // or some known OCR original width

	// Then for each line:
	const x = (line.Words[0].Left || 0) * lastScale;
	const y = (line.Words[0].Top || 0) * lastScale;
	const ocrWidth = (line.Words.reduce((acc, w) => acc + (w.Width || 0), 0) || 0) * lastScale;
	const ocrHeight = (line.MaxHeight || fontSize) * lastScale;

    const textWidth = overlayCtx.measureText(translatedLine).width;
    const boxWidth = Math.max(ocrWidth, textWidth + 20);
    const boxHeight = Math.max(ocrHeight, fontSize + 10);

    overlayCtx.fillStyle = "white";
    overlayCtx.fillRect(x, y, boxWidth, boxHeight);
    overlayCtx.strokeStyle = "black";
    overlayCtx.lineWidth = 1;
    overlayCtx.strokeRect(x, y, boxWidth, boxHeight);

    overlayCtx.fillStyle = "black";
    overlayCtx.fillText(translatedLine, x + boxWidth / 2, y + boxHeight / 2);
  }

  speechController.renderTranslationLines(translatedLines, mapTargetToTtsLang(targetLang));

  const overlayImgEl = widget.querySelector('#overlay-img');
  if (overlayImgEl) overlayImgEl.src = overlayCanvas.toDataURL('image/png');
}


  function mapTargetToTtsLang(target) {
    switch (target) {
      case "tl":
      case "fil": return "fil-PH";
      case "es": return "es-ES";
      case "fr": return "fr-FR";
      case "de": return "de-DE";
      case "ja": return "ja-JP";
      case "zh-CN": return "zh-CN";
      default: return "en-US";
    }
  }

// Image upload handling
widget.querySelector('#uploadImage').addEventListener('change', (e) => {
  console.log('Upload input changed');
  const file = e.target.files[0];
  if (!file) return;
  const img = new Image();

  img.onload = async () => {
    console.log('Image loaded:', img);
    lastUploadedImage = img;
    widget.querySelector('#uploaded-img').src = img.src;

    // Define cropRect as full image for now
    const cropRect = {
      x: 0,
      y: 0,
      width: img.naturalWidth,
      height: img.naturalHeight,
    };

    const devicePixelRatio = window.devicePixelRatio || 1;

    try {
      await loadData(img, cropRect, devicePixelRatio);
      console.log("OCR and translation done after upload.");
    } catch (err) {
      console.error("Error during OCR processing:", err);
    }
  };

  img.onerror = () => alert("Failed to load image. Please try another.");
  img.src = URL.createObjectURL(file);
});



  // Run OCR with OCR.space API
  async function runOCR(image) {
	  console.log('runOCR started');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    ctx.drawImage(image, 0, 0);

    const dataUrl = canvas.toDataURL('image/png');

    try {
      const formData = new FormData();
      formData.append("base64Image", dataUrl);
      formData.append("language", "eng");
      formData.append("isOverlayRequired", "true");

      const res = await fetch("https://api.ocr.space/parse/image", {
        method: "POST",
        headers: { "apikey": "K85624106488957" }, // <-- Replace with your API key
        body: formData
      });
      const result = await res.json();
console.log('OCR API response:', result);
      const parsed = result?.ParsedResults?.[0];
      lastOcrLines = parsed?.TextOverlay?.Lines || [];
      const fullText = parsed?.ParsedText || '';

      let extractedLines = [];
      if (lastOcrLines.length) {
        extractedLines = lastOcrLines.map(line => (line.Words || []).map(w => w.WordText).join(" ").trim()).filter(Boolean);
      } else {
        extractedLines = (fullText || '').split("\n").map(s => s.trim()).filter(Boolean);
      }

      speechController.renderOcrLines(extractedLines, "en-US");

      const targetLang = widget.querySelector('#target-lang').value;
      await renderTranslation(targetLang);

      // Show uploaded image
      const uploadedImgEl = widget.querySelector('#uploaded-img');
      if (uploadedImgEl) uploadedImgEl.src = image.src;

    } catch (err) {
		console.log("OCR error:", err);
      console.log("OCR error:", err);
      const ocrEl = widget.querySelector('#ocr-lines');
      if (ocrEl) ocrEl.textContent = 'Error during OCR.';
    }
  }

  // Language selector changes
  widget.querySelector('#target-lang').addEventListener('change', async (e) => {
    if (!lastOcrLines || !lastUploadedImage) return;
    await renderTranslation(e.target.value);
  });
  
// === Load image, crop, and OCR standalone ===
async function loadData(image, cropRect, devicePixelRatio = 1) {
  if (!image || !cropRect) {
    console.warn("[Widget] ⚠ Missing image or cropRect.");
    return;
  }

  // Debug log the cropRect
  console.log("[Widget] Loaded cropRect:", cropRect);

  // Check if cropRect has meaningful size
  if (cropRect.width < 5 || cropRect.height < 5) {
    console.warn("[Widget] Crop rectangle too small, skipping processing.");
    return;
  }

  return new Promise((resolve, reject) => {
    image.onload = async () => {
      try {
        lastScale = devicePixelRatio || 1;

        lastCroppedCanvas = document.createElement('canvas');
        const ctx = lastCroppedCanvas.getContext('2d');
        lastCroppedCanvas.width = cropRect.width * lastScale;
        lastCroppedCanvas.height = cropRect.height * lastScale;

        ctx.drawImage(
          image,
          cropRect.x * lastScale,
          cropRect.y * lastScale,
          cropRect.width * lastScale,
          cropRect.height * lastScale,
          0,
          0,
          cropRect.width * lastScale,
          cropRect.height * lastScale
        );

        const croppedDataUrl = lastCroppedCanvas.toDataURL('image/png');
        const croppedImgEl = widget.querySelector('#cropped-img');
        if (croppedImgEl) {
          croppedImgEl.src = croppedDataUrl;
          croppedImgEl.addEventListener('click', () => {
            window.open(croppedDataUrl, '_blank');
          });
        }

        console.log("[Widget] Sending image to OCR.space...");
        const formData = new FormData();
        formData.append("base64Image", croppedDataUrl);
        formData.append("language", "eng");
        formData.append("isOverlayRequired", "true");

        const res = await fetch("https://api.ocr.space/parse/image", {
          method: "POST",
          headers: { "apikey": "K85624106488957" },
          body: formData
        });

        const result = await res.json();
        console.log("[Widget] OCR API response:", result);

        const parsed = result?.ParsedResults?.[0];
        const fullText = parsed?.ParsedText || '';
        lastOcrLines = parsed?.TextOverlay?.Lines || [];

        // Extract OCR lines text
        let extractedLines = [];
        if (lastOcrLines.length) {
          extractedLines = lastOcrLines.map(line => (line.Words || []).map(w => w.WordText).join(" ").trim()).filter(Boolean);
        } else {
          extractedLines = (fullText || '').split("\n").map(s => s.trim()).filter(Boolean);
        }

        speechController.renderOcrLines(extractedLines, "en-US");

        const targetSelect = widget.querySelector('#target-lang');
        const targetLang = targetSelect ? targetSelect.value : 'tl';
        await renderTranslation(targetLang);

        resolve();
      } catch (err) {
        console.error("[Widget] OCR error:", err);
        const ocrEl = widget.querySelector('#ocr-lines');
        if (ocrEl) ocrEl.textContent = 'Error during OCR.';
        reject(err);
      }
    };

    image.onerror = () => {
      console.error("[Widget] Image failed to load");
      reject(new Error("Image failed to load"));
    };

    // Trigger image loading:
    image.src = image.src;  // Reset src to force onload if needed
  });
}

})();

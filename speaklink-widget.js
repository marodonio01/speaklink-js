(() => {
  // Create toggle icon
  const toggleIcon = document.createElement('img');
  toggleIcon.id = 'speaklink-toggle-icon';
  toggleIcon.title = 'Open SpeakLink Translator';
  toggleIcon.src = 'https://marodonio01.github.io/speaklink-js/speaklinkicon.gif'; // Update if path different

  // Style toggle icon
  Object.assign(toggleIcon.style, {
    position: 'fixed',
    bottom: '73px',
    right: '20px',
    width: '92px',
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
	  label#uploadImgLbl {
		  background-color: #007bff;
		  color: white;
		  border: none;
		  padding: 8px 12px;
		  cursor: pointer;
		  border-radius: 4px;
		  width: 35%;
		}

		label#uploadImgLbl:hover {
		  background-color: #0056b3;
		}
		button:disabled {
    background-color: grey !important;
    cursor: not-allowed !important;
    opacity: 0.6; /* optional, to make it look more disabled */
}
    </style>
    <div id="speaklink-header" style="background:#0366d6; color:white; font-weight:bold; padding:8px 10px; cursor:move; display:flex; justify-content:space-between; align-items:center; border-radius: 6px 6px 0 0;">
      SpeakLink Translator
      <button id="speaklink-close-btn" title="Close widget" style="background:transparent; border:none; color:white; font-size:20px; line-height:1; cursor:pointer;">&times;</button>
    </div>
    <div id="speaklink-content" style="padding:10px; max-height:480px; overflow-y:auto;">
	<div style="display:flex; align-items:center; gap:30%;">
	  <label id="uploadImgLbl" for="uploadImage" style="background-color:#007bff;color:white;border:none;padding:8px 12px;cursor:pointer;border-radius:4px;">
		📁 Upload Image to Translate
	  </label>
	  <input type="file" id="uploadImage" accept="image/*" style="display:none" />
	  <div style="display:flex; align-items:center;">
		  <button id="callAgentBtn" style="background-color:#28a745;color:white;border:none;padding:8px 12px;cursor:pointer;border-radius:4px;margin-top:0px!important;">
			🤖 Call Agent
		  </button>
		  <button id="stopAgentBtn" style="background:red;color:white;border:none;padding:8px 12px;cursor:pointer;border-radius:4px;margin-top:0px!important;">⏹ Stop Agent</button>
	  </div>
	</div>
      <div class="image-container" style="display:flex; gap:10px; margin-bottom:10px;">
        <div class="image-box" style="flex:1; text-align:center;">
          <h4>Uploaded Image:</h4>
          <img id="uploaded-img" src="https://marodonio01.github.io/speaklink-js/loading.gif" alt="Uploaded Image" style="max-width:10%; border:1px solid #ccc; border-radius:4px;" />
        </div>
        <div class="image-box" style="flex:1; text-align:center;">
          <h4>Translated Overlay Image:</h4>
          <img id="overlay-img" src="https://marodonio01.github.io/speaklink-js/loading.gif" alt="Overlay Image" style="max-width:10%; border:1px solid #ccc; border-radius:4px;" />
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

  function speakForLine(text, ttsLang, wrapperEl) {
	  if (!text || !text.trim()) return;

	  // Optionally show the reading highlight
	  if (wrapperEl) wrapperEl.classList.add("line-reading");

	  speakWithElevenLabs(text).finally(() => {
		if (wrapperEl) wrapperEl.classList.remove("line-reading");
	  });
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
  overlayImgEl.style.maxWidth = '100%';
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
const uploadedImgEl = widget.querySelector('#uploaded-img');
uploadedImgEl.src = img.src;
uploadedImgEl.style.setProperty('max-width', '100%', 'important');
	
	 console.log('Image loaded:', lastUploadedImage);
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

async function speakWithElevenLabs(text) {
  const API_KEY = 'sk_d60f10b696c0377a0e15d77f221d54d26a8e4eb4d108c1ca'; // Replace with your key
  const VOICE_ID = 'NEqPvTuKWuvwUMAEPBPR'; // Example: Rachel voice

  try {
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': API_KEY
      },
      body: JSON.stringify({
        text: text,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75
        }
      })
    });

    if (!response.ok) throw new Error(`ElevenLabs API error: ${response.status}`);

    const audioData = await response.arrayBuffer();
    const blob = new Blob([audioData], { type: 'audio/mpeg' });
    const url = URL.createObjectURL(blob);

    const audio = new Audio(url);
    audio.play();

  } catch (err) {
    console.error('Error with ElevenLabs TTS:', err);
  }
}

// === Call Agent Button with STT + Agent Reply Loop (Buffered Playback) ===
let ws;
let recognition;
let isListening = false;
let isPlayingAudio = false;

if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "fil-PH"; // Filipino
} else {
    console.error("Speech recognition not supported in this browser.");
}

function startSpeechRecognition() {
    if (isListening || isPlayingAudio) {
        console.log("⚠ Not starting recognition — already listening or playing.");
        return;
    }
    isListening = true;

    recognition.start();
    console.log("🎤 Listening...");

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.trim();
        console.log("🗣 Recognized text:", transcript);

        handleConversationFlow(transcript);

        recognition.stop();
    };

    recognition.onend = () => {
        isListening = false;
        console.log("⏹ Listening stopped.");
    };

    recognition.onerror = (event) => {
        isListening = false;
        console.error("Speech recognition error:", event.error);
    };
}

function handleConversationFlow(userText) {
    sendUserTextToAgent(userText);
}

function sendUserTextToAgent(userText) {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
        console.warn("WS not open; cannot send text.");
        return;
    }

    ws.send(JSON.stringify({
        type: "user_message",
        text: userText
    }));

}

function pcm16ToWav(pcmBytes, sampleRate = 16000) {
    const buffer = new ArrayBuffer(44 + pcmBytes.length);
    const view = new DataView(buffer);
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + pcmBytes.length, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(view, 36, 'data');
    view.setUint32(40, pcmBytes.length, true);
    new Uint8Array(buffer, 44).set(pcmBytes);
    return buffer;
}

function writeString(view, offset, string) {
    for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
    }
}

widget.querySelector('#callAgentBtn').addEventListener('click', () => {
    console.log("Connecting to ElevenLabs agent...");
	toggleButtons(true); // Disable Call, enable Stop
    const AGENT_ID = "agent_5801k2mh5rg1fz5906qx467j62rn";
    const API_KEY = "sk_d60f10b696c0377a0e15d77f221d54d26a8e4eb4d108c1ca";

    ws = new WebSocket(`wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${AGENT_ID}&api_key=${API_KEY}`);

    ws.onopen = () => {
        console.log("✅ Connected to agent.");
        ws.send(JSON.stringify({ type: "conversation_initiation_client_data" }));
        conversationStage = 0;
        startSpeechRecognition();
    };

    let audioBufferChunks = [];
    let audioPlayTimer = null;

    ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);

        if (msg.type === 'audio' && msg.audio_event?.audio_base_64) {
            const pcmBytes = Uint8Array.from(atob(msg.audio_event.audio_base_64), c => c.charCodeAt(0));
            audioBufferChunks.push(pcmBytes);

            if (audioPlayTimer) clearTimeout(audioPlayTimer);

            audioPlayTimer = setTimeout(() => {
                if (audioBufferChunks.length > 0) {
                    console.log(`🎧 Playing buffered audio (${audioBufferChunks.length} chunks)`);

                    const totalLength = audioBufferChunks.reduce((acc, chunk) => acc + chunk.length, 0);
                    const mergedPCM = new Uint8Array(totalLength);
                    let offset = 0;
                    for (const chunk of audioBufferChunks) {
                        mergedPCM.set(chunk, offset);
                        offset += chunk.length;
                    }

                    const wavBuffer = pcm16ToWav(mergedPCM, 16000);
                    const blob = new Blob([wavBuffer], { type: 'audio/wav' });
                    const url = URL.createObjectURL(blob);

                    const audio = new Audio(url);
                    isPlayingAudio = true;

                    if (recognition) {
                        isListening = false;
                        recognition.stop();
                    }

                    audio.onended = () => {
                        console.log("🔄 Agent finished speaking, restarting listening...");
                        isPlayingAudio = false;
                        if (!isListening && !isPlayingAudio) {
                            setTimeout(() => startSpeechRecognition(), 500);
                        }
                    };

                    audio.play().catch(err => console.error("Playback error:", err));

                    audioBufferChunks = [];
                }
            }, 500);
        }
    };

    ws.onerror = (err) => console.error("WebSocket error:", err);
    ws.onclose = () => console.log("❌ Agent connection closed");
});

widget.querySelector('#stopAgentBtn').addEventListener('click', () => {
	toggleButtons(false); // Enable Call, disable Stop
    if (recognition) recognition.stop();
    if (ws) ws.close();
    isListening = false;
    console.log("🛑 Agent stopped.");
});

const callBtn = widget.querySelector('#callAgentBtn');
const stopBtn = widget.querySelector('#stopAgentBtn');

// Initial state
callBtn.disabled = false;
stopBtn.disabled = true;

function toggleButtons(isCalling) {
    callBtn.disabled = isCalling;
    stopBtn.disabled = !isCalling;
}


})();

let isMoving = false;
let interval;
let emptyPalletIndex = 0;
const palletCount = 12;
let showMessages = false;

window.onload = function () {
  const pallets = Array.from(document.getElementsByClassName("pallet"));

  pallets[emptyPalletIndex].classList.add("empty");

  const closeBtn = document.querySelector(".close");
  closeBtn.addEventListener("click", hidePopup);

  const startBtn = document.getElementById("startBtn");
  startBtn.addEventListener("click", startMotion);

  const stopBtn = document.getElementById("stopBtn");
  stopBtn.addEventListener("click", stopMotion);

  const toggleMsgBtn = document.getElementById("toggleMsgBtn");
  toggleMsgBtn.addEventListener("click", toggleMessages);

  const manualMoveLeftBtn = document.getElementById("manualMoveLeftBtn");
  manualMoveLeftBtn.addEventListener("click", function () {
    movePalletManually("left");
  });

  const manualMoveRightBtn = document.getElementById("manualMoveRightBtn");
  manualMoveRightBtn.addEventListener("click", function () {
    movePalletManually("right");
  });
};

function startMotion() {
  if (!isMoving) {
    isMoving = true;
    interval = setInterval(movePallets, 5000);
    updateSystemStatus("Ruch rozpoczęty");
    addMessage("Ruch rozpoczęty");
  }
}

function stopMotion() {
  if (isMoving) {
    isMoving = false;
    clearInterval(interval);
    updateSystemStatus("Ruch zatrzymany");
    addMessage("Ruch zatrzymany");
  }
}

function movePallets() {
  if (isMoving) {
    const pallets = Array.from(document.getElementsByClassName("pallet"));
    const previousEmptyPalletIndex = emptyPalletIndex;
    const emptyPallet = pallets[emptyPalletIndex];
    emptyPallet.classList.remove("empty");
    emptyPallet.textContent = emptyPalletIndex + 1;

    if (emptyPalletIndex === palletCount - 1) {
      emptyPalletIndex = 0;
    } else {
      emptyPalletIndex++;
    }

    const newEmptyPallet = pallets[emptyPalletIndex];
    newEmptyPallet.classList.add("empty");
    newEmptyPallet.textContent = "";

    addMessage(
      `[${new Date().toLocaleTimeString()}] Przesunięto paletę z pozycji ${
        previousEmptyPalletIndex + 1
      } na pozycję ${emptyPalletIndex + 1}.`
    );

    if (previousEmptyPalletIndex === 0 && emptyPalletIndex === 1) {
      addMessage(
        `[${new Date().toLocaleTimeString()}] Paleta 1 przesunięta na miejsce palety 2.`
      );
    }
  }
}
function toggleMessages() {
  showMessages = !showMessages;
  const messagesDiv = document.getElementById("messages");
  if (showMessages) {
    messagesDiv.classList.remove("hidden");
  } else {
    messagesDiv.classList.add("hidden");
  }
}

function addMessage(message) {
  const messagesList = document.getElementById("messagesList");
  const listItem = document.createElement("li");
  listItem.textContent = message;
  messagesList.appendChild(listItem);
  if (showMessages && isLastMessageVisible()) {
    listItem.scrollIntoView();
  }
}

function hidePopup() {
  const messagesDiv = document.getElementById("messages");
  messagesDiv.classList.add("hidden");
  showMessages = false;
}

function updateSystemStatus(status) {
  const systemStatus = document.getElementById("systemStatus");
  systemStatus.textContent = status;
}
function movePalletManually(direction) {
  const pallets = Array.from(document.getElementsByClassName("pallet"));
  let index;

  if (direction === "left" && emptyPalletIndex > 0) {
    index = emptyPalletIndex - 1;
  } else if (direction === "right" && emptyPalletIndex < pallets.length - 1) {
    index = emptyPalletIndex + 1;
  } else {
    return;
  }

  const targetPallet = pallets[index];
  const emptyPallet = pallets[emptyPalletIndex];

  targetPallet.classList.add("empty");
  targetPallet.textContent = "";
  emptyPallet.classList.remove("empty");
  emptyPallet.textContent = emptyPalletIndex + 1;

  emptyPalletIndex = index;

  addMessage(
    `[${new Date().toLocaleTimeString()}] Ręcznie przesunięto paletę z pozycji ${
      emptyPalletIndex + 1
    } na pozycję ${index + 1}.`
  );
}
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 10000); 
});

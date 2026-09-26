const ACCESS_CODES = {
  "P8-X7K2-M91": "Catalina",
  "P8-Q84L-2AZ": "Katherin",
  "P8-M3KF-71X": "Paula",
  "P8-92PX-L4Q": "Cristian",
  "P8-L7TR-83N": "Camila",
  "P8-W42K-9FD": "Daniel",
  "P8-H61P-Q8M": "Alejandro",
  "P8-Z39X-4LK": "08"
};

const $ = (s) => document.querySelector(s);
const toast = (msg) => {
  const t = $("#toast"); t.textContent = msg; t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2600);
};

const bootMessages = [
  "LOADING PARTICIPANTS........ OK",
  "LOADING GAMES............... OK",
  "LOADING MUSIC............... OK",
  "LOADING FOOD................ UNKNOWN",
  "LOADING DRINKS.............. UNKNOWN",
  "LOADING POWERPOINT.......... EXTREMELY CONCERNING"
];

let bootPct = 0, bootIndex = 0;
const bootTimer = setInterval(() => {
  bootPct += 4;
  $("#bootProgress").style.width = bootPct + "%";
  if (bootPct % 16 === 0 && bootIndex < bootMessages.length) {
    $("#bootLog").innerHTML += `<div>> ${bootMessages[bootIndex++]}</div>`;
  }
  if (bootPct >= 100) {
    clearInterval(bootTimer);
    setTimeout(() => {
      $("#boot").classList.add("hidden");
      $("#app").classList.remove("hidden");
    }, 650);
  }
}, 200);

function normalizeCode(value) {
  return value.trim().toUpperCase();
}
function authorize() {
  const code = normalizeCode($("#accessCode").value);
  const agent = ACCESS_CODES[code];
  if (!agent) {
    $("#accessError").textContent = "ACCESS DENIED // CÓDIGO NO RECONOCIDO";
    $("#accessCode").animate([{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}], {duration:180});
    return;
  }
  sessionStorage.setItem("oqmpsAgent", agent);
  $("#agentNumber").textContent = agent;
  $("#gate").classList.add("hidden");
  $("#site").classList.remove("hidden");
  window.scrollTo(0,0);
  toast(`ACCESO AUTORIZADO // AGENTE ${agent}`);
}
$("#accessBtn").addEventListener("click", authorize);
$("#accessCode").addEventListener("keydown", e => { if(e.key === "Enter") authorize(); });
$("#agentNumber").textContent = sessionStorage.getItem("oqmpsAgent") || "--";

const ideas = [
  "Por qué las palomas serían pésimas mensajeras corporativas.",
  "Ranking definitivo de excusas para llegar tarde.",
  "Un análisis científico de por qué siempre escogemos la fila equivocada.",
  "Qué personaje de ficción sobreviviría menos de 24 horas en este grupo.",
  "La historia secreta de las papas de paquete.",
  "Por qué un pingüino no debería administrar una empresa.",
  "Top 10 objetos que no deberían tener una versión premium.",
  "Cómo ganar Risk usando únicamente diplomacia y amenazas vacías.",
  "Una investigación seria sobre quién se roba siempre el control remoto.",
  "Por qué los martes tienen una campaña de desprestigio injusta.",
  "Qué animal sería peor compañero de apartamento y por qué.",
  "Una defensa legal de una opinión completamente indefendible.",
  "El ranking definitivo de sonidos que dan más rabia.",
  "Qué profesión tendría cada integrante del grupo en la Edad Media.",
  "Por qué los ascensores deberían tener un botón de pánico para conversaciones incómodas.",
  "Una teoría conspirativa sobre por qué desaparecen las medias.",
  "Cómo sobrevivir 24 horas usando únicamente cosas encontradas en una cocina.",
  "Qué franquicia tendría el peor Monopoly posible.",
  "Un estudio comparativo de las mejores formas de decir 'ya voy'.",
  "Qué objeto cotidiano ganaría una pelea contra otro objeto cotidiano.",
  "Por qué las reuniones que duran cinco minutos nunca duran cinco minutos.",
  "Una clasificación científica de las mejores excusas para no contestar WhatsApp.",
  "Qué videojuego sería más peligroso si fuera real.",
  "La economía secreta de los snacks en una reunión.",
  "Cómo sería un país gobernado por las reglas de UNO.",
  "Qué personaje de película sería pésimo compañero de trabajo.",
  "Una guía para detectar a alguien que está fingiendo entender las reglas de un juego.",
  "Las cinco peores ideas para una aplicación móvil.",
  "Qué pasaría si todos los semáforos fueran reemplazados por personas.",
  "Un análisis serio de por qué siempre queda una sola galleta en el paquete."
];
$("#ideaBtn").addEventListener("click", () => {
  const idea = ideas[Math.floor(Math.random() * ideas.length)];
  $("#ideaDisplay").textContent = idea;
});

let secondsLeft = 600, timerInterval = null;
function renderTimer() {
  const m = Math.floor(secondsLeft / 60).toString().padStart(2,"0");
  const s = (secondsLeft % 60).toString().padStart(2,"0");
  $(".timer").textContent = `${m}:${s}`;
}
$("#timerStart").addEventListener("click", () => {
  if (timerInterval || secondsLeft <= 0) return;
  timerInterval = setInterval(() => {
    secondsLeft--;
    renderTimer();
    if (secondsLeft <= 0) {
      clearInterval(timerInterval); timerInterval = null;
      toast("TIEMPO AGOTADO // GRACIAS POR SU COOPERACIÓN");
      document.title = "🚨 TIEMPO AGOTADO";
    }
  }, 1000);
});
$("#timerPause").addEventListener("click", () => {
  clearInterval(timerInterval); timerInterval = null;
});
$("#timerReset").addEventListener("click", () => {
  clearInterval(timerInterval); timerInterval = null; secondsLeft = 600; renderTimer();
});

const target = new Date("2026-10-10T17:00:00-05:00").getTime();
function countdown() {
  const diff = Math.max(0, target - Date.now());
  const total = Math.floor(diff / 1000);
  $("#days").textContent = Math.floor(total / 86400).toString().padStart(2,"0");
  $("#hours").textContent = Math.floor(total % 86400 / 3600).toString().padStart(2,"0");
  $("#minutes").textContent = Math.floor(total % 3600 / 60).toString().padStart(2,"0");
  $("#seconds").textContent = (total % 60).toString().padStart(2,"0");
}
countdown(); setInterval(countdown, 1000);

$("#yesBtn").addEventListener("click", () => {
  localStorage.setItem("oqmpsRsvp", "yes");
  $("#rsvpMessage").textContent = "✓ ASISTENCIA CONFIRMADA // AGENTE LISTO PARA LA OPERACIÓN";
  confetti();
});
$("#noBtn").addEventListener("click", () => {
  $("#rsvpMessage").textContent = "ERROR: ESTA OPCIÓN HA SIDO REMOVIDA DEL PROTOCOLO.";
  toast("DECISIÓN SOSPECHOSA DETECTADA");
});


const gameTutorials = {
  risk: {
    code: "MISSION 01",
    title: "RISK",
    summary: "Un juego de estrategia y conquista en el que los jugadores intentan controlar territorios y completar su misión.",
    objective: "Conquistar territorios, ampliar tus ejércitos y cumplir el objetivo asignado. En la práctica: negociar, atacar y esperar que los dados estén de tu lado.",
    how: "En tu turno recibes tropas, las colocas, puedes atacar territorios vecinos y, si conquistas al menos uno, puedes realizar un desplazamiento. Los combates se resuelven con dados.",
    rules: [
      "Los ataques deben realizarse desde un territorio que controles.",
      "El atacante y el defensor lanzan dados según las tropas disponibles.",
      "No puedes dejar un territorio completamente vacío.",
      "Las alianzas y negociaciones pueden existir, pero las promesas no son contratos.",
      "Gana quien cumpla la condición de victoria establecida para la partida."
    ],
    tip: "PROTOCOLO: No subestime a quien dice 'yo no sé jugar'."
  },
  clue: {
    code: "MISSION 02",
    title: "CLUE",
    summary: "Una investigación detectivesca para descubrir quién cometió el crimen, dónde ocurrió y con qué arma.",
    objective: "Resolver la combinación secreta de sospechoso, lugar y arma antes que los demás.",
    how: "Mueve tu ficha por las habitaciones, formula sugerencias y utiliza las cartas e información disponible para descartar posibilidades.",
    rules: [
      "Una sugerencia debe incluir un sospechoso, una habitación y un arma.",
      "Los demás jugadores intentan refutar la sugerencia mostrando una carta si pueden.",
      "La información que obtengas debe mantenerse en secreto.",
      "Puedes hacer una acusación cuando creas tener la combinación correcta.",
      "Si una acusación es incorrecta, quedas fuera de la posibilidad de ganar."
    ],
    tip: "PROTOCOLO: Acusar a alguien sin pruebas no cuenta como investigación."
  },
  uno: {
    code: "MISSION 03",
    title: "UNO",
    summary: "El clásico juego de cartas donde el objetivo es quedarte sin cartas antes que los demás.",
    objective: "Jugar todas tus cartas y ser el primero en quedarse sin cartas en la ronda.",
    how: "En tu turno debes jugar una carta que coincida con el color, número o símbolo de la carta superior del descarte. Si no puedes, robas una carta.",
    rules: [
      "Las cartas especiales cambian el ritmo de la partida.",
      "Un +2 hace robar dos cartas y perder el turno, según las reglas acordadas.",
      "Un comodín permite elegir el color.",
      "Cuando te quede una sola carta debes decir 'UNO'.",
      "Definan antes de empezar si usarán reglas caseras como acumular +2 o +4."
    ],
    tip: "PROTOCOLO: Las reglas de la casa deben declararse antes de que alguien necesite salvarse."
  },
  unoflip: {
    code: "MISSION 04",
    title: "UNO FLIP",
    summary: "UNO con dos caras: una clara y una oscura. Una carta FLIP puede cambiar completamente la partida.",
    objective: "Quedarte sin cartas utilizando las reglas de UNO mientras sobrevives a los cambios entre los dos lados de la baraja.",
    how: "Se juega parecido a UNO, pero las cartas tienen lado claro y lado oscuro. Cuando aparece FLIP, se voltea la baraja, las manos y se continúa usando las reglas del lado nuevo.",
    rules: [
      "Todos deben voltear sus cartas cuando se juega FLIP.",
      "El lado oscuro tiene acciones más fuertes y penalizaciones mayores.",
      "La carta superior determina qué se puede jugar.",
      "Cuando quede una carta debes decir 'UNO'.",
      "Acuerden antes de empezar cualquier regla casera."
    ],
    tip: "PROTOCOLO: Si pensabas que estabas ganando, espera a que alguien juegue FLIP."
  }
};

const gameModal = $("#gameModal");
function openGameTutorial(key) {
  const g = gameTutorials[key];
  if (!g) return;
  $("#modalCode").textContent = g.code;
  $("#modalTitle").textContent = g.title;
  $("#modalSummary").textContent = g.summary;
  $("#modalObjective").textContent = g.objective;
  $("#modalHow").textContent = g.how;
  $("#modalRules").innerHTML = g.rules.map(r => `<li>${r}</li>`).join("");
  $("#modalTip").textContent = g.tip;
  gameModal.classList.remove("hidden");
  document.body.classList.add("modal-open");
}
document.querySelectorAll(".game-card[data-game]").forEach(card => {
  card.addEventListener("click", () => openGameTutorial(card.dataset.game));
  card.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openGameTutorial(card.dataset.game);
    }
  });
});
function closeGameTutorial() {
  gameModal.classList.add("hidden");
  document.body.classList.remove("modal-open");
}
$("#gameModalClose").addEventListener("click", closeGameTutorial);
$(".game-modal-backdrop").addEventListener("click", closeGameTutorial);
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !gameModal.classList.contains("hidden")) closeGameTutorial();
});

function confetti() {
  for (let i=0;i<35;i++) {
    const el = document.createElement("span");
    el.textContent = ["◆","■","✦","+" ,"●"][Math.floor(Math.random()*5)];
    el.style.cssText = `position:fixed;left:${Math.random()*100}vw;top:-20px;color:${["#a8ff3e","#ff3cac","#37e8ff","#ff9d32"][Math.floor(Math.random()*4)]};font-size:${10+Math.random()*20}px;z-index:120;pointer-events:none;`;
    document.body.appendChild(el);
    const duration = 1300 + Math.random()*1300;
    el.animate([{transform:"translateY(0) rotate(0deg)",opacity:1},{transform:`translateY(110vh) rotate(${Math.random()*900}deg)`,opacity:0}],{duration,easing:"cubic-bezier(.2,.8,.3,1)"});
    setTimeout(()=>el.remove(),duration+50);
  }
}

let clickCount = 0;
document.addEventListener("keydown", e => {
  if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "o") {
    clickCount++;
    if (clickCount === 1) toast("SECRET PROTOCOL DETECTED");
    if (clickCount === 2) {
      toast("SYSTEM STATUS: CHAOTIC");
      console.log("%cPROJECT 8 // SYSTEM STATUS","color:#a8ff3e;font-size:18px");
      console.log("EVENT........ ACTIVE");
      console.log("FOOD......... UNKNOWN");
      console.log("DRINKS....... UNKNOWN");
      console.log("RISK......... DANGEROUS");
      console.log("CLUE......... SUSPICIOUS");
      console.log("POWERPOINT... EXTREMELY CONCERNING");
      clickCount = 0;
    }
  }
});

document.addEventListener("click", e => {
  if (e.target.matches(".classified")) {
    toast("NO DEBERÍAS HABER HECHO ESO.");
  }
});

/* Le Lab — bande-son des vidéos du module Machine Learning
   - une musique douce générée par le code (Web Audio : accords, petite cloche à chaque scène) ;
   - une voix off française qui lit le sous-titre de chaque scène (synthèse vocale du navigateur).
   Développé par 25 Labs */
"use strict";

let audioCtx = null;
const voixDispo = typeof speechSynthesis !== "undefined";
let voixFr = null;

/** Choisit une voix française parmi celles du système (Google, Microsoft, Apple…). */
function choisirVoix() {
  if (!voixDispo) return;
  const v = speechSynthesis.getVoices().filter(v => /^fr/i.test(v.lang));
  voixFr = v.find(x => /fr-FR/i.test(x.lang) && /google|natural|neural|amélie|thomas/i.test(x.name)) || v.find(x => /fr-FR/i.test(x.lang)) || v[0] || null;
}
if (voixDispo) { choisirVoix(); speechSynthesis.onvoiceschanged = choisirVoix; }

const midi = n => 440 * Math.pow(2, (n - 69) / 12);
// Accords doux qui changent à chaque scène (la mineur, fa, do, sol).
const ACCORDS = [[57, 60, 64], [53, 57, 60], [48, 55, 64], [55, 59, 62]];

/** Crée la bande-son d'une vidéo. */
function creerBandeSon() {
  let general = null, nappe = null, actif = true, parole = null;

  function demarrerAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();
    if (!general) {
      general = audioCtx.createGain();
      general.gain.value = actif ? 1 : 0;
      general.connect(audioCtx.destination);
    }
  }

  /** Fond musical de la scène i : un accord tenu, très bas, filtré. */
  function nappeScene(i) {
    const t = audioCtx.currentTime;
    if (nappe) { nappe.g.gain.setTargetAtTime(0.0001, t, 0.4); const ancien = nappe; setTimeout(() => ancien.osc.forEach(o => o.stop()), 2500); }
    const g = audioCtx.createGain(), filtre = audioCtx.createBiquadFilter();
    filtre.type = "lowpass"; filtre.frequency.value = 900;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.035, t + 1.2);
    filtre.connect(g).connect(general);
    const osc = [];
    ACCORDS[i % ACCORDS.length].forEach(n => [-6, 6].forEach(d => {
      const o = audioCtx.createOscillator();
      o.type = "triangle"; o.frequency.value = midi(n); o.detune.value = d;
      o.connect(filtre); o.start(t); osc.push(o);
    }));
    nappe = { g, osc };
  }

  /** Petite cloche au début de chaque scène. */
  function cloche() {
    const t = audioCtx.currentTime;
    [[76, 0], [83, 0.09]].forEach(([n, dt]) => {
      const o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.type = "sine"; o.frequency.value = midi(n);
      g.gain.setValueAtTime(0.0001, t + dt); g.gain.exponentialRampToValueAtTime(0.09, t + dt + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + dt + 0.9);
      o.connect(g).connect(general); o.start(t + dt); o.stop(t + dt + 1);
    });
  }

  function lire(texte) {
    if (!voixDispo || !actif) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(texte);
    u.lang = "fr-FR"; u.rate = 1.02; u.pitch = 1;
    if (voixFr) u.voice = voixFr;
    parole = u;
    u.onend = u.onerror = () => { if (parole === u) parole = null; };
    speechSynthesis.speak(u);
  }

  return {
    /** Appelé quand une nouvelle scène commence. */
    scene(i, texte) {
      demarrerAudio();
      nappeScene(i);
      if (actif) cloche();
      lire(texte);
    },
    /** Vrai tant que la voix lit encore : la vidéo attend la fin de la phrase. */
    parle() { return actif && voixDispo && parole !== null && (speechSynthesis.speaking || speechSynthesis.pending); },
    pause() { if (voixDispo) speechSynthesis.cancel(); parole = null; if (audioCtx) audioCtx.suspend(); },
    reprendre(i, texte) { demarrerAudio(); lire(texte); },
    arreter() {
      if (voixDispo) speechSynthesis.cancel(); parole = null;
      if (nappe && audioCtx) { nappe.g.gain.setTargetAtTime(0.0001, audioCtx.currentTime, 0.5); const n = nappe; setTimeout(() => n.osc.forEach(o => o.stop()), 2500); nappe = null; }
    },
    basculer() {
      actif = !actif;
      if (general) general.gain.setTargetAtTime(actif ? 1 : 0, audioCtx.currentTime, 0.05);
      if (!actif && voixDispo) { speechSynthesis.cancel(); parole = null; }
      return actif;
    },
    get actif() { return actif; },
    voix: voixDispo
  };
}

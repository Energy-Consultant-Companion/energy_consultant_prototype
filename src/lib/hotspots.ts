/**
 * Clickable regions of the prototype.
 *
 * The screens are a faithful, static export of the Paper design, so nothing in
 * them carries a handler. Instead each rule locates a node at runtime — by the
 * text it renders or by a CSS selector — and the demo layer turns the enclosing
 * element into a link.
 */
export type Hotspot = {
  /** Exact, trimmed text of the innermost node to match. */
  text?: string;
  /** CSS selector, for affordances that render as icons rather than words. */
  selector?: string;
  /** Which match to use when the text appears more than once. Default 0. */
  nth?: number;
  /** Wire up every match instead of just one. */
  all?: boolean;
  /** Climb this many parents from the match to reach the clickable box. */
  up?: number;
  /** Target screen slug. */
  to: string;
};

/** The product rail, present on every consultant screen. */
const RAIL: Hotspot[] = [
  { text: "Überblick", nth: 0, up: 1, to: "ueberblick" },
  { text: "Fälle", nth: 0, up: 1, to: "faelle" },
  { text: "Nächste Schritte", nth: 0, up: 1, to: "naechste-schritte" },
  { text: "Unterlagen", nth: 0, up: 1, to: "unterlagen-eingang" },
  { text: "Förderung", nth: 0, up: 1, to: "foerderung-pruefung" },
  { text: "Regulierungen", nth: 0, up: 1, to: "regulierungen" },
  { text: "Anfragen", nth: 0, up: 1, to: "anfragen" },
  { text: "Fragen", nth: 0, up: 1, to: "fragen" },
  { text: "Suchen oder fragen", nth: 0, up: 1, to: "suche-global" },
  { selector: 'path[d^="M12.22 2h-.44"]', up: 2, to: "einstellungen-profil" },
];

/** The per-case rail on the right of every "Fall ·" screen. */
const CASE_RAIL: Hotspot[] = [
  { text: "Übersicht", nth: 0, up: 1, to: "fall-uebersicht" },
  { text: "Schritte", nth: 0, up: 1, to: "fall-schritte" },
  { text: "Ablage", nth: 0, up: 1, to: "fall-unterlagen-ordner" },
  { text: "Fehlend", nth: 0, up: 1, to: "fall-unterlagen-fehlend" },
  { text: "Alles", nth: 0, up: 1, to: "fall-verlauf" },
  { text: "Alle Aktionen", nth: 0, up: 1, to: "fall-aktionen" },
];

/** The message list in the mail client; the same three threads on every mail screen. */
const MAIL_LIST: Hotspot[] = [
  { text: "Ihre Anfrage passt — so geht es weiter", nth: 0, up: 1, to: "mail-zugang" },
  { text: "Angekommen — 7 von 9 Unterlagen", nth: 0, up: 1, to: "mail-bestaetigt" },
  { text: "Zwei Unterlagen fehlen noch — Frist Freitag", nth: 0, up: 1, to: "mail-erinnerung" },
];

export const HOTSPOTS: Record<string, Hotspot[]> = {
  // ---- Kundschaft: von der Website in die Anfrage -------------------------
  website: [{ text: "Anfrage erstellen", all: true, up: 1, to: "anfrage-gebaeude" }],
  "anfrage-gebaeude": [{ text: "Weiter", up: 1, to: "anfrage-vorhaben" }],
  "anfrage-vorhaben": [
    { text: "Weiter", up: 1, to: "anfrage-zeitpunkt" },
    { selector: 'path[d="M14.5 5.5 8 12l6.5 6.5"]', up: 2, to: "anfrage-gebaeude" },
  ],
  "anfrage-zeitpunkt": [
    { text: "Weiter", up: 1, to: "anfrage-kontakt" },
    { selector: 'path[d="M14.5 5.5 8 12l6.5 6.5"]', up: 2, to: "anfrage-vorhaben" },
  ],
  "anfrage-kontakt": [
    { text: "Anfrage senden", up: 1, to: "anfragen" },
    { selector: 'path[d="M14.5 5.5 8 12l6.5 6.5"]', up: 2, to: "anfrage-zeitpunkt" },
  ],

  // ---- Beraterin nimmt an, Zugang geht raus ------------------------------
  anfragen: [
    ...RAIL,
    { text: "Annehmen und Zugang senden", up: 1, to: "mail-zugang" },
    { text: "Marion Deibel", up: 2, to: "anfragen" },
  ],
  "mail-zugang": [
    { text: "Zu Ihrem Bereich", up: 1, to: "portal-informationen" },
    { text: "Per Mail antworten", up: 1, to: "mail-antwort" },
    ...MAIL_LIST,
  ],

  // ---- Weg 2: alles per Mail --------------------------------------------
  // Compose window sits over the mailbox, so only its own controls are live.
  "mail-antwort": [{ selector: 'path[stroke="#0B69F0"]', up: 1, to: "mail-bestaetigt" }],
  "mail-bestaetigt": [...MAIL_LIST],
  "mail-erinnerung": [
    { text: "Zu Ihrem Bereich", up: 1, to: "portal-informationen" },
    { text: "Einfach antworten", up: 1, to: "mail-antwort" },
    ...MAIL_LIST,
  ],

  // ---- Weg 1: im Klientenportal -----------------------------------------
  "portal-informationen": [{ text: "Weiter", up: 1, to: "klientenportal" }],
  klientenportal: [
    { text: "Alle 16 ansehen →", up: 1, to: "klientenportal" },
    { text: "Alle Schritte", up: 1, to: "klientenportal" },
  ],

  // ---- Beraterin: Überblick und Fälle ------------------------------------
  ueberblick: [
    ...RAIL,
    { text: "Vorgeprüfte Unterlagen gegenzeichnen", up: 1, to: "unterlagen-gegenpruefen" },
    { text: "Zwei fehlende Unterlagen nachtragen", up: 1, to: "fall-unterlagen-fehlend" },
    { text: "Neue EBW-Regel auf den Fall anwenden", up: 1, to: "regulierungen-aenderungen" },
    { text: "Frage von Hans-Jürgen Brendel beantworten", up: 1, to: "frage-entwurf" },
    { text: "Alle nächsten Schritte", up: 1, to: "naechste-schritte" },
    { text: "Alle neun Änderungen", up: 1, to: "regulierungen-aenderungen" },
  ],
  faelle: [
    ...RAIL,
    { text: "Familie Reuter", up: 2, to: "fall-uebersicht" },
    { text: "Fall anlegen", up: 1, to: "fall-anlegen-unterlagen" },
  ],
  "fall-anlegen-unterlagen": [
    { text: "Projekt übernehmen", up: 2, to: "fall-anlegen-projekt" },
    { text: "ANFRAGEN ANSEHEN →", up: 1, to: "anfragen" },
    { text: "Kundschaft einladen und fehlende Unterlagen anfragen", up: 1, to: "fall-uebersicht" },
    { text: "Verwerfen", up: 1, to: "faelle" },
  ],
  "fall-anlegen-projekt": [
    { text: "Aus Unterlagen lesen", up: 2, to: "fall-anlegen-unterlagen" },
    { text: "Kundschaft einladen und fehlende Unterlagen anfragen", up: 1, to: "fall-uebersicht" },
    { text: "Verwerfen", up: 1, to: "faelle" },
  ],

  // ---- Ein Fall im Detail -------------------------------------------------
  "fall-uebersicht": [
    ...RAIL,
    ...CASE_RAIL,
    { text: "Alle zwölf Schritte →", up: 1, to: "fall-schritte" },
    { text: "Unterlagen prüfen", up: 2, to: "unterlagen-eingang" },
    { text: "Prüfe ISFP", up: 2, to: "foerderung-pruefung" },
    { text: "Beantworte Frage", up: 2, to: "frage-entwurf" },
    { text: "Unterlagen hochladen", nth: 1, up: 2, to: "fall-unterlagen-ordner" },
  ],
  "fall-schritte": [...RAIL, ...CASE_RAIL],
  "fall-verlauf": [...RAIL, ...CASE_RAIL],
  "fall-unterlagen-ordner": [
    ...RAIL,
    ...CASE_RAIL,
    { text: "Gebäudedaten", up: 2, to: "fall-unterlagen-geoeffnet" },
    { text: "Kundendaten", up: 2, to: "fall-unterlagen-geoeffnet" },
    { text: "Berechnungen", up: 2, to: "fall-unterlagen-geoeffnet" },
    { text: "Förderweg", up: 2, to: "fall-unterlagen-geoeffnet" },
    { text: "Kommunikation", nth: 1, up: 2, to: "fall-unterlagen-geoeffnet" },
    { text: "Weiteres", up: 2, to: "fall-unterlagen-geoeffnet" },
  ],
  "fall-unterlagen-geoeffnet": [
    ...RAIL,
    ...CASE_RAIL,
    { text: "Kundendaten", up: 2, to: "fall-unterlagen-ordner" },
    { text: "ORDNER", up: 1, to: "fall-unterlagen-ordner" },
  ],
  "fall-unterlagen-fehlend": [
    ...RAIL,
    ...CASE_RAIL,
    { text: "Erinnern", all: true, up: 1, to: "mail-erinnerung" },
    { text: "Nachfragen", up: 1, to: "frage-stellen" },
  ],
  // ⌘P palette over the case — only palette rows are live.
  "fall-aktionen": [
    { text: "Unterlagen auf Vollständigkeit prüfen", up: 1, to: "fall-unterlagen-fehlend" },
    { text: "Rechnung prüfen", up: 1, to: "unterlagen-pruefung" },
    { text: "Förderweg prüfen", up: 1, to: "foerderung-pruefung" },
    { text: "Korrektur an den Handwerker entwerfen", up: 1, to: "unterlagen-pruefung" },
    { text: "Notiz schreiben", nth: 1, up: 1, to: "fall-verlauf" },
    { text: "Gesprächsprotokoll anlegen", up: 1, to: "fall-verlauf" },
    { text: "E-Mail an die Kundschaft entwerfen", up: 1, to: "mail-erinnerung" },
    { text: "„Was fehlt in diesem Fall?“", up: 1, to: "fall-unterlagen-fehlend" },
    { text: "„Welche Förderung passt hier?“", up: 1, to: "foerderung-pruefung" },
    { text: "„Fasse die letzte Kommunikation zusammen.“", up: 1, to: "fall-verlauf" },
  ],

  // ---- Schritte, Fragen, Suche -------------------------------------------
  "naechste-schritte": [
    ...RAIL,
    { text: "Regel öffnen", up: 1, to: "regulierungen-aenderungen" },
    { text: "Freigeben", up: 1, to: "frage-entwurf" },
    { text: "Prüfen", up: 1, to: "unterlagen-pruefung" },
    { text: "Antrag öffnen", up: 1, to: "foerderung-programm" },
  ],
  fragen: [
    ...RAIL,
    { text: "„Können wir die Fenster schon im Herbst tauschen lassen?“", nth: 0, up: 3, to: "frage-entwurf" },
    { text: "Frage stellen", up: 1, to: "frage-stellen" },
    { text: "Frage weiterleiten", up: 1, to: "frage-stellen" },
  ],
  "frage-entwurf": [
    { text: "Freigeben und senden", up: 1, to: "fragen" },
    { text: "Bearbeiten", up: 1, to: "fragen" },
    { text: "Selbst schreiben", up: 1, to: "frage-stellen" },
    { selector: 'path[d="M3.4 3.4l7.2 7.2M10.6 3.4l-7.2 7.2"]', up: 2, to: "fragen" },
  ],
  // Composer over the question list.
  "frage-stellen": [
    { text: "Frage senden", up: 1, to: "fragen" },
    { text: "Bearbeiten", up: 1, to: "frage-stellen" },
    { text: "Selbst schreiben", up: 1, to: "frage-stellen" },
    { text: "Antwort übernehmen statt fragen", up: 1, to: "fragen" },
    { text: "Andere Person suchen", up: 1, to: "frage-stellen" },
  ],
  // ⌘K palette over the case list.
  "suche-global": [
    { text: "ALLE FÄLLE", up: 1, to: "faelle" },
    { text: "BUCHENWEG 14 · BAFA EBW", up: 2, to: "suche-fall" },
    { text: "Rechnung Heizungsbau Knop", up: 2, to: "unterlagen-pruefung" },
    { text: "„Welche Fälle trifft die neue EBW-Regel?“", up: 1, to: "regulierungen-aenderungen" },
    { text: "„Was ist diese Woche überfällig?“", up: 1, to: "naechste-schritte" },
  ],
  "suche-fall": [
    { text: "NUR FAMILIE REUTER", up: 1, to: "fall-uebersicht" },
    { text: "„Können wir die Fenster schon im Herbst tauschen lassen?“", nth: 0, up: 2, to: "frage-entwurf" },
    { text: "Fenster 1998 erneuert — aus dem Erstgespräch", up: 2, to: "fall-verlauf" },
    { text: "Vorhabenbeginn vor Antragstellung", up: 2, to: "regulierungen-antwort" },
    { text: "„Darf vor dem Förderantrag gebaut werden?“", up: 1, to: "regulierungen-antwort" },
    { text: "„Was fehlt hier noch bis zum Antrag?“", up: 1, to: "fall-unterlagen-fehlend" },
  ],

  // ---- Unterlagen prüfen --------------------------------------------------
  "unterlagen-eingang": [
    ...RAIL,
    { text: "Gegenprüfen", all: true, up: 1, to: "unterlagen-gegenpruefen" },
    { text: "Selber prüfen", all: true, up: 1, to: "unterlagen-pruefung" },
  ],
  "unterlagen-pruefung": [
    ...RAIL,
    { text: "Korrektur anfordern", up: 1, to: "unterlagen-eingang" },
    { text: "Freigeben", up: 1, to: "unterlagen-eingang" },
    { text: "Ablehnen", up: 1, to: "unterlagen-eingang" },
    { text: "Entwurf ansehen", all: true, up: 1, to: "frage-entwurf" },
  ],
  "unterlagen-gegenpruefen": [
    ...RAIL,
    { text: "Annehmen und ablegen", up: 1, to: "unterlagen-eingang" },
    { text: "Selber prüfen", up: 1, to: "unterlagen-pruefung" },
    { text: "Ablehnen", up: 1, to: "unterlagen-eingang" },
  ],

  // ---- Förderung ----------------------------------------------------------
  "foerderung-pruefung": [...RAIL, { text: "Förderung prüfen", up: 1, to: "foerderung-ergebnisse" }],
  "foerderung-ergebnisse": [
    ...RAIL,
    { text: "Prüfung ansehen", up: 1, to: "foerderung-programm" },
    { text: "Gebäudehülle · Dachdämmung", up: 2, to: "foerderung-programm" },
    { text: "Energieberatung für Wohngebäude", up: 2, to: "foerderung-programm" },
    { text: "Angaben ändern", up: 1, to: "foerderung-pruefung" },
  ],
  // Programme sheet over the results list.
  "foerderung-programm": [
    { text: "Für diesen Fall übernehmen", up: 1, to: "fall-uebersicht" },
    { text: "Verwerfen", up: 1, to: "foerderung-ergebnisse" },
    { text: "ÄNDERUNG ANSEHEN →", up: 1, to: "regulierungen-aenderungen" },
    { text: "Nachweise anfordern", up: 1, to: "fall-unterlagen-fehlend" },
  ],

  // ---- Regulierungen ------------------------------------------------------
  regulierungen: [
    ...RAIL,
    { text: "1 Änderung ansehen", up: 1, to: "regulierungen-aenderungen" },
    { text: "Was gilt für diesen Fall?", nth: 0, up: 2, to: "regulierungen-antwort" },
    { text: "Heizlastberechnung", up: 3, to: "regulierungen-antwort" },
    { text: "Anschluss ans Wärmenetz", up: 3, to: "regulierungen-antwort" },
  ],
  "regulierungen-antwort": [
    ...RAIL,
    { text: "Drei laufende Beratungen prüfen", up: 1, to: "faelle" },
    { text: "Was gilt für diesen Fall?", nth: 0, up: 2, to: "regulierungen" },
  ],
  "regulierungen-aenderungen": [
    ...RAIL,
    { text: "Drei Beratungen", up: 1, to: "faelle" },
    { text: "Zwei Beratungen", up: 1, to: "faelle" },
    { text: "Eine Beratung", up: 1, to: "faelle" },
    { text: "Der Zuschuss für die Beratung fällt von 80 auf 50 Prozent.", nth: 0, up: 2, to: "regulierungen-antwort" },
  ],

  // ---- Einstellungen ------------------------------------------------------
  "einstellungen-profil": [...RAIL, { text: "Projektvorlagen", nth: 0, up: 1, to: "einstellungen-vorlagen" }],
  "einstellungen-vorlagen": [...RAIL, { text: "Profil und Arbeitsweise", nth: 0, up: 1, to: "einstellungen-profil" }],
};

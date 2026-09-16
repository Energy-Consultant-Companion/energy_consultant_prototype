// Generated from tools/screens.json. Run `node tools/gen-registry.mjs` to refresh.
import type { ComponentType } from "react";
import Website from "@/screens/Website";
import AnfrageGebaeude from "@/screens/AnfrageGebaeude";
import AnfrageVorhaben from "@/screens/AnfrageVorhaben";
import AnfrageZeitpunkt from "@/screens/AnfrageZeitpunkt";
import AnfrageKontakt from "@/screens/AnfrageKontakt";
import Anfragen from "@/screens/Anfragen";
import MailZugang from "@/screens/MailZugang";
import MailAntwort from "@/screens/MailAntwort";
import MailBestaetigt from "@/screens/MailBestaetigt";
import MailErinnerung from "@/screens/MailErinnerung";
import PortalInformationen from "@/screens/PortalInformationen";
import Klientenportal from "@/screens/Klientenportal";
import Ueberblick from "@/screens/Ueberblick";
import Faelle from "@/screens/Faelle";
import FallAnlegenUnterlagen from "@/screens/FallAnlegenUnterlagen";
import FallAnlegenProjekt from "@/screens/FallAnlegenProjekt";
import FallUebersicht from "@/screens/FallUebersicht";
import FallSchritte from "@/screens/FallSchritte";
import FallVerlauf from "@/screens/FallVerlauf";
import FallUnterlagenOrdner from "@/screens/FallUnterlagenOrdner";
import FallUnterlagenGeoeffnet from "@/screens/FallUnterlagenGeoeffnet";
import FallUnterlagenFehlend from "@/screens/FallUnterlagenFehlend";
import FallAktionen from "@/screens/FallAktionen";
import NaechsteSchritte from "@/screens/NaechsteSchritte";
import Fragen from "@/screens/Fragen";
import FrageEntwurf from "@/screens/FrageEntwurf";
import FrageStellen from "@/screens/FrageStellen";
import SucheGlobal from "@/screens/SucheGlobal";
import SucheFall from "@/screens/SucheFall";
import UnterlagenEingang from "@/screens/UnterlagenEingang";
import UnterlagenPruefung from "@/screens/UnterlagenPruefung";
import UnterlagenGegenpruefen from "@/screens/UnterlagenGegenpruefen";
import FoerderungPruefung from "@/screens/FoerderungPruefung";
import FoerderungErgebnisse from "@/screens/FoerderungErgebnisse";
import FoerderungProgramm from "@/screens/FoerderungProgramm";
import Regulierungen from "@/screens/Regulierungen";
import RegulierungenAntwort from "@/screens/RegulierungenAntwort";
import RegulierungenAenderungen from "@/screens/RegulierungenAenderungen";
import EinstellungenProfil from "@/screens/EinstellungenProfil";
import EinstellungenVorlagen from "@/screens/EinstellungenVorlagen";

export type ChapterId =
  | "kundschaft"
  | "annahme"
  | "weg-mail"
  | "weg-portal"
  | "beratung"
  | "fall"
  | "arbeit"
  | "unterlagen"
  | "foerderung"
  | "regeln"
  | "einstellungen";

export type Screen = {
  slug: string;
  title: string;
  note: string;
  chapter: ChapterId;
  artboard: string;
  Component: ComponentType;
};

export const CHAPTERS: { id: ChapterId; title: string; persona: "Kundschaft" | "Beraterin" }[] = [
  { id: "kundschaft", title: "Anfrage stellen", persona: "Kundschaft" },
  { id: "annahme", title: "Anfrage annehmen", persona: "Beraterin" },
  { id: "weg-mail", title: "Weg 2 · Per Mail", persona: "Kundschaft" },
  { id: "weg-portal", title: "Weg 1 · Im Portal", persona: "Kundschaft" },
  { id: "beratung", title: "Fälle", persona: "Beraterin" },
  { id: "fall", title: "Ein Fall", persona: "Beraterin" },
  { id: "arbeit", title: "Schritte, Fragen, Suche", persona: "Beraterin" },
  { id: "unterlagen", title: "Unterlagen prüfen", persona: "Beraterin" },
  { id: "foerderung", title: "Förderung", persona: "Beraterin" },
  { id: "regeln", title: "Regulierungen", persona: "Beraterin" },
  { id: "einstellungen", title: "Einstellungen", persona: "Beraterin" },
];

export const SCREENS: Screen[] = [
  {
    slug: "website",
    title: "Website der Beraterin",
    note: "Bestehende Website, ein Button führt zu ENSERA.",
    chapter: "kundschaft",
    artboard: "FJT-0",
    Component: Website,
  },
  {
    slug: "anfrage-gebaeude",
    title: "Erstanfrage · 1 Gebäude",
    note: "Vier kurze Schritte, kein Konto nötig.",
    chapter: "kundschaft",
    artboard: "H9N-0",
    Component: AnfrageGebaeude,
  },
  {
    slug: "anfrage-vorhaben",
    title: "Erstanfrage · 2 Vorhaben",
    note: "",
    chapter: "kundschaft",
    artboard: "VTP-1",
    Component: AnfrageVorhaben,
  },
  {
    slug: "anfrage-zeitpunkt",
    title: "Erstanfrage · 3 Zeitpunkt",
    note: "",
    chapter: "kundschaft",
    artboard: "VZD-1",
    Component: AnfrageZeitpunkt,
  },
  {
    slug: "anfrage-kontakt",
    title: "Erstanfrage · 4 Anliegen",
    note: "Absenden — die Anfrage landet bei der Beraterin.",
    chapter: "kundschaft",
    artboard: "W44-1",
    Component: AnfrageKontakt,
  },
  {
    slug: "anfragen",
    title: "Anfragen · Annehmen",
    note: "Gegen die eigenen Regeln vorgeprüft. „Annehmen und Zugang senden“.",
    chapter: "annahme",
    artboard: "HC9-0",
    Component: Anfragen,
  },
  {
    slug: "mail-zugang",
    title: "Mail · Zugang verschickt",
    note: "Die Kundschaft hat die Wahl: Portal oder einfach antworten.",
    chapter: "annahme",
    artboard: "ILU-0",
    Component: MailZugang,
  },
  {
    slug: "mail-antwort",
    title: "Weg 2 · Per Mail antworten",
    note: "Dateien an die Mail hängen — mehr nicht.",
    chapter: "weg-mail",
    artboard: "IQV-0",
    Component: MailAntwort,
  },
  {
    slug: "mail-bestaetigt",
    title: "Weg 2 · Statusmeldung",
    note: "Stand, Fehlendes und Frist kommen automatisch per Mail.",
    chapter: "weg-mail",
    artboard: "IXO-0",
    Component: MailBestaetigt,
  },
  {
    slug: "mail-erinnerung",
    title: "Weg 2 · Erinnerung",
    note: "Fristen laufen nach, ohne dass jemand daran denken muss.",
    chapter: "weg-mail",
    artboard: "J30-0",
    Component: MailErinnerung,
  },
  {
    slug: "portal-informationen",
    title: "Weg 1 · Angaben ergänzen",
    note: "Im Portal fehlende Angaben nachtragen.",
    chapter: "weg-portal",
    artboard: "HHC-0",
    Component: PortalInformationen,
  },
  {
    slug: "klientenportal",
    title: "Weg 1 · Klientenportal",
    note: "Danach: voller Zugang zum eigenen Bereich.",
    chapter: "weg-portal",
    artboard: "FMN-0",
    Component: Klientenportal,
  },
  {
    slug: "ueberblick",
    title: "Überblick",
    note: "Offene Aktionen und Regeländerungen des Tages.",
    chapter: "beratung",
    artboard: "YN0-0",
    Component: Ueberblick,
  },
  {
    slug: "faelle",
    title: "Fälle",
    note: "Alle Fälle — oder manuell einen neuen anlegen.",
    chapter: "beratung",
    artboard: "FTO-0",
    Component: Faelle,
  },
  {
    slug: "fall-anlegen-unterlagen",
    title: "Fall anlegen · Aus Unterlagen",
    note: "",
    chapter: "beratung",
    artboard: "X90-0",
    Component: FallAnlegenUnterlagen,
  },
  {
    slug: "fall-anlegen-projekt",
    title: "Fall anlegen · Projekt",
    note: "",
    chapter: "beratung",
    artboard: "Y1W-0",
    Component: FallAnlegenProjekt,
  },
  {
    slug: "fall-uebersicht",
    title: "Fall · Übersicht",
    note: "Aktueller Schritt, nächste Aktionen, Zusammenfassung.",
    chapter: "fall",
    artboard: "HN8-0",
    Component: FallUebersicht,
  },
  {
    slug: "fall-schritte",
    title: "Fall · Schritte",
    note: "Die zwölf Schritte im Detail.",
    chapter: "fall",
    artboard: "HTY-0",
    Component: FallSchritte,
  },
  {
    slug: "fall-verlauf",
    title: "Fall · Verlauf",
    note: "Was bisher passiert ist — von wem.",
    chapter: "fall",
    artboard: "I7A-0",
    Component: FallVerlauf,
  },
  {
    slug: "fall-unterlagen-ordner",
    title: "Fall · Unterlagen (Ordner)",
    note: "Ablage nach Ordnern. Einen Ordner anklicken.",
    chapter: "fall",
    artboard: "SRU-0",
    Component: FallUnterlagenOrdner,
  },
  {
    slug: "fall-unterlagen-geoeffnet",
    title: "Fall · Ordner geöffnet",
    note: "",
    chapter: "fall",
    artboard: "SZ8-0",
    Component: FallUnterlagenGeoeffnet,
  },
  {
    slug: "fall-unterlagen-fehlend",
    title: "Fall · Unterlage fehlt",
    note: "Worauf gewartet wird und bei wem.",
    chapter: "fall",
    artboard: "UYL-1",
    Component: FallUnterlagenFehlend,
  },
  {
    slug: "fall-aktionen",
    title: "Fall · Aktionsmenü",
    note: "⌘P — Aktionen im Kontext des Falls.",
    chapter: "fall",
    artboard: "ICP-0",
    Component: FallAktionen,
  },
  {
    slug: "naechste-schritte",
    title: "Nächste Schritte",
    note: "Fallübergreifend, detaillierter als im Überblick.",
    chapter: "arbeit",
    artboard: "GTN-0",
    Component: NaechsteSchritte,
  },
  {
    slug: "fragen",
    title: "Fragen",
    note: "Aus Portal und E-Mail, an einem Ort.",
    chapter: "arbeit",
    artboard: "GZ0-0",
    Component: Fragen,
  },
  {
    slug: "frage-entwurf",
    title: "Frage · Entwurf von ENSERA",
    note: "Mit Fundstellen. Freigeben, bearbeiten oder selbst schreiben.",
    chapter: "arbeit",
    artboard: "H3L-0",
    Component: FrageEntwurf,
  },
  {
    slug: "frage-stellen",
    title: "Frage stellen",
    note: "Selbst eine Frage an Kundschaft oder Handwerk stellen.",
    chapter: "arbeit",
    artboard: "YXV-0",
    Component: FrageStellen,
  },
  {
    slug: "suche-global",
    title: "Suche · Global",
    note: "⌘K — über alle Fälle.",
    chapter: "arbeit",
    artboard: "G40-0",
    Component: SucheGlobal,
  },
  {
    slug: "suche-fall",
    title: "Suche · Auf Fall eingegrenzt",
    note: "Auf einen Fall eingrenzen.",
    chapter: "arbeit",
    artboard: "GHI-0",
    Component: SucheFall,
  },
  {
    slug: "unterlagen-eingang",
    title: "Unterlagen · Eingang",
    note: "Gegenprüfen, selber prüfen, validiert.",
    chapter: "unterlagen",
    artboard: "JQ1-0",
    Component: UnterlagenEingang,
  },
  {
    slug: "unterlagen-pruefung",
    title: "Unterlagen · Selber prüfen",
    note: "Befund mit Fundstelle im Dokument.",
    chapter: "unterlagen",
    artboard: "JX3-0",
    Component: UnterlagenPruefung,
  },
  {
    slug: "unterlagen-gegenpruefen",
    title: "Unterlagen · Gegenprüfen",
    note: "Ohne Befund — annehmen und ablegen.",
    chapter: "unterlagen",
    artboard: "PO3-0",
    Component: UnterlagenGegenpruefen,
  },
  {
    slug: "foerderung-pruefung",
    title: "Förderung · Prüfung",
    note: "Fall wählen, Angaben kommen aus dem Fall.",
    chapter: "foerderung",
    artboard: "T6M-0",
    Component: FoerderungPruefung,
  },
  {
    slug: "foerderung-ergebnisse",
    title: "Förderung · Förderwege",
    note: "Ein erster Startpunkt — verbindlich ist der Bescheid.",
    chapter: "foerderung",
    artboard: "TUD-0",
    Component: FoerderungErgebnisse,
  },
  {
    slug: "foerderung-programm",
    title: "Förderung · Programm",
    note: "Details und Übernahme in den Fall.",
    chapter: "foerderung",
    artboard: "U35-0",
    Component: FoerderungProgramm,
  },
  {
    slug: "regulierungen",
    title: "Regulierungs-KI",
    note: "Frage mit Fall- und Dokumentkontext stellen.",
    chapter: "regeln",
    artboard: "OSG-0",
    Component: Regulierungen,
  },
  {
    slug: "regulierungen-antwort",
    title: "Regulierungen · Antwort",
    note: "Antwort mit nummerierten Fundstellen.",
    chapter: "regeln",
    artboard: "Q42-0",
    Component: RegulierungenAntwort,
  },
  {
    slug: "regulierungen-aenderungen",
    title: "Regulierungen · Änderungen",
    note: "Welche Änderung welche Fälle betrifft.",
    chapter: "regeln",
    artboard: "WKJ-0",
    Component: RegulierungenAenderungen,
  },
  {
    slug: "einstellungen-profil",
    title: "Einstellungen · Profil",
    note: "Arbeitsweise, an der ENSERA sich ausrichtet.",
    chapter: "einstellungen",
    artboard: "X17-0",
    Component: EinstellungenProfil,
  },
  {
    slug: "einstellungen-vorlagen",
    title: "Einstellungen · Projektvorlagen",
    note: "Schritte, Fristen und Pflichtunterlagen je Förderweg.",
    chapter: "einstellungen",
    artboard: "XWB-0",
    Component: EinstellungenVorlagen,
  },
];

export const SLUGS = SCREENS.map((s) => s.slug);

export function screenAt(slug: string | undefined): Screen {
  return SCREENS.find((s) => s.slug === slug) ?? SCREENS[0];
}

export function chapterOf(id: ChapterId) {
  return CHAPTERS.find((c) => c.id === id) ?? CHAPTERS[0];
}

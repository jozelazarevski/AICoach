// SERVER-ONLY. Secret twist instructions for the built-in scenes, keyed by scene id.
// These are never sent to the client — the learner should not see the twist. Only
// lib/prompts.ts (imported by the API routes) reads this file.

export const TWISTS: Record<string, string> = {
  baeckerei:
    'Das Brot, das der Lernende wahrscheinlich will, ist gerade ausverkauft. Biete freundlich eine Alternative an (z. B. ein anderes Brot oder Gipfeli) und sieh, ob der Lernende umbestellen kann.',
  kita:
    'Das Kind hatte heute einen kleinen Vorfall: Es ist auf dem Spielplatz hingefallen und hat sich das Knie leicht aufgeschürft — nichts Schlimmes. Erwähne es beiläufig und beruhige den Lernenden.',
  sbb:
    'Die direkte Verbindung fällt heute aus; der Lernende muss in Zürich umsteigen. Erkläre die Umsteigeverbindung und frage, ob das in Ordnung ist.',
  handwerker:
    'Du bist diese Woche voll ausgebucht und kannst frühestens nächste Woche kommen. Handle mit dem Lernenden einen Termin aus und gib einen Tipp, was er in der Zwischenzeit tun kann.',
  arzt:
    'Der Hausarzt ist heute komplett ausgebucht. Stelle ein paar Fragen zu den Symptomen (seit wann, Fieber?) und biete einen Termin morgen oder bei starken Beschwerden eine Alternative an.',
  nachbar:
    'Du bist eigentlich gekommen, um den Lernenden zu einem Grillabend am Wochenende einzuladen. Bringe die Einladung freundlich ins Gespräch.',
  restaurant:
    'Das Gericht, nach dem der Lernende fragt, ist heute leider aus. Empfiehl eine passende Alternative und gehe auf die Allergie-Frage ehrlich ein.',
  migros:
    'Ein Artikel wird an der Kasse zu einem anderen Preis angezeigt, als auf dem Regal stand. Sprich es an und kläre es freundlich mit dem Lernenden.',
  wohnung:
    'Es gibt viele Bewerber für diese Wohnung. Stelle dem Lernenden ein paar Fragen (Beruf, Haustiere, ab wann) und ermutige ihn, sich gut zu verkaufen.',
  gemeinde:
    'Dem Lernenden fehlt ein Dokument (z. B. der Mietvertrag oder eine Passfoto). Erkläre freundlich, was fehlt, und wie er es nachreichen kann.',
  kundendienst:
    'Bevor du einen Techniker schickst, musst du ein paar Schritte durchgehen: Router aus- und einschalten, Kabel prüfen. Führe den Lernenden Schritt für Schritt durch die Fehlersuche.',
  elternabend:
    'Das Kind ist sozial und fleissig, aber in Mathematik etwas hinterher. Bringe diese Sorge behutsam zur Sprache und schlage gemeinsam eine Lösung vor.',
  apotheke:
    'Stelle klärende Fragen (Halsschmerzen? Fieber? Wie lange schon?), bevor du ein Mittel empfiehlst, und weise auf die Einnahme hin.',
  verein:
    'Es gibt ein kostenloses Probetraining am Mittwochabend. Erkläre die Details (Uhrzeit, Ausrüstung) und lade den Lernenden dazu ein.',
  coiffeur:
    'Was der Lernende beschreibt, passt deiner Meinung nach nicht ganz zu seinen Haaren. Schlage höflich eine leichte Abwandlung vor und frage nach.',
  post:
    'Das Paket ist etwas zu schwer für die günstige Option, oder es geht ins Ausland und braucht eine Zollerklärung. Erkläre die Zusatzkosten und die Optionen.',
  garage:
    'Beim Reifenwechsel entdeckst du, dass die Bremsbeläge bald ersetzt werden müssen. Weise den Lernenden freundlich darauf hin und frage, ob er das gleich machen lassen will.',
  bibliothek:
    'Neben dem Ausweis gibt es einen deutschsprachigen Stammtisch und einen Konversationskurs in der Bibliothek. Empfiehl beides begeistert.',
  markt:
    'Es ist Saison für ein bestimmtes Gemüse (z. B. Kürbis oder Spargel), das besonders frisch ist. Empfiehl es und schlage sogar ein einfaches Rezept vor.',
  panne:
    'Du brauchst den genauen Standort, um Hilfe zu schicken. Frage hartnäckig, aber freundlich nach Details (Strasse, Kilometermarke, Richtung, Merkmale in der Umgebung).',
};

export function getTwist(id: string): string | undefined {
  return TWISTS[id];
}

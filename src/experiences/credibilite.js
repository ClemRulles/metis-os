// Porte de crédibilité : une page de test ne part en ligne que si chaque contrôle bloquant passe.
// Elle protège la confiance (nos futurs clients) et la conformité (droit belge et européen de la consommation,
// RGPD). Les contrôles sont volontairement stricts ; Clément valide toujours la page avant publication.

const MOTS_INTERDITS = [
  [/★{3,}|⭐{3,}/, "étoiles d'avis"],
  [/\b(avis|témoignages?|ils nous font confiance|clients satisfaits)\b/i, "avis ou témoignages (aucun client n'existe encore)"],
  [/\+\s?\d[\d\s.]*\s?(clients|utilisateurs|inscrits|personnes)/i, "compteur d'utilisateurs"],
  [/\b(plus que|il ne reste|offre expire|dernière chance|compte à rebours|aujourd'hui seulement)\b/i, "fausse urgence"],
  [/\b(garanti à 100 ?%|résultats garantis|sans aucun risque)\b/i, "promesse absolue"],
  [/\b(officiel|agréé par l'état|gouvernement|ministère)\b/i, "apparence officielle"],
  [/\b(diagnostic|audit|conseil aux entreprises|automatisation pour (les )?entreprises)\b/i, "offre interdite par le contrat de Clément"],
];

export function verifierCredibilite(html, fiche) {
  const texte = String(html).replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ");
  const visible = texte.replace(/<[^>]+>/g, " ");
  const controles = [];
  const ajouter = (id, ok, detail, bloquant = true) => controles.push({ id, ok: Boolean(ok), bloquant, detail });
  const editeur = fiche?.editeur ?? {};
  const rempli = (v) => typeof v === "string" && v.trim() && !/\[à compléter\]|xxx|todo/i.test(v);

  ajouter("statut-honnete", /en préparation/i.test(visible), "La page dit clairement que le service n'existe pas encore.");
  ajouter("mentions-editeur", rempli(editeur.nom) && rempli(editeur.adresse) && rempli(editeur.contact), "Éditeur identifié : nom, adresse géographique, contact (Code de droit économique, livre XII).");
  const clic = fiche?.offre === "clic";
  ajouter("confidentialite", /id="confidentialite"/.test(html) && (clic ? /aucune/i.test(visible) : /consentement/i.test(visible) && /supprimer/i.test(visible)), clic ? "Notice : aucune donnée personnelle collectée." : "Notice de confidentialité : finalité, base légale, durée, droit de suppression (RGPD).");
  ajouter("consentement-explicite", clic ? !/type="email"/.test(html) : /type="checkbox"[^>]*required/.test(html), clic ? "Mode clic : aucun champ de donnée personnelle." : "Case de consentement non précochée et obligatoire.");
  ajouter("prix-affiche", rempli(fiche?.prix), "Le prix prévu est affiché.");
  ajouter("precommande-remboursable", fiche?.offre !== "precommande" || /remboursable/i.test(visible), "Une précommande est explicitement remboursable.");
  ajouter("noindex-test", /noindex/.test(html) || fiche?.indexer === true, "Page de test non indexée par défaut.", false);
  ajouter("mobile", /name="viewport"/.test(html), "Affichage mobile.");
  ajouter("api-branchee", rempli(fiche?.api_url), "Liste d'attente branchée (sinon les inscriptions sont perdues).");
  for (const [motif, nom] of MOTS_INTERDITS) {
    const m = visible.match(motif);
    ajouter(`interdit-${nom.split(" ")[0]}`, !m, m ? `Trouvé : « ${m[0]} » (${nom}).` : `Pas de ${nom}.`);
  }
  const bloquants = controles.filter((c) => c.bloquant && !c.ok);
  return { ok: bloquants.length === 0, bloquants: bloquants.map((c) => c.id), controles };
}

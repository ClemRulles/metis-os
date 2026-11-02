export function construire(donnees) {
  const esc = (v) => String(v ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

  // --- Extraction défensive des données ---
  const d = donnees && typeof donnees === "object" ? donnees : {};

  let rappels = [];
  const rc = d["rappelconso"];
  if (rc && Array.isArray(rc.results)) {
    rappels = rc.results.slice(0, 5);
  }
  const rappelsDate = rc && rc.results && rc.results[0] && rc.results[0].date_publication
    ? rc.results[0].date_publication.slice(0, 10)
    : null;

  let adresse = null;
  const ad = d["adresse-fr"];
  if (ad && Array.isArray(ad.features) && ad.features[0] && ad.features[0].properties) {
    const p = ad.features[0].properties;
    adresse = {
      label: p.label || "",
      city: p.city || "",
      postcode: p.postcode || ""
    };
  }

  let entreprises = [];
  const en = d["entreprises-fr"];
  if (en && Array.isArray(en.results)) {
    entreprises = en.results.slice(0, 2)
      .map(r => (r && r.nom_complet) ? String(r.nom_complet) : "")
      .filter(Boolean);
  }

  const listeRappels = rappels.map(r => {
    const date = r.date_publication ? String(r.date_publication).slice(0, 10) : "date inconnue";
    const marque = r.marque_produit || "marque non précisée";
    const cat = r.sous_categorie_produit || r.categorie_produit || "catégorie non précisée";
    const motif = r.motif_rappel || "motif non précisé";
    const zone = r.zone_geographique_de_vente || "";
    return `<li><strong>${esc(date)}</strong> — ${esc(marque)} · ${esc(cat)}<br>Motif : ${esc(motif)}${zone ? ` · Zone : ${esc(zone)}` : ""}</li>`;
  }).join("");

  const listeEntreprises = entreprises.length
    ? entreprises.map(e => `<li>${esc(e)}</li>`).join("")
    : `<li>Aucune entreprise trouvée dans les données fournies.</li>`;

  const adresseTexte = adresse
    ? esc(adresse.label)
    : "Adresse non validée (saisissez-la directement dans la lettre).";

  const titre = "DisputeDoc Generator — Démo";
  const dateAffichee = rappelsDate
    ? `Données RappelConso au ${esc(rappelsDate)}`
    : "Date des données : inconnue";

  const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titre)}</title>
<style>
  :root { color-scheme: light dark; }
  body { font-family: system-ui, sans-serif; margin: 0; padding: 1rem; line-height: 1.5;
         background: #f6f6f4; color: #1c1c1c; max-width: 42rem; margin-inline: auto; }
  h1 { font-size: 1.5rem; } h2 { font-size: 1.15rem; margin-top: 2rem; }
  section { background: #fff; border: 1px solid #ddd; border-radius: .5rem; padding: 1rem; margin: 1rem 0; }
  .resultat { border-left: 4px solid #2a6f4e; }
  ul { padding-left: 1.2rem; }
  small, .meta { color: #666; font-size: .85rem; }
  button { padding: .5rem 1rem; border-radius: .4rem; border: 1px solid #2a6f4e;
           background: #2a6f4e; color: #fff; cursor: pointer; margin-top: .75rem; }
  .lettre { white-space: pre-wrap; font-family: Georgia, serif; background: #fafafa;
            border: 1px dashed #bbb; padding: 1rem; border-radius: .4rem; }
  footer { margin: 2rem 0; font-size: .85rem; color: #555; }
  @media (prefers-color-scheme: dark) {
    body { background: #14161a; color: #e8e8e8; }
    section { background: #1d2026; border-color: #33373f; }
    .resultat { border-left-color: #6fcf97; }
    .lettre { background: #23262d; border-color: #444; }
    small, .meta, footer { color: #a8adb8; }
    button { background: #2f8659; border-color: #2f8659; }
  }
</style>
</head>
<body>
<h1>${esc(titre)}</h1>
<p class="promesse">Générez votre lettre de réclamation officielle en 2 minutes, prête à être envoyée.</p>
<p class="meta">${dateAffichee}</p>

<section>
  <h2>Derniers rappels de produits (exemple)</h2>
  ${rappels.length
    ? `<ul>${listeRappels}</ul>`
    : `<p>Aucune donnée de rappel disponible pour le moment.</p>`}
</section>

<section>
  <h2>Informations validées</h2>
  <p><strong>Adresse normalisée :</strong> ${adresseTexte}</p>
  <p><strong>Entreprises trouvées (exemple « boulangerie ») :</strong></p>
  <ul>${listeEntreprises}</ul>
</section>

<section class="resultat">
  <h2>Résultat : aperçu de la lettre</h2>
  <div class="lettre" id="lettre">Objet : Réclamation produit

Madame, Monsieur,

Je souhaite porter à votre connaissance une réclamation concernant un produit que j'ai acquis.
Le problème constaté est le suivant : problème à préciser par l'utilisateur.

Mes coordonnées :
— Adresse : ${adresseTexte}

Je vous remercie de bien vouloir me répondre dans les meilleurs délais.

Fait le [date], signature.</div>
  <button id="btn-pdf" type="button">Télécharger PDF (impression)</button>
</section>

<section>
  <h2>Limites de la démonstration</h2>
  <ul>
    <li>N'envoie pas de courrier réel.</li>
    <li>Rappels affichés limités aux 5 derniers.</li>
    <li>Recherche d'entreprise par nom, sans SIRET.</li>
    <li>Pas de personnalisation juridique avancée.</li>
  </ul>
</section>

<footer>
  <h2>Sources</h2>
  <ul>
    <li>RappelConso (France) — licence : Licence ouverte</li>
  </ul>
  <p><strong>Démonstration : produit en préparation.</strong></p>
</footer>

<script>
(function () {
  var btn = document.getElementById("btn-pdf");
  if (!btn) return;
  btn.addEventListener("click", function () {
    var zone = document.getElementById("lettre");
    if (!zone) return;
    var w = window.open("", "_blank", "noopener");
    if (!w) return;
    w.document.write("<pre style='font-family:Georgia,serif;white-space:pre-wrap;'>" +
      zone.textContent.replace(/&/g, "&amp;").replace(/</g, "&lt;") + "</pre>");
    w.document.close();
    w.focus();
    w.print();
  });
})();
</script>
</body>
</html>`;

  return html;
}
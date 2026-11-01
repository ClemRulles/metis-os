// Page de test honnête : un produit en préparation, présenté clairement, avec liste d'attente ou précommande
// remboursable. Pas de faux avis, pas de faux compteur, pas de fausse urgence. Mentions légales et confidentialité
// incluses. La page compte ses visites (sans cookie) et ses inscriptions via le Worker de liste d'attente.

const esc = (t) =>
  String(t ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export function rendrePage(f) {
  const li = (xs) => (xs ?? []).map((x) => `<li>${esc(x)}</li>`).join("");
  const etapes = (f.comment ?? []).map((x, k) => `<li><span class="n">${k + 1}</span><p>${esc(x)}</p></li>`).join("");
  const faq = (f.faq ?? []).map((q) => `<details><summary>${esc(q.question)}</summary><p>${esc(q.reponse)}</p></details>`).join("");
  const precommande = f.offre === "precommande";
  return `<!doctype html>
<html lang="${esc(f.langue ?? "fr")}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(f.nom)} — ${esc(f.accroche)}</title>
<meta name="description" content="${esc(f.sous_titre)}">
<meta name="robots" content="${f.indexer ? "index,follow" : "noindex"}">
<style>
:root{--fond:#fbfaf7;--texte:#1d1d1b;--doux:#5b5b57;--accent:${esc(f.couleur ?? "#2f5d50")};--carte:#fff;--trait:#e6e3dc}
@media (prefers-color-scheme:dark){:root{--fond:#141513;--texte:#ecebe6;--doux:#a7a69f;--carte:#1d1e1b;--trait:#33342f}}
*{box-sizing:border-box}body{margin:0;background:var(--fond);color:var(--texte);font:17px/1.6 system-ui,-apple-system,"Segoe UI",sans-serif}
main{max-width:760px;margin:0 auto;padding:24px 16px 64px}
.etat{display:inline-block;font-size:13px;padding:4px 10px;border:1px solid var(--trait);border-radius:99px;color:var(--doux)}
h1{font-size:clamp(30px,6vw,46px);line-height:1.1;margin:18px 0 12px}h2{font-size:22px;margin:44px 0 12px}
.sous{font-size:19px;color:var(--doux);margin:0 0 24px}
.carte{background:var(--carte);border:1px solid var(--trait);border-radius:14px;padding:20px}
form{display:flex;flex-wrap:wrap;gap:10px;margin-top:8px}input[type=email]{flex:1 1 240px;padding:13px 14px;border-radius:10px;border:1px solid var(--trait);background:var(--fond);color:var(--texte);font:inherit}
button{padding:13px 18px;border:0;border-radius:10px;background:var(--accent);color:#fff;font:inherit;font-weight:600;cursor:pointer}
.mentions{font-size:13px;color:var(--doux);margin-top:10px}.ok{color:var(--accent);font-weight:600}
ul.pts{padding-left:20px}ol.etapes{list-style:none;padding:0;display:grid;gap:12px}ol.etapes li{display:flex;gap:12px;align-items:flex-start}
.n{flex:none;width:28px;height:28px;border-radius:50%;background:var(--accent);color:#fff;display:grid;place-items:center;font-size:14px;font-weight:700}ol.etapes p{margin:2px 0}
.prix{font-size:28px;font-weight:700}details{border-top:1px solid var(--trait);padding:12px 0}summary{cursor:pointer;font-weight:600}
footer{max-width:760px;margin:0 auto;padding:24px 16px 48px;font-size:13px;color:var(--doux);border-top:1px solid var(--trait)}footer a{color:inherit}
</style>
</head>
<body>
<main>
<span class="etat">${precommande ? "En préparation · précommande remboursable" : "En préparation · liste d'attente"}</span>
<h1>${esc(f.accroche)}</h1>
<p class="sous">${esc(f.sous_titre)}</p>
<div class="carte" id="inscription">
<form id="f">
<input type="email" name="email" required placeholder="votre@adresse.email" autocomplete="email" aria-label="Adresse e-mail">
<button type="submit">${esc(f.cta ?? (precommande ? "Je précommande" : "Prévenez-moi au lancement"))}</button>
<label class="mentions" style="flex-basis:100%"><input type="checkbox" name="accord" required> J'accepte d'être contacté(e) par e-mail au sujet de ${esc(f.nom)}. Désinscription en un clic, à tout moment.</label>
</form>
<p class="mentions" id="msg">${precommande ? `Aucun paiement aujourd'hui : vous serez prévenu(e) avant tout prélèvement, et la précommande reste remboursable sans condition.` : "Un seul e-mail au lancement, puis seulement si vous le souhaitez."}</p>
</div>
${f.demo_url ? `<p class="mentions"><a href="${esc(f.demo_url)}">Voir un aperçu construit avec des données réelles</a> (démonstration, le service complet est en préparation).</p>` : ""}
<h2>Le problème</h2>
<ul class="pts">${li(f.probleme_points)}</ul>
<h2>Comment ça marche</h2>
<ol class="etapes">${etapes}</ol>
<h2>Pour qui</h2>
<p>${esc(f.pour_qui)}</p>
<h2>Prix prévu</h2>
<p class="prix">${esc(f.prix)}</p>
<p class="mentions">${esc(f.condition_prix ?? "Prix prévu au lancement, sans engagement.")}</p>
${faq ? `<h2>Questions</h2>${faq}` : ""}
</main>
<footer>
<p><strong>${esc(f.nom)}</strong> est un projet en préparation. Ce site présente un service qui n'est pas encore disponible ; il sert à mesurer l'intérêt avant de le construire.</p>
<p id="mentions-legales"><strong>Éditeur :</strong> ${esc(f.editeur?.nom)} — ${esc(f.editeur?.adresse)}${f.editeur?.bce ? ` — numéro d'entreprise ${esc(f.editeur.bce)}` : ""} — contact : <a href="mailto:${esc(f.editeur?.contact)}">${esc(f.editeur?.contact)}</a>. Hébergement : Cloudflare, Inc.</p>
<p id="confidentialite"><strong>Données personnelles :</strong> votre adresse e-mail sert uniquement à vous informer du lancement de ${esc(f.nom)} (base légale : votre consentement). Elle est conservée au plus 12 mois, jamais vendue ni partagée. Vous pouvez la faire supprimer en écrivant à ${esc(f.editeur?.contact)}. Aucun cookie publicitaire ; la page compte ses visites de façon anonyme.</p>
</footer>
<script>
(function(){
  var API=${JSON.stringify(f.api_url ?? "")}, X=${JSON.stringify(f.slug)};
  var q=new URLSearchParams(location.search), src=q.get("utm_source")||document.referrer.split("/")[2]||"direct";
  try{ if(API) navigator.sendBeacon(API+"/visite", JSON.stringify({experience:X, source:src})); }catch(e){}
  document.getElementById("f").addEventListener("submit", function(ev){
    ev.preventDefault();
    var d=new FormData(ev.target), m=document.getElementById("msg");
    fetch(API+"/inscription",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({experience:X,email:d.get("email"),accord:!!d.get("accord"),source:src})})
      .then(function(r){ if(!r.ok) throw 0; m.innerHTML='<span class="ok">Merci, c\\'est noté.</span> Vous recevrez un seul e-mail au lancement.'; ev.target.reset(); })
      .catch(function(){ m.textContent="L'inscription n'a pas fonctionné. Réessayez dans un instant."; });
  });
})();
</script>
</body>
</html>`;
}

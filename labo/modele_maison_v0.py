"""Labo IA, leçon 1 : un modèle maison entraîné sur nos verdicts du passé.

Question : à partir du seul titre et du texte d'un lancement Show HN, peut-on prédire s'il obtiendra
au moins 10 points ? On entraîne sur les lancements les plus anciens et on teste sur les plus récents
(découpage dans le temps : le modèle ne voit jamais le futur).
"""
import json, sys, glob
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_auc_score, brier_score_loss

fichier = sys.argv[1] if len(sys.argv) > 1 else sorted(glob.glob("data/cas-show-hn-*.json"))[-1]
cas = sorted(json.load(open(fichier)), key=lambda c: c["date"])
textes = [c["enonce"] + " || " + (c.get("contexte") or "") for c in cas]
y = np.array([c["resultat"] for c in cas])

coupe = int(len(cas) * 0.8)
vec = TfidfVectorizer(ngram_range=(1, 2), min_df=3, sublinear_tf=True)
Xa, Xt = vec.fit_transform(textes[:coupe]), vec.transform(textes[coupe:])
ya, yt = y[:coupe], y[coupe:]

modele = LogisticRegression(C=2.0, max_iter=2000, class_weight="balanced").fit(Xa, ya)
brut = modele.predict_proba(Xt)[:, 1]
# Recalibrage simple : on ramène la moyenne des probabilités au taux de base appris.
base = ya.mean()
p = np.clip(brut * (base / brut.mean()), 0.005, 0.995)

ordre = np.argsort(-p)
top = ordre[: max(1, len(ordre) // 10)]
resultat = {
    "cas_entrainement": int(coupe),
    "cas_test": int(len(yt)),
    "taux_de_base_test": round(float(yt.mean()), 4),
    "auc": round(float(roc_auc_score(yt, p)), 3),
    "brier_modele": round(float(brier_score_loss(yt, p)), 4),
    "brier_taux_de_base": round(float(brier_score_loss(yt, np.full_like(p, base))), 4),
    "taux_succes_top10pct": round(float(yt[top].mean()), 3),
    "multiplicateur_top10pct": round(float(yt[top].mean() / yt.mean()), 2),
}
mots = np.array(vec.get_feature_names_out())
coef = modele.coef_[0]
resultat["mots_qui_aident"] = list(mots[np.argsort(-coef)[:12]])
resultat["mots_qui_nuisent"] = list(mots[np.argsort(coef)[:12]])
print(json.dumps(resultat, ensure_ascii=False, indent=1))

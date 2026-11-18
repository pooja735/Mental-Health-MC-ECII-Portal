# MC-ECII: Explainable Student Stress Classification

Ontology-guided multiclass concept induction that labels students **Low / Medium / High** stress and returns readable Description-Logic concepts. M.Tech dissertation, Amrita School of Computing. *Non-diagnostic educational decision support.*

## Highlights
- Primary survey: 2,066 students, 10 Indian states / UTs, 12-item stress scale (Cronbach alpha 0.885)
- OWL ontology with 14 DL predicates; HermiT matched direct computation on 300 of 300 students
- Six ML baselines: best Logistic Regression, accuracy 0.681, macro-F1 0.687 (majority baseline 0.367)
- MC-ECII: one run, one class per student, removes the 76.6% one-vs-rest conflicts, Medium F1 0.432 vs 0.062, about 2.9x fewer coverage evaluations; below Logistic Regression in accuracy (macro-F1 0.507), the price of readable concepts

## Repository structure
```
index.html          website: Home, About, Pipeline, Lab, Demo, Code, Results, AI Explainer
config.js           your name, guide, GitHub repo URL, demo video path
api/chat.js         optional live Claude answers (Vercel serverless)
assets/             logo, result figures, sample.csv (anonymised survey data)
videos/CSE25042_Demo.mp4 demo video shown on the Demo page
notebooks/          the three Colab notebooks (baselines, ontology, ECII family)
vercel.json  package.json  .gitignore
```

## Run locally
```bash
npx serve .        # then open the printed address
```

## Deploy on Vercel
1. Push this folder to a new GitHub repository.
2. In Vercel choose **Add New > Project**, import the repository, leave the build command empty, deploy.
3. Optional: add `ANTHROPIC_API_KEY` (and `ANTHROPIC_MODEL`) under Settings > Environment Variables for live AI answers. Without it the explainer runs offline.

## Update the website
- **Repository button:** set `repo` in `config.js`, commit, push.
- **Demo video:** replace `videos/CSE25042_Demo.mp4` (or change `video` in `config.js`), commit, push. Keep it under about 50 MB for GitHub.
- **Your details:** fill `name`, `regNo`, `guide` in `config.js`.

## Notebooks
Open each file in Google Colab and upload `assets/sample.csv` (the processed survey data) when prompted. All use `random_state = 42` and a stratified 80:20 split.

## Notes
`assets/sample.csv` is anonymised survey data. Remove it, and the "Use project sample" button in `index.html`, if you do not want it public. Class thresholds are modelling choices, not clinical cut-offs.

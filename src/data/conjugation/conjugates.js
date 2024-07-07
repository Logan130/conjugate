const conjugatesA1 = [
    { name: "être", je: "suis", tu: "es", il: "est", nous: "sommes", vous: "êtes", ils: "sont", passé: "été", futur: "ser-", level: "A1" },
    { name: "avoir", je: "ai", tu: "as", il: "a", nous: "avons", vous: "avez", ils: "ont", passé: "eu", futur: "aur-", level: "A1" },
    { name: "aller", je: "vais", tu: "vas", il: "va", nous: "allons", vous: "allez", ils: "vont", passé: "allé", futur: "ir-", level: "A1" },
    { name: "faire", je: "fais", tu: "fais", il: "fait", nous: "faisons", vous: "faites", ils: "font", passé: "fait", futur: "fer-", level: "A1" },
    
    { name: "prendre", je: "prends", tu: "prends", il: "prend", nous: "prenons", vous: "prenez", ils: "prennent", passé: "pris", futur: "prendr-", level: "A1" },
    { name: "reprendre", je: "reprends", tu: "reprends", il: "reprend", nous: "reprenons", vous: "reprenez", ils: "reprennent", passé: "repris", futur: "reprendr-", level: "A1" },
    { name: "détendre", je: "détends", tu: "détends", il: "détend", nous: "détendons", vous: "détendez", ils: "détendent", passé: "détendu", futur: "détendr-", level: "A1" },
    { name: "descendre", je: "descends", tu: "descends", il: "descend", nous: "descendons", vous: "descendez", ils: "descendent", passé: "descendu", futur: "descendr-", level: "A1" },
    { name: "répondre", je: "réponds", tu: "réponds", il: "répond", nous: "répondons", vous: "répondez", ils: "répondent", passé: "répondu", futur: "répondr-", level: "A1" },
    { name: "vendre", je: "vends", tu: "vends", il: "vend", nous: "vendons", vous: "vendez", ils: "vendent", passé: "vendu", futur: "vendr-", level: "A1" },
    { name: "attendre", je: "attends", tu: "attends", il: "attend", nous: "attendons", vous: "attendez", ils: "attendent", passé: "attendu", futur: "attendr-", level: "A1" },
    { name: "comprendre", je: "comprends", tu: "comprends", il: "comprend", nous: "comprenons", vous: "comprenez", ils: "comprennent", passé: "compris", futur: "comprendr-", level: "A1" },

    { name: "réussir", je: "réussis", tu: "réussis", il: "réussit", nous: "réussissons", vous: "réussissez", ils: "réussissent", passé: "réussi", futur: "réussir-", level: "A1" },
    { name: "choisir", je: "choisis", tu: "choisis", il: "choisit", nous: "choisissons", vous: "choisissez", ils: "choisissent", passé: "choisi", futur: "choisir-", level: "A1" },


    { name: "partir", je: "pars", tu: "pars", il: "part", nous: "partons", vous: "partez", ils: "partent", passé: "parti", futur: "partir-", level: "A1" },
    { name: "sortir", je: "sors", tu: "sors", il: "sort", nous: "sortons", vous: "sortez", ils: "sortent", passé: "sorti", futur: "sortir-", level: "A1" },
    
    { name: "venir", je: "viens", tu: "viens", il: "vient", nous: "venons", vous: "venez", ils: "viennent", passé: "venu", futur: "viendr-", level: "A1" },
    { name: "souvenir", je: "me souviens", tu: "te souviens", il: "se souvient", nous: "nous souvenons", vous: "vous souvenez", ils: "se souviennent", passé: "souvenu", futur: "souviendr-", level: "A1" },

    { name: "voir", je: "vois", tu: "vois", il: "voit", nous: "voyons", vous: "voyez", ils: "voient", passé: "vu", futur: "verr-", level: "A1" },
    { name: "dormir", je: "dors", tu: "dors", il: "dort", nous: "dormons", vous: "dormez", ils: "dorment", passé: "dormi", futur: "dormir-", level: "A1" },
    { name: "savoir", je: "sais", tu: "sais", il: "sait", nous: "savons", vous: "savez", ils: "savent", passé: "su", futur: "saur-", level: "A1" },
    { name: "endormir", je: "endors", tu: "endors", il: "endort", nous: "endormons", vous: "endormez", ils: "endorment", passé: "endormi", futur: "endormir-", level: "A1" },
    { name: "pouvoir", je: "peux", tu: "peux", il: "peut", nous: "pouvons", vous: "pouvez", ils: "peuvent", passé: "pu", futur: "pourr-", level: "A1" },
    { name: "vouloir", je: "veux", tu: "veux", il: "veut", nous: "voulons", vous: "voulez", ils: "veulent", passé: "voulu", futur: "voudr-", level: "A1" },
    { name: "offrir", je: "offre", tu: "offres", il: "offre", nous: "offrons", vous: "offrez", ils: "offrent", passé: "offert", futur: "offrir-", level: "A1" },
    { name: "tenir", je: "tiens", tu: "tiens", il: "tient", nous: "tenons", vous: "tenez", ils: "tiennent", passé: "tenu", futur: "tiendr-", level: "A1" },
    { name: "pleuvoir", il: "pleut", passé: "plu", futur: "pleuvr-", level: "A1"},

    { name: "boire", je: "bois", tu: "bois", il: "boit", nous: "buvons", vous: "buvez", ils: "boivent", passé: "bu", futur: "boir-", level: "A1" },
    { name: "dire", je: "dis", tu: "dis", il: "dit", nous: "disons", vous: "dites", ils: "disent", passé: "dit", futur: "dir-", level: "A1" },
    { name: "vivre", je: "vis", tu: "vis", il: "vit", nous: "vivons", vous: "vivez", ils: "vivent", passé: "vécu", futur: "vivr-", level: "A1" },
    { name: "connaître", je: "connais", tu: "connais", il: "connaît", nous: "connaissons", vous: "connaissez", ils: "connaissent", passé: "connu", futur: "connaîtr-", level: "A1" },
    { name: "suivre", je: "suis", tu: "suis", il: "suit", nous: "suivons", vous: "suivez", ils: "suivent", passé: "suivi", futur: "suivr-", level: "A1" },
    { name: "croire", je: "crois", tu: "crois", il: "croit", nous: "croyons", vous: "croyez", ils: "croient", passé: "cru", futur: "croir-", level: "A1" }, 
    { name: "écrire", je: "écris", tu: "écris", il: "écrit", nous: "écrivons", vous: "écrivez", ils: "écrivent", passé: "écrit", futur: "écrir-", level: "A1" },
    { name: "lire", je: "lis", tu: "lis", il: "lit", nous: "lisons", vous: "lisez", ils: "lisent", passé: "lu", futur: "lir-", level: "A1" },
    
    { name: "acheter", je: "achète", tu: "achètes", il: "achète", nous: "achetons", vous: "achetez", ils: "achètent", passé: "acheté", futur: "achèter-", level: "A1" },
    { name: "ennuyer", je: "ennuie", tu: "ennuies", il: "ennuie", nous: "ennuyons", vous: "ennuyez", ils: "ennuient", passé: "ennuyé", futur: "ennuier-", level: "A1" },
    { name: "préférer", je: "préfère", tu: "préfères", il: "préfère", nous: "préférons", vous: "préférez", ils: "préfèrent", passé: "préféré", futur: "préférer-", level: "A1" },
    { name: "manger", je: "mange", tu: "manges", il: "mange", nous: "mangeons", vous: "mangez", ils: "mangent", passé: "mangé", futur: "manger-", level: "A1" },
    { name: "lever", je: "lève", tu: "lèves", il: "lève", nous: "levons", vous: "levez", ils: "lèvent", passé: "levé", futur: "lèver-", level: "A1" },
    { name: "promener", je: "promène", tu: "promènes", il: "promène", nous: "promenons", vous: "promenez", ils: "promènent", passé: "promené", futur: "promèner-", level: "A1" },
    { name: "appeler", je: "appelle", tu: "appelles", il: "appelle", nous: "appelons", vous: "appelez", ils: "appellent", passé: "appelé", futur: "appeller-", level: "A1" },

]

const conjugatesA2 = [
    { name: "inquiéter", je: "inquiète", tu: "inquiètes", il: "inquiète", nous: "inquiétons", vous: "inquiétez", ils: "inquiètent", passé: "inquiété", futur: "inquiéter-", level: "A2" },
    { name: "essayer", je: "essaie", tu: "essaies", il: "essaie", nous: "essayons", vous: "essayez", ils: "essaient", passé: "essayé", futur: "essaier-", level: "A2" },
    { name: "envoyer", je: "envoie", tu: "envoies", il: "envoie", nous: "envoyons", vous: "envoyez", ils: "envoient", passé: "envoyé", futur: "enverr-", level: "A2" },
    { name: "élever", je: "élève", tu: "élèves", il: "élève", nous: "élevons", vous: "élevez", ils: "élèvent", passé: "élevé", futur: "élèver-", level: "A2" },
    { name: "payer", je: "paie", tu: "paies", il: "paie", nous: "payons", vous: "payez", ils: "paient", passé: "payé", futur: "paier-", level: "A2" },
    { name: "rappeler", je: "rappelle", tu: "rappelles", il: "rappelle", nous: "rappelons", vous: "rappelez", ils: "rappellent", passé: "rappelé", futur: "rappeller-", level: "A2" },
    { name: "compléter", je: "complète", tu: "complètes", il: "complète", nous: "complétons", vous: "complétez", ils: "complètent", passé: "complété", futur: "compléter-", level: "A2" },


    { name: "réussir", je: "réussis", tu: "réussis", il: "réussit", nous: "réussissons", vous: "réussissez", ils: "réussissent", passé: "réussi", futur: "réussir-", level: "A2" },
    { name: "agrandir", je: "agrandis", tu: "agrandis", il: "agrandit", nous: "agrandissons", vous: "agrandissez", ils: "agrandissent", passé: "agrandi", futur: "agrandir-", level: "A2" },


    { name: "couvrir", je: "couvre", tu: "couvres", il: "couvre", nous: "couvrons", vous: "couvrez", ils: "couvrent", passé: "couvert", futur: "couvrir-", level: "A2" }, 
    { name: "découvrir", je: "découvre", tu: "découvres", il: "découvre", nous: "découvrons", vous: "découvrez", ils: "découvrent", passé: "découvert", futur: "découvrir-", level: "A2" },
    { name: "ouvrir", je: "ouvre", tu: "ouvres", il: "ouvre", nous: "ouvrons", vous: "ouvrez", ils: "ouvrent", passé: "ouvert", futur: "ouvr-", level: "A2" },
    { name: "obtenir", je: "obtiens", tu: "obtiens", il: "obtient", nous: "obtenons", vous: "obtenez", ils: "obtiennent", passé: "obtenu", futur: "obtiendr-", level: "A2" },
    { name: "retenir", je: "retiens", tu: "retiens", il: "retient", nous: "retenons", vous: "retenez", ils: "retiennent", passé: "retenu", futur: "retiendr-", level: "A2" }, 
    { name: "mentir", je: "mens", tu: "mens", il: "ment", nous: "mentons", vous: "mentez", ils: "mentent", passé: "menti", futur: "mentir-", level: "A2" },
    { name: "accueillir", je: "accueille", tu: "accueilles", il: "accueille", nous: "accueillons", vous: "accueillez", ils: "accueillent", passé: "accueilli", futur: "accueiller-", level: "A2" },
    { name: "servir", je: "sers", tu: "sers", il: "sert", nous: "servons", vous: "servez", ils: "servent", passé: "servi", futur: "servir-", level: "A2" },


    { name: "devoir", je: "dois", tu: "dois", il: "doit", nous: "devons", vous: "devez", ils: "doivent", passé: "dû", futur: "devr-", level: "A2" },
    { name: "recevoir", je: "reçois", tu: "reçois", il: "reçoit", nous: "recevons", vous: "recevez", ils: "reçoivent", passé: "reçu", futur: "recevr-", level: "A2" },
    { name: "valoir", je: "vaux", tu: "vaux", il: "vaut", nous: "valons", vous: "valez", ils: "valent", passé: "valu", futur: "vaudr-", level: "A2" },
    { name: "revoir", je: "revois", tu: "revois", il: "revoit", nous: "revoyons", vous: "revoyez", ils: "revoient", passé: "revu", futur: "reverr-", level: "A2" },



    { name: "éteindre", je: "éteins", tu: "éteins", il: "éteint", nous: "éteignons", vous: "éteignez", ils: "éteignent", passé: "éteint", futur: "éteindr-", level: "A2" },
    { name: "craindre", je: "crains", tu: "crains", il: "craint", nous: "craignons", vous: "craignez", ils: "craignent", passé: "craint", futur: "craindr-", level: "A2" },


    { name: "rendre", je: "rends", tu: "rends", il: "rend", nous: "rendons", vous: "rendez", ils: "rendent", passé: "rendu", futur: "rendr-", level: "A2" },
    { name: "perdre", je: "perds", tu: "perds", il: "perd", nous: "perdons", vous: "perdez", ils: "perdent", passé: "perdu", futur: "perdr-", level: "A2" },



    { name: "plaire", je: "plais", tu: "plais", il: "plaît", nous: "plaisons", vous: "plaisez", ils: "plaisent", passé: "plu", futur: "plair-", level: "A2" },
    { name: "paraître", je: "parais", tu: "parais", il: "paraît", nous: "paraissons", vous: "paraissez", ils: "paraissent", passé: "paru", futur: "paraîtr-", level: "A2" },
    { name: "disparaître", je: "disparais", tu: "disparais", il: "disparaît", nous: "disparaissons", vous: "disparaissez", ils: "disparaissent", passé: "disparu", futur: "disparaîtr-", level: "A2" },
    { name: "permettre", je: "permets", tu: "permets", il: "permet", nous: "permettons", vous: "permettez", ils: "permettent", passé: "permis", futur: "permettr-", level: "A2" },
    { name: "mettre", je: "mets", tu: "mets", il: "met", nous: "mettons", vous: "mettez", ils: "mettent", passé: "mis", futur: "mettr-", level: "A2" },
    { name: "rire", je: "ris", tu: "ris", il: "rit", nous: "rions", vous: "riez", ils: "rient", passé: "ri", futur: "rir-", level: "A2" },
    { name: "inscrire", je: "inscris", tu: "inscris", il: "inscrit", nous: "inscrivons", vous: "inscrivez", ils: "inscrivent", passé: "inscrit", futur: "inscrir-", level: "A2" },
    { name: "abattre", je: "abats", tu: "abats", il: "abat", nous: "abattons", vous: "abattez", ils: "abattent", passé: "abattu", futur: "abattr-", level: "A2" },
    { name: "réduire", je: "réduis", tu: "réduis", il: "réduit", nous: "réduisons", vous: "réduisez", ils: "réduisent", passé: "réduit", futur: "réduir-", level: "A2" },
    
]

// updated until 
// taxi U1
// communication L10
// Edito L3
// vocabulaire:
// [1, 8, 11]
// [13]

const conjugatesB1 = [
    { name: "fuir", je: "fuis", tu: "fuis", il: "fuit", nous: "fuyons", vous: "fuyez", ils: "fuient", passé: "fui", futur: "fuir-" },
    { name: "apparaître", je: "apparais", tu: "apparais", il: "apparaît", nous: "apparaissons", vous: "apparaissez", ils: "apparaissent", passé: "apparu", futur: "apparaîtr-" },
    { name: "reprendre", je: "reprends", tu: "reprends", il: "reprend", nous: "reprenons", vous: "reprenez", ils: "reprennent", passé: "repris", futur: "reprendr-" },
    { name: "épanouir", je: "épanouis", tu: "épanouis", il: "épanouit", nous: "épanouissons", vous: "épanouissez", ils: "épanouissent", passé: "épanoui", futur: "épanouir-" },
    { name: "séduire", je: "séduis", tu: "séduis", il: "séduit", nous: "séduisons", vous: "séduisez", ils: "séduisent", passé: "séduit", futur: "séduir-" },
    { name: "investir", je: "investis", tu: "investis", il: "investit", nous: "investissons", vous: "investissez", ils: "investissent", passé: "investi", futur: "investir-" },
    { name: "vaincre", je: "vaincs", tu: "vaincs", il: "vainc", nous: "vainquons", vous: "vainquez", ils: "vainquent", passé: "vaincu", futur: "vaincr-" },
    { name: "tenir", je: "tiens", tu: "tiens", il: "tient", nous: "tenons", vous: "tenez", ils: "tiennent", passé: "tenu", futur: "tiendr-" },
    { name: "enrichir", je: "enrichis", tu: "enrichis", il: "enrichit", nous: "enrichissons", vous: "enrichissez", ils: "enrichissent", passé: "enrichi", futur: "enrichir-" },
    { name: "sentir", je: "sens", tu: "sens", il: "sent", nous: "sentons", vous: "sentez", ils: "sentent", passé: "senti", futur: "sentir-" },
    { name: "joindre", je: "joins", tu: "joins", il: "joint", nous: "joignons", vous: "joignez", ils: "joignent", passé: "joint", futur: "joindr-" },
    { name: "prévoir", je: "prévois", tu: "prévois", il: "prévoit", nous: "prévoyons", vous: "prévoyez", ils: "prévoient", passé: "prévu", futur: "prévoir-" },
    { name: "convaincre", je: "convaincs", tu: "convaincs", il: "convainc", nous: "convainquons", vous: "convainquez", ils: "convainquent", passé: "convaincu", futur: "convaincr-" },
    { name: "amincir", je: "amincis", tu: "amincis", il: "amincit", nous: "amincissons", vous: "amincissez", ils: "amincissent", passé: "amincit", futur: "amincir-" },
    { name: "contenir", je: "contiens", tu: "contiens", il: "contient", nous: "contenons", vous: "contenez", ils: "contiennent", passé: "contenu", futur: "contiendr-" },
    { name: "comprendre", je: "comprends", tu: "comprends", il: "comprend", nous: "comprenons", vous: "comprenez", ils: "comprennent", passé: "compris", futur: "comprendr-" },
    { name: "défendre", je: "défends", tu: "défends", il: "défend", nous: "défendons", vous: "défendez", ils: "défendent", passé: "défendu", futur: "défendr-" },
    { name: "enrichir", je: "enrichis", tu: "enrichis", il: "enrichit", nous: "enrichissons", vous: "enrichissez", ils: "enrichissent", passé: "enrichi", futur: "enrichir-" },
    { name: "cuire", je: "cuis", tu: "cuis", il: "cuit", nous: "cuisons", vous: "cuisez", ils: "cuisent", passé: "cuit", futur: "cuir-" },
    { name: "frire", je: "fri(e)s", tu: "fri(e)s", il: "frit", nous: "frisons", vous: "frisez", ils: "frisent", passé: "frit", futur: "frir-" },
    { name: "rôtir", je: "rôtis", tu: "rôtis", il: "rôtit", nous: "rôtissons", vous: "rôtissez", ils: "rôtissent", passé: "rôti", futur: "rôtir-" },
    { name: "adoucir", je: "adoucis", tu: "adoucis", il: "adoucit", nous: "adoucissons", vous: "adoucissez", ils: "adoucissent", passé: "adouci", futur: "adoucir-" },
    { name: "méconnaitre", je: "méconnais", tu: "méconnais", il: "méconnaît", nous: "méconnaissons", vous: "méconnaissez", ils: "méconnaissent", passé: "méconnu", futur: "méconnaîtr-" },
    { name: "acquérir", je: "acquiers", tu: "acquiers", il: "acquiert", nous: "acquérons", vous: "acquérez", ils: "acquièrent", passé: "acquis", futur: "acquerr-" },
    { name: "appuyer", je: "appuie", tu: "appuies", il: "appuie", nous: "appuyons", vous: "appuyez", ils: "appuient", passé: "appuyé", futur: "appuier-" },
    { name: "éblouir", je: "éblouis", tu: "éblouis", il: "éblouit", nous: "éblouissons", vous: "éblouissez", ils: "éblouissent", passé: "ébloui", futur: "éblouir-" },
    { name: "bâtir", je: "bâtis", tu: "bâtis", il: "bâtit", nous: "bâtissons", vous: "bâtissez", ils: "bâtissent", passé: "bâti", futur: "bâtir-" },
    { name: "construire", je: "construis", tu: "construis", il: "construit", nous: "construisons", vous: "construisez", ils: "construisent", passé: "construit", futur: "construir-" },
    { name: "nourrir", je: "nourris", tu: "nourris", il: "nourrit", nous: "nourrissons", vous: "nourrissez", ils: "nourrissent", passé: "nourri", futur: "nourrir-" },
    { name: "plaindre", je: "plains", tu: "plains", il: "plaint", nous: "plaignons", vous: "plaignez", ils: "plaignent", passé: "plaint", futur: "plaindr-" },
    { name: "rabattre", je: "rabats", tu: "rabats", il: "rabat", nous: "rabattons", vous: "rabattez", ils: "rabattent", passé: "rabattu", futur: "rabattr-" },
    { name: "être", je: "suis", tu: "es", il: "est", nous: "sommes", vous: "êtes", ils: "sont", passé: "été", futur: "ser-" },
    { name: "avoir", je: "ai", tu: "as", il: "a", nous: "avons", vous: "avez", ils: "ont", passé: "eu", futur: "aur-" },
    { name: "transmettre", je: "transmets", tu: "transmets", il: "transmet", nous: "transmettons", vous: "transmettez", ils: "transmettent", passé: "transmis", futur: "transmettr-" },
    { name: "rompre", je: "romps", tu: "romps", il: "rompt", nous: "rompons", vous: "rompez", ils: "rompent", passé: "rompu", futur: "rompr-" },
    { name: "souffrir", je: "souffre", tu: "souffres", il: "souffre", nous: "souffrons", vous: "souffrez", ils: "souffrent", passé: "souffert", futur: "souffrir-" },
    { name: "interrompre", je: "interromps", tu: "interromps", il: "interrompt", nous: "interrompons", vous: "interrompez", ils: "interrompent", passé: "interrompu", futur: "interrompr-" },
    { name: "résoudre", je: "résous", tu: "résous", il: "résout", nous: "résolvons", vous: "résolvez", ils: "résolvent", passé: "résolu", futur: "résoudr-" },
    { name: "réfléchir", je: "réfléchis", tu: "réfléchis", il: "réfléchit", nous: "réfléchissons", vous: "réfléchissez", ils: "réfléchissent", passé: "réfléchi", futur: "réfléchir-" },
    { name: "correspondre", je: "corresponds", tu: "corresponds", il: "correspond", nous: "correspondons", vous: "correspondez", ils: "correspondent", passé: "correspondu", futur: "correspondr-" },
    { name: "fournir", je: "fournis", tu: "fournis", il: "fournit", nous: "fournissons", vous: "fournissez", ils: "fournissent", passé: "fourni", futur: "fournir-" },
    { name: "rejoindre", je: "rejoins", tu: "rejoins", il: "rejoint", nous: "rejoignons", vous: "rejoignez", ils: "rejoignent", passé: "rejoint", futur: "rejoindr-" },
    { name: "répandre", je: "répands", tu: "répands", il: "répand", nous: "répandons", vous: "répandez", ils: "répandent", passé: "répandu", futur: "répandr-" },
    { name: "arrondir", je: "arrondis", tu: "arrondis", il: "arrondit", nous: "arrondissons", vous: "arrondissez", ils: "arrondissent", passé: "arrondi", futur: "arrondir-" },
    { name: "subir", je: "subis", tu: "subis", il: "subit", nous: "subissons", vous: "subissez", ils: "subissent", passé: "subi", futur: "subir-" },
    { name: "attendre", je: "attends", tu: "attends", il: "attend", nous: "attendons", vous: "attendez", ils: "attendent", passé: "attendu", futur: "attendr-" },
    { name: "guérir", je: "guéris", tu: "guéris", il: "guérit", nous: "guérissons", vous: "guérissez", ils: "guérissent", passé: "guéri", futur: "guérir-" },
    { name: "prescrire", je: "prescris", tu: "prescris", il: "prescrit", nous: "prescrivons", vous: "prescrivez", ils: "prescrivent", passé: "prescrit", futur: "prescrir-" },
    { name: "améliorer", je: "améliore", tu: "améliores", il: "améliore", nous: "améliorons", vous: "améliorez", ils: "améliorent", passé: "amélioré", futur: "améliorer-" },
    { name: "battre", je: "bats", tu: "bats", il: "bat", nous: "battons", vous: "battez", ils: "battent", passé: "battu", futur: "battr-" },
    { name: "maigrir", je: "maigris", tu: "maigris", il: "maigrit", nous: "maigrissons", vous: "maigrissez", ils: "maigrissent", passé: "maigri", futur: "maigrir-" },
    { name: "conduire", je: "conduis", tu: "conduis", il: "conduit", nous: "conduisons", vous: "conduisez", ils: "conduisent", passé: "conduit", futur: "conduir-" },

]

for (let word of conjugatesB1)
    word["level"] = "B1"

export const conjugates = [
    ...conjugatesA1,
    ...conjugatesA2,
    ...conjugatesB1,
]

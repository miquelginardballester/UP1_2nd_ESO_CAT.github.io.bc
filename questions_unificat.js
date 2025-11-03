// Arxiu unificat amb totes les dades de les preguntes
const questionsData = {
    "SA1": {
        "title": "CAIGUDA DE L'IMPERI ROMÀ",
        "questions": [
            {
                "type": "multiopcio",
                "text": "Quin dels següents factors va ser una causa política de la crisi de l'Imperi Romà d'Occident?",
                "options": [
                    "La pèrdua de terres cultivables per l'erosió.",
                    "La inestabilitat i les guerres civils per la successió imperial.",
                    "La importació massiva de seda de la Xina.",
                    "L'aparició de noves tecnologies militars."
                ],
                "correct": 1,
                "feedback": "És correcte. Les lluites pel poder i la manca d'un sistema clar de successió van afeblir l'imperi.",
                "explicacio": "La inestabilitat política i les guerres civils per la successió imperial van afeblir greument l'Imperi Romà d'Occident. La manca d'un sistema clar de successió provocava conflictes cada vegada que moria un emperador, debilitant l'estat."
            },
            {
                "type": "vertader-fals",
                "text": "La divisió de l'Imperi Romà en Orient i Occident va afeblir considerablement l'Imperi d'Occident.",
                "correct": true,
                "feedback": "Exacte. L'Imperi d'Orient era més ric i estabilitzat, mentre que l'Occident va quedar més exposat a les invasions i amb menys recursos.",
                "explicacio": "La divisió de l'Imperi Romà l'any 395 va crear dos imperis: Orient i Occident. L'Orient era més ric i desenvolupat, mentre que l'Occident va quedar més vulnerable als atacs externs i amb menys recursos, accelerant la seva caiguda."
            },
            {
                "type": "desenvolupament",
                "text": "Explica com les invasions germàniques van contribuir a la caiguda de l'Imperi Romà d'Occident.",
                "expectedElements": [
                    "Pressió militar constant als límits",
                    "Pèrdua de territoris",
                    "Establiment de regnes germànics",
                    "Debilitat econòmica i política"
                ],
                "respostaIdeal": "Les invasions germàniques van contribuir decisivament a la caiguda de l'Imperi Romà d'Occident. Des del segle III, pobles germànics com els gots, vàndals, francs i sueus van pressionar constantment les fronteres de l'imperi. Aquesta pressió militar va obligar Roma a desviar grans recursos per a la defensa, afeblint altres àrees. A més, molts d'aquests pobles es van establir dins dels territoris romans, creant regnes independents que van fragmentar l'imperi. Finalment, el saqueig de Roma pels visigots el 410 i la deposició de l'últim emperador romà d'Occident, Ròmul Augústul, per Odoacre el 476, van marcar el final definitiu de l'Imperi Romà d'Occident.",
                "explicacio": "Les invasions germàniques no van ser l'única causa de la caiguda, però van ser el factor desencadenant que va accelerar un procés ja en marxa per les crisis internes.",
                "feedback": "Molta feina! Has entès la relació entre les invasions i la debilitat de l'imperi."
            },
            {
                "type": "emplenar-buits",
                "text": "L'Imperi Romà d'Occident es va dividir en dos l'any ______. Entre les causes de la seva caiguda hi ha les ______ civils, les invasions ______ i la crisi ______.",
                "answers": ["476", "guerres", "germàniques", "econòmica"],
                "feedback": "Perfecte. Has recordat les causes principals i la data clau de la caiguda.",
                "explicacio": "L'any 476 marca tradicionalment la caiguda de l'Imperi Romà d'Occident, quan el líder germànic Odoacre va deposar l'últim emperador romà, Ròmul Augústul. Les guerres civils, invasions germàniques i crisi econòmica van ser factors clau en aquest procés."
            }
        ]
    },
    "SA2": {
        "title": "IMPERI BIZANTÍ",
        "questions": [
            {
                "type": "multiopcio",
                "text": "Quina va ser la capital de l'Imperi Bizantí?",
                "options": [
                    "Roma",
                    "Atenes",
                    "Constantinoble",
                    "Alexandria"
                ],
                "correct": 2,
                "feedback": "Correcte. Constantinoble va ser el centre polític, econòmic i cultural de l'Imperi Romà d'Orient.",
                "explicacio": "Constantinoble (actual Istanbul) va ser la capital de l'Imperi Bizantí. Fundada per Constantí el Gran sobre l'antiga ciutat de Bizanci, va ser el centre polític, econòmic i cultural de l'Imperi Romà d'Orient durant més de mil anys."
            },
            {
                "type": "vertader-fals",
                "text": "L'Imperi Bizantí va mantenir la religió romana com a religió oficial durant tota la seva existència.",
                "correct": false,
                "feedback": "És fals. La religió predominant va ser la cristiana, no la romana pagana.",
                "explicacio": "L'Imperi Bizantí va adoptar el cristianisme com a religió oficial i va desenvolupar la seva pròpia branca, l'Església Ortodoxa. La religió romana pagana va deixar de ser la religió oficial."
            },
            {
                "type": "desenvolupament",
                "text": "Explica les principals innovacions de l'imperi Bizantí respecte a l'imperi Romà.",
                "expectedElements": [
                    "Religió cristiana",
                    "Simbologia i litúrgia cristianes",
                    "Llatí com a idioma oficial",
                    "Desenvolupament del dret romà",
                    "Codi Justinià"
                ],
                "respostaIdeal": "L'Imperi Bizantí va introduir importants innovacions respecte a l'Imperi Romà tradicional. La més significativa va ser l'adopció del cristianisme com a religió oficial, amb una església ortodoxa pròpia separada de Roma. Això va implicar noves formes de simbologia religiosa i litúrgia. Encara que van mantenir el llatí com a llengua oficial inicialment, gradualment el grec va esdevenir la llengua predominant. Pel que fa a l'administració, van desenvolupar el dret romà creant el Corpus Juris Civilis o Codi de Justinià, que va recopilar i sistematitzar totes les lleis romanes i que es convertiria en la base del dret europeu medieval.",
                "explicacio": "L'Imperi Bizantí no va ser simplement una continuació de Roma, sinó una evolució amb identitat pròpia, especialment en l'àmbit religiós i legal.",
                "feedback": "Excel·lent. Has destacat les innovacions clau de l'Imperi Bizantí respecte a l'Imperi Romà."
            },
            {
                "type": "emplenar-buits",
                "text": "L'Imperi Bizantí es va originar amb la divisió de l'Imperi Romà l'any ______. El seu emperador més important va ser ______, qui va compilar les lleis en el ______.",
                "answers": ["476", "Justinià", "Codi de Justinià"],
                "feedback": "Molt bé. Has identificat correctament l'any, la figura clau i la seva obra més important.",
                "explicacio": "L'Imperi Bizantí es va originar amb la divisió definitiva de l'Imperi Romà. Justinià I va ser el seu emperador més important, conegut per la seva recopilació de lleis romanes en el Codi de Justinià, que va influir en el dret europeu durant segles."
            }
        ]
    },
    "SA3": {
        "title": "IMPERI ISLÀMIC",
        "questions": [
            {
                "type": "multiopcio",
                "text": "On va néixer Mahoma, fundador de l'islam?",
                "options": [
                    "Medina",
                    "Damasc",
                    "La Meca",
                    "Bagdad"
                ],
                "correct": 2,
                "feedback": "Correcte. Mahoma va néixer a La Meca, ciutat sagrada de l'islam.",
                "explicacio": "Mahoma va néixer a La Meca l'any 570 dC. Aquesta ciutat, situada a l'actual Aràbia Saudita, és la ciutat més sagrada de l'islam i lloc de naixement del profeta."
            },
            {
                "type": "vertader-fals",
                "text": "L'expansió de l'Imperi Islàmic va ser sobretot militar i no va incloure aspectes culturals o comercials.",
                "correct": false,
                "feedback": "És fals. L'expansió va incloure també comerç, cultura, llengua i religió, no només conquestes militars.",
                "explicacio": "L'expansió islàmica va ser un procés complex que incloïa no només conquesta militar, sinó també comerç, difusió cultural, adopció de l'àrab com a llengua i expansió religiosa."
            },
            {
                "type": "desenvolupament",
                "text": "Explica els factors que van permetre la ràpida expansió de l'Imperi Islàmic durant els segles VII i VIII i a quins continents es va extendre.",
                "expectedElements": [
                    "Unificació de tribus àrabs",
                    "Comerç",
                    "Religió",
                    "Poder militar",
                    "Idioma i cultura",
                    "Àfrica, Àsia i Europa"
                ],
                "respostaIdeal": "La ràpida expansió de l'Imperi Islàmic es va deure a múltiples factors. En primer lloc, l'islam va unificar les tribus àrabs, que van passar de ser grups dispersos a una força cohesionada. La religió va actuar com a element aglutinador i motivador. Militarment, van desenvolupar tàctiques eficaces i van aprofitar la debilitat dels imperis veïns (bizantí i sassànida). Econòmicament, el comerç va ser clau, estenent xarxes comercials per tot l'imperi. Culturalment, l'àrab es va imposar com a llengua de cultura i administración. Gràcies a tot això, en poc més d'un segle, l'islam es va estendre des de la Península Ibèrica a l'oest fins a l'Índia a l'est, cobrint parts d'Europa, Àfrica i Àsia.",
                "explicacio": "L'expansió islàmica va ser un fenomen complex que combinava conquesta militar amb assimilació cultural i expansió comercial, no només un procés militar.",
                "feedback": "Molt bé. Has assenyalat tant els factors interns com l'abast geogràfic de l'expansió."
            },
            {
                "type": "emplenar-buits",
                "text": "L'any de la Hègira, quan Mahoma va fugir de La Meca a Medina, va ser l'any ______. Aquest any és considerat l'inici del ______ Musulmà. El profeta Mahoma predicava la paraula del déu ______ i està recollit al llibre anomenat ______.",
                "answers": ["622", "calendari", "Al·là", "Alcorà"],
                "feedback": "Perfecte. Has recordat les dades fonamentals de l'origen de l'islam.",
                "explicacio": "L'Hègira (622 dC) marca l'inici del calendari islàmic. Mahoma, profeta de l'islam, va fugir de La Meca a Medina i va començar a predicar la paraula d'Al·là, recollida posteriorment en l'Alcorà, el llibre sagrat de l'islam."
            }
        ]
    },
    "SA4": {
        "title": "IMPERI CAROLINGI",
        "questions": [
            {
                "type": "multiopcio",
                "text": "Quin papa va coronar Carlemany com a emperador?",
                "options": [
                    "Gregori I",
                    "Lleó III",
                    "Esteve II",
                    "Nicolau I"
                ],
                "correct": 1,
                "feedback": "Correcte. El papa Lleó III el va coronar l'any 800, simbolitzant la restauració de l'Imperi a Occident.",
                "explicacio": "El papa Lleó III va coronar Carlemany com a emperador el dia de Nadal de l'any 800. Aquest acte simbolitzava la restauració de l'Imperi Romà d'Occident i establia una aliança entre el papat i l'imperi que marcaria la història europea."
            },
            {
                "type": "vertader-fals",
                "text": "L'Imperi Carolingi va durar més de 500 anys després de la mort de Carlemany.",
                "correct": false,
                "feedback": "És fals. Es va dividir amb el Tractat de Verdun (843), poc després de la seva mort.",
                "explicacio": "L'Imperi Carolingi es va dividir amb el Tractat de Verdun l'any 843, només 43 anys després de la coronació de Carlemany. Els seus nets van repartir-se l'imperi, donant lloc als regnes que eventualment es convertirien en França i Alemanya."
            },
            {
                "type": "desenvolupament",
                "text": "Explica en què va consistir el 'Renaixement Carolingi' i la seva importància.",
                "expectedElements": [
                    "Reforma educativa",
                    "Preservació de textos clàssics",
                    "Desenvolupament de l'escriptura",
                    "Arquitectura i art",
                    "Reforma religiosa"
                ],
                "respostaIdeal": "El Renaixement Carolingi va ser un moviment cultural i intel·lectual promogut per Carlemany i els seus successors durant els segles VIII i IX. Va consistir en una ambiciosa reforma educativa que va impulsar l'escola palatina d'Aquisgrà i les escoles monàstiques, amb l'objectiu de millorar l'ensenyament del clergat i els funcionaris. Es van preservar i copiar nombrosos textos clàssics llatins i grecs, salvant moltes obres de l'oblit. Es va desenvolupar la minúscula carolíngia, un tipus d'escriptura clara i uniforme que va facilitar la difusió dels textos. En l'àmbit artístic, es van promoure noves formes d'arquitectura i art, com l'art otonià. A més, es va dur a terme una important reforma religiosa per unificar les pràctiques del cristianisme en tot l'imperi. La seva importància rau en haver posat les bases de la cultura medieval europea i haver salvat el llegat cultural de l'antiguitat.",
                "explicacio": "El Renaixement Carolingi va marcar un punt d'inflexió en la història europea, connectant l'herència clàssica amb el desenvolupament medieval i establint les bases de l'ensenyament occidental.",
                "feedback": "Excel·lent. Has captat l'essència d'aquest renaixement cultural i intel·lectual."
            },
            {
                "type": "emplenar-buits",
                "text": "Carlemany va ser coronat emperador l'any ______. El seu imperi es va dividir amb el tractat de ______ l'any 843. Els seus tres nets van repartir-se l'imperi: ______ va obtenir la part oriental, ______ la part occidental, i ______ la part central.",
                "answers": ["800", "Verdun", "Lluís el Germànic", "Carles el Calb", "Lotari"],
                "feedback": "Molt bé. Has recordat les dades clau de la coronació i la divisió de l'imperi.",
                "explicacio": "Carlemany va ser coronat emperador el 800, restaurant simbòlicament l'Imperi Romà d'Occident. El Tractat de Verdun (843) va dividir el seu imperi entre els seus nets: Lluís el Germànic (orient), Carles el Calb (occident) i Lotari (centre)."
            }
        ]
    }
};

// Funció per obtenir les dades de les preguntes
function getQuestionData(section, questionIndex) {
    if (questionsData[section] && questionsData[section].questions[questionIndex]) {
        return questionsData[section].questions[questionIndex];
    }
    return null;
}
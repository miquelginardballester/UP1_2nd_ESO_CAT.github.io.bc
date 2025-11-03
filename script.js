// Estat de les respostes de l'usuari
const userAnswers = {};
let userStreak = 0;
let bestStreak = 0;

// Missatges de feedback positius variats
const positiveFeedback = [
    "🎉 Excel·lent! Has demostrat un gran domini d'aquest tema.",
    "✅ Correcte! El teu raonament és molt acurat.",
    "🌟 Impressionant! Continua així.",
    "💡 Molt bé! Has entès perfectament el concepte.",
    "🚀 Fantàstic! Cada vegada ho fas millor.",
    "🏆 Perfecte! Ets un expert en història.",
    "👏 Enhorabona! La teva resposta és impecable.",
    "💫 Brillant! Has captat la idea fonamental."
];

// Missatges d'encoratjament per errors
const encouragingFeedback = [
    "💪 No et rendeixis! Tothom aprèn dels errors.",
    "🔍 Gairebé! Revisa aquest concepte i torna-ho a intentar.",
    "📚 És normal cometre errors. És així com aprenem!",
    "🌱 Cada error és una oportunitat per créixer.",
    "🎯 T'estàs apropant! Un petit ajust i ho tindràs.",
    "✨ No et preocupis! Els grans historiadors també es van equivocar."
];

// Inicialitzar les opcions per a les preguntes multiopció
document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', function() {
        const questionId = this.closest('.question').id;
        const value = this.getAttribute('data-value');
        
        // Desseleccionar totes les opcions d'aquesta pregunta
        document.querySelectorAll(`#${questionId} .option`).forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // Seleccionar l'opció clicada
        this.classList.add('selected');
        
        // Guardar la resposta
        userAnswers[questionId] = value;
    });
});

// Funció per seleccionar Vertader/Fals
function selectTrueFalse(questionId, value) {
    // Desseleccionar tots els botons d'aquesta pregunta
    document.querySelectorAll(`#${questionId} .true-false-btn`).forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Seleccionar el botó correcte
    if (value) {
        document.querySelector(`#${questionId} .true-btn`).classList.add('selected');
    } else {
        document.querySelector(`#${questionId} .false-btn`).classList.add('selected');
    }
    
    // Guardar la resposta
    userAnswers[questionId] = value;
}

// Funció per obtenir un missatge de feedback aleatori
function getRandomFeedback(feedbackArray) {
    return feedbackArray[Math.floor(Math.random() * feedbackArray.length)];
}

// Funció per actualitzar l'estrella de ratxa
function updateStreakCounter(isCorrect) {
    if (isCorrect) {
        userStreak++;
        if (userStreak > bestStreak) {
            bestStreak = userStreak;
        }
    } else {
        userStreak = 0;
    }
    
    // Actualitzar el comptador visual si existeix
    const streakCounter = document.getElementById('streak-counter');
    if (streakCounter) {
        streakCounter.innerHTML = `🔥 Ratxa actual: ${userStreak} | 🏆 Millor ratxa: ${bestStreak}`;
        
        // Afegir animació per ratxes altes
        if (userStreak >= 3) {
            streakCounter.style.animation = "pulse 0.5s ease-in-out";
            setTimeout(() => {
                streakCounter.style.animation = "";
            }, 500);
        }
    }
}

// Funció per comprovar preguntes multiopció
function checkMultipleChoice(questionId, correctValue) {
    const userAnswer = userAnswers[questionId];
    const feedbackEl = document.querySelector(`#${questionId} .feedback`);
    
    // Desseleccionar totes les opcions
    document.querySelectorAll(`#${questionId} .option`).forEach(opt => {
        opt.classList.remove('correct', 'incorrect');
    });
    
    if (userAnswer === undefined) {
        feedbackEl.innerHTML = `
            <div class="feedback-header">
                <span class="feedback-icon">🤔</span>
                <strong>Resposta incompleta</strong>
            </div>
            <p>Si us plau, selecciona una resposta abans de comprovar.</p>
            <div class="feedback-tip">
                <strong>💡 Consell:</strong> Llegeix totes les opcions abans de triar.
            </div>
        `;
        feedbackEl.className = "feedback warning";
        feedbackEl.style.display = "block";
        updateStreakCounter(false);
        return;
    }
    
    // Marcar l'opció seleccionada com a correcta o incorrecta
    const selectedOption = document.querySelector(`#${questionId} .option.selected`);
    const isCorrect = userAnswer == correctValue;
    
    if (isCorrect) {
        selectedOption.classList.add('correct');
        feedbackEl.innerHTML = `
            <div class="feedback-header">
                <span class="feedback-icon">${userStreak >= 3 ? '🔥' : '✅'}</span>
                <strong>${getRandomFeedback(positiveFeedback)}</strong>
            </div>
            <div class="explanation-box">
                <strong>🧠 Explicació:</strong> ${getMultipleChoiceExplanation(questionId, correctValue)}
            </div>
            ${userStreak >= 3 ? `<div class="streak-bonus">🔥 Estàs en ratxa! ${userStreak} respostes correctes consecutives</div>` : ''}
        `;
        feedbackEl.className = "feedback correct";
    } else {
        selectedOption.classList.add('incorrect');
        // Marcar també la resposta correcta
        document.querySelector(`#${questionId} .option[data-value="${correctValue}"]`).classList.add('correct');
        feedbackEl.innerHTML = `
            <div class="feedback-header">
                <span class="feedback-icon">💡</span>
                <strong>${getRandomFeedback(encouragingFeedback)}</strong>
            </div>
            <div class="explanation-box">
                <strong>📖 Resposta correcta:</strong> ${document.querySelector(`#${questionId} .option[data-value="${correctValue}"]`).textContent}
            </div>
            <div class="explanation-box">
                <strong>🧠 Explicació:</strong> ${getMultipleChoiceExplanation(questionId, correctValue)}
            </div>
            <div class="feedback-tip">
                <strong>💡 Consell d'aprenentatge:</strong> ${getLearningTip(questionId)}
            </div>
        `;
        feedbackEl.className = "feedback incorrect";
    }
    
    feedbackEl.style.display = "block";
    updateStreakCounter(isCorrect);
}

// Funció per obtenir l'explicació de preguntes multiopció
function getMultipleChoiceExplanation(questionId, correctValue) {
    const explanations = {
        'sa1-p1': "La inestabilitat política i les guerres civils per la successió imperial van afeblir greument l'Imperi Romà d'Occident. La manca d'un sistema clar de successió provocava conflictes cada vegada que moria un emperador, debilitant l'estat.",
        'sa2-p1': "Constantinoble (actual Istanbul) va ser la capital de l'Imperi Bizantí. Fundada per Constantí el Gran sobre l'antiga ciutat de Bizanci, va ser el centre polític, econòmic i cultural de l'Imperi Romà d'Orient durant més de mil anys.",
        'sa3-p1': "Mahoma va néixer a La Meca l'any 570 dC. Aquesta ciutat, situada a l'actual Aràbia Saudita, és la ciutat més sagrada de l'islam i lloc de naixement del profeta.",
        'sa4-p1': "El papa Lleó III va coronar Carlemany com a emperador el dia de Nadal de l'any 800. Aquest acte simbolitzava la restauració de l'Imperi Romà d'Occident i establia una aliança entre el papat i l'imperi que marcaria la història europea."
    };
    
    return explanations[questionId] || "Has seleccionat una resposta incorrecta. Revisa els teus coneixements sobre aquest tema.";
}

// Funció per obtenir consells d'aprenentatge
function getLearningTip(questionId) {
    const tips = {
        'sa1-p1': "Recorda que les causes de la caiguda de Roma es classifiquen en polítiques, militars, econòmiques i socials. Practica identificar cada tipus.",
        'sa2-p1': "Per memoritzar capitals històriques, associa cada imperi amb la seva ciutat més important i el seu llegat cultural.",
        'sa3-p1': "Crea una línia del temps mental amb els esdeveniments clau de l'expansió de l'islam per entendre millor la seva cronologia.",
        'sa4-p1': "Relaciona els personatges històrics amb les seves accions més importants per recordar millor les dates i fets clau."
    };
    
    return tips[questionId] || "Repassa els conceptes bàsics i intenta relacionar-los amb altres fets històrics que ja coneguis.";
}

// Funció per comprovar preguntes Vertader/Fals
function checkTrueFalse(questionId, correctValue) {
    const userAnswer = userAnswers[questionId];
    const feedbackEl = document.querySelector(`#${questionId} .feedback`);
    
    if (userAnswer === undefined) {
        feedbackEl.innerHTML = `
            <div class="feedback-header">
                <span class="feedback-icon">🤔</span>
                <strong>Resposta incompleta</strong>
            </div>
            <p>Si us plau, selecciona una resposta abans de comprovar.</p>
        `;
        feedbackEl.className = "feedback warning";
        feedbackEl.style.display = "block";
        updateStreakCounter(false);
        return;
    }
    
    const isCorrect = userAnswer === correctValue;
    
    if (isCorrect) {
        feedbackEl.innerHTML = `
            <div class="feedback-header">
                <span class="feedback-icon">${userStreak >= 3 ? '🔥' : '✅'}</span>
                <strong>${getRandomFeedback(positiveFeedback)}</strong>
            </div>
            <div class="explanation-box">
                <strong>🧠 Explicació:</strong> ${getTrueFalseExplanation(questionId, correctValue)}
            </div>
            ${userStreak >= 3 ? `<div class="streak-bonus">🔥 Ratxa de ${userStreak} respostes correctes!</div>` : ''}
        `;
        feedbackEl.className = "feedback correct";
    } else {
        feedbackEl.innerHTML = `
            <div class="feedback-header">
                <span class="feedback-icon">💡</span>
                <strong>${getRandomFeedback(encouragingFeedback)}</strong>
            </div>
            <div class="explanation-box">
                <strong>📖 Resposta correcta:</strong> ${correctValue ? 'Vertader' : 'Fals'}
            </div>
            <div class="explanation-box">
                <strong>🧠 Explicació:</strong> ${getTrueFalseExplanation(questionId, correctValue)}
            </div>
            <div class="feedback-tip">
                <strong>💡 Per recordar:</strong> ${getTrueFalseMemoryTip(questionId)}
            </div>
        `;
        feedbackEl.className = "feedback incorrect";
    }
    
    feedbackEl.style.display = "block";
    updateStreakCounter(isCorrect);
}

// Funció per obtenir l'explicació de preguntes Vertader/Fals
function getTrueFalseExplanation(questionId, correctValue) {
    const explanations = {
        'sa1-p2': "La divisió de l'Imperi Romà l'any 395 va crear dos imperis: Orient i Occident. L'Orient era més ric i desenvolupat, mentre que l'Occident va quedar més vulnerable als atacs externs i amb menys recursos, accelerant la seva caiguda.",
        'sa2-p2': "L'Imperi Bizantí va adoptar el cristianisme com a religió oficial i va desenvolupar la seva pròpia branca, l'Església Ortodoxa. La religió romana pagana va deixar de ser la religió oficial.",
        'sa3-p2': "L'expansió islàmica va ser un procés complex que incloïa no només conquesta militar, sinó també comerç, difusió cultural, adopció de l'àrab com a llengua i expansió religiosa.",
        'sa4-p2': "L'Imperi Carolingi es va dividir amb el Tractat de Verdun l'any 843, només 43 anys després de la coronació de Carlemany. Els seus nets van repartir-se l'imperi, donant lloc als regnes que eventualment es convertirien en França i Alemanya."
    };
    
    return explanations[questionId] || "La teva resposta no és correcta. Revisa els teus coneixements sobre aquest tema.";
}

// Funció per obtenir consells de memòria per a Vertader/Fals
function getTrueFalseMemoryTip(questionId) {
    const tips = {
        'sa1-p2': "Pensa que la divisió va afeblir l'Occident perquè va perdre el suport de les províncies més riques de l'Orient.",
        'sa2-p2': "Recorda que l'Imperi Bizantí és conegut precisament per ser el primer imperi cristià oficial.",
        'sa3-p2': "L'islam no només es va expandir amb l'espasa, sinó també amb el comerç i la cultura.",
        'sa4-p2': "Els imperis solen dividir-se després de grans governants - el de Carlemany no va ser una excepció."
    };
    
    return tips[questionId] || "Intenta comprendre el perquè de cada afirmació en lloc de memoritzar-la.";
}

// Funció per mostrar feedback per a preguntes de desenvolupament
function showDevelopmentFeedback(questionId) {
    const feedbackEl = document.getElementById(`${questionId}-feedback`);
    const textarea = document.getElementById(`${questionId}-text`);
    
    if (textarea && textarea.value.trim() === "") {
        feedbackEl.innerHTML = `
            <div class="feedback-header">
                <span class="feedback-icon">📝</span>
                <strong>Encara no has respost</strong>
            </div>
            <p>Escriu la teva resposta a la zona de text abans de veure el feedback.</p>
            <div class="feedback-tip">
                <strong>💡 Consell:</strong> No t'preocupis per la perfecció. Escriu tot el que saps sobre el tema.
            </div>
        `;
        feedbackEl.className = "feedback warning";
        feedbackEl.style.display = "block";
        return;
    }
    
    // Crear autoavaluació si no existeix
    if (!document.getElementById(`${questionId}-auto-eval`)) {
        const autoEval = document.createElement('div');
        autoEval.className = 'auto-evaluation';
        autoEval.id = `${questionId}-auto-eval`;
        
        autoEval.innerHTML = `
            <h4>🧠 Autoavaluació Intel·ligent</h4>
            <div class="evaluation-criteria">
                <p><strong>Valora la teva resposta segons aquests criteris:</strong></p>
                <ul>
                    <li>✅ He inclòs tots els elements clau</li>
                    <li>📊 He estructurat bé la meva resposta</li>
                    <li>💡 He explicat amb claredat les meves idees</li>
                    <li>🎯 He relacionat els conceptes entre si</li>
                </ul>
            </div>
            <label for="${questionId}-slider">Puntuació: <span id="${questionId}-score">5</span>/10</label>
            <input type="range" id="${questionId}-slider" class="evaluation-slider" min="0" max="10" value="5" step="1">
            <div class="evaluation-result" id="${questionId}-result">Nivell: Satisfactori</div>
            <div class="improvement-tips" id="${questionId}-tips">
                <strong>💡 Per millorar:</strong> Compara la teva resposta amb el model i identifica què pots afegir.
            </div>
        `;
        
        feedbackEl.parentNode.insertBefore(autoEval, feedbackEl.nextSibling);
        
        // Afegir event listener al slider
        const slider = document.getElementById(`${questionId}-slider`);
        const scoreDisplay = document.getElementById(`${questionId}-score`);
        const resultDisplay = document.getElementById(`${questionId}-result`);
        const tipsDisplay = document.getElementById(`${questionId}-tips`);
        
        slider.addEventListener('input', function() {
            scoreDisplay.textContent = this.value;
            updateEvaluationResult(this.value, resultDisplay, tipsDisplay);
        });
    }
    
    feedbackEl.style.display = "block";
    updateStreakCounter(true); // Considerem que veure el feedback és positiu
}

// Funció per actualitzar el resultat de l'autoavaluació amb consells
function updateEvaluationResult(score, resultElement, tipsElement) {
    score = parseInt(score);
    let level, color, tips;
    
    if (score >= 9) {
        level = "Excel·lent";
        color = "#28a745";
        tips = "🎉 Ets un expert! La teva resposta demostra un domini excepcional del tema.";
    } else if (score >= 7) {
        level = "Molt Bé";
        color = "#20c997";
        tips = "🌟 Excel·lent treball! Pots afegir més detalls o exemples per perfeccionar-ho.";
    } else if (score >= 5) {
        level = "Satisfactori";
        color = "#ffc107";
        tips = "💡 Bona base! Revisa els elements que has oblidat per millorar la teva resposta.";
    } else if (score >= 3) {
        level = "A Millorar";
        color = "#fd7e14";
        tips = "📚 Has començat bé! Estudia els conceptes bàsics i intenta estructurar millor les teves idees.";
    } else {
        level = "Insuficient";
        color = "#dc3545";
        tips = "🔄 No et preocupis! Tots comencem per algun lloc. Revisa el material i torna-ho a intentar.";
    }
    
    resultElement.textContent = `Nivell: ${level}`;
    resultElement.style.backgroundColor = color;
    resultElement.style.color = "white";
    
    if (tipsElement) {
        tipsElement.innerHTML = `<strong>💡 Per millorar:</strong> ${tips}`;
    }
}

// Funció per comprovar preguntes d'emplenar buits
function checkFillBlanks(questionId, correctAnswers) {
    let correctCount = 0;
    const totalBlanks = correctAnswers.length;
    const feedbackEl = document.querySelector(`#${questionId} .feedback`);
    let feedbackHTML = "";
    let allCorrect = true;
    
    for (let i = 0; i < totalBlanks; i++) {
        const inputEl = document.getElementById(`${questionId}-${i}`);
        const userAnswer = inputEl.value.trim().toLowerCase();
        const correctAnswer = correctAnswers[i].toLowerCase();
        
        if (userAnswer === correctAnswer) {
            inputEl.style.backgroundColor = "#d4edda";
            inputEl.style.color = "#155724";
            inputEl.classList.add('correct-blank');
            correctCount++;
        } else {
            inputEl.style.backgroundColor = "#f8d7da";
            inputEl.style.color = "#721c24";
            inputEl.classList.add('incorrect-blank');
            feedbackHTML += `<div class="blank-correction">
                <span class="blank-number">Paraula ${i+1}:</span>
                "<span class="user-answer">${userAnswer || '(buit)'}</span>" 
                → "<span class="correct-answer">${correctAnswers[i]}</span>"
            </div>`;
            allCorrect = false;
        }
    }
    
    const isCorrect = allCorrect;
    
    if (isCorrect) {
        feedbackEl.innerHTML = `
            <div class="feedback-header">
                <span class="feedback-icon">${userStreak >= 3 ? '🔥' : '🎯'}</span>
                <strong>Perfecte! Has encertat totes les respostes</strong>
            </div>
            <div class="explanation-box">
                <strong>🧠 Explicació:</strong> ${getFillBlanksExplanation(questionId)}
            </div>
            ${userStreak >= 3 ? `<div class="streak-bonus">🔥 Impressionant! ${userStreak} encerts consecutius</div>` : ''}
            <div class="completion-celebration">
                <span class="celebration-icon">⭐</span>
                Has demostrat un bon coneixement d'aquests conceptes bàsics
            </div>
        `;
        feedbackEl.className = "feedback correct";
    } else {
        feedbackEl.innerHTML = `
            <div class="feedback-header">
                <span class="feedback-icon">📝</span>
                <strong>Has encertat ${correctCount} de ${totalBlanks} respostes</strong>
            </div>
            <div class="explanation-box">
                <strong>🧠 Explicació:</strong> ${getFillBlanksExplanation(questionId)}
            </div>
            <div class="corrections-section">
                <strong>🔍 Correccions necessàries:</strong>
                ${feedbackHTML}
            </div>
            <div class="feedback-tip">
                <strong>💡 Consell:</strong> ${getFillBlanksPracticeTip(questionId)}
            </div>
            <div class="encouragement">
                ${getRandomFeedback(encouragingFeedback)} Torna-ho a intentar després d'estudiar una mica!
            </div>
        `;
        feedbackEl.className = "feedback incorrect";
    }
    
    feedbackEl.style.display = "block";
    updateStreakCounter(isCorrect);
}

// Funció per obtenir l'explicació de preguntes d'emplenar buits
function getFillBlanksExplanation(questionId) {
    const explanations = {
        'sa1-p4': "L'any 476 marca tradicionalment la caiguda de l'Imperi Romà d'Occident, quan el líder germànic Odoacre va deposar l'últim emperador romà, Ròmul Augústul. Les guerres civils, invasions germàniques i crisi econòmica van ser factors clau en aquest procés.",
        'sa2-p4': "L'Imperi Bizantí es va originar amb la divisió definitiva de l'Imperi Romà. Justinià I va ser el seu emperador més important, conegut per la seva recopilació de lleis romanes en el Codi de Justinià, que va influir en el dret europeu durant segles.",
        'sa3-p4': "L'Hègira (622 dC) marca l'inici del calendari islàmic. Mahoma, profeta de l'islam, va fugir de La Meca a Medina i va començar a predicar la paraula d'Al·là, recollida posteriorment en l'Alcorà, el llibre sagrat de l'islam.",
        'sa4-p4': "Carlemany va ser coronat emperador el 800, restaurant simbòlicament l'Imperi Romà d'Occident. El Tractat de Verdun (843) va dividir el seu imperi entre els seus nets: Lluís el Germànic (orient), Carles el Calb (occident) i Lotari (centre)."
    };
    
    return explanations[questionId] || "Aquests conceptes són fonamentals per entendre aquest període històric.";
}

// Funció per obtenir consells de pràctica per a emplenar buits
function getFillBlanksPracticeTip(questionId) {
    const tips = {
        'sa1-p4': "Crea targetes d'estudi amb les dates i conceptes clau de la caiguda de Roma.",
        'sa2-p4': "Fes un esquema relacionant personatges importants amb les seves obres i fets rellevants.",
        'sa3-p4': "Practica amb exercicis de completar frases per memoritzar els termes bàsics de l'islam.",
        'sa4-p4': "Dibuixa un mapa mental de la divisió de l'Imperi Carolingi per visualitzar els territoris."
    };
    
    return tips[questionId] || "Repetir aquest tipus d'exercicis et ajudarà a fixar millor els conceptes.";
}

// Funció per calcular els resultats finals amb feedback personalitzat
function calculateResults() {
    let totalQuestions = 0;
    let correctAnswers = 0;
    const sectionResults = {};
    
    // Comptar preguntes multiopció i vertader/fals
    document.querySelectorAll('.question').forEach(question => {
        const questionId = question.id;
        const section = questionId.split('-')[0];
        const feedbackEl = question.querySelector('.feedback');
        
        if (!sectionResults[section]) {
            sectionResults[section] = { correct: 0, total: 0 };
        }
        
        if (feedbackEl && feedbackEl.classList.contains('correct')) {
            correctAnswers++;
            totalQuestions++;
            sectionResults[section].correct++;
            sectionResults[section].total++;
        } else if (feedbackEl && feedbackEl.classList.contains('incorrect')) {
            totalQuestions++;
            sectionResults[section].total++;
        }
    });
    
    // Comptar preguntes d'emplenar buits
    document.querySelectorAll('.fill-blanks').forEach(blankSection => {
        const inputs = blankSection.querySelectorAll('input');
        const questionId = blankSection.closest('.question').id;
        const section = questionId.split('-')[0];
        
        if (!sectionResults[section]) {
            sectionResults[section] = { correct: 0, total: 0 };
        }
        
        let allCorrect = true;
        inputs.forEach(input => {
            if (!input.classList.contains('correct-blank')) {
                allCorrect = false;
            }
        });
        
        if (inputs.length > 0) {
            totalQuestions++;
            sectionResults[section].total++;
            if (allCorrect) {
                correctAnswers++;
                sectionResults[section].correct++;
            }
        }
    });
    
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const scoreEl = document.getElementById('score');
    const summaryEl = document.getElementById('summary');
    
    // Feedback personalitzat segons la puntuació
    let finalFeedback = "";
    let celebration = "";
    
    if (score >= 90) {
        finalFeedback = "🏆 <strong>Excel·lent!</strong> Domines completament aquests continguts històrics.";
        celebration = "🎉 Ets un veritable expert en història medieval!";
    } else if (score >= 70) {
        finalFeedback = "🌟 <strong>Molt bé!</strong> Tens una bona comprensió dels conceptes clau.";
        celebration = "💪 Amb una mica més d'estudi, arribaràs a l'excel·lència!";
    } else if (score >= 50) {
        finalFeedback = "📚 <strong>Bàsic assolit</strong> Has après els conceptes fonamentals.";
        celebration = "🔍 Identifica els temes més dèbils i repassa'ls per millorar.";
    } else {
        finalFeedback = "🌱 <strong>A punt per créixer</strong> Has començat a entendre aquests conceptes.";
        celebration = "📖 No et rendeixis! Tothom comença per algun lloc. Continua estudiant!";
    }
    
    scoreEl.innerHTML = `
        <div class="final-score">Puntuació: <span class="score-number">${score}%</span></div>
        <div class="score-detail">(${correctAnswers} de ${totalQuestions} correctes)</div>
        <div class="final-feedback">${finalFeedback}</div>
        <div class="celebration-message">${celebration}</div>
        ${bestStreak >= 5 ? `<div class="special-achievement">🔥 Achievement desbloquejat: Ratxa de ${bestStreak} respostes correctes!</div>` : ''}
    `;
    
    let summaryHTML = "<h3>📊 Resum detallat per seccions:</h3><ul>";
    
    Object.keys(sectionResults).forEach(section => {
        const sectionData = sectionResults[section];
        const sectionScore = sectionData.total > 0 ? Math.round((sectionData.correct / sectionData.total) * 100) : 0;
        let sectionIcon = "📘";
        
        if (sectionScore >= 90) sectionIcon = "🏆";
        else if (sectionScore >= 70) sectionIcon = "⭐";
        else if (sectionScore >= 50) sectionIcon = "📗";
        else sectionIcon = "📙";
        
        summaryHTML += `
            <li>
                ${sectionIcon} ${getSectionTitle(section)}: 
                <span class="section-score">${sectionScore}%</span> 
                (${sectionData.correct} de ${sectionData.total})
            </li>
        `;
    });
    
    summaryHTML += `</ul>
        <div class="study-recommendations">
            <h4>🎯 Recomanacions d'estudi:</h4>
            ${getStudyRecommendations(sectionResults)}
        </div>
    `;
    
    summaryEl.innerHTML = summaryHTML;
}

// Funció per obtenir el títol de la secció
function getSectionTitle(section) {
    const titles = {
        'sa1': "Caiguda de l'Imperi Romà",
        'sa2': "Imperi Bizantí",
        'sa3': "Imperi Islàmic", 
        'sa4': "Imperi Carolingi"
    };
    return titles[section] || section;
}

// Funció per obtenir recomanacions d'estudi personalitzades
function getStudyRecommendations(sectionResults) {
    let recommendations = "";
    const weakSections = [];
    
    Object.keys(sectionResults).forEach(section => {
        const sectionData = sectionResults[section];
        const sectionScore = sectionData.total > 0 ? Math.round((sectionData.correct / sectionData.total) * 100) : 0;
        
        if (sectionScore < 70) {
            weakSections.push(section);
        }
    });
    
    if (weakSections.length === 0) {
        recommendations = `
            <p>✅ <strong>Excel·lent equilibri!</strong> No tens àrees dèbils significatives.</p>
            <p>💡 <strong>Següent pas:</strong> Pots aprofundir en temes més complexos o relacionar aquests continguts amb altres períodes històrics.</p>
        `;
    } else {
        recommendations = `<p>🔍 <strong>Àrees per millorar:</strong></p><ul>`;
        weakSections.forEach(section => {
            const sectionName = getSectionTitle(section);
            recommendations += `<li>📖 <strong>${sectionName}</strong> - Repassa els conceptes clau i fes més exercicis d'aquesta secció.</li>`;
        });
        recommendations += `</ul>`;
    }
    
    recommendations += `
        <div class="general-tips">
            <p>💡 <strong>Consells generals:</strong></p>
            <ul>
                <li>Fes repassos regulars per consolidar els coneixements</li>
                <li>Crea mapes conceptuals per visualitzar les relacions entre conceptes</li>
                <li>Practica amb més exercicis com aquests</li>
            </ul>
        </div>
    `;
    
    return recommendations;
}

// Inicialitzar el comptador de ratxa
document.addEventListener('DOMContentLoaded', function() {
    const resultsSection = document.querySelector('.results');
    const streakCounter = document.createElement('div');
    streakCounter.id = 'streak-counter';
    streakCounter.className = 'streak-counter';
    streakCounter.innerHTML = `🔥 Ratxa actual: 0 | 🏆 Millor ratxa: 0`;
    resultsSection.parentNode.insertBefore(streakCounter, resultsSection);
});
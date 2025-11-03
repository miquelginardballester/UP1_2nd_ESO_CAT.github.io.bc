// Estat de les respostes de l'usuari
const userAnswers = {};

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

// Funció per comprovar preguntes multiopció
function checkMultipleChoice(questionId, correctValue) {
    const userAnswer = userAnswers[questionId];
    const feedbackEl = document.querySelector(`#${questionId} .feedback`);
    
    // Desseleccionar totes les opcions
    document.querySelectorAll(`#${questionId} .option`).forEach(opt => {
        opt.classList.remove('correct', 'incorrect');
    });
    
    if (userAnswer === undefined) {
        feedbackEl.textContent = "Si us plau, selecciona una resposta abans de comprovar.";
        feedbackEl.className = "feedback incorrect";
        feedbackEl.style.display = "block";
        return;
    }
    
    // Marcar l'opció seleccionada com a correcta o incorrecta
    const selectedOption = document.querySelector(`#${questionId} .option.selected`);
    
    if (userAnswer == correctValue) {
        selectedOption.classList.add('correct');
        feedbackEl.innerHTML = `
            <strong>✅ Correcte!</strong> Has seleccionat la resposta correcta.<br><br>
            <strong>Explicació:</strong> ${getMultipleChoiceExplanation(questionId, correctValue)}
        `;
        feedbackEl.className = "feedback correct";
    } else {
        selectedOption.classList.add('incorrect');
        // Marcar també la resposta correcta
        document.querySelector(`#${questionId} .option[data-value="${correctValue}"]`).classList.add('correct');
        feedbackEl.innerHTML = `
            <strong>❌ Incorrecte.</strong> La resposta correcta està marcada en verd.<br><br>
            <strong>Explicació:</strong> ${getMultipleChoiceExplanation(questionId, correctValue)}
        `;
        feedbackEl.className = "feedback incorrect";
    }
    
    feedbackEl.style.display = "block";
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

// Funció per comprovar preguntes Vertader/Fals
function checkTrueFalse(questionId, correctValue) {
    const userAnswer = userAnswers[questionId];
    const feedbackEl = document.querySelector(`#${questionId} .feedback`);
    
    if (userAnswer === undefined) {
        feedbackEl.textContent = "Si us plau, selecciona una resposta abans de comprovar.";
        feedbackEl.className = "feedback incorrect";
        feedbackEl.style.display = "block";
        return;
    }
    
    if (userAnswer === correctValue) {
        feedbackEl.innerHTML = `
            <strong>✅ Correcte!</strong> Has seleccionat la resposta correcta.<br><br>
            <strong>Explicació:</strong> ${getTrueFalseExplanation(questionId, correctValue)}
        `;
        feedbackEl.className = "feedback correct";
    } else {
        feedbackEl.innerHTML = `
            <strong>❌ Incorrecte.</strong> La resposta correcta és: ${correctValue ? 'Vertader' : 'Fals'}.<br><br>
            <strong>Explicació:</strong> ${getTrueFalseExplanation(questionId, correctValue)}
        `;
        feedbackEl.className = "feedback incorrect";
    }
    
    feedbackEl.style.display = "block";
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

// Funció per mostrar feedback per a preguntes de desenvolupament
function showDevelopmentFeedback(questionId) {
    const feedbackEl = document.getElementById(`${questionId}-feedback`);
    const textarea = document.getElementById(`${questionId}-text`);
    
    if (textarea && textarea.value.trim() === "") {
        alert("Si us plau, escriu la teva resposta abans de veure el feedback.");
        return;
    }
    
    // Crear autoavaluació si no existeix
    if (!document.getElementById(`${questionId}-auto-eval`)) {
        const autoEval = document.createElement('div');
        autoEval.className = 'auto-evaluation';
        autoEval.id = `${questionId}-auto-eval`;
        
        autoEval.innerHTML = `
            <h4>Autoavaluació</h4>
            <div class="evaluation-criteria">
                <p>Valora la teva resposta segons aquests criteris:</p>
                <ul>
                    <li>Has inclòs tots els elements clau?</li>
                    <li>Has explicat amb claredat les teves idees?</li>
                    <li>Has estructurat bé la teva resposta?</li>
                </ul>
            </div>
            <label for="${questionId}-slider">Puntuació: <span id="${questionId}-score">5</span>/10</label>
            <input type="range" id="${questionId}-slider" class="evaluation-slider" min="0" max="10" value="5" step="1">
            <div class="evaluation-result" id="${questionId}-result">Nivell: Satisfactori</div>
        `;
        
        feedbackEl.parentNode.insertBefore(autoEval, feedbackEl.nextSibling);
        
        // Afegir event listener al slider
        const slider = document.getElementById(`${questionId}-slider`);
        const scoreDisplay = document.getElementById(`${questionId}-score`);
        const resultDisplay = document.getElementById(`${questionId}-result`);
        
        slider.addEventListener('input', function() {
            scoreDisplay.textContent = this.value;
            updateEvaluationResult(this.value, resultDisplay);
        });
    }
    
    feedbackEl.style.display = "block";
}

// Funció per actualitzar el resultat de l'autoavaluació
function updateEvaluationResult(score, resultElement) {
    score = parseInt(score);
    let level, color;
    
    if (score >= 9) {
        level = "Excel·lent";
        color = "#28a745";
    } else if (score >= 7) {
        level = "Molt Bé";
        color = "#20c997";
    } else if (score >= 5) {
        level = "Satisfactori";
        color = "#ffc107";
    } else if (score >= 3) {
        level = "A Millorar";
        color = "#fd7e14";
    } else {
        level = "Insuficient";
        color = "#dc3545";
    }
    
    resultElement.textContent = `Nivell: ${level}`;
    resultElement.style.backgroundColor = color;
    resultElement.style.color = "white";
}

// Funció per comprovar preguntes d'emplenar buits
function checkFillBlanks(questionId, correctAnswers) {
    let correctCount = 0;
    const totalBlanks = correctAnswers.length;
    const feedbackEl = document.querySelector(`#${questionId} .feedback`);
    let feedbackHTML = "";
    
    for (let i = 0; i < totalBlanks; i++) {
        const inputEl = document.getElementById(`${questionId}-${i}`);
        const userAnswer = inputEl.value.trim().toLowerCase();
        const correctAnswer = correctAnswers[i].toLowerCase();
        
        if (userAnswer === correctAnswer) {
            inputEl.style.backgroundColor = "#d4edda";
            inputEl.style.color = "#155724";
            correctCount++;
        } else {
            inputEl.style.backgroundColor = "#f8d7da";
            inputEl.style.color = "#721c24";
            feedbackHTML += `<p>Per la paraula ${i+1}: "${userAnswer || '(buit)'}" no és correcte. Hauria de ser: "${correctAnswers[i]}".</p>`;
        }
    }
    
    if (correctCount === totalBlanks) {
        feedbackEl.innerHTML = `
            <strong>✅ Tot correcte!</strong> Has encertat totes les respostes.<br><br>
            <strong>Explicació:</strong> ${getFillBlanksExplanation(questionId)}
        `;
        feedbackEl.className = "feedback correct";
    } else {
        feedbackEl.innerHTML = `
            <strong>❌ Has encertat ${correctCount} de ${totalBlanks} respostes.</strong><br><br>
            <strong>Explicació:</strong> ${getFillBlanksExplanation(questionId)}<br><br>
            ${feedbackHTML}
        `;
        feedbackEl.className = "feedback incorrect";
    }
    
    feedbackEl.style.display = "block";
}

// Funció per obtenir l'explicació de preguntes d'emplenar buits
function getFillBlanksExplanation(questionId) {
    const explanations = {
        'sa1-p4': "L'any 476 marca tradicionalment la caiguda de l'Imperi Romà d'Occident, quan el líder germànic Odoacre va deposar l'últim emperador romà, Ròmul Augústul. Les guerres civils, invasions germàniques i crisi econòmica van ser factors clau en aquest procés.",
        'sa2-p4': "L'Imperi Bizantí es va originar amb la divisió definitiva de l'Imperi Romà. Justinià I va ser el seu emperador més important, conegut per la seva recopilació de lleis romanes en el Codi de Justinià, que va influir en el dret europeu durant segles.",
        'sa3-p4': "L'Hègira (622 dC) marca l'inici del calendari islàmic. Mahoma, profeta de l'islam, va fugir de La Meca a Medina i va començar a predicar la paraula d'Al·là, recollida posteriorment en l'Alcorà, el llibre sagrat de l'islam.",
        'sa4-p4': "Carlemany va ser coronat emperador el 800, restaurant simbòlicament l'Imperi Romà d'Occident. El Tractat de Verdun (843) va dividir el seu imperi entre els seus nets: Lluís el Germànic (orient), Carles el Calb (occident) i Lotari (centre)."
    };
    
    return explanations[questionId] || "Revisa els teus coneixements sobre aquests conceptes bàsics.";
}

// Funció per calcular els resultats finals
function calculateResults() {
    let totalQuestions = 0;
    let correctAnswers = 0;
    
    // Comptar preguntes multiopció i vertader/fals
    document.querySelectorAll('.question').forEach(question => {
        const questionId = question.id;
        const feedbackEl = question.querySelector('.feedback');
        
        if (feedbackEl && feedbackEl.classList.contains('correct')) {
            correctAnswers++;
            totalQuestions++;
        } else if (feedbackEl && feedbackEl.classList.contains('incorrect')) {
            totalQuestions++;
        }
    });
    
    // Comptar preguntes d'emplenar buits
    document.querySelectorAll('.fill-blanks').forEach(blankSection => {
        const inputs = blankSection.querySelectorAll('input');
        let allCorrect = true;
        
        inputs.forEach(input => {
            if (input.style.backgroundColor !== "rgb(212, 237, 218)") {
                allCorrect = false;
            }
        });
        
        if (inputs.length > 0) {
            totalQuestions++;
            if (allCorrect) correctAnswers++;
        }
    });
    
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const scoreEl = document.getElementById('score');
    const summaryEl = document.getElementById('summary');
    
    scoreEl.textContent = `Puntuació: ${score}% (${correctAnswers} de ${totalQuestions} correctes)`;
    
    let summaryHTML = "<h3>Resum per seccions:</h3><ul>";
    document.querySelectorAll('.section').forEach(section => {
        const sectionTitle = section.querySelector('h2').textContent;
        let sectionCorrect = 0;
        let sectionTotal = 0;
        
        // Comptar preguntes correctes dins d'aquesta secció
        section.querySelectorAll('.question').forEach(question => {
            const feedbackEl = question.querySelector('.feedback');
            
            if (feedbackEl && feedbackEl.classList.contains('correct')) {
                sectionCorrect++;
                sectionTotal++;
            } else if (feedbackEl && (feedbackEl.classList.contains('incorrect') || feedbackEl.classList.contains('info'))) {
                sectionTotal++;
            }
        });
        
        // Comptar també les preguntes d'emplenar buits
        section.querySelectorAll('.fill-blanks').forEach(blankSection => {
            const inputs = blankSection.querySelectorAll('input');
            let allCorrect = true;
            
            inputs.forEach(input => {
                if (input.style.backgroundColor !== "rgb(212, 237, 218)") {
                    allCorrect = false;
                }
            });
            
            if (inputs.length > 0) {
                sectionTotal++;
                if (allCorrect) sectionCorrect++;
            }
        });
        
        const sectionScore = sectionTotal > 0 ? Math.round((sectionCorrect / sectionTotal) * 100) : 0;
        summaryHTML += `<li>${sectionTitle}: ${sectionScore}% (${sectionCorrect} de ${sectionTotal})</li>`;
    });
    
    summaryHTML += "</ul>";
    summaryEl.innerHTML = summaryHTML;
}
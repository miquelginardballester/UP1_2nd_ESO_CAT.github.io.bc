// Funció per avaluar automàticament les respostes de desenvolupament
function evaluateDevelopmentAnswer(questionId, userAnswer) {
    const expectedElements = getExpectedElements(questionId);
    const userAnswerLower = userAnswer.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    let score = 0;
    let foundElements = [];
    let missingElements = [];
    let feedbackDetails = [];

    // Verificar cada element esperat
    expectedElements.forEach(element => {
        const elementLower = element.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const keywords = elementLower.split(' ').filter(word => word.length > 3);
        
        let elementFound = false;
        let keywordMatches = 0;
        
        keywords.forEach(keyword => {
            if (userAnswerLower.includes(keyword)) {
                keywordMatches++;
            }
        });

        // Si coincideixen més del 50% de les paraules clau, considerem l'element trobat
        if (keywordMatches >= Math.ceil(keywords.length * 0.5)) {
            elementFound = true;
            score += 2; // 2 punts per element trobat
            foundElements.push(element);
        } else {
            missingElements.push(element);
        }
    });

    // Puntuació per estructura i qualitat
    const wordCount = userAnswer.split(/\s+/).length;
    
    // Bonus per longitud adequada (entre 50-200 paraules)
    if (wordCount >= 50 && wordCount <= 200) {
        score += 1;
        feedbackDetails.push("✅ La longitud de la resposta és adequada");
    } else if (wordCount < 50) {
        feedbackDetails.push("💡 La resposta és massa curta. Proporciona més detalls");
    } else {
        feedbackDetails.push("💡 La resposta és massa llarga. Sigues més concís");
    }

    // Bonus per estructura (presència de connectors i puntuació)
    const hasConnectors = /(a més|però|per tant|no obstant|per exemple|en conclusió|per una altra banda)/i.test(userAnswer);
    const sentenceCount = (userAnswer.match(/[.!?]+/g) || []).length;
    
    if (hasConnectors && sentenceCount >= 3) {
        score += 1;
        feedbackDetails.push("✅ L'estructura de la resposta és clara");
    } else {
        feedbackDetails.push("💡 Millora l'estructura amb connectors i frases ben construïdes");
    }

    // Assegurar que la puntuació estigui entre 0-10
    score = Math.min(10, Math.max(0, score));

    return {
        score: Math.round(score),
        foundElements,
        missingElements,
        feedbackDetails,
        wordCount
    };
}

// Funció per obtenir els elements esperats per a cada pregunta
function getExpectedElements(questionId) {
    const elementsMap = {
        'sa1-p3': [
            "Pressió militar constant als límits",
            "Pèrdua de territoris",
            "Establiment de regnes germànics",
            "Debilitat econòmica i política"
        ],
        'sa2-p3': [
            "Religió cristiana",
            "Simbologia i litúrgia cristianes",
            "Llatí com a idioma oficial",
            "Desenvolupament del dret romà",
            "Codi Justinià"
        ],
        'sa3-p3': [
            "Unificació de tribus àrabs",
            "Comerç",
            "Religió",
            "Poder militar",
            "Idioma i cultura",
            "Àfrica, Àsia i Europa"
        ],
        'sa4-p3': [
            "Reforma educativa",
            "Preservació de textos clàssics",
            "Desenvolupament de l'escriptura",
            "Arquitectura i art",
            "Reforma religiosa"
        ]
    };
    
    return elementsMap[questionId] || [];
}

// Funció per obtenir el nivell de qualificació
function getScoreLevel(score) {
    if (score >= 9) return { level: "Excel·lent", color: "#28a745", icon: "🏆" };
    if (score >= 7) return { level: "Molt Bé", color: "#20c997", icon: "⭐" };
    if (score >= 5) return { level: "Satisfactori", color: "#ffc107", icon: "✅" };
    if (score >= 3) return { level: "A Millorar", color: "#fd7e14", icon: "💡" };
    return { level: "Insuficient", color: "#dc3545", icon: "📚" };
}

// Funció millorada per mostrar feedback de desenvolupament amb avaluació automàtica
function showDevelopmentFeedback(questionId) {
    const feedbackEl = document.getElementById(`${questionId}-feedback`);
    const textarea = document.getElementById(`${questionId}-text`);
    const userAnswer = textarea.value.trim();
    
    if (userAnswer === "") {
        feedbackEl.innerHTML = `
            <div class="feedback-header">
                <span class="feedback-icon">📝</span>
                <strong>Encara no has respost</strong>
            </div>
            <p>Escriu la teva resposta a la zona de text abans de veure l'avaluació.</p>
        `;
        feedbackEl.className = "feedback warning";
        feedbackEl.style.display = "block";
        return;
    }

    // Realitzar avaluació automàtica
    const evaluation = evaluateDevelopmentAnswer(questionId, userAnswer);
    const scoreInfo = getScoreLevel(evaluation.score);

    // Crear HTML de l'avaluació automàtica
    let evaluationHTML = `
        <div class="auto-evaluation-result">
            <div class="evaluation-header" style="background: ${scoreInfo.color}20; border-left: 4px solid ${scoreInfo.color}">
                <div class="score-main">
                    <span class="score-icon">${scoreInfo.icon}</span>
                    <div class="score-info">
                        <div class="score-value">${evaluation.score}/10</div>
                        <div class="score-level">${scoreInfo.level}</div>
                    </div>
                </div>
            </div>
            
            <div class="evaluation-details">
                <div class="elements-section">
                    <h4>🔍 Elements trobats (${evaluation.foundElements.length}/${evaluation.foundElements.length + evaluation.missingElements.length})</h4>
                    <div class="elements-list">
    `;

    // Llistar elements trobats
    evaluation.foundElements.forEach(element => {
        evaluationHTML += `<div class="element-found">✅ ${element}</div>`;
    });

    // Llistar elements que falten
    if (evaluation.missingElements.length > 0) {
        evaluationHTML += `
            <h4>📋 Elements per millorar</h4>
        `;
        evaluation.missingElements.forEach(element => {
            evaluationHTML += `<div class="element-missing">💡 ${element}</div>`;
        });
    }

    evaluationHTML += `
                    </div>
                </div>
                
                <div class="feedback-section">
                    <h4>📊 Anàlisi de la resposta</h4>
                    <div class="feedback-list">
    `;

    // Afegir detalls de feedback
    evaluation.feedbackDetails.forEach(detail => {
        evaluationHTML += `<div class="feedback-detail">${detail}</div>`;
    });

    evaluationHTML += `
                        <div class="word-count">📝 Longitud: ${evaluation.wordCount} paraules</div>
                    </div>
                </div>
            </div>
            
            <div class="improvement-tips">
                <h4>🎯 Com millorar</h4>
                <div class="tips-content">
    `;

    // Consells específics segons la puntuació
    if (evaluation.score < 5) {
        evaluationHTML += `
            <p>🔹 <strong>Revisa els conceptes bàsics</strong> i assegura't d'entendre'ls abans de continuar</p>
            <p>🔹 <strong>Organitza les teves idees</strong> abans d'escriure</p>
            <p>🔹 <strong>Inclou exemples concrets</strong> per il·lustrar els teus arguments</p>
        `;
    } else if (evaluation.score < 8) {
        evaluationHTML += `
            <p>🔹 <strong>Amplia els teus arguments</strong> amb més detalls</p>
            <p>🔹 <strong>Connecta les idees</strong> entre si per crear un discurs coherent</p>
            <p>🔹 <strong>Revisa la gramàtica</strong> i l'ortografia</p>
        `;
    } else {
        evaluationHTML += `
            <p>🔹 <strong>Excel·lent treball!</strong> Continua amb aquest nivell de detall</p>
            <p>🔹 <strong>Pots aprofundir</strong> relacionant aquests conceptes amb altres temes</p>
            <p>🔹 <strong>Considera perspectives alternatives</strong> per enriquir la teva anàlisi</p>
        `;
    }

    evaluationHTML += `
                </div>
            </div>
        </div>
    `;

    // Inserir l'avaluació automàtica al feedback
    const existingContent = feedbackEl.innerHTML;
    feedbackEl.innerHTML = evaluationHTML + existingContent;
    feedbackEl.style.display = "block";
    
    updateStreakCounter(true);
}
document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatHistory = document.getElementById('chat-history');

    const welcomeMessage = "👋 Hi! I'm your <b>AI Career Coach</b>.<br>I'm here to help you with <b>career guidance</b>, <b>skill development</b>, and answering any questions about your professional journey.<br><br><i>What would you like to discuss today?</i>";
    appendMessage(welcomeMessage, 'ai', '12:23');

    document.querySelectorAll('.quick-questions-list a, .topic-tag').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            chatInput.value = el.textContent;
            chatForm.dispatchEvent(new Event('submit'));
        });
    });

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const userMessage = chatInput.value.trim();
        if (!userMessage) return;
        appendMessage(userMessage, 'user');
        chatInput.value = '';
        generateAiResponse(userMessage);
    });

    function appendMessage(text, type, timeOverride) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', type);
        
        const time = timeOverride || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).replace(" ","");
        
        let messageContentHTML = '';
        if (type === 'ai') {
            messageContentHTML += `<div class="avatar"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10 20.563a2 2 0 0 1-1.155-.44l-4-3A2 2 0 0 1 4 15.5V8.5a2 2 0 0 1 .845-1.624l4-3A2 2 0 0 1 10 3.5v17.063zM14 3.437a2 2 0 0 1 1.155.44l4 3A2 2 0 0 1 20 8.5v7a2 2 0 0 1-.845 1.624l-4 3A2 2 0 0 1 14 20.5V3.437z"/></svg></div>`;
        }
        
        const content = isTyping(text) ? `<p><i>AI is typing...</i></p>` : `<p>${text}</p><div class="timestamp">${time}</div>`;
        messageContentHTML += `<div class="message-content">${content}</div>`;
        
        messageDiv.innerHTML = messageContentHTML;

        if (isTyping(text)) {
            messageDiv.id = 'typing-indicator';
        }
        
        chatHistory.appendChild(messageDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    function isTyping(text) {
        return text === 'typing...';
    }

    function generateAiResponse(userInput) {
        appendMessage('typing...', 'ai');

        setTimeout(() => {
            document.getElementById('typing-indicator')?.remove();
            let aiResponse = "🤔 I'm not sure how to answer that. However, I can help with topics like <b>Career Planning</b>, <b>Skill Development</b>, <b>Interview Prep</b>, and <b>Resume Building</b>.<br><br>What would you like to know?";
            const lowerCaseInput = userInput.toLowerCase();
            if (lowerCaseInput.includes('hello') || lowerCaseInput.includes('hi')) { aiResponse = "👋 Hello! It's great to connect.<br>How can I assist you with your career goals today?"; } 
            else if (lowerCaseInput.includes('interview')) { aiResponse = "🎯 <b>Excellent question!</b> To improve your interview skills, I recommend practicing the <b>STAR method</b> (Situation, Task, Action, Result) for behavioral questions.<br>Also, research the company thoroughly and prepare a few thoughtful questions to ask them."; } 
            else if (lowerCaseInput.includes('skill') || lowerCaseInput.includes('focus')) { aiResponse = "🚀 That's a key question for career growth.<br>To determine the best skills to focus on, we should first identify your target role or industry.<br>For example, for a <b>Data Scientist</b>, <b>Python</b> and <b>SQL</b> are crucial.<br><br>What career are you aiming for?"; } 
            else if (lowerCaseInput.includes('resume') || lowerCaseInput.includes('cv')) { aiResponse = "📝 For a strong resume, make sure to <b>quantify your achievements</b> with numbers wherever possible.<br>For example, instead of 'Improved performance,' say 'Increased performance by 20%.'<br>Also, tailor your resume to each job application by highlighting the most relevant skills."; } 
            else if (lowerCaseInput.includes('transition') || lowerCaseInput.includes('new career')) { aiResponse = "🔄 Transitioning to a new career can be exciting!<br>I suggest starting by identifying your <b>transferable skills</b>, taking online courses to fill any gaps, and networking with professionals in your new target field.<br><br>What new career are you considering?"; }
            appendMessage(aiResponse, 'ai');
        }, 1200);
    }
});
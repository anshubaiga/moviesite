 <script>
    // Simple front-end demo. Replace simulateAIReply() with a call to your backend
    const messagesEl = document.getElementById('messages');
    const inputEl = document.getElementById('input');
    const sendBtn = document.getElementById('sendBtn');
    const modelNameEl = document.getElementById('modelName');
    const statusEl = document.getElementById('status');

    document.querySelectorAll('.model').forEach(m=>{
      m.addEventListener('click', ()=>{
        document.querySelectorAll('.model').forEach(x=>x.style.opacity=1);
        m.style.opacity = 0.85;
        modelNameEl.textContent = m.textContent.trim();
      })
    })

    sendBtn.addEventListener('click', sendMessage);
    inputEl.addEventListener('keydown', (e)=>{ if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); sendMessage() } });

    function appendMessage(text, who='bot', options={}){
      const el = document.createElement('div'); el.className = 'msg '+(who==='user'?'user':'bot');
      el.innerHTML = text;
      messagesEl.appendChild(el);
      messagesEl.scrollTop = messagesEl.scrollHeight;
      return el;
    }

    function showTyping(){
      const wrap = document.createElement('div'); wrap.className='msg bot typingWrap';
      wrap.innerHTML = '<div class="typing" role="status" aria-label="AI is typing"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>';
      messagesEl.appendChild(wrap); messagesEl.scrollTop = messagesEl.scrollHeight; return wrap;
    }

    async function sendMessage(){
      const text = inputEl.value.trim(); if(!text) return;
      appendMessage(escapeHtml(text),'user'); inputEl.value='';
      statusEl.textContent = 'Thinking...';

      // simulated typing
      const typing = showTyping();
      try{
        // Replace this with an actual fetch to your server calling an LLM API.
        const reply = await simulateAIReply(text);
        typing.remove();
        appendMessage(escapeHtml(reply),'bot');
        statusEl.textContent = 'Ready';
      }catch(err){
        typing.remove();
        appendMessage('Error: could not get response. See console.','bot');
        statusEl.textContent = 'Error';
        console.error(err);
      }
    }

    // Simple simulated reply function. Swap this for a fetch() to your backend / LLM provider.
    function simulateAIReply(userText){
      return new Promise((resolve)=>{
        // generate a bit of "smart" variation for demo
        const base = [
          `Nice question — here's a concise answer to: "${userText}"`,
          `I can help with that. For your question about "${userText}", consider these steps...`,
          `Here's a short summary regarding "${userText}".`
        ];
        const rnd = base[Math.floor(Math.random()*base.length)];
        // mimic progressive streaming by resolving after a delay
        setTimeout(()=>resolve(rnd + '\n\n(Replace this simulated response with a real model API call.)'), 700 + Math.random()*900);
      })
    }

    // small helper
    function escapeHtml(s){ return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('\n','<br>'); }

    // Example starter message
    appendMessage('<strong>Welcome!</strong> Try asking "How do I make a chatbot?"','bot');
  </script>

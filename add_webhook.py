with open('/root/grace/grace-isa-server.js', 'r') as f:
    code = f.read()

webhook = """
app.post('/webhook/web', async (req, res) => {
  const { first_name, last_name, email, phone, interest, message, sms_consent, source } = req.body;
  res.json({ ok: true });
  if (!phone) return;
  const name = (first_name + ' ' + last_name).trim();
  const userMessage = 'New website lead. Name: ' + name + '. Interest: ' + (interest || 'not specified') + '. Message: ' + (message || 'none') + '. Source: gladdenglobalnetwork.com.';
  try {
    const memory = await getLeadMemory(phone);
    const isNew = !memory || !memory.conversation || memory.conversation.length === 0;
    const systemPrompt = buildSystemPrompt({name, email, phone, interest, message, source: 'gladdenglobalnetwork.com'}, isNew);
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 300,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }]
    });
    const reply = response.content[0].text.trim();
    await saveLeadMemory(phone, name, [{role: 'user', content: userMessage}, {role: 'assistant', content: reply}]);
    await sendFUBText(phone, name, email, reply, {name, email, phone, interest, source: 'gladdenglobalnetwork.com'});
  } catch (err) {
    console.error('Web webhook error:', err.message);
  }
});
"""

code = code.replace("app.post('/webhook/fub'", webhook + "\napp.post('/webhook/fub'")

with open('/root/grace/grace-isa-server.js', 'w') as f:
    f.write(code)

print('Done' if "webhook/web" in code else 'Failed')

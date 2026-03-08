import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, Mic, ArrowRight, Leaf } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  suggestions?: string[];
}

const starterQuestions = [
  "My scalp has been really itchy lately",
  "I'm worried about my edges thinning",
  "How often should I wash in a protective style?",
  "What should I eat for healthier hair?",
];

const shouldSuggestCheckIn = (content: string): boolean => {
  const lower = content.toLowerCase();
  return lower.includes('concerned') || lower.includes('worried') || lower.includes('getting worse') || lower.includes('significant') || lower.includes('professional') || lower.includes('trichologist') || lower.includes('dermatologist');
};

const shouldLinkLearn = (content: string): { show: boolean; topic: string } => {
  const lower = content.toLowerCase();
  if (lower.includes('traction alopecia')) return { show: true, topic: 'Traction alopecia: the basics' };
  if (lower.includes('telogen effluvium')) return { show: true, topic: 'Telogen effluvium' };
  if (lower.includes('wash cycle') || lower.includes('wash day')) return { show: true, topic: 'Understanding your wash cycle' };
  if (lower.includes('professional') || lower.includes('specialist') || lower.includes('trichologist')) return { show: true, topic: 'When to see a professional' };
  if (lower.includes('porosity')) return { show: true, topic: 'Understanding hair porosity' };
  if (lower.includes('protein') || lower.includes('moisture balance')) return { show: true, topic: 'Protein-moisture balance' };
  return { show: false, topic: '' };
};

interface UserData {
  gender: string;
  hairType: string;
  chemicalProcessing: string;
  lastChemicalTreatment: string;
  styles: string[];
  protectiveStyleFrequency: string;
  cycleLength: string;
  washFrequency: string;
  betweenWashCare: string[];
  scalpProducts: string[];
  hairProducts: string[];
  goals: string[];
  baseline: {
    itch: string;
    tenderness: string;
    hairline: string;
    hairHealth: string;
  };
  lastCheckInRisk: string;
  medicalConditions: string[];
  teTriggers: string[];
  menstrualTracking: string;
  cycleDay: number | null;
}

const buildSystemPrompt = (userData: UserData): string => {
  return `You are ScalpSense Chat. You talk to women and men with textured hair about their scalp and hair health. You are warm, direct, and genuinely helpful. You sound like a knowledgeable friend who happens to have clinical expertise, not a medical chatbot reading from a textbook.

HOW TO RESPOND:

- Be specific. Never give generic advice. Use what you know about this person.
- Be concise. 2-3 short paragraphs max. No walls of text.
- Lead with the answer, not the preamble. Don't start with "Great question!" or "That's a really important topic." Just answer.
- If you know something relevant from their profile, weave it in naturally. Don't say "Based on your profile..." Just reference it: "Since you're wearing box braids and you mentioned moderate itching at your last check-in, here's what might be going on..."
- If they describe a symptom, help them understand what it might mean AND give them something actionable to try right now.
- If something sounds clinically concerning, say so plainly: "That's worth getting looked at by a trichologist or dermatologist. Don't wait on that."
- Never recommend applying oils directly to the scalp as a default treatment. Most scalp oils have limited clinical evidence. If asked about specific oils, give an evidence-based answer.
- Never diagnose. Say "this could be" or "this sounds like it might be" not "you have."
- End clinical responses with a gentle nudge toward professional advice, but don't make it a copy-paste disclaimer every time. Vary it naturally.

WHAT YOU KNOW ABOUT THIS PERSON:

Gender: ${userData.gender || 'Not specified'}
Hair type: ${userData.hairType || 'Not specified'}
Chemical processing: ${userData.chemicalProcessing || 'None'}
Last chemical treatment: ${userData.lastChemicalTreatment || 'Not specified'}
Styles worn: ${userData.styles?.join(', ') || 'Not specified'}
Time in protective styles: ${userData.protectiveStyleFrequency || 'Not specified'}
Typical cycle length: ${userData.cycleLength || 'Not specified'}
Wash frequency: ${userData.washFrequency || 'Not specified'}
Between-wash care: ${userData.betweenWashCare?.join(', ') || 'Not specified'}
Scalp products: ${userData.scalpProducts?.join(', ') || 'None'}
Hair products: ${userData.hairProducts?.join(', ') || 'None'}
Goals: ${userData.goals?.join(', ') || 'Not specified'}
Baseline symptoms: Itch: ${userData.baseline?.itch || 'N/A'}, Tenderness: ${userData.baseline?.tenderness || 'N/A'}, Hairline: ${userData.baseline?.hairline || 'N/A'}, Hair health: ${userData.baseline?.hairHealth || 'N/A'}
Most recent check-in: Risk level: ${userData.lastCheckInRisk || 'No check-ins yet'}
Medical conditions: ${userData.medicalConditions?.join(', ') || 'None reported'}
Stress or TE triggers: ${userData.teTriggers?.join(', ') || 'None reported'}
Menstrual cycle: ${userData.menstrualTracking ? 'Day ' + (userData.cycleDay || '?') + ' of cycle' : 'Not tracking'}

USE THIS CONTEXT. If someone asks "why is my scalp itchy" and you know they're 2 weeks into box braids and reported moderate itching at baseline, your answer should reference that specifically. If you don't have relevant context, just answer the question well.

TOPICS YOU HANDLE:

Scalp conditions (traction alopecia, CCCA, seborrheic dermatitis, psoriasis, alopecia areata, folliculitis)
Hair health (breakage, porosity, protein-moisture balance, shedding vs breakage, growth and retention)
Nutrition and hair (iron, vitamin D, zinc, B12, biotin, protein, crash diets)
Styling and protection (tension, heat damage, chemical damage, protective styling)
Products (what ingredients do, what's evidence-based, what's marketing)
Hormones and hair (menstrual cycle effects, postpartum shedding, TE triggers, PCOS)
Men's specific concerns (androgenetic alopecia, durag tension, barber hygiene, loc care)
When to see a professional and what type

TOPICS YOU REDIRECT:

Anything not related to scalp, hair, or closely related health. Politely say: "I'm best with scalp and hair questions — is there something about your hair I can help with?"

FOLLOW-UP SUGGESTIONS:

After every response, you must include exactly 3 follow-up question suggestions in a JSON block at the very end of your response, formatted like this:

|||SUGGESTIONS|||["question 1", "question 2", "question 3"]|||END|||

These suggestions MUST be:
- Directly related to what was just discussed in this specific message, not generic
- Progressive, meaning they go deeper into the topic or explore a related next step
- Phrased as things the user would naturally want to know next
- Short, 10 words or less each

Examples of GOOD follow-ups after discussing itchy scalp during braids:
["Could this be seborrheic dermatitis?", "Should I wash my scalp mid-cycle?", "When should I see a trichologist about this?"]

Examples of BAD follow-ups (too generic, not related):
["What is traction alopecia?", "How do I care for my hair?", "Tell me about nutrition"]`;
};

const parseResponse = (responseText: string): { text: string; suggestions: string[] } => {
  const suggestionsMatch = responseText.match(/\|\|\|SUGGESTIONS\|\|\|(.*?)\|\|\|END\|\|\|/s);
  let suggestions: string[] = [];
  let cleanText = responseText;

  if (suggestionsMatch) {
    try {
      suggestions = JSON.parse(suggestionsMatch[1]);
    } catch {
      suggestions = ["Tell me more about this", "What should I do next?", "Should I see a specialist?"];
    }
    cleanText = responseText.replace(/\|\|\|SUGGESTIONS\|\|\|.*?\|\|\|END\|\|\|/s, '').trim();
  }

  return { text: cleanText, suggestions };
};

// Offline fallback response builder (used when no API is available)
const buildOfflineResponse = (userMessage: string, userData: UserData): string => {
  const lower = userMessage.toLowerCase();
  const primaryStyle = userData.styles?.[0] || 'your current style';
  const hasProtective = userData.styles?.some(s => {
    const sl = s.toLowerCase();
    return sl.includes('braid') || sl.includes('cornrow') || sl.includes('wig') || sl.includes('weave') || sl.includes('loc') || sl.includes('twist') || sl.includes('crochet');
  });

  if (lower.includes('itch') || lower.includes('itchy') || lower.includes('itching')) {
    let r = '';
    if (userData.baseline?.itch && userData.baseline.itch !== 'None') {
      r += `You mentioned ${userData.baseline.itch.toLowerCase()} itching when you set up ScalpSense, so this is already on our radar.\n\n`;
    }
    if (hasProtective) {
      r += `Since you're wearing ${primaryStyle.toLowerCase()}, sweat and product can build up between washes. `;
      if (userData.washFrequency) r += `Washing ${userData.washFrequency.toLowerCase()} means buildup has time to accumulate.\n\n`;
      else r += '\n\n';
    }
    r += 'A few things could be going on:\n\n';
    r += '- **Product buildup** — especially under an installed style where you can\'t cleanse easily\n';
    r += '- **Dry scalp** — small white flakes, tight feeling. Needs gentle hydration, not medicated treatment\n';
    r += '- **Seborrheic dermatitis** — yellowish, oily flakes. Responds to antifungal shampoos like ketoconazole\n\n';
    r += 'Try pressing gently with a fingertip instead of scratching. If it\'s getting worse or doesn\'t improve with gentle cleansing, worth mentioning to a dermatologist.';
    r += '\n\n|||SUGGESTIONS|||["Could this be seborrheic dermatitis?", "Should I wash my scalp mid-cycle?", "When should I see a trichologist?"]|||END|||';
    return r;
  }

  if (lower.includes('edge') || lower.includes('hairline') || lower.includes('thinning')) {
    let r = '';
    if (userData.baseline?.hairline && userData.baseline.hairline !== 'No concerns') {
      r += `You flagged some concern about your hairline during setup, so this is something we're already tracking.\n\n`;
    }
    r += 'The most common cause of edge thinning is **traction alopecia** — repeated tension on the follicles from tight styling.\n\n';
    if (hasProtective) {
      r += `With ${primaryStyle.toLowerCase()}, the key question is how tight your installations are around the hairline and temples. `;
      if (userData.cycleLength) r += `Keeping styles in for ${userData.cycleLength.toLowerCase()} means sustained tension each cycle.\n\n`;
      else r += '\n\n';
    }
    if (userData.goals?.some(g => g.toLowerCase().includes('hairline') || g.toLowerCase().includes('edge'))) {
      r += 'Since protecting your hairline is one of your goals, your check-ins are specifically tracking changes there. ';
    }
    r += 'The good news: caught early, traction alopecia is often reversible. The key is reducing tension now.\n\nIf you\'re seeing active recession, a trichologist or dermatologist can assess whether the follicles are still viable.';
    r += '\n\n|||SUGGESTIONS|||["Is traction alopecia reversible?", "How tight is too tight?", "Should I take a break from braids?"]|||END|||';
    return r;
  }

  if (lower.includes('wash') && (lower.includes('how often') || lower.includes('should i') || lower.includes('protective'))) {
    let r = '';
    if (hasProtective) {
      r += `With ${primaryStyle.toLowerCase()}, your scalp is producing oil, shedding skin cells, and potentially reacting to products — all under a style you can't easily access.\n\n`;
      if (userData.washFrequency) r += `You currently wash ${userData.washFrequency.toLowerCase()}. `;
    }
    r += 'Most dermatologists recommend cleansing at least every 2 weeks in a protective style, even if it\'s just a diluted shampoo or scalp-focused rinse. You don\'t need to take the whole style down to clean your scalp.\n\n';
    r += 'Between washes, a scalp refresh spray or rinse with water can help manage buildup without disturbing your style.';
    r += '\n\n|||SUGGESTIONS|||["What should I use to cleanse mid-cycle?", "Can I co-wash in braids?", "How do I know if I have buildup?"]|||END|||';
    return r;
  }

  if (lower.includes('eat') || lower.includes('food') || lower.includes('diet') || lower.includes('nutrition') || lower.includes('vitamin')) {
    let r = 'Your hair is built from protein and fuelled by nutrients carried in your blood. If your diet is lacking, hair is one of the first places to show it.\n\n';
    r += 'The nutrients that matter most for hair:\n\n';
    r += '- **Iron** — carries oxygen to follicles. Low iron is one of the most common causes of shedding\n';
    r += '- **Vitamin D** — low levels are linked to hair loss. Supplementation is often needed, especially with darker skin\n';
    r += '- **Zinc** — supports hair tissue growth. Found in pumpkin seeds, chickpeas, beef\n';
    r += '- **B12** — essential for red blood cells that feed follicles\n';
    r += '- **Protein** — your hair is literally made of it\n\n';
    r += 'Get a blood test before spending money on supplements. They fix deficiencies — they don\'t override genetics or styling damage.';
    r += '\n\n|||SUGGESTIONS|||["Should I take biotin supplements?", "Can crash diets cause hair loss?", "What blood tests should I ask for?"]|||END|||';
    return r;
  }

  if (lower.includes('shed') || lower.includes('hair loss') || lower.includes('falling out') || lower.includes('losing hair')) {
    let r = 'Some shedding is completely normal — 50 to 100 hairs a day. ';
    if (hasProtective) {
      r += `With ${primaryStyle.toLowerCase()}, you might not notice daily shedding until takedown, so it can seem like a lot all at once. That\'s usually just accumulated normal shedding.\n\n`;
    } else {
      r += 'What matters is whether the amount has changed significantly.\n\n';
    }
    r += 'Things that increase temporary shedding:\n\n';
    r += '- **Stress** — physical or emotional stress can trigger telogen effluvium 2–4 months later\n';
    r += '- **Nutritional deficiencies** — especially iron, vitamin D, B12\n';
    r += '- **Hormonal changes** — postpartum, contraception changes, thyroid issues\n';
    r += '- **Seasonal** — many people shed more in autumn\n\n';
    if (userData.teTriggers && userData.teTriggers.length > 0 && !userData.teTriggers.includes('None of these')) {
      r += `You\'ve noted some stress factors in your profile, which could be contributing.\n\n`;
    }
    r += 'If the shedding seems excessive or you\'re seeing patches, a trichologist can help figure out what\'s going on.';
    r += '\n\n|||SUGGESTIONS|||["Is this shedding or breakage?", "Could this be telogen effluvium?", "What blood tests check for hair loss?"]|||END|||';
    return r;
  }

  if (lower.includes('product') || lower.includes('shampoo') || lower.includes('conditioner')) {
    let r = '';
    if (userData.scalpProducts?.length > 0 && userData.scalpProducts[0] !== 'None') {
      r += `You\'re currently using ${userData.scalpProducts.slice(0, 3).join(', ')} on your scalp. `;
    }
    r += 'The most important thing with products isn\'t using more — it\'s using the right ones for your specific situation.\n\n';
    if (userData.hairType) {
      const isHighPorosity = userData.chemicalProcessing && userData.chemicalProcessing !== 'No, fully natural';
      r += `With ${userData.hairType} hair${isHighPorosity ? ' that\'s been chemically processed' : ''}, ${isHighPorosity ? 'your hair is likely higher porosity — heavier creams and butters on the hair shaft work well' : 'lighter products that won\'t weigh your curls down tend to work best'}.\n\n`;
    }
    r += 'If you\'re dealing with a specific issue like itching, flaking, or breakage, tell me more and I can give you targeted advice.';
    r += '\n\n|||SUGGESTIONS|||["What ingredients should I avoid?", "Do I need a clarifying shampoo?", "How do I know my porosity?"]|||END|||';
    return r;
  }

  if (lower.includes('oil') && (lower.includes('scalp') || lower.includes('castor') || lower.includes('coconut') || lower.includes('rosemary'))) {
    let r = 'Most scalp oils marketed for growth have limited clinical evidence behind them. A few things to know:\n\n';
    r += '- **Rosemary oil** has some clinical evidence for supporting hair growth, comparable to minoxidil in one small study. Should be diluted and used sparingly.\n';
    r += '- **Peppermint oil** showed promise in animal studies for follicle stimulation, but human evidence is limited.\n';
    r += '- **Castor oil and coconut oil** are heavy and can clog follicles, especially under installed styles. They can worsen conditions like seborrheic dermatitis.\n\n';
    r += 'If you want to use an oil, keep it light, diluted, and infrequent. But don\'t feel like you need to — a healthy scalp doesn\'t require oil application.';
    r += '\n\n|||SUGGESTIONS|||["Is rosemary oil worth trying?", "What actually helps hair growth?", "Can oils make dandruff worse?"]|||END|||';
    return r;
  }

  if (lower.includes('break') || lower.includes('brittle') || lower.includes('dry')) {
    let r = 'Hair breaks for different reasons, and the fix depends on which one:\n\n';
    if (userData.chemicalProcessing && userData.chemicalProcessing !== 'No, fully natural') {
      r += `Since your hair has been chemically processed${userData.lastChemicalTreatment ? ` (last treated ${userData.lastChemicalTreatment.toLowerCase()})` : ''}, the internal structure may be weakened. Bond repair treatments like K18 or Olaplex can help.\n\n`;
    }
    r += '- **Mechanical** — from tight styling or rough handling. Fix: gentler detangling, satin accessories\n';
    r += '- **Moisture deficit** — dry, snaps easily. Fix: deep conditioning, leave-in\n';
    r += '- **Protein deficit** — mushy, stretchy when wet. Fix: protein treatment\n';
    r += '- **Heat damage** — permanent. Damaged sections need trimming\n\n';
    r += 'Quick test: gently stretch a wet strand. Snaps = needs moisture. Stretches without bouncing back = needs protein.';
    r += '\n\n|||SUGGESTIONS|||["Do I need protein or moisture?", "How often should I deep condition?", "Is my breakage from styling?"]|||END|||';
    return r;
  }

  // Off-topic
  if (!lower.match(/hair|scalp|itch|style|braid|wash|shed|break|product|grow|thin|edge|dandruff|flak|curl|loc|wig|wave|barber/)) {
    return 'I\'m best with scalp and hair questions — is there something about your hair I can help with?\n\n|||SUGGESTIONS|||["My scalp has been itchy lately", "I\'m worried about thinning", "What should my wash routine be?"]|||END|||';
  }

  // Default
  let r = '';
  if (userData.hairType) r += `With your ${userData.hairType} hair, `;
  else r += 'With textured hair, ';
  r += 'here are some principles that hold true:\n\n';
  r += '- **Listen to your scalp** — persistent itching, tenderness, or flaking are worth investigating\n';
  r += '- **Track patterns** — your check-ins help spot trends that are hard to notice day to day\n';
  r += '- **Be gentle** — less tension and manipulation is almost always better\n\n';
  if (userData.goals?.length > 0) {
    r += `Since your goal is to ${userData.goals[0].toLowerCase()}, your check-ins are designed to track what matters most to you.\n\n`;
  }
  r += 'Can you be more specific about what you\'d like to know? The more detail you give me, the more useful I can be.';
  r += '\n\n|||SUGGESTIONS|||["My scalp is itchy under my style", "I\'m seeing more shedding than usual", "What products should I use?"]|||END|||';
  return r;
};

const ChatPage = () => {
  const navigate = useNavigate();
  const { onboardingData, currentCheckIn, healthProfile, baselineRisk, history } = useApp();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Calculate menstrual cycle day
  const getCycleDay = (): number | null => {
    if (onboardingData.menstrualTracking !== "Yes, I'd like to track" || !onboardingData.lastPeriodDate) return null;
    const lastPeriod = new Date(onboardingData.lastPeriodDate);
    const diffDays = Math.floor((Date.now() - lastPeriod.getTime()) / 86400000);
    const cycleLenMap: Record<string, number> = { '21–25 days': 23, '26–30 days': 28, '31–35 days': 33 };
    const cycleLen = cycleLenMap[onboardingData.menstrualCycleLength] || 28;
    return diffDays > 0 ? ((diffDays - 1) % cycleLen) + 1 : null;
  };

  const userData: UserData = {
    gender: onboardingData.gender,
    hairType: onboardingData.hairType,
    chemicalProcessing: onboardingData.chemicalProcessing,
    lastChemicalTreatment: onboardingData.lastChemicalTreatment,
    styles: onboardingData.protectiveStyles,
    protectiveStyleFrequency: onboardingData.protectiveStyleFrequency,
    cycleLength: onboardingData.cycleLength,
    washFrequency: onboardingData.washFrequency || onboardingData.wornOutWashFrequency,
    betweenWashCare: onboardingData.betweenWashCare,
    scalpProducts: onboardingData.scalpProducts,
    hairProducts: onboardingData.hairProducts,
    goals: onboardingData.goals,
    baseline: {
      itch: onboardingData.baselineItch,
      tenderness: onboardingData.baselineTenderness,
      hairline: onboardingData.baselineHairline,
      hairHealth: onboardingData.baselineHairHealth,
    },
    lastCheckInRisk: currentCheckIn ? 'Completed' : baselineRisk || 'No check-ins yet',
    medicalConditions: healthProfile.medicalConditions,
    teTriggers: healthProfile.recentStressors,
    menstrualTracking: onboardingData.menstrualTracking,
    cycleDay: getCycleDay(),
  };

  // System prompt is built but used for future API integration
  const _systemPrompt = buildSystemPrompt(userData);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text.trim(),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputValue('');
    setIsTyping(true);

    // Generate response (offline fallback — replace with API call when connected)
    setTimeout(() => {
      const rawResponse = buildOfflineResponse(text, userData);
      const { text: cleanText, suggestions } = parseResponse(rawResponse);

      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: cleanText,
        suggestions,
      };

      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const lastAssistantMessage = [...messages].reverse().find(m => m.role === 'assistant');
  const checkInSuggestion = lastAssistantMessage ? shouldSuggestCheckIn(lastAssistantMessage.content) : false;
  const learnLink = lastAssistantMessage ? shouldLinkLearn(lastAssistantMessage.content) : { show: false, topic: '' };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="max-w-[430px] mx-auto w-full flex flex-col h-screen">
        {/* Header */}
        <div className="px-6 pt-6 pb-4">
          <h1 className="text-xl font-semibold text-foreground">Ask ScalpSense</h1>
          <p className="text-sm text-muted-foreground">Your personal scalp and hair health guide</p>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-6 pb-4">
          {messages.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-4">
              <div className="card-elevated p-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-sage-light flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Leaf size={16} className="text-primary" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-sm text-foreground leading-relaxed">
                      Hi! I'm here to help with your scalp and hair health questions. I'm not a doctor, but I'm grounded in clinical evidence and I know your profile.
                    </p>
                    {onboardingData.hairType && (
                      <p className="text-xs text-muted-foreground mt-2">
                        {onboardingData.hairType} hair · {onboardingData.protectiveStyles.slice(0, 2).join(', ') || 'No styles set'}{onboardingData.goals.length > 0 ? ` · Goal: ${onboardingData.goals[0].toLowerCase()}` : ''}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mb-3 font-medium">Try asking...</p>
              <div className="space-y-2">
                {starterQuestions.map(q => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="w-full text-left card-elevated p-3.5 flex items-center gap-3 btn-press"
                  >
                    <span className="text-sm text-foreground">{q}</span>
                    <ArrowRight size={14} className="text-muted-foreground ml-auto flex-shrink-0" />
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="space-y-4 pt-2">
              {messages.map((msg, idx) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {msg.role === 'user' ? (
                    <div className="flex justify-end">
                      <div className="bg-primary text-primary-foreground rounded-2xl rounded-br-md px-4 py-3 max-w-[85%]">
                        <p className="text-sm">{msg.content}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-start">
                      <div className="card-elevated rounded-2xl rounded-bl-md px-4 py-3 max-w-[90%]">
                        <div className="prose prose-sm text-foreground [&_p]:text-sm [&_p]:leading-relaxed [&_p]:mb-2 [&_li]:text-sm [&_strong]:text-foreground [&_h2]:text-base [&_h2]:font-semibold [&_h3]:text-sm [&_h3]:font-semibold [&_ul]:my-1 [&_ol]:my-1">
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  )}

                  {msg.role === 'assistant' && idx === messages.length - 1 && (
                    <div className="mt-3 space-y-2">
                      {checkInSuggestion && (
                        <div className="card-elevated p-3 border-l-4 border-l-primary">
                          <p className="text-xs text-muted-foreground mb-2">Based on what you're describing, it might be worth doing a check-in.</p>
                          <button
                            onClick={() => navigate('/wash-day')}
                            className="text-xs font-medium text-primary flex items-center gap-1"
                          >
                            Start a check-in <ArrowRight size={12} />
                          </button>
                        </div>
                      )}

                      {learnLink.show && (
                        <button
                          onClick={() => navigate('/learn')}
                          className="text-xs text-primary font-medium flex items-center gap-1"
                        >
                          Read more in Learn → {learnLink.topic}
                        </button>
                      )}

                      {/* Dynamic follow-up suggestion chips */}
                      {msg.suggestions && msg.suggestions.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                          {msg.suggestions.slice(0, 3).map(q => (
                            <button
                              key={q}
                              onClick={() => sendMessage(q)}
                              className="px-3 py-2 rounded-xl border-2 border-primary/30 text-xs font-medium text-primary bg-card btn-press"
                            >
                              {q}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="card-elevated rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex gap-1.5">
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0 }} className="w-2 h-2 rounded-full bg-muted-foreground" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }} className="w-2 h-2 rounded-full bg-muted-foreground" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }} className="w-2 h-2 rounded-full bg-muted-foreground" />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input bar */}
        <div className="px-6 pb-24 pt-2 bg-background">
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="Ask about your scalp or hair..."
                className="w-full h-12 pl-4 pr-12 rounded-2xl border-2 border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                disabled={isTyping}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground"
                aria-label="Voice input (coming soon)"
              >
                <Mic size={18} strokeWidth={1.8} />
              </button>
            </div>
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center btn-press transition-colors ${
                inputValue.trim() && !isTyping
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-border text-muted-foreground'
              }`}
            >
              <Send size={18} strokeWidth={1.8} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

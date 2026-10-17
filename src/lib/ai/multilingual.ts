// ============================================================================
// ANANTA LABS INDIA — MULTILINGUAL ENGINE
// Supports English, Hindi (हिंदी), and Gujarati (ગુજરાતી) with automatic detection.
// ============================================================================

export type SupportedLanguage = 'en' | 'hi' | 'gu';

export function detectLanguage(text: string): SupportedLanguage {
  if (!text) return 'en';

  // Gujarati Unicode block: 0A80–0AFF
  const gujaratiRegex = /[\u0A80-\u0AFF]/;
  if (gujaratiRegex.test(text)) {
    return 'gu';
  }

  // Devanagari (Hindi) Unicode block: 0900–097F
  const hindiRegex = /[\u0900-\u097F]/;
  if (hindiRegex.test(text)) {
    return 'hi';
  }

  return 'en';
}

export interface LanguagePack {
  welcomeGreeting: string;
  assistantRole: string;
  leadPrompt: {
    askName: string;
    askEmail: string;
    askOrg: string;
    askProject: string;
    askBudget: string;
    confirmSummary: string;
    successMessage: string;
  };
  humanEscalation: string;
  groundingNotice: string;
}

export const LANGUAGE_PACKS: Record<SupportedLanguage, LanguagePack> = {
  en: {
    welcomeGreeting: "Hello! I am Ananta AI, your digital intelligence guide for Ananta Labs India. How can I assist your engineering, product, or research inquiry today?",
    assistantRole: "Official AI Intelligence Assistant for Ananta Labs India (Deep-Tech R&D, Computer Vision, Fluidics & Systems).",
    leadPrompt: {
      askName: "To connect you with our engineering directorship, could you please share your full name?",
      askEmail: "Thank you. What is your preferred business email address for follow-up?",
      askOrg: "Which company, academic institution, or lab do you represent?",
      askProject: "Please describe your engineering challenge, prototyping scope, or technology objective:",
      askBudget: "What is your approximate development timeline or budget tier? (Optional)",
      confirmSummary: "Here is your consultation brief summary. Would you like me to submit this to our engineering directors?",
      successMessage: "Your project consultation brief has been recorded successfully! Reference ID:"
    },
    humanEscalation: "Would you like to speak directly with our engineering directors? You can reach us at **anantalabsindia@gmail.com** or call **+91-89807-41150**.",
    groundingNotice: "Grounded strictly in verified Ananta Labs India records."
  },
  hi: {
    welcomeGreeting: "नमस्ते! मैं अनंता एआई (Ananta AI) हूँ, अनंता लैब्स इंडिया का डिजिटल इंटेलिजेंस असिस्टेंट। मैं आपकी इंजीनियरिंग, उत्पाद या अनुसंधान जांच में कैसे सहायता कर सकता हूँ?",
    assistantRole: "अनंता लैब्स इंडिया (डीप-टेक आरएंडडी, कंप्यूटर विजन, मेडिकल फ्लूइडिक्स) का आधिकारिक एआई सहायक।",
    leadPrompt: {
      askName: "हमारे इंजीनियरिंग डायरेक्टर्स से आपको जोड़ने के लिए, कृपया अपना पूरा नाम साझा करें?",
      askEmail: "धन्यवाद। फॉलो-अप के लिए आपका आधिकारिक ईमेल पता क्या है?",
      askOrg: "आप किस संगठन, कंपनी या अनुसंधान संस्थान का प्रतिनिधित्व करते हैं?",
      askProject: "कृपया अपने इंजीनियरिंग प्रोजेक्ट, प्रोटोटाइप आवश्यकता या तकनीकी उद्देश्य का विवरण दें:",
      askBudget: "आपकी अनुमानित प्रोजेक्ट समय-सीमा या बजट क्या है? (वैकल्पिक)",
      confirmSummary: "यहाँ आपके परामर्श ब्रीफ का सारांश है। क्या आप इसे हमारे डायरेक्टर्स को सबमिट करना चाहते हैं?",
      successMessage: "आपका प्रोजेक्ट कंसल्टेशन ब्रीफ सफलतापूर्वक दर्ज कर लिया गया है! संदर्भ आईडी:"
    },
    humanEscalation: "क्या आप सीधे हमारे विशेषज्ञों से बात करना चाहते हैं? आप हमें **anantalabsindia@gmail.com** पर ईमेल या **+91-89807-41150** पर कॉल कर सकते हैं।",
    groundingNotice: "अनंता लैब्स इंडिया के प्रमाणित आधिकारिक रिकॉर्ड पर आधारित।"
  },
  gu: {
    welcomeGreeting: "નમસ્તે! હું અનંતા એઆઈ (Ananta AI) છું, અનંતા લેબ્સ ઇન્ડિયાનું ડિજિટલ ઇન્ટેલિજન્સ આસિસ્ટન્ટ. તમારા એન્જિનિયરિંગ, પ્રોડક્ટ કે રિસર્ચ માટે હું તમને કઈ રીતે મદદ કરી શકું?",
    assistantRole: "અનંતા લેબ્સ ઇન્ડિયા (ડીપ-ટેક આરએન્ડડી, કમ્પ્યુટર વિઝન, ફ્લુઇડિક્સ) નું સત્તાવાર એઆઈ સહાયક.",
    leadPrompt: {
      askName: "અમારા એન્જિનિયરિંગ ડિરેક્ટર્સ સાથે જોડાવા માટે, કૃપા કરીને તમારું પૂરું નામ જણાવો:",
      askEmail: "આભાર. આગળની વાતચીત માટે તમારું ઇમેઇલ એડ્રેસ શું છે?",
      askOrg: "તમે કઈ કંપની, સંસ્થા કે લેબોરેટરીનું પ્રતિનિધિત્વ કરો છો?",
      askProject: "કૃપા કરીને તમારા પ્રોજેક્ટ, પ્રોટોટાઇપ કે ટેકનિકલ જરૂરિયાતનું વર્ણન કરો:",
      askBudget: "તમારો અંદાજિત સમયગાળો કે બજેટ શું છે? (વૈકલ્પિક)",
      confirmSummary: "આ તમારા પ્રોજેક્ટની વિગતો છે. શું તમે તેને સબમિટ કરવા માંગો છો?",
      successMessage: "તમારી પ્રોજેક્ટ પૂછપરછ સફળતાપૂર્વક નોંધી લેવામાં આવી છે! રેફરન્સ નંબર:"
    },
    humanEscalation: "શું તમે સીધા અમારા નિષ્ણાતો સાથે વાત કરવા માંગો છો? **anantalabsindia@gmail.com** પર ઇમેઇલ અથવા **+91-89807-41150** પર કોલ કરી શકો છો.",
    groundingNotice: "અનંતા લેબ્સ ઇન્ડિયાના અધિકૃત રેકોર્ડ પર આધારિત."
  }
};

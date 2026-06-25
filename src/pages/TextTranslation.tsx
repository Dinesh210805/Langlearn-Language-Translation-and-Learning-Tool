import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Languages,
  ArrowRight,
  Copy,
  Volume2,
  ArrowLeftRight,
  Sparkles,
} from "lucide-react";
import { speakText, LANGUAGE_TO_SPEECH_CODE } from "../utils/speech";
import { TranslationDetails } from "../components/ui/TranslationDetails";
import type { TranslationResponse } from "../types/translation";

const API_URL = import.meta.env.VITE_API_URL ?? "http://127.0.0.1:5000";

const LANGUAGES = {
  auto: "Auto Detect",
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  pt: "Portuguese",
  zh: "Chinese",
  ja: "Japanese",
  ko: "Korean",
  ru: "Russian",
  ta: "Tamil",
} as const;

function TextTranslation() {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("es");
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationDetails, setTranslationDetails] =
    useState<TranslationResponse | null>(null);
  const [error, setError] = useState<string>("");
  const [detectedLang, setDetectedLang] = useState<string | null>(null);

  const switchLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleTranslate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceText.trim()) return;

    setIsTranslating(true);
    setError("");
    setDetectedLang(null);

    try {
      console.log("Sending translation request:", {
        text: sourceText,
        sourceLang,
        targetLang,
      });

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

      const response = await fetch(`${API_URL}/api/translate/text`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          text: sourceText,
          sourceLang,
          targetLang,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(data.error || "Translation failed");
      }

      if (!data.translation) {
        throw new Error("No translation received");
      }

      if (sourceLang === "auto" && data.detected_language) {
        setDetectedLang(data.detected_language);
      }

      setTranslatedText(data.translation);
      setTranslationDetails(data);
    } catch (err: unknown) {
      console.error("Translation error details:", err);
      let errorMessage = "Unknown error occurred";

      if (err instanceof Error) {
        if (err.name === "AbortError") {
          errorMessage = "Request timed out. Please try again.";
        } else if (err.message === "Failed to fetch") {
          errorMessage =
            "Cannot connect to the translation service. Please ensure the server is running.";
        } else if (err.message.includes("429")) {
          errorMessage = "Service is busy. Please wait a moment and try again.";
        } else {
          errorMessage = err.message;
        }
      }

      setError(`Failed to translate: ${errorMessage}`);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSpeak = async (text: string, lang: string) => {
    try {
      await speakText(text, LANGUAGE_TO_SPEECH_CODE[lang]);
    } catch (error) {
      console.error("Speech synthesis error:", error);
    }
  };

  const handleGenerateMoreExamples = async () => {
    try {
      setIsTranslating(true);
      // Call API to generate more examples
      const response = await fetch(`${API_URL}/api/translate/examples`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: sourceText,
          sourceLang,
          targetLang,
        }),
      });

      const data = await response.json();
      if (response.ok && translationDetails) {
        setTranslationDetails({
          ...translationDetails,
          examples: [...translationDetails.examples, ...data.examples],
        });
      }
    } catch (error) {
      console.error("Failed to generate more examples:", error);
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <section className="translator-page page-shell">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="page-stack"
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="page-header split-header"
        >
          <div className="title-lockup">
            <span className="section-icon">
              <Languages className="w-6 h-6" />
            </span>
            <div>
              <p className="eyebrow">Translation workspace</p>
              <h1>Universal Translator</h1>
            </div>
          </div>
          <div className="header-note">
            <Sparkles className="w-4 h-4" />
            <span>Translation plus grammar, pronunciation, examples, and culture.</span>
          </div>
        </motion.div>

        <form onSubmit={handleTranslate} className="space-y-8">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="translator-workbench"
          >
            <div className="language-bar">
              <div className="language-field">
                <label htmlFor="sourceLang">From</label>
                <select
                  id="sourceLang"
                  value={sourceLang}
                  onChange={(e) => setSourceLang(e.target.value)}
                  className="control-input"
                >
                  {Object.entries(LANGUAGES).map(([code, name]) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ))}
                </select>
                {detectedLang && sourceLang === "auto" && (
                  <div className="detected-language">
                    Detected:{" "}
                    {LANGUAGES[detectedLang as keyof typeof LANGUAGES]}
                  </div>
                )}
              </div>

              <motion.button
                type="button"
                onClick={switchLanguages}
                className="switch-button"
                whileHover={{ rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                title="Switch languages"
              >
                <ArrowLeftRight className="w-5 h-5" />
              </motion.button>

              <div className="language-field">
                <label htmlFor="targetLang">To</label>
                <select
                  id="targetLang"
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                  className="control-input"
                >
                  {Object.entries(LANGUAGES).map(([code, name]) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="translation-grid">
              <div className="translation-panel">
                <div className="panel-toolbar">
                  <span>Source text</span>
                  <button
                    type="button"
                    className="icon-action"
                    onClick={() => handleSpeak(sourceText, sourceLang)}
                    aria-label="Read source text aloud"
                    disabled={!sourceText.trim()}
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
                  <textarea
                    id="sourceText"
                    value={sourceText}
                    onChange={(e) => setSourceText(e.target.value)}
                    rows={6}
                    className="translation-textarea"
                    placeholder="Type or paste a phrase to translate..."
                  />
              </div>

              <div className="translation-panel translation-panel-result">
                <div className="panel-toolbar">
                  <span>Translation</span>
                  <div className="panel-actions">
                    <button
                      type="button"
                      className="icon-action"
                      onClick={() => navigator.clipboard.writeText(translatedText)}
                      aria-label="Copy translation"
                      disabled={!translatedText}
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      className="icon-action"
                      onClick={() => handleSpeak(translatedText, targetLang)}
                      aria-label="Read translation aloud"
                      disabled={!translatedText}
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                  <div className="translation-output">
                    {error ? (
                      <p className="error-text">{error}</p>
                    ) : (
                      <p>
                        {translatedText || "Translation will appear here..."}
                      </p>
                    )}
                  </div>
              </div>
            </div>

            <div className="workbench-footer">
              <span>{sourceText.length} characters</span>
              <motion.button
                type="submit"
                className="primary-action translate-action"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                disabled={isTranslating || !sourceText.trim()}
              >
                {isTranslating ? (
                  <>
                    <motion.span
                      className="inline-block h-4 w-4 rounded-full border-2 border-current border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    Translating
                  </>
                ) : (
                  <>
                    Translate
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {translationDetails && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <TranslationDetails
                details={translationDetails}
                targetLang={targetLang}
                onGenerateMoreExamples={handleGenerateMoreExamples}
              />
            </motion.div>
          )}
        </form>
      </motion.div>
    </section>
  );
}

export default TextTranslation;

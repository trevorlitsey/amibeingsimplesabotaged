import { useState, useEffect } from "react";
import { InputSection } from "./components/InputSection";
import { ResultSection, type AnalysisResult } from "./components/ResultSection";
import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";

const API_URL = import.meta.env.VITE_API_URL || "/api";

interface SharedData {
  situation: string;
  result: AnalysisResult;
}

function encodeShareData(data: SharedData): string {
  return compressToEncodedURIComponent(JSON.stringify(data));
}

function decodeShareData(hash: string): SharedData | null {
  try {
    const json = decompressFromEncodedURIComponent(hash);
    if (!json) return null;
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function App() {
  const [situation, setSituation] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shared, setShared] = useState(false);
  const [copied, setCopied] = useState(false);

  // Check URL hash for shared data on load
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const data = decodeShareData(hash);
    if (data) {
      setSituation(data.situation);
      setResult(data.result);
      setShared(true);
    }
  }, []);

  async function handleSubmit(text: string) {
    setLoading(true);
    setError(null);
    setResult(null);
    setShared(false);
    setSituation(text);

    // Clear hash when making a new submission
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }

    try {
      const res = await fetch(`${API_URL}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ situation: text }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to analyze. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleShare() {
    if (!result) return;
    const encoded = encodeShareData({ situation, result });
    const url = `${window.location.origin}${window.location.pathname}#${encoded}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleNewAnalysis() {
    setResult(null);
    setSituation("");
    setShared(false);
    setError(null);
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }
  }

  return (
    <div className="min-h-screen bg-classified-bg">
      {/* Header */}
      <header className="border-b border-classified-border">
        <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 bg-classified-amber rounded-full animate-pulse" />
            <span className="text-classified-amber font-mono text-xs tracking-[0.3em] uppercase">
              Hey, something is not right
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-mono font-bold text-white leading-tight">
            Am I Being{" "}
            <span className="text-classified-amber">Simple Sabotaged</span>?
          </h1>
          <p className="mt-3 text-classified-muted text-sm sm:text-base max-w-xl">
            Describe your situation and we will help you determine if you are
            currently being simple sabotaged according to the{" "}
            <span className="text-classified-text">
              OSS Simple Sabotage Field Manual
            </span>
            .
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6 sm:py-10 space-y-8">
        {shared && situation ? (
          <div className="border border-classified-border rounded-lg p-4 bg-classified-surface">
            <p className="text-classified-muted text-xs font-mono mb-2 uppercase tracking-wider">
              Submitted Situation
            </p>
            <p className="text-classified-text text-sm whitespace-pre-wrap">
              {situation}
            </p>
          </div>
        ) : (
          <InputSection onSubmit={handleSubmit} loading={loading} />
        )}

        {error && (
          <div className="border border-classified-red/30 bg-classified-red/5 rounded-lg p-4">
            <p className="text-classified-red text-sm font-mono">{error}</p>
          </div>
        )}

        {loading && <LoadingState />}

        {result && (
          <>
            <ResultSection result={result} />

            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 border border-classified-border rounded-lg bg-classified-surface text-classified-text hover:text-white hover:border-classified-amber/50 transition-colors font-mono text-sm"
              >
                {copied ? (
                  <>
                    <span className="text-classified-green">&#10003;</span>
                    Link Copied
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                      />
                    </svg>
                    Share Results
                  </>
                )}
              </button>

              {shared && (
                <button
                  onClick={handleNewAnalysis}
                  className="px-4 py-2 border border-classified-amber/30 rounded-lg bg-classified-amber/10 text-classified-amber hover:bg-classified-amber/20 transition-colors font-mono text-sm"
                >
                  Analyze My Situation
                </button>
              )}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-classified-border mt-16">
        <div className="max-w-3xl mx-auto px-4 py-6 text-center">
          <p className="text-classified-muted text-xs font-mono">
            Read the{" "}
            <a
              href="https://www.cia.gov/static/5c875f3ec660e092cf893f60b4a288df/SimpleSabotage.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-classified-amber hover:underline"
            >
              OSS Simple Sabotage Field Manual
            </a>{" "}
            (1944).
          </p>
        </div>
      </footer>
    </div>
  );
}

function LoadingState() {
  const messages = [
    "Scanning classified documents...",
    "Cross-referencing sabotage tactics...",
    "Analyzing organizational patterns...",
    "Checking for signs of interference...",
  ];
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  });

  return (
    <div className="border border-classified-border rounded-lg p-8 bg-classified-surface">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-2 border-classified-border rounded-full" />
          <div className="absolute inset-0 border-2 border-transparent border-t-classified-amber rounded-full animate-spin" />
        </div>
        <p className="text-classified-amber font-mono text-sm animate-pulse">
          {messages[msgIndex]}
        </p>
      </div>
    </div>
  );
}

export default App;

export interface AnalysisSection {
  title: string;
  manualQuote: string;
}

export interface AnalysisResult {
  isMatch: boolean;
  summary: string;
  sections: AnalysisSection[];
}

interface ResultSectionProps {
  result: AnalysisResult;
}

export function ResultSection({ result }: ResultSectionProps) {
  return (
    <div className="space-y-6">
      {/* Verdict Banner */}
      <div
        className={`border rounded-lg p-6 ${
          result.isMatch
            ? "border-classified-red/30 bg-classified-red/5"
            : "border-classified-green/30 bg-classified-green/5"
        }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg ${
              result.isMatch ? "bg-classified-red/20" : "bg-classified-green/20"
            }`}
          >
            {result.isMatch ? (
              <span className="text-classified-red">!</span>
            ) : (
              <span className="text-classified-green">&#10003;</span>
            )}
          </div>
          <div>
            <h2 className="font-mono font-bold text-lg text-white mb-1">
              {result.isMatch
                ? "Sabotage Tactics Detected"
                : "All Clear"}
            </h2>
            <p className="text-classified-text text-sm">{result.summary}</p>
          </div>
        </div>
      </div>

      {/* Matched Sections */}
      {result.sections.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-mono text-xs tracking-[0.2em] uppercase text-classified-amber">
            Matching Tactics ({result.sections.length})
          </h3>

          {result.sections.map((section, i) => (
            <div
              key={i}
              className="border border-classified-border rounded-lg bg-classified-surface overflow-hidden"
            >
              <div className="px-4 py-3 border-b border-classified-border bg-classified-amber/5">
                <div className="flex items-center gap-2">
                  <span className="text-classified-amber font-mono text-xs font-bold">
                    #{i + 1}
                  </span>
                  <h4 className="font-mono text-sm font-semibold text-white">
                    {section.title}
                  </h4>
                </div>
              </div>

              <div className="p-4">
                <div className="border-l-2 border-classified-amber/30 pl-3">
                  <p className="text-classified-text text-sm">
                    &ldquo;{section.manualQuote}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

import { useState } from "react";

interface InputSectionProps {
  onSubmit: (situation: string) => void;
  loading: boolean;
}

export function InputSection({ onSubmit, loading }: InputSectionProps) {
  const [text, setText] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (text.trim() && !loading) {
      onSubmit(text.trim());
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Describe what's happening at work... For example: 'My manager insists every decision go through three levels of approval, holds meetings when we have deadlines, and keeps reopening decisions we already made.'"
          rows={6}
          maxLength={10000}
          disabled={loading}
          className="w-full bg-classified-surface border border-classified-border rounded-lg p-4 text-classified-text placeholder-classified-muted/50 font-mono text-sm resize-y focus:outline-none focus:border-classified-amber/50 focus:ring-1 focus:ring-classified-amber/20 transition-colors disabled:opacity-50"
        />

        {/* Character count */}
        <div className="absolute bottom-3 right-3 text-classified-muted/40 text-xs font-mono">
          {text.length.toLocaleString()}/10,000
        </div>
      </div>

      <button
        type="submit"
        disabled={!text.trim() || loading}
        className="w-full bg-classified-amber hover:bg-classified-amber/90 disabled:bg-classified-amber/20 disabled:text-classified-muted text-black font-mono font-semibold py-3 px-6 rounded-lg transition-all text-sm"
      >
        {loading ? "Advising..." : "Advise On My Situation"}
      </button>
    </form>
  );
}

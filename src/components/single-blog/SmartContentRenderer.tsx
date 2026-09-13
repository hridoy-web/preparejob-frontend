export default function SmartContentRenderer({ content }: { content: string }) {
  if (!content) return null;

  const rawLines = content.split(/\n+/).map((line) => line.trim()).filter(Boolean);

  return (
    <div className="space-y-4 text-slate-800 leading-relaxed">
      {rawLines.map((line, idx) => {
        if (/^[\d১২৩৪৫৬৭৮৯০]+\.\s*/.test(line)) {
          return (
            <div key={idx} className="mt-6 mb-3 flex items-stretch gap-2.5 border-b border-slate-200/80 pb-2">
              <span className="w-1 rounded-full bg-indigo-600 shrink-0" />
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 leading-snug">
                {line}
              </h2>
            </div>
          );
        }

        if (line.length < 100 && line.endsWith("?")) {
          return (
            <div key={idx} className="mt-5 mb-3 flex items-stretch gap-2.5">
              <span className="w-1 rounded-full bg-indigo-600 shrink-0" />
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 leading-snug">
                {line}
              </h2>
            </div>
          );
        }

        if (line.length < 90 && line.endsWith(":")) {
          return (
            <h3 key={idx} className="text-base sm:text-lg font-bold text-slate-900 mt-5 mb-2 tracking-tight">
              {line}
            </h3>
          );
        }

        if (/^(\d+\.|\-|\*)\s/.test(line) || line.includes(":")) {
          const cleanText = line.replace(/^(\d+\.|\-|\*)\s*/, "");
          const hasColon = cleanText.includes(":");
          const [title, ...rest] = hasColon ? cleanText.split(":") : [cleanText];

          return (
            <div
              key={idx}
              className="my-2.5 rounded-lg border border-slate-200/90 bg-white p-3 sm:p-4 shadow-sm transition-all duration-200 hover:border-indigo-200"
            >
              <div className="text-slate-700 leading-relaxed text-xs sm:text-sm">
                {hasColon ? (
                  <>
                    <strong className="font-bold text-indigo-950 text-sm mr-1">
                      {title}:
                    </strong>
                    <span className="text-slate-700">{rest.join(":")}</span>
                  </>
                ) : (
                  cleanText
                )}
              </div>
            </div>
          );
        }

        return (
          <p key={idx} className="text-slate-700 leading-6 sm:leading-7 my-2.5 text-sm sm:text-base">
            {line}
          </p>
        );
      })}
    </div>
  );
}
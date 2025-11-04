import React, { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button, Card, Input } from "../components/ui";

/**
 * DocumentDefect page
 *
 * - Streams Markdown response from POST /v4/document-defects
 * - Shows progressive markdown rendering while streaming
 * - Provides a Download .md button when complete
 *
 * Note: ensure CORS is allowed on the server and that react-markdown is installed.
 */

type DefectPayload = {
  platform: string;
  page_or_screen: string;
  defects: string;
};

const DEFAULT_PAYLOAD: DefectPayload = {
  platform: "Android/TalkBack",
  page_or_screen: "Fuel Popup Screen",
  defects:
    "When selecting a pump, there will a PICK YOUR PUMP screen: When clicking on the Fuel button from the popup window when clicking on more button on the home screen, the PICK YOUR PUMP screen appears which appears to be moving up and down. - When PICK YOUR PUMP screen comes in, there is a popup which appears with details. Once the popup is open, the focus goes through the parent page behind first before going into the popup screen.",
};

// const API_URL = "https://a11y-insights.onrender.com/v4/document-defects";
const API_URL = "http://127.0.0.1:8000/v4/document-defects";

const DocumentDefect: React.FC<{ dark?: boolean }> = ({ dark = true }) => {
  const [payload, setPayload] = useState<DefectPayload>(DEFAULT_PAYLOAD);
  const [markdown, setMarkdown] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const downloadUrlRef = useRef<string | null>(null);

  const onChange = (key: keyof DefectPayload, value: string) =>
    setPayload((p) => ({ ...p, [key]: value }));

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    setMarkdown("");
    setCompleted(false);
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/markdown, text/plain, */*",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => null);
        throw new Error(text || `Server responded with ${res.status}`);
      }

      // If server supports streaming, use reader to read progressively
      if (res.body && (res.headers.get("Content-Type") || "").includes("text/")) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let done = false;
        let accumulated = "";

        while (!done) {
          const { value, done: readerDone } = await reader.read();
          if (value) {
            accumulated += decoder.decode(value, { stream: !readerDone });
            setMarkdown(accumulated); // update progressive rendering
          }
          done = readerDone;
        }

        // finished: create a blob and a download url
        const blob = new Blob([accumulated], { type: "text/markdown" });
        if (downloadUrlRef.current) {
          URL.revokeObjectURL(downloadUrlRef.current);
        }
        downloadUrlRef.current = URL.createObjectURL(blob);
        setCompleted(true);
        setMarkdown(accumulated);
      } else {
        // fallback: read whole text
        const txt = await res.text();
        const blob = new Blob([txt], { type: "text/markdown" });
        if (downloadUrlRef.current) URL.revokeObjectURL(downloadUrlRef.current);
        downloadUrlRef.current = URL.createObjectURL(blob);
        setMarkdown(txt);
        setCompleted(true);
      }
    } catch (err: any) {
      console.error("Failed to document defect:", err);
      setError(err?.message ?? "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!downloadUrlRef.current) return;
    const a = document.createElement("a");
    a.href = downloadUrlRef.current;
    const fileNameSafe = (payload.page_or_screen || "defect").replace(/\s+/g, "_");
    a.download = `A11y_Defect_${fileNameSafe}.md`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className={`p-8 ${dark ? "text-white" : "text-gray-900"} transition-colors`}>
      <h2 className="text-2xl font-semibold mb-6">Document a Defect</h2>

      <form onSubmit={handleSubmit}>
        <Card className={`${dark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-300"} p-6 mb-6`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm">Platform</label>
              <Input
                value={payload.platform}
                onChange={(e) => onChange("platform", e.target.value)}
                placeholder="e.g. Android/TalkBack"
                className={`${dark ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-100 border-gray-300 text-gray-900"}`}
                aria-label="Platform"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm">Page / Screen</label>
              <Input
                value={payload.page_or_screen}
                onChange={(e) => onChange("page_or_screen", e.target.value)}
                placeholder="e.g. Fuel Popup Screen"
                className={`${dark ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-100 border-gray-300 text-gray-900"}`}
                aria-label="Page or screen"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block mb-2 text-sm">Defect Description</label>
            <textarea
              value={payload.defects}
              onChange={(e) => onChange("defects", e.target.value)}
              className={`w-full p-3 rounded-md h-36 ${dark ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-100 border-gray-300 text-gray-900"}`}
              aria-label="Defect details"
            />
          </div>

          <div className="mt-4 flex items-center gap-3">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white" disabled={loading}>
              {loading ? "Generating..." : "Generate Documentation"}
            </Button>

            <Button
              type="button"
              onClick={() => {
                setPayload(DEFAULT_PAYLOAD);
                setMarkdown("");
                setError(null);
                setCompleted(false);
              }}
              className="bg-gray-700 hover:bg-gray-800 text-white"
            >
              Reset
            </Button>

            {completed && (
              <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-700 text-white">
                Download .md
              </Button>
            )}
          </div>

          {error && <p className="mt-3 text-sm text-red-400">Error: {error}</p>}
        </Card>
      </form>

      {/* Preview + rendered markdown */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className={`${dark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-300"} p-6`}>
          <h3 className="text-lg font-semibold mb-3">Raw Markdown (live)</h3>
          <div className={`rounded-md p-3 h-96 overflow-auto ${dark ? "bg-[#0b0c0e] border border-gray-800" : "bg-gray-50 border border-gray-100"}`}>
            <pre className="whitespace-pre-wrap text-sm">{markdown || (loading ? "Waiting for response..." : "No markdown yet.")}</pre>
          </div>
        </Card>

        <Card className={`${dark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-300"} p-6`}>
          <h3 className="text-lg font-semibold mb-3">Rendered Documentation</h3>
          <div className={`prose max-w-none overflow-auto p-3 rounded-md h-96 ${dark ? "prose-invert bg-[#0b0c0e]" : "bg-white"}`}>
            {markdown ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
            ) : (
              <p className="text-sm text-gray-400">{loading ? "Document is being generated..." : "Generated document will appear here."}</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DocumentDefect;

"use client";

import { useState } from "react";
import { MessageCircle, Send, ThumbsUp } from "lucide-react";
import type { VideoComment } from "@/lib/content-data";

export default function VideoComments({ videoId, initialComments }: { videoId: string; initialComments: VideoComment[] }) {
  const [comments, setComments] = useState(initialComments);
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function submitComment(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = body.trim();

    if (!trimmed) {
      setError("Write a comment first.");
      return;
    }

    setSubmitting(true);
    setError(null);

    const response = await fetch(`/api/videos/${videoId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: trimmed }),
    });

    const payload = await response.json();
    setSubmitting(false);

    if (!response.ok) {
      setError(payload.error ?? "Could not post comment.");
      return;
    }

    setComments((current) => [payload.comment, ...current]);
    setBody("");
  }

  return (
    <section className="rounded-3xl border border-white/8 bg-[#101018] p-5">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-2 text-xl font-bold text-white">
          <MessageCircle className="h-5 w-5 text-[#00d4aa]" />
          Comments
        </h2>
        <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-white/45">{comments.length}</span>
      </div>

      <form onSubmit={submitComment} className="mb-6 space-y-3">
        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
          maxLength={500}
          placeholder="Join the conversation..."
          aria-label="Add a comment"
          className="min-h-24 w-full resize-none rounded-2xl border border-white/10 bg-[#0a0a0f] p-4 text-sm text-white placeholder:text-white/30 focus:border-[#ff6b35]"
        />
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-white/35">Demo comments use a guest user until Clerk is connected.</p>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-xl bg-[#ff6b35] px-4 py-2 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Send className="h-4 w-4" />
            {submitting ? "Posting..." : "Post"}
          </button>
        </div>
        {error && <p className="text-sm text-[#ff3366]">{error}</p>}
      </form>

      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="rounded-2xl border border-white/8 bg-white/5 p-5 text-sm text-white/45">No comments yet. Be first.</div>
        ) : (
          comments.map((comment) => (
            <article key={comment.id} className="rounded-2xl border border-white/6 bg-white/[0.03] p-4">
              <div className="flex gap-3">
                <div
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-black text-white"
                  style={{ backgroundColor: comment.authorAvatarColor }}
                >
                  {comment.authorName[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-white">{comment.authorName}</p>
                    <time className="text-xs text-white/35" dateTime={comment.createdAt}>
                      {new Intl.DateTimeFormat("en", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(comment.createdAt))}
                    </time>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-white/60">{comment.body}</p>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-white/35">
                    <ThumbsUp className="h-3.5 w-3.5" />
                    {comment.likes}
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

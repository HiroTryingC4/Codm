import type { CommentDTO } from "@/types";

export default function CommentList({ comments }: { comments: CommentDTO[] }) {
  return (
    <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 p-2.5 space-y-2 max-h-56 overflow-y-auto">
      <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide px-0.5">
        All comments ({comments.length})
      </p>
      {comments.length === 0 && (
        <p className="text-sm text-neutral-500 dark:text-neutral-600 px-0.5">No comments yet.</p>
      )}
      {comments.map((comment) => (
        <div key={comment.id} className="animate-fade-in-up rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-3 py-2">
          <p className="text-sm text-neutral-800 dark:text-neutral-200">{comment.text}</p>
          <p className="text-xs text-neutral-500 dark:text-neutral-600 mt-1">
            {comment.authorName} · {new Date(comment.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

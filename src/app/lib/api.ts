export interface SubmissionPatch {
  guesses?: Record<string, string>;
  choices?: Record<string, string>;
  memories?: Record<string, string>;
  loveHate?: { loves: string[]; hates: string[] };
  picture?: string;
  message?: string;
}

export async function upsertSubmission(name: string, patch: SubmissionPatch): Promise<void> {
  const response = await fetch("/api/submissions/upsert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, patch }),
  });

  if (!response.ok) {
    throw new Error("Failed to save submission");
  }
}

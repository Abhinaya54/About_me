export interface SubmissionPatch {
  guesses?: Record<string, string>;
  choices?: Record<string, string>;
  memories?: Record<string, string>;
  loveHate?: { loves: string[]; hates: string[] };
  picture?: string;
  message?: string;
}

export async function upsertSubmission(name: string, patch: SubmissionPatch): Promise<void> {
  if (!name || typeof name !== "string" || !name.trim()) {
    console.error("upsertSubmission called with empty name. Aborting request.", { patch });
    throw new Error("Name is required to save submission.");
  }

  const response = await fetch("/api/submissions/upsert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, patch }),
  });

  if (!response.ok) {
    let details = "";
    try {
      const errJson = await response.json();
      details = errJson.error || JSON.stringify(errJson);
    } catch {
      details = await response.text().catch(() => "");
    }
    console.error("upsertSubmission failed", response.status, details);
    throw new Error(`Failed to save submission: ${response.status} ${details}`);
  }

  try {
    const json = await response.json().catch(() => null);
    console.log("upsertSubmission succeeded", { name, patch, response: json });
  } catch (e) {
    // ignore
  }
}

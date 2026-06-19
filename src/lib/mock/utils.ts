/** Prototype helpers — replace with real API calls when backend is ready. */

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function simulateSubmit(ms = 1500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface MockMpResult {
  name: string;
  constituency: string;
  party: string;
  email: string;
  image: string;
}

export function mockMpLookup(postcode: string): MockMpResult {
  const clean = postcode.trim().toUpperCase();
  return {
    name: "Rt Hon. Jane Doe MP",
    constituency: `${clean.slice(0, 3)} Constituency (Prototype)`,
    party: "Independent",
    email: "jane.doe.mp@parliament.uk",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
  };
}

export function downloadTextBlob(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

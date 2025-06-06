export class FigmaAPI {
  private token: string;

  constructor({ personalAccessToken }: { personalAccessToken: string }) {
    console.log('[FigmaAPI] Initialized with token length:', personalAccessToken?.length);
    this.token = personalAccessToken;
  }

  async getFile(fileKey: string, nodeId?: string) {
    console.log('[FigmaAPI] Fetching file:', fileKey, 'Node ID:', nodeId);

    const url = nodeId
      ? `https://api.figma.com/v1/files/${fileKey}?ids=${encodeURIComponent(nodeId)}`
      : `https://api.figma.com/v1/files/${fileKey}`;

    const res = await fetch(url, {
      headers: { 'X-Figma-Token': this.token },
    });

    console.log('[FigmaAPI] Fetch response status:', res.status);

    if (!res.ok) throw new Error(`[figma-api] Failed with status ${res.status}`);
    return await res.json();
  }
}

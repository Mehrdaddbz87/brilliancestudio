/**
 * Lightweight health endpoint used by uptime checks and deployment verification.
 */
export default function handler(_req, res) {
  return res.status(200).json({ status: "ok" });
}

import { SVG } from "swissqrbill/svg";

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const svg = new SVG(req.body);
    res.status(200).json({ svg: svg.toString() });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const data = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    // Modul erst hier laden, damit Fehler sichtbar werden statt 500
    const qr = await import("swissqrbill/svg");
    const QRBill = qr.SVG || qr.SwissQRBill || qr.default;
    if (!QRBill) {
      throw new Error("Export nicht gefunden. Verfügbar: " + Object.keys(qr).join(", "));
    }

    const bill = new QRBill(data);
    res.status(200).json({ svg: bill.toString() });
  } catch (e) {
    res.status(400).json({ error: String(e?.message || e) });
  }
}

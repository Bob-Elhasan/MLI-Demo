import type { IdFields } from "./kyc";

// Generated stand-ins for when the webcam is unavailable, so the demo never dead-ends.

const toArabicDigits = (s: string) => s.replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]);

function canvas(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return [c, c.getContext("2d")!] as const;
}

export function sampleIdImage(side: "front" | "back", f: IdFields) {
  const [c, g] = canvas(856, 540);
  const bg = g.createLinearGradient(0, 0, 856, 540);
  bg.addColorStop(0, "#e9f5ec");
  bg.addColorStop(0.55, "#dfeef3");
  bg.addColorStop(1, "#ece6f4");
  g.fillStyle = bg;
  g.beginPath();
  g.roundRect(0, 0, 856, 540, 32);
  g.fill();

  // Guilloche-ish background lines
  g.strokeStyle = "rgba(0,102,96,0.07)";
  g.lineWidth = 2;
  for (let i = 0; i < 18; i++) {
    g.beginPath();
    g.ellipse(428, 270, 60 + i * 26, 30 + i * 14, 0, 0, Math.PI * 2);
    g.stroke();
  }

  g.direction = "rtl";
  g.textAlign = "right";
  g.fillStyle = "#1f1a22";

  if (side === "front") {
    g.font = "600 26px 'IBM Plex Sans Arabic', sans-serif";
    g.fillText("جمهورية مصر العربية", 816, 62);
    g.font = "500 20px 'IBM Plex Sans Arabic', sans-serif";
    g.fillStyle = "#5f5a66";
    g.fillText("بطاقة تحقيق الشخصية", 816, 94);

    // Photo
    g.fillStyle = "#c9d6d4";
    g.beginPath();
    g.roundRect(48, 120, 200, 250, 16);
    g.fill();
    g.fillStyle = "#9fb3b0";
    g.beginPath();
    g.arc(148, 215, 52, 0, Math.PI * 2);
    g.fill();
    g.beginPath();
    g.ellipse(148, 360, 88, 70, 0, Math.PI, 0);
    g.fill();

    g.fillStyle = "#1f1a22";
    const [first, ...rest] = f.fullNameAr.split(" ");
    g.font = "600 36px 'IBM Plex Sans Arabic', sans-serif";
    g.fillText(first, 816, 170);
    g.font = "500 30px 'IBM Plex Sans Arabic', sans-serif";
    g.fillText(rest.join(" "), 816, 215);
    g.font = "400 24px 'IBM Plex Sans Arabic', sans-serif";
    g.fillText("١٢ شارع النصر", 816, 275);
    g.fillText("التجمع الخامس - القاهرة", 816, 310);

    g.font = "600 44px 'IBM Plex Sans Arabic', sans-serif";
    g.fillText(toArabicDigits(f.nationalId), 816, 470);
  } else {
    g.font = "500 22px 'IBM Plex Sans Arabic', sans-serif";
    const lines = ["المهنة: محاسب", "جهة العمل: القطاع الخاص", "الحالة الاجتماعية: أعزب", "الديانة: ----", `تنتهي في: ${toArabicDigits("2031/03/08")}`];
    lines.forEach((l, i) => g.fillText(l, 816, 80 + i * 44));
    // Barcode
    g.fillStyle = "#1f1a22";
    let x = 60;
    for (let i = 0; i < 120 && x < 800; i++) {
      const w = [2, 3, 4, 6][(i * 7) % 4];
      g.fillRect(x, 340, w, 120);
      x += w + [2, 3, 5][(i * 5) % 3];
    }
  }
  return c.toDataURL("image/jpeg", 0.85);
}

export function sampleSelfieImage() {
  const [c, g] = canvas(600, 760);
  const bg = g.createLinearGradient(0, 0, 0, 760);
  bg.addColorStop(0, "#dfedff");
  bg.addColorStop(1, "#efe3ff");
  g.fillStyle = bg;
  g.fillRect(0, 0, 600, 760);
  g.fillStyle = "#b9a79a";
  g.beginPath();
  g.ellipse(300, 330, 150, 190, 0, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = "#34293a";
  g.beginPath();
  g.ellipse(300, 210, 160, 100, 0, Math.PI, 0);
  g.fill();
  g.fillStyle = "#6c8a86";
  g.beginPath();
  g.ellipse(300, 760, 280, 200, 0, Math.PI, 0);
  g.fill();
  return c.toDataURL("image/jpeg", 0.85);
}

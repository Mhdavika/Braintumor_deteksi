import jsPDF from "jspdf";
import { DetectionResult } from "../types/detection.type";

type GenerateDetectionPDFParams = {
  result: DetectionResult;
  originalImage?: string;
  patientName?: string;
  notes?: string;
};

function addWrappedText(
  pdf: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const lines = pdf.splitTextToSize(text, maxWidth);
  pdf.text(lines, x, y);
  return y + lines.length * lineHeight;
}

function addSectionTitle(pdf: jsPDF, title: string, x: number, y: number) {
  pdf.setTextColor(0, 0, 0);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.text(title, x, y);
}

export async function downloadDetectionPDF({
  result,
  originalImage,
  patientName,
  notes,
}: GenerateDetectionPDFParams) {
  const pdf = new jsPDF("p", "mm", "a4");

  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;

  let y = 18;

  pdf.setFillColor(37, 99, 235);
  pdf.roundedRect(margin, y - 8, contentWidth, 20, 4, 4, "F");

  pdf.setTextColor(255, 255, 255);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.text("BrainScan AI", margin + 6, y);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.text("Laporan Hasil Deteksi Tumor Otak", margin + 6, y + 6);

  y += 26;

  pdf.setTextColor(70, 70, 70);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.text(`Tanggal Pemeriksaan: ${new Date().toLocaleString("id-ID")}`, margin, y);

  y += 7;

  if (patientName) {
    pdf.text(`Nama Pasien: ${patientName}`, margin, y);
    y += 7;
  }

  y += 4;

  pdf.setFillColor(255, 240, 240);
  pdf.roundedRect(margin, y, contentWidth, 42, 4, 4, "F");

  pdf.setTextColor(190, 0, 0);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.text("Ringkasan Hasil", margin + 6, y + 9);

  pdf.setFontSize(18);
  pdf.text(result.result, margin + 6, y + 21);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  pdf.text(`Probabilitas: ${result.probability}`, margin + 6, y + 30);
  pdf.text(`Status Risiko: ${result.risk_level}`, margin + 6, y + 37);

  y += 54;

  if (originalImage) {
    addSectionTitle(pdf, "Gambar MRI Asli", margin, y);
    y += 6;

    try {
      pdf.addImage(originalImage, "JPEG", margin, y, contentWidth, 80);
      y += 92;
    } catch {
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.text("Gambar asli tidak dapat dimuat ke PDF.", margin, y);
      y += 10;
    }
  }

  if (result.annotated_image) {
    if (y > 170) {
      pdf.addPage();
      y = 20;
    }

    addSectionTitle(pdf, "Visualisasi Area Tumor Terdeteksi", margin, y);
    y += 6;

    const imageData = `data:image/jpeg;base64,${result.annotated_image}`;

    try {
      pdf.addImage(imageData, "JPEG", margin, y, contentWidth, 80);
      y += 92;
    } catch {
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.text("Gambar hasil deteksi tidak dapat dimuat ke PDF.", margin, y);
      y += 10;
    }
  }

  if (y > 230) {
    pdf.addPage();
    y = 20;
  }

  addSectionTitle(pdf, "Keterangan", margin, y);
  y += 7;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  pdf.setTextColor(40, 40, 40);
  y = addWrappedText(pdf, result.status, margin, y, contentWidth, 6);

  y += 8;

  if (result.detections && result.detections.length > 0) {
    addSectionTitle(pdf, "Detail Deteksi", margin, y);
    y += 8;

    result.detections.forEach((item, index) => {
      if (y > 260) {
        pdf.addPage();
        y = 20;
      }

      pdf.setFillColor(245, 247, 250);
      pdf.roundedRect(margin, y - 5, contentWidth, 11, 2, 2, "F");

      pdf.setTextColor(0, 0, 0);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.text(`${index + 1}. ${item.label}`, margin + 4, y + 2);

      pdf.setFont("helvetica", "bold");
      pdf.text(`${item.confidence}%`, pageWidth - margin - 24, y + 2);

      y += 14;
    });
  }

  if (notes) {
    y += 4;

    if (y > 245) {
      pdf.addPage();
      y = 20;
    }

    addSectionTitle(pdf, "Catatan Tambahan", margin, y);
    y += 7;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    y = addWrappedText(pdf, notes, margin, y, contentWidth, 5);
  }

  y += 8;

  if (y > 245) {
    pdf.addPage();
    y = 20;
  }

  pdf.setFillColor(255, 250, 220);
  pdf.roundedRect(margin, y, contentWidth, 30, 4, 4, "F");

  pdf.setTextColor(130, 80, 0);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);

  addWrappedText(
    pdf,
    "Catatan: Hasil ini bukan diagnosis medis resmi. Sistem hanya digunakan sebagai alat bantu analisis awal. Konsultasikan dengan dokter atau tenaga medis profesional untuk diagnosis dan penanganan lebih lanjut.",
    margin + 5,
    y + 8,
    contentWidth - 10,
    5
  );

  pdf.save("laporan-deteksi-tumor-otak.pdf");
}
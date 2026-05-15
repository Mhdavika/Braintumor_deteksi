export type RiskLevel = "Rendah" | "Sedang" | "Tinggi";

export type DetectionBox = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

export type DetectionItem = {
  label: string;
  confidence: number;
  box?: DetectionBox;
};

export type DetectionResult = {
  result: string;
  probability: string;
  status: string;
  risk_level: RiskLevel;
  detections: DetectionItem[];
  image_url?: string;
  annotated_image?: string;
  annotated_image_url?: string;
};

export type DetectionHistory = {
  id: string;
  file_name: string;
  result: string;
  probability: string;
  status: string;
  risk_level: RiskLevel;
  image_url: string;
  annotated_image_url: string | null;
  detections: DetectionItem[] | null;
  patient_name: string | null;
  notes: string | null;
  created_at: string;
};
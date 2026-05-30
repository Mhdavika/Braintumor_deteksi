import { supabase } from "@/lib/supabase";
import { DetectionHistory, DetectionResult } from "../types/detection.type";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const BUCKET_NAME = "brain-tumor-images";

export async function predictBrainTumor(file: File): Promise<DetectionResult> {
  if (!BACKEND_URL) {
    throw new Error("NEXT_PUBLIC_BACKEND_URL belum diisi.");
  }

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${BACKEND_URL}/predict`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Gagal menghubungi backend deteksi.");
  }

  return response.json();
}

export async function uploadImageToSupabase(file: File): Promise<string> {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExt}`;
  const filePath = `original/${fileName}`;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file);

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);

  return data.publicUrl;
}

export async function uploadBase64ImageToSupabase(
  base64Image: string,
  fileNamePrefix = "annotated"
): Promise<string> {
  const response = await fetch(`data:image/jpeg;base64,${base64Image}`);
  const blob = await response.blob();

  const filePath = `${fileNamePrefix}/${Date.now()}-${crypto.randomUUID()}.jpg`;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, blob, {
      contentType: "image/jpeg",
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);

  return data.publicUrl;
}

export async function saveDetectionHistory(params: {
  fileName: string;
  result: DetectionResult;
  imageUrl: string;
  annotatedImageUrl: string;
  patientName?: string;
  notes?: string;
}) {
  const { error } = await supabase.from("detection_history").insert({
    file_name: params.fileName,
    result: params.result.result,
    probability: params.result.probability,
    status: params.result.status,
    risk_level: params.result.risk_level,
    image_url: params.imageUrl,
    annotated_image_url: params.annotatedImageUrl,
    detections: params.result.detections,
    patient_name: params.patientName || null,
    notes: params.notes || null,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function getDetectionHistory(): Promise<DetectionHistory[]> {
  const { data, error } = await supabase
    .from("detection_history")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}

export async function getDetectionHistoryById(
  id: string
): Promise<DetectionHistory | null> {
  const { data, error } = await supabase
    .from("detection_history")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteDetectionHistory(id: string) {
  const { error } = await supabase
    .from("detection_history")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
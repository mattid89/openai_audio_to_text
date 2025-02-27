import fs from "fs";
import path from "path";
import OpenAI from "openai";
import { fileURLToPath } from "url";

// Función principal para transcribir audio
async function transcribeAudio(audioPath, outputPath = "transcription.txt", model = "whisper-1") {
  try {
    // Verificar que la API key está definida
    if (!process.env.OAI_API_KEY) {
      throw new Error("La API Key de OpenAI no está definida en las variables de entorno");
    }

    const openai = new OpenAI({
      apiKey: process.env.OAI_API_KEY,
    });

    console.log(`Transcribiendo archivo: ${audioPath}`);
    
    // Verificar que el archivo existe
    if (!fs.existsSync(audioPath)) {
      throw new Error(`El archivo ${audioPath} no existe`);
    }

    // Realizar la transcripción
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(audioPath),
      model: model,
    });

    // Crear directorio de salida si no existe
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Guardar la transcripción
    fs.writeFileSync(outputPath, transcription.text);
    console.log(`Transcripción guardada en: ${outputPath}`);
    
    return transcription.text;
  } catch (error) {
    console.error(`Error al transcribir audio: ${error.message}`);
    throw error;
  }
}

// Permitir la ejecución directa del script
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const audioFile = process.argv[2] || "audios/prueba.mp3";
  const outputFile = process.argv[3] || "transcription.txt";
  
  transcribeAudio(audioFile, outputFile)
    .then(() => console.log("Proceso completado con éxito"))
    .catch(err => console.error("El proceso falló:", err));
}

// Exportar la función para utilizarla como módulo
export default transcribeAudio;


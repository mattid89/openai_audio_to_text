# Servicio de Transcripción de Audio

Este proyecto utiliza la API de OpenAI (modelo Whisper) para transcribir archivos de audio a texto.

## Instalación

```bash
npm install
```

## Configuración

Crea un archivo `.env` en la raíz del proyecto con tu clave de API de OpenAI:

```
OAI_API_KEY=tu_clave_api_aquí
```

## Uso

### Como script

```bash
node --env-file=.env index.js ruta-al-audio [ruta-salida] [modelo]
```

Ejemplo:
```bash
node --env-file=.env index.js audios/entrevista.mp3 resultados/transcripcion.txt gpt-4o-transcribe
```

### Como módulo

```javascript
import transcribeAudio from './index.js';

async function main() {
  try {
    const texto = await transcribeAudio('ruta/al/audio.mp3', 'ruta/salida.txt', 'modelo');
    console.log('Transcripción completada:', texto.substring(0, 50) + '...');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
```

## Características

- Transcripción de audio utilizando modelos de OpenAI. Por defecto se utiliza `whisper-1`.
- Manejo de errores robusto.
- Configuración flexible de rutas de entrada y salida.
- Uso como script o como módulo importable.

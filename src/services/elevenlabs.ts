import { toast } from '@/hooks/use-toast';

const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;
const ELEVENLABS_AGENT_ID = import.meta.env.VITE_ELEVENLABS_AGENT_ID;

export const createKnowledgeBase = async (text: string, name: string) => {
  try {
    const response = await fetch('https://api.elevenlabs.io/v1/convai/knowledge-base/text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY
      },
      body: JSON.stringify({
        text,
        name
      })
    });

    if (!response.ok) {
      throw new Error('Error al crear la base de conocimiento');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    toast({
      title: "Error",
      description: "No se pudo crear la base de conocimiento en ElevenLabs",
      variant: "destructive"
    });
    throw error;
  }
};

export const updateAgentKnowledge = async (transcript: string, className: string) => {
  try {
    // Crear un nombre único para el documento basado en la clase y timestamp
    const documentName = `${className}_${new Date().toISOString()}`;
    
    // Crear la base de conocimiento
    await createKnowledgeBase(transcript, documentName);
    
    toast({
      title: "Éxito",
      description: "La transcripción ha sido agregada a la base de conocimiento del agente",
    });
  } catch (error) {
    console.error('Error al actualizar el conocimiento del agente:', error);
    throw error;
  }
}; 
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  FileText, 
  Brain, 
  Download,
  Save,
  Mic,
  Upload
} from 'lucide-react';
import { updateAgentKnowledge } from '@/services/elevenlabs';
import { useToast } from '@/hooks/use-toast';

interface TranscriptTabProps {
  transcript: string;
  setTranscript: (value: string) => void;
  isRecording: boolean;
  isAnalyzing: boolean;
  generateAnalysis: () => void;
  saveChanges: () => void;
  className?: string;
}

// Add custom element type for TypeScript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': any;
    }
  }
}

export const TranscriptTab: React.FC<TranscriptTabProps> = ({
  transcript,
  setTranscript,
  isRecording,
  isAnalyzing,
  generateAnalysis,
  saveChanges,
  className = "Clase"
}) => {
  const { toast } = useToast();

  useEffect(() => {
    // Dynamically add the ElevenLabs script if it hasn't been added yet
    if (!document.getElementById("elevenlabs-convai-script")) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
      script.async = true;
      script.type = "text/javascript";
      script.id = "elevenlabs-convai-script";
      document.body.appendChild(script);
    }
  }, []);

  const handleUpdateAgentKnowledge = async () => {
    if (!transcript.trim()) {
      toast({
        title: "Error",
        description: "Necesitas tener una transcripción para actualizar el conocimiento del agente",
        variant: "destructive"
      });
      return;
    }

    try {
      await updateAgentKnowledge(transcript, className);
    } catch (error) {
      console.error('Error al actualizar el conocimiento del agente:', error);
    }
  };

  return (
    <Card className="border-2 shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2 text-blue-600" />
            Transcripción de la Clase
          </CardTitle>
          <div className="flex space-x-2">
            <Button 
              onClick={generateAnalysis}
              disabled={isAnalyzing || !transcript}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Analizando...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2" />
                  Generar Análisis
                </>
              )}
            </Button>
            <Button 
              onClick={handleUpdateAgentKnowledge}
              disabled={!transcript}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Upload className="w-4 h-4 mr-2" />
              Actualizar Agente
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button onClick={saveChanges} size="sm">
              <Save className="w-4 h-4 mr-2" />
              Guardar
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isRecording && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-blue-700 text-sm flex items-center">
                <Mic className="w-4 h-4 mr-2" />
                Transcripción en tiempo real activa. El texto aparecerá automáticamente mientras hablas.
              </p>
            </div>
          )}
          
          <Textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="La transcripción aparecerá aquí en tiempo real mientras grabas. Habla claramente para mejores resultados. Puedes editarla manualmente después de la grabación."
            className="min-h-[400px] border-2 focus:border-blue-400 text-base leading-relaxed text-gray-600 font-medium placeholder:text-gray-400"
          />
          
          {transcript && (
            <div className="text-sm text-gray-600">
              Palabras: {transcript.split(' ').filter(word => word.length > 0).length} | 
              Caracteres: {transcript.length}
            </div>
          )}
        </div>
        <elevenlabs-convai agent-id={import.meta.env.VITE_ELEVENLABS_AGENT_ID}></elevenlabs-convai>
      </CardContent>
    </Card>
  );
};

export default TranscriptTab;

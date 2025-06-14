import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Users, 
  FileText, 
  BookOpen,
  ClipboardList,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useClass } from '@/contexts/ClassContext';

import { RecordingControls } from '@/components/class-detail/RecordingControls';
import { TranscriptTab } from '@/components/class-detail/TranscriptTab';
import { SummaryTab } from '@/components/class-detail/SummaryTab';
import { ECDFTab } from '@/components/class-detail/ECDFTab';
import { ParticipationTab } from '@/components/class-detail/ParticipationTab';
import { MomentsTab } from '@/components/class-detail/MomentsTab';
import { useRecording } from '@/components/class-detail/useRecording';
import { useAnalysis } from '@/components/class-detail/useAnalysis';

const ClassDetail = () => {
  const { classId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getClassById } = useClass();
  
  const classData = getClassById(classId || '');
  
  const {
    isRecording,
    participants,
    startRecording,
    stopRecording,
    addParticipant,
    removeParticipant,
    transcript,
    setTranscript
  } = useRecording();

  const {
    classAnalysis,
    isAnalyzing,
    generateAnalysis,
    resetAnalysis
  } = useAnalysis();

  if (!classData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Clase no encontrada</h1>
          <p className="text-gray-600 mb-6">La clase que buscas no existe o ha sido eliminada.</p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Button>
        </div>
      </div>
    );
  }

  const handleGenerateAnalysis = () => {
    generateAnalysis(transcript);
  };

  const handleResetRecording = () => {
    setTranscript('');
    resetAnalysis();
  };

  const saveChanges = () => {
    toast({
      title: "Cambios guardados",
      description: "Los cambios se han guardado correctamente",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="mr-4 border-2 hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {classData.name}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {classData.teacher}
              </span>
              <span>{new Date(classData.createdAt).toLocaleDateString()}</span>
              <Badge variant="secondary">Clase</Badge>
            </div>
          </div>
        </div>

        {/* Recording Controls */}
        <RecordingControls
          isRecording={isRecording}
          participants={participants}
          startRecording={startRecording}
          stopRecording={stopRecording}
          addParticipant={addParticipant}
          removeParticipant={removeParticipant}
        />

        {/* Main Tabs */}
        <Tabs defaultValue="transcript" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 h-12 gap-1">
            <TabsTrigger value="transcript" className="flex items-center text-xs text-blue-500 hover:text-blue-600 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
              <FileText className="w-4 h-4 mr-1" />
              Transcripción
            </TabsTrigger>
            <TabsTrigger value="resumen" className="flex items-center text-xs text-green-500 hover:text-green-600 data-[state=active]:bg-green-100 data-[state=active]:text-green-700">
              <BookOpen className="w-4 h-4 mr-1" />
              Resumen
            </TabsTrigger>
            <TabsTrigger value="criterios" className="flex items-center text-xs text-purple-500 hover:text-purple-600 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700">
              <ClipboardList className="w-4 h-4 mr-1" />
              Criterios ECDF
            </TabsTrigger>
            <TabsTrigger value="momentos" className="flex items-center text-xs text-indigo-500 hover:text-indigo-600 data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700">
              <Clock className="w-4 h-4 mr-1" />
              Momentos Clave
            </TabsTrigger>
            <TabsTrigger value="participacion" className="flex items-center text-xs text-pink-500 hover:text-pink-600 data-[state=active]:bg-pink-100 data-[state=active]:text-pink-700">
              <Users className="w-4 h-4 mr-1" />
              Participación
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transcript">
            <TranscriptTab
              transcript={transcript}
              setTranscript={setTranscript}
              isRecording={isRecording}
              isAnalyzing={isAnalyzing}
              generateAnalysis={handleGenerateAnalysis}
              saveChanges={saveChanges}
            />
          </TabsContent>

          <TabsContent value="resumen">
            <SummaryTab
              classAnalysis={classAnalysis}
            />
          </TabsContent>

          <TabsContent value="criterios">
            <ECDFTab classAnalysis={classAnalysis} />
          </TabsContent>

          <TabsContent value="momentos">
            <MomentsTab classAnalysis={classAnalysis} />
          </TabsContent>

          <TabsContent value="participacion">
            <ParticipationTab
              classAnalysis={classAnalysis}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClassDetail;

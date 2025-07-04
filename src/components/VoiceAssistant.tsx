
import React from 'react';
import AdvancedVoiceAssistant from './AdvancedVoiceAssistant';

interface VoiceAssistantProps {
  onCommand?: (command: string) => void;
  prompt?: string;
  context?: string;
}

const VoiceAssistant = (props: VoiceAssistantProps) => {
  return <AdvancedVoiceAssistant {...props} />;
};

export default VoiceAssistant;

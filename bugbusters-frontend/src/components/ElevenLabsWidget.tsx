"use client";

import { useEffect } from 'react';

const AGENT_ID = 'agent_4801k5a2j62bek08gqt2wacgx33s';

export function ElevenLabsWidget() {
  useEffect(() => {
    if (!AGENT_ID) {
      console.warn('ElevenLabs widget: Agent ID not configured');
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    
    script.onerror = () => {
      console.error('Failed to load ElevenLabs widget script');
    };

    script.onload = () => {
      try {
        const widgetElement = document.createElement('elevenlabs-convai');
        widgetElement.setAttribute('agent-id', AGENT_ID);
        document.body.appendChild(widgetElement);
      } catch (error) {
        console.error('Error initializing ElevenLabs widget:', error);
      }
    };
    
    document.body.appendChild(script);

    return () => {
      const existingScript = document.querySelector(
        'script[src="https://unpkg.com/@elevenlabs/convai-widget-embed"]'
      );
      const existingWidget = document.querySelector('elevenlabs-convai');
      
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
      if (existingWidget && existingWidget.parentNode) {
        existingWidget.parentNode.removeChild(existingWidget);
      }
    };
  }, []);

  return null;
}


"use client";

import { useEffect } from 'react';

const AGENT_ID = 'agent_4801k5a2j62bek08gqt2wacgx33s';

export function ElevenLabsWidget() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    
    const widgetElement = document.createElement('elevenlabs-convai');
    widgetElement.setAttribute('agent-id', AGENT_ID);
    
    document.body.appendChild(script);
    document.body.appendChild(widgetElement);

    return () => {
      const existingScript = document.querySelector(
        'script[src="https://unpkg.com/@elevenlabs/convai-widget-embed"]'
      );
      const existingWidget = document.querySelector('elevenlabs-convai');
      
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
      if (existingWidget) {
        document.body.removeChild(existingWidget);
      }
    };
  }, []);

  return null;
}


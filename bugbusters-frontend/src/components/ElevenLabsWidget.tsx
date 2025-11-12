"use client";

import { useEffect } from 'react';

const AGENT_ID = 'agent_4801k5a2j62bek08gqt2wacgx33s';
const SCRIPT_URL = 'https://unpkg.com/@elevenlabs/convai-widget-embed';

let scriptLoaded = false;
let widgetInitialized = false;

export function ElevenLabsWidget() {
  useEffect(() => {
    if (!AGENT_ID) {
      console.warn('ElevenLabs widget: Agent ID not configured');
      return;
    }

    const existingWidget = document.querySelector('elevenlabs-convai');
    if (existingWidget || widgetInitialized) {
      return;
    }

    const initializeWidget = () => {
      if (widgetInitialized) {
        return;
      }

      try {
        const widgetElement = document.createElement('elevenlabs-convai');
        widgetElement.setAttribute('agent-id', AGENT_ID);
        document.body.appendChild(widgetElement);
        widgetInitialized = true;
      } catch (error) {
        if (error instanceof Error && error.message.includes('already been defined')) {
          widgetInitialized = true;
          const existing = document.querySelector('elevenlabs-convai');
          if (!existing) {
            try {
              const widgetElement = document.createElement('elevenlabs-convai');
              widgetElement.setAttribute('agent-id', AGENT_ID);
              document.body.appendChild(widgetElement);
              widgetInitialized = true;
            } catch (retryError) {
              console.error('Error retrying widget initialization:', retryError);
            }
          }
        } else {
          console.error('Error initializing ElevenLabs widget:', error);
        }
      }
    };

    const existingScript = document.querySelector(
      `script[src="${SCRIPT_URL}"]`
    );

    if (existingScript) {
      if (scriptLoaded || customElements.get('elevenlabs-convai')) {
        scriptLoaded = true;
        initializeWidget();
      } else {
        existingScript.addEventListener('load', () => {
          scriptLoaded = true;
          initializeWidget();
        }, { once: true });
      }
      return;
    }

    const script = document.createElement('script');
    script.src = SCRIPT_URL;
    script.async = true;
    script.type = 'text/javascript';
    
    script.onerror = () => {
      console.error('Failed to load ElevenLabs widget script');
    };

    script.onload = () => {
      scriptLoaded = true;
      initializeWidget();
    };
    
    document.body.appendChild(script);
  }, []);

  return null;
}


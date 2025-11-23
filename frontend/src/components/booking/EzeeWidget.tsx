'use client';

import { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';

interface EzeeWidgetProps {
  hotelCode: string;
  bookingUrl: string;
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
  };
}

export default function EzeeWidget({ hotelCode, bookingUrl, theme }: EzeeWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load eZee Absolute booking widget script
    const script = document.createElement('script');
    script.src = bookingUrl;
    script.async = true;
    script.setAttribute('data-hotel-code', hotelCode);

    // Apply theme if provided
    if (theme) {
      if (theme.primaryColor) {
        script.setAttribute('data-primary-color', theme.primaryColor);
      }
      if (theme.secondaryColor) {
        script.setAttribute('data-secondary-color', theme.secondaryColor);
      }
    }

    // Add script to widget container
    if (widgetRef.current) {
      widgetRef.current.appendChild(script);
    }

    // Cleanup
    return () => {
      if (widgetRef.current && script.parentNode === widgetRef.current) {
        widgetRef.current.removeChild(script);
      }
    };
  }, [hotelCode, bookingUrl, theme]);

  return (
    <div className="ezee-widget-container">
      {/* Loading state */}
      <div className="flex items-center justify-center py-12 text-neutral-500">
        <Loader2 className="animate-spin mr-2" size={24} />
        <span>Chargement du système de réservation...</span>
      </div>

      {/* eZee widget will be injected here */}
      <div
        ref={widgetRef}
        id="ezee-booking-widget"
        className="min-h-[500px]"
      />
    </div>
  );
}

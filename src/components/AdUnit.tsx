import React from 'react';

interface AdUnitProps {
  slot?: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  style?: React.CSSProperties;
  className?: string;
  type?: 'header' | 'sidebar' | 'inline' | 'grid';
}

const AD_CONFIG = {
  client: "pub-XXXXXXXXXXXXXXXX", // REPLACE WITH YOUR PUB ID
  slots: {
    header: "XXXXXXXXXX",       // REPLACE WITH YOUR SLOT ID
    grid: "XXXXXXXXXX",         // REPLACE WITH YOUR SLOT ID
    inline: "XXXXXXXXXX"        // REPLACE WITH YOUR SLOT ID
  }
};

const AdUnit: React.FC<AdUnitProps> = ({ slot, format = 'auto', style, className, type }) => {
  // In production, this would contain the Google AdSense code
  // For now, we'll render a high-visibility placeholder that matches the site's brutalist theme
  
  const currentSlot = slot || (type ? (AD_CONFIG.slots as any)[type] : undefined);
  
  const getPlaceholderStyles = () => {
    switch (type) {
      case 'header':
        return 'w-full h-[90px] mb-8';
      case 'grid':
        return 'w-full aspect-video h-full';
      case 'inline':
        return 'w-full h-[250px] my-8';
      default:
        return 'w-full h-[250px]';
    }
  };

  return (
    <div 
      className={`bg-zinc-100 dark:bg-zinc-800 border-4 border-dashed border-zinc-300 dark:border-zinc-700 flex flex-col items-center justify-center overflow-hidden relative ${getPlaceholderStyles()} ${className || ''}`}
      style={style}
    >
      <div className="absolute top-2 left-2 text-[10px] font-black uppercase text-zinc-400 dark:text-zinc-500 tracking-widest">
        Advertisement
      </div>
      <div className="text-zinc-300 dark:text-zinc-700 font-black uppercase text-2xl rotate-3 tracking-tighter opacity-50">
        Space for Rent
      </div>
      <div className="text-[10px] font-bold text-zinc-400 mt-2">
        Passive Income Target: $2,000/mo
      </div>
      
      {/* 
      <ins className="adsbygoogle"
           style={{ display: 'block', ...style }}
           data-ad-client={AD_CONFIG.client}
           data-ad-slot={currentSlot}
           data-ad-format={format}
           data-full-width-responsive="true"></ins>
      <script>
           (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
      */}
    </div>
  );
};

export default AdUnit;

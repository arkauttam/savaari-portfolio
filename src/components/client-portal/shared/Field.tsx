import React, { useState } from "react";

interface FieldProps {
  label: string;
  icon: React.ElementType;
  accent?: string;
  textarea?: boolean;
}

export function Field({ 
  label, 
  icon: Icon, 
  accent = "#3B82F6", 
  textarea = false, 
  ...props 
}: FieldProps & (React.InputHTMLAttributes<HTMLInputElement> | React.TextareaHTMLAttributes<HTMLTextAreaElement>)) {
  const [focused, setFocused] = useState(false);
  
  const shared = {
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    className: "flex-1 bg-transparent px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none",
    ...props,
  };
  
  return (
    <div>
      <label className="block text-xs font-semibold text-muted-foreground  mb-1.5">
        {label}
      </label>
      <div 
        className={`
          flex items-start rounded-xl border transition-all duration-200
          ${focused ? 'border-primary/30 bg-primary/5' : 'border-border/50 bg-background/50'}
        `}
      >
        <div className="pl-3.5 pt-[11px] shrink-0">
          <Icon 
            size={13} 
            className={focused ? 'text-primary' : 'text-muted-foreground'} 
          />
        </div>
        {textarea
          ? <textarea {...shared as React.TextareaHTMLAttributes<HTMLTextAreaElement>}
              className={shared.className + " resize-none min-h-[90px]"} />
          : <input {...shared as React.InputHTMLAttributes<HTMLInputElement>} />
        }
      </div>
    </div>
  );
}
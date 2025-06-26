import React from "react";

export interface DialogProps {
  open?: boolean;
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ open, children }) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {children}
    </div>
  );
};

export const DialogContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <div className={`relative ${className}`}>
      {children}
    </div>
  );
};

export const DialogTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <h2 className={`text-lg font-semibold ${className}`}>
      {children}
    </h2>
  );
};

export const DialogDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <p className={`text-sm text-gray-600 ${className}`}>
      {children}
    </p>
  );
};

export const DialogHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`}>
      {children}
    </div>
  );
};

export const DialogTrigger: React.FC<{ 
  children: React.ReactNode; 
  asChild?: boolean;
  onClick?: () => void;
}> = ({ children, asChild, onClick }) => {
  if (asChild) {
    return React.cloneElement(children as React.ReactElement, { onClick });
  }
  
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
};

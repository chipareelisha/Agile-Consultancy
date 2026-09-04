import { createElement } from 'react';
import * as Icons from 'lucide-react';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  key?: any;
}

export default function Icon({ name, size = 16, className, ...props }: IconProps) {
  // Try to find the component in Lucide Icons
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) {
    // Return a fallback block if the icon is not found
    return null;
  }
  
  return createElement(IconComponent, { size, className, ...props });
}

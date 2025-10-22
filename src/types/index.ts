export interface Domain {
  id: string;
  name: string;
  icon: string;
  description: string;
  items: DomainItem[];
}

export interface DomainItem {
  id: string;
  name: string;
  type: 'dashboard' | 'app' | 'chatbot';
  description?: string;
  pages?: string[];
  embedUrl?: string;
}

export interface BreadcrumbItem {
  label: string;
  path: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

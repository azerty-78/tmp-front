import { ReactNode } from 'react';
import { themeConfig } from '../../config/theme';

interface BaseLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  header?: ReactNode;
  showSidebar?: boolean;
  showHeader?: boolean;
}

/**
 * Layout de base réutilisable pour tous les modules
 * Personnalisable via le thème
 */
export const BaseLayout = ({
  children,
  sidebar,
  header,
  showSidebar = false,
  showHeader = true,
}: BaseLayoutProps) => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: themeConfig.backgrounds.default }}>
      {showHeader && (
        <header
          className="sticky top-0 z-50 shadow-sm"
          style={{ backgroundColor: themeConfig.backgrounds.header }}
        >
          {header || <DefaultHeader />}
        </header>
      )}

      <div className="flex">
        {showSidebar && sidebar && (
          <aside
            className="fixed left-0 top-0 h-screen w-64 shadow-lg"
            style={{ backgroundColor: themeConfig.backgrounds.sidebar }}
          >
            {sidebar}
          </aside>
        )}

        <main
          className={`flex-1 ${showSidebar ? 'ml-64' : ''} transition-all duration-300`}
        >
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

const DefaultHeader = () => {
  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-3">
        {themeConfig.company.logo && (
          <img
            src={themeConfig.company.logo}
            alt={themeConfig.company.name}
            className="h-10"
          />
        )}
        <h1 className="text-xl font-bold" style={{ color: themeConfig.text.primary }}>
          {themeConfig.company.name}
        </h1>
      </div>
    </div>
  );
};

/**
 * Configuration du thème de l'application
 * Personnalisez ces valeurs pour adapter l'apparence de votre application
 */

export interface ThemeConfig {
  // Informations de l'entreprise
  company: {
    name: string;
    logo: string; // Chemin vers le logo (ex: '/logo.png')
    logoSmall: string; // Logo compact pour la sidebar
    favicon: string;
  };

  // Couleurs principales
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    warning: string;
    error: string;
    info: string;
  };

  // Couleurs de fond
  backgrounds: {
    default: string;
    paper: string;
    sidebar: string;
    header: string;
  };

  // Couleurs de texte
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };

  // Configuration des modules
  modules: {
    user: {
      name: string;
      color: string;
      icon: string; // Nom de l'icône React Icons
    };
    employe: {
      name: string;
      color: string;
      icon: string;
    };
    admin: {
      name: string;
      color: string;
      icon: string;
    };
    rootAdmin: {
      name: string;
      color: string;
      icon: string;
    };
  };
}

// Configuration par défaut - À PERSONNALISER
export const themeConfig: ThemeConfig = {
  company: {
    name: 'KOBE CORPORATION',
    logo: '/logo.png', // Placez votre logo dans public/logo.png
    logoSmall: '/logo-small.png', // Logo compact
    favicon: '/favicon.ico',
  },

  colors: {
    primary: '#3B82F6', // Bleu
    secondary: '#8B5CF6', // Violet
    accent: '#10B981', // Vert
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },

  backgrounds: {
    default: '#FFFFFF', // Blanc pur
    paper: '#FFFFFF',
    sidebar: '#1F2937',
    header: '#FFFFFF',
  },

  text: {
    primary: '#111827',
    secondary: '#6B7280',
    disabled: '#9CA3AF',
  },

  modules: {
    user: {
      name: 'Espace Client',
      color: '#3B82F6',
      icon: 'FaUser',
    },
    employe: {
      name: 'Espace Employé',
      color: '#10B981',
      icon: 'FaBriefcase',
    },
    admin: {
      name: 'Espace Administrateur',
      color: '#8B5CF6',
      icon: 'FaShieldAlt',
    },
    rootAdmin: {
      name: 'Espace Super Admin',
      color: '#EF4444',
      icon: 'FaCog',
    },
  },
};

// Export des couleurs pour Tailwind (optionnel)
export const tailwindColors = {
  primary: themeConfig.colors.primary,
  secondary: themeConfig.colors.secondary,
  accent: themeConfig.colors.accent,
};

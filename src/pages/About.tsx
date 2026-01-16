import { Link } from 'react-router-dom';
import { FaArrowLeft, FaCode, FaRocket } from 'react-icons/fa';

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-8"
        >
          <FaArrowLeft /> Retour à l'accueil
        </Link>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            À propos du projet
          </h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-6">
            <div className="flex items-start gap-4">
              <FaCode className="text-3xl text-purple-500 mt-1" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  Stack Technique
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Ce projet utilise les dernières technologies modernes pour le développement frontend.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaRocket className="text-3xl text-pink-500 mt-1" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  Fonctionnalités
                </h2>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                  <li>Routage avec React Router</li>
                  <li>Appels API avec Axios</li>
                  <li>Gestion d'état serveur avec TanStack Query</li>
                  <li>Interface moderne avec Tailwind CSS</li>
                  <li>Icônes avec React Icons</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

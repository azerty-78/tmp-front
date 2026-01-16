import { Link } from 'react-router-dom';
import { FaHome, FaInfoCircle } from 'react-icons/fa';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Bienvenue sur KOBE CORPORATION
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Application React avec TypeScript, Tailwind CSS, React Router et TanStack Query
          </p>
          
          <div className="flex justify-center gap-4 mb-12">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <FaHome className="text-4xl text-blue-500 mx-auto mb-2" />
              <p className="text-gray-700 dark:text-gray-300">Accueil</p>
            </div>
            <Link 
              to="/about" 
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <FaInfoCircle className="text-4xl text-indigo-500 mx-auto mb-2" />
              <p className="text-gray-700 dark:text-gray-300">À propos</p>
            </Link>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Technologies installées
            </h2>
            <ul className="text-left space-y-2 text-gray-600 dark:text-gray-300">
              <li>✅ React Router DOM - Navigation</li>
              <li>✅ Axios - Appels API</li>
              <li>✅ TanStack Query - Gestion des données</li>
              <li>✅ React Icons - Bibliothèque d'icônes</li>
              <li>✅ Tailwind CSS - Styles utilitaires</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

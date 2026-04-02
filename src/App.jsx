import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import LoadingScreen from './components/LoadingScreen';
import useScrollToHash from './hooks/useScrollToHash';

const Home = lazy(() => import('./pages/Home'));
const Sobre = lazy(() => import('./pages/Sobre'));
const NossaEquipe = lazy(() => import('./pages/NossaEquipe'));
const PerguntasFrequentes = lazy(() => import('./pages/PerguntasFrequentes'));
const Contato = lazy(() => import('./pages/Contato'));
const Blog = lazy(() => import('./pages/Blog'));
const Carreiras = lazy(() => import('./pages/Carreiras'));
const Formulario = lazy(() => import('./pages/Formulario'));
const Simulacao = lazy(() => import('./pages/Simulacao'));
const FAQ = lazy(() => import('./pages/FAQ'));
const PoliticaDePrivacidade = lazy(() => import('./pages/PoliticaDePrivacidade'));
const TermosDeUso = lazy(() => import('./pages/TermosDeUso'));
const NotFound = lazy(() => import('./pages/NotFound'));

function AppContent() {
    useScrollToHash();

    return (
        <div className="bg-slate-50 text-slate-600 font-sans antialiased selection:bg-primary selection:text-white">
            <div className="overflow-x-hidden">
                <Navbar />
                <main>
                    <Suspense fallback={<LoadingScreen />}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/sobre" element={<Sobre />} />
                            <Route path="/nossa-equipe" element={<NossaEquipe />} />
                            <Route path="/perguntas-frequentes" element={<PerguntasFrequentes />} />
                            <Route path="/contato" element={<Contato />} />
                            <Route path="/blog" element={<Blog />} />
                            <Route path="/carreiras" element={<Carreiras />} />
                            <Route path="/formulario" element={<Formulario />} />
                            <Route path="/simulacao" element={<Simulacao />} />
                            <Route path="/faq" element={<FAQ />} />
                            <Route path="/politica-de-privacidade" element={<PoliticaDePrivacidade />} />
                            <Route path="/termos-de-uso" element={<TermosDeUso />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </main>
                <Footer />
                <FloatingActions />
            </div>
        </div>
    );
}

export default function App() {
    return <AppContent />;
}

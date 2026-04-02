import { useEffect } from 'react';

export default function useBackToTop() {
    useEffect(() => {
        const backToTopButton = document.getElementById('backToTop');
        if (!backToTopButton) return;

        const handleScroll = () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.remove('opacity-0', 'invisible', 'translate-y-10');
            } else {
                backToTopButton.classList.add('opacity-0', 'invisible', 'translate-y-10');
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
}

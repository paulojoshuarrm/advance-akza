export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 z-[200] bg-navy-900 flex flex-col items-center justify-center">
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-[40%] h-[60%] rounded-full bg-primary/10 blur-[100px] opacity-60"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-8">
                {/* Logo with fade-in */}
                <img
                    src="/assets/logo_advance(branco).svg"
                    alt="Advance Precatórios"
                    className="h-20 w-auto animate-[fadeIn_0.6s_ease-out]"
                />

                {/* Loading bar */}
                <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full animate-[loadingBar_1.2s_ease-in-out_infinite]"></div>
                </div>
            </div>
        </div>
    );
}

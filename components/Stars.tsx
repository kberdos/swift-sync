import '../app/nightsky.scss'

interface StarProps {
    children: React.ReactNode;
}

export default function Stars({ children }: StarProps) {
    return (
        <div>
            <div className="relative">
                <div id="stars-container">
                    <div id="stars"></div>
                    <div id="stars2"></div>
                    <div id="stars3"></div>
                </div>
                <div className="absolute h-screen w-screen top-0 center-0">
                    {children}
                </div>
            </div>
        </div >
    );
}
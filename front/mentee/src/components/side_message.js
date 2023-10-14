import { useEffect, useState } from "react";

export default function SideMessage({ message, isError = true, duration = 5000 }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsVisible(false);
        }, duration);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [duration]);

    // Define a class for the slide-in transition
    const slideInClass = isVisible ? "translate-x-0" : "-translate-x-full";

    return (
        <div
            className={`fixed bottom-5 left-0 ${isError ? "bg-red-600" : "bg-green-500"} text-white font-bold text-xl px-5 py-3 text-center transition-transform transform ${slideInClass}`}
        >
            {message}
        </div>
    );
}

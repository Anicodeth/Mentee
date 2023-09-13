import { useEffect, useState } from "react";

export default function SideMessage({ message,isError = true, duration = 3000 }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsVisible(false);
        }, duration);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [duration]);
    return (
        <div className={`fixed bottom-5 left-5 ${isError?"bg-red-600":"bg-green-500"} text-white font-bold text-xl px-5 py-3 text-center ${isVisible ? "" : "hidden"}`}>
            {message}
        </div>
    );
}

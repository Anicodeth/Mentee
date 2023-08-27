import { useEffect, useState } from "react";

export default function ErrorMessage({ message, duration = 3000 }) {
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
        <div className={`bg-red-500 text-white p-2 text-center ${isVisible ? "" : "hidden"}`}>
            {message}
        </div>
    );
}

import { useEffect } from "react";

export function useClickOutside(active: boolean, onClickOutside: () => void): void {
    useEffect(function registerClickOutsideListener() {
        if (active) {
            document.body.addEventListener("click", onClickOutside, { once: true });
            return function removeListener() {
                document.body.removeEventListener("click", onClickOutside);
            };
        } else {
            document.body.removeEventListener("click", onClickOutside);
        }
    }, [active]);
}

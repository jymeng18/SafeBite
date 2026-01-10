/**
 * Filename; NotFound.tsx
 * 
 * Desc: Err handling for nonexistent routes
 * 
 * Author: JM
 */

import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
    const location = useLocation();

    useEffect(() => {
        console.error("404 Error: Us")
    })
}
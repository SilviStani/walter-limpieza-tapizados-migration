"use client";
import React, { useEffect } from "react";
import "./PrivacyModal.scss";

export default function Map_Modal({ open, onClose }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && open) onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="pm-backdrop" role="dialog" aria-modal="true">
      <div
        className="pm-overlay"
        onClick={(e) => {
          if (e.target.classList.contains("pm-overlay")) onClose();
        }}
      >
        <div className="pm-content" role="document">
          <button className="pm-close" onClick={onClose} aria-label="Cerrar">
            ×
          </button>
          <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1010.1570685105121!2d-60.696060023638346!3d-31.61331404781452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b5a9e04cc028db%3A0x8c889f3d7a26d186!2sPje.%20Venialbo%205971%2C%20S3004%20Santa%20Fe%20de%20la%20Vera%20Cruz%2C%20Santa%20Fe!5e0!3m2!1ses!2sar!4v1770815626685!5m2!1ses!2sar" 
          width={600} 
          height={450} 
          style={{border:0}} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
  );
}

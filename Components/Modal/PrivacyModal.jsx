"use client";
import React, { useEffect } from "react";
import "./PrivacyModal.scss";

export default function PrivacyModal({ open, onClose, children }) {
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
          <div className="pm-body">{children}</div>
        </div>
      </div>
    </div>
  );
}

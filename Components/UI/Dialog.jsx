"use client";

import { useEffect, useRef } from "react";
import Icon from "./Icon";
import "./Dialog.scss";

export default function Dialog({ open, onClose, title, children, className = "" }) {
  const dialog = useRef(null);
  const closeButton = useRef(null);

  useEffect(() => {
    const element = dialog.current;
    if (!open || !element) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    closeButton.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [open]);

  return (
    <dialog ref={dialog} className={`site-dialog ${className}`} aria-label={title}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) onClose();
      }}>
      <div className="dialog-heading"><p>{title}</p><button ref={closeButton} type="button" className="dialog-close" onClick={onClose} aria-label="Cerrar ventana"><Icon name="close" /></button></div>
      {open && children}
    </dialog>
  );
}

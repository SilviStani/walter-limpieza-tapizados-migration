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

  function containTabFocus(event) {
    if (event.key !== "Tab") return;
    const element = event.currentTarget;
    const controls = [...element.querySelectorAll(
      'a[href], button, input, select, textarea, summary, [tabindex], [contenteditable="true"]',
    )].filter((control) => control.tabIndex >= 0 && !control.matches(":disabled")
      && !control.closest("[inert]") && control.getClientRects().length > 0
      && getComputedStyle(control).visibility !== "hidden");
    const first = controls[0];
    const last = controls[controls.length - 1];
    const active = document.activeElement;
    if (active === element || !element.contains(active)
      || (event.shiftKey ? active === first : active === last)) {
      event.preventDefault();
      (event.shiftKey ? last : first)?.focus();
    }
  }

  return (
    <dialog ref={dialog} className={`site-dialog ${className}`} aria-label={title}
      onKeyDown={containTabFocus}
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

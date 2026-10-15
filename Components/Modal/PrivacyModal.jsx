"use client";

import Dialog from "../UI/Dialog";

export default function PrivacyModal({ open, onClose, children }) {
  return <Dialog open={open} onClose={onClose} title="Política de privacidad" className="privacy-dialog"><div className="dialog-body">{children}</div></Dialog>;
}

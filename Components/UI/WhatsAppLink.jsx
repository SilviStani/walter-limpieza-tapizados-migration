import { whatsappUrl } from "../../lib/contact";
import Icon from "./Icon";

export default function WhatsAppLink({ service, children = "Pedir presupuesto", className = "button button-primary", ...props }) {
  return <a href={whatsappUrl(service)} target="_blank" rel="noopener noreferrer" className={className} {...props}><Icon name="chat" />{children}<Icon name="arrow" /></a>;
}

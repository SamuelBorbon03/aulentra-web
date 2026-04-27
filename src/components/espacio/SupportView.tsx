"use client";

import { useEffect, useState } from "react";
import { type AulentraSession } from "@/lib/aulentra-auth";
import {
  FAQ_ITEMS,
  type FAQItem,
  type SupportTicket,
  type TicketCategory,
  ticketStatusLabel,
  ticketCategoryLabel,
  seedTicketsForEmail,
} from "@/lib/aulentra-mock-data";
import { loadTickets, addTicket } from "@/lib/aulentra-mock-store";
import { cn } from "@/lib/cn";

interface Props { session: AulentraSession }

const TOPICS: Array<"all" | FAQItem["topic"]> = ["all", "access", "grades", "communication", "subscription", "platform"];
const TOPIC_LABEL: Record<FAQItem["topic"], string> = {
  access: "Acceso",
  grades: "Evaluación",
  communication: "Comunicación",
  subscription: "Suscripción",
  platform: "Plataforma",
};

/**
 * Bloque 5 · Soporte
 * Estado del sistema + FAQ expandible + tickets (creación y listado).
 */
export function SupportView({ session }: Props) {
  const email = session.user.email;
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [ticketModalOpen, setTicketModalOpen] = useState(false);

  useEffect(() => {
    setTickets(loadTickets(email, seedTicketsForEmail(email)));
  }, [email]);

  const handleCreateTicket = (t: SupportTicket) => {
    setTickets(addTicket(email, tickets, t));
    setTicketModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-h2 font-bold text-fg leading-tight">Soporte</h1>
        <p className="mt-2 text-body text-fg-soft tracking-normal normal-case max-w-[680px]">
          Consulta rápida en FAQ, abre un ticket para casos específicos, y revisa el estado del sistema.
        </p>
      </header>

      {/* Estado del sistema */}
      <SystemStatus />

      {/* Acciones directas */}
      <div className="grid md:grid-cols-2 gap-4">
        <ActionCard
          title="¿Necesitas ayuda específica?"
          body="Abre un ticket con el equipo de soporte. Respondemos en menos de 48h en horario laboral."
          cta="Crear ticket"
          onClick={() => setTicketModalOpen(true)}
        />
        <ActionCard
          title="¿Prefieres hablar con una persona?"
          body="Si eres cliente institucional, tu gestor Noventor es tu punto de contacto directo."
          cta="Ir al gestor · pronto"
          disabled
        />
      </div>

      {/* FAQ */}
      <Faq />

      {/* Mis tickets */}
      <TicketsList tickets={tickets} />

      {ticketModalOpen && (
        <CreateTicketModal
          onCancel={() => setTicketModalOpen(false)}
          onSubmit={handleCreateTicket}
        />
      )}
    </div>
  );
}

function SystemStatus() {
  return (
    <section className="rounded-lg border border-line-soft bg-card overflow-hidden">
      <div className="h-[2px] bg-horizon-gradient-soft" />
      <div className="p-5 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <span className="inline-flex w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.18)]" />
          <div>
            <p className="text-small font-semibold text-fg tracking-normal normal-case">Todos los sistemas operativos</p>
            <p className="text-caption text-fg-soft tracking-normal normal-case">Sin incidencias en plataforma, comunicaciones ni evaluaciones.</p>
          </div>
        </div>
        <span className="text-caption text-muted tracking-normal normal-case">
          Última verificación: hace 2 minutos
        </span>
      </div>
    </section>
  );
}

function ActionCard({ title, body, cta, onClick, disabled }: {
  title: string; body: string; cta: string; onClick?: () => void; disabled?: boolean;
}) {
  return (
    <article className="rounded-lg border border-line-soft bg-card p-5 flex flex-col">
      <h3 className="text-body font-semibold text-fg leading-tight tracking-normal normal-case mb-1">{title}</h3>
      <p className="text-small text-fg-soft leading-relaxed tracking-normal normal-case mb-4 flex-1">{body}</p>
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "self-start inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-small font-semibold tracking-wide transition",
          disabled
            ? "border border-line text-fg-soft cursor-not-allowed opacity-70"
            : "bg-horizon-gradient text-white hover:brightness-105"
        )}
      >
        {cta}
      </button>
    </article>
  );
}

function Faq() {
  const [topic, setTopic] = useState<"all" | FAQItem["topic"]>("all");
  const [open, setOpen] = useState<string | null>(null);
  const filtered = topic === "all" ? FAQ_ITEMS : FAQ_ITEMS.filter((q) => q.topic === topic);

  return (
    <section>
      <h2 className="text-h3 font-semibold text-fg leading-tight mb-1">Preguntas frecuentes</h2>
      <p className="text-small text-fg-soft tracking-normal normal-case mb-4">
        Respuestas rápidas a lo que más preguntan en el ecosistema.
      </p>

      <div className="flex flex-wrap gap-2 mb-4" role="tablist">
        {TOPICS.map((t) => {
          const active = topic === t;
          const label = t === "all" ? "Todas" : TOPIC_LABEL[t];
          return (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTopic(t)}
              className={cn(
                "px-3 py-1.5 rounded-pill text-small font-medium transition-colors tracking-normal normal-case border",
                active ? "bg-primary-light text-primary border-primary/30" : "text-fg-soft hover:text-primary border-transparent hover:border-primary/20"
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      <ul className="space-y-2">
        {filtered.map((q) => (
          <li key={q.id}>
            <FaqRow item={q} isOpen={open === q.id} onToggle={() => setOpen(open === q.id ? null : q.id)} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function FaqRow({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="rounded-lg border border-line-soft bg-card overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 p-4 text-left hover:bg-elevated/40 transition-colors"
      >
        <span className="text-small font-semibold text-fg tracking-normal normal-case">{item.question}</span>
        <span className={cn("text-primary text-body transition-transform", isOpen && "rotate-45")}>+</span>
      </button>
      {isOpen && (
        <div className="px-4 pb-4 text-small text-fg-soft leading-relaxed tracking-normal normal-case border-t border-line-soft pt-4">
          {item.answer}
        </div>
      )}
    </div>
  );
}

function TicketsList({ tickets }: { tickets: SupportTicket[] }) {
  return (
    <section>
      <h2 className="text-h3 font-semibold text-fg leading-tight mb-1">Mis tickets</h2>
      <p className="text-small text-fg-soft tracking-normal normal-case mb-4">
        Historial de solicitudes abiertas con soporte.
      </p>

      {tickets.length === 0 ? (
        <div className="rounded-lg border border-line-soft bg-card p-8 text-center">
          <p className="text-small text-fg-soft tracking-normal normal-case">
            Aún no tienes tickets abiertos.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          {tickets.map((t) => (
            <li key={t.id}>
              <TicketRow ticket={t} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function TicketRow({ ticket }: { ticket: SupportTicket }) {
  const statusColor = ticket.status === "open"
    ? "text-amber-300 bg-amber-500/10 border-amber-500/30"
    : ticket.status === "in_progress"
    ? "text-primary bg-primary-light border-primary/30"
    : ticket.status === "resolved"
    ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
    : "text-fg-soft bg-fg/5 border-line-strong/50";

  return (
    <article className="rounded-lg border border-line-soft bg-card p-5">
      <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
        <div className="min-w-0">
          <p className="text-small font-semibold text-fg leading-tight tracking-normal normal-case">{ticket.subject}</p>
          <p className="text-caption text-muted tracking-normal normal-case">
            {ticketCategoryLabel(ticket.category)} · abierto {formatIsoDate(ticket.createdAt)}
          </p>
        </div>
        <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-pill border text-caption font-semibold tracking-normal normal-case shrink-0", statusColor)}>
          {ticketStatusLabel(ticket.status)}
        </span>
      </div>
      <p className="text-small text-fg-soft leading-relaxed tracking-normal normal-case mb-3">
        {ticket.description}
      </p>
      {ticket.lastUpdate && (
        <p className="text-caption text-muted tracking-normal normal-case pt-3 border-t border-line-soft">
          <span className={cn(
            "inline-block mr-2 px-1.5 py-0.5 rounded-[3px] text-[9pt] font-semibold uppercase tracking-wider align-middle",
            ticket.lastUpdateFromClient ? "bg-fg/10 text-fg-soft" : "bg-primary-light text-primary"
          )}>
            {ticket.lastUpdateFromClient ? "Tú" : "Soporte"}
          </span>
          Última actualización: {formatIsoDate(ticket.lastUpdate)}
        </p>
      )}
    </article>
  );
}

function CreateTicketModal({ onCancel, onSubmit }: {
  onCancel: () => void;
  onSubmit: (t: SupportTicket) => void;
}) {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<TicketCategory>("technical");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) { setError("Completa asunto y descripción."); return; }
    setSending(true);
    setTimeout(() => {
      onSubmit({
        id: `tk-${Date.now()}`,
        createdAt: new Date().toISOString().slice(0, 10),
        status: "open",
        category,
        subject: subject.trim(),
        description: description.trim(),
        lastUpdate: new Date().toISOString().slice(0, 10),
        lastUpdateFromClient: true,
      });
    }, 600);
  };

  return (
    <div role="dialog" aria-modal="true" aria-label="Crear ticket de soporte" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-deep/80 backdrop-blur-sm" onClick={onCancel}>
      <div className="w-full max-w-[520px] rounded-lg bg-card border border-primary/20 overflow-hidden shadow-lg" onClick={(e) => e.stopPropagation()}>
        <div className="h-[2px] bg-horizon-gradient-soft" />
        <div className="p-6">
          <h3 className="text-h3 font-semibold text-fg mb-1">Crear ticket</h3>
          <p className="text-small text-fg-soft tracking-normal normal-case mb-5">
            El equipo de soporte Noventor responderá en máximo 48h laborales.
          </p>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label htmlFor="tk-cat" className="block text-caption uppercase tracking-[0.16em] text-fg-soft mb-1.5">Categoría</label>
              <select
                id="tk-cat"
                value={category}
                onChange={(e) => setCategory(e.target.value as TicketCategory)}
                className="block w-full px-3 py-2.5 rounded-md bg-bg-deep/60 border border-line text-fg text-small focus:outline-none focus:ring-1 focus:ring-primary/60 focus:border-primary/50 tracking-normal normal-case"
              >
                <option value="technical">Soporte técnico</option>
                <option value="billing">Facturación</option>
                <option value="training">Formación</option>
                <option value="suggestion">Sugerencia</option>
              </select>
            </div>
            <div>
              <label htmlFor="tk-subj" className="block text-caption uppercase tracking-[0.16em] text-fg-soft mb-1.5">Asunto</label>
              <input
                id="tk-subj"
                type="text"
                value={subject}
                onChange={(e) => { setSubject(e.target.value); setError(null); }}
                placeholder="Resume tu consulta en una frase"
                className="block w-full px-3 py-2.5 rounded-md bg-bg-deep/60 border border-line text-fg placeholder:text-muted text-small focus:outline-none focus:ring-1 focus:ring-primary/60 focus:border-primary/50 tracking-normal normal-case"
              />
            </div>
            <div>
              <label htmlFor="tk-desc" className="block text-caption uppercase tracking-[0.16em] text-fg-soft mb-1.5">Descripción</label>
              <textarea
                id="tk-desc"
                rows={5}
                value={description}
                onChange={(e) => { setDescription(e.target.value); setError(null); }}
                placeholder="Cuéntanos con detalle: pasos para reproducirlo, impacto, contexto."
                className="block w-full px-3 py-2.5 rounded-md bg-bg-deep/60 border border-line text-fg placeholder:text-muted text-small focus:outline-none focus:ring-1 focus:ring-primary/60 focus:border-primary/50 tracking-normal normal-case resize-none"
              />
            </div>

            {error && (
              <div className="p-3 rounded-md bg-red-500/10 border border-red-500/30">
                <p className="text-small text-red-300 tracking-normal normal-case">{error}</p>
              </div>
            )}

            <div className="flex items-center gap-3 justify-end pt-2">
              <button type="button" onClick={onCancel} className="px-4 py-2 text-small text-fg-soft hover:text-fg tracking-normal normal-case">
                Cancelar
              </button>
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-horizon-gradient text-white text-small font-semibold tracking-wide disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {sending ? "Enviando…" : "Crear ticket"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function formatIsoDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  const months = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  return `${parseInt(d, 10)} ${months[parseInt(m, 10) - 1]} ${y}`;
}

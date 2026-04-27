/**
 * Capa de persistencia mock para Aulentra post-login.
 * Progreso academia, suscripción a novedades, tickets de soporte.
 * Todo en localStorage scoped por email del usuario.
 */

import { type SupportTicket } from "./aulentra-mock-data";

const progressKey = (email: string) => `aulentra.academy.progress.${email}`;
const newsSubKey = "aulentra.news.subscribed";
const ticketsKey = (email: string) => `aulentra.support.tickets.${email}`;

function safeGet<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch { return null; }
}
function safeSet<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try { window.localStorage.setItem(key, JSON.stringify(value)); } catch { /* noop */ }
}

/* ---- Academia: progreso por recurso (completado o no) ---- */
export function loadAcademyProgress(email: string): Record<string, boolean> {
  return safeGet<Record<string, boolean>>(progressKey(email)) ?? {};
}
export function toggleAcademyCompleted(email: string, resourceId: string): Record<string, boolean> {
  const current = loadAcademyProgress(email);
  const next = { ...current, [resourceId]: !current[resourceId] };
  safeSet(progressKey(email), next);
  return next;
}

/* ---- Novedades: suscripción ---- */
export function isNewsSubscribed(): boolean {
  return safeGet<boolean>(newsSubKey) === true;
}
export function setNewsSubscribed(v: boolean): void {
  safeSet(newsSubKey, v);
}

/* ---- Soporte: tickets ---- */
export function loadTickets(email: string, seed: SupportTicket[]): SupportTicket[] {
  const stored = safeGet<SupportTicket[]>(ticketsKey(email));
  return stored ?? seed;
}
export function saveTickets(email: string, tickets: SupportTicket[]): void {
  safeSet(ticketsKey(email), tickets);
}
export function addTicket(email: string, tickets: SupportTicket[], ticket: SupportTicket): SupportTicket[] {
  const next = [ticket, ...tickets];
  saveTickets(email, next);
  return next;
}

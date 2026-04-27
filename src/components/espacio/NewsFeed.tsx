"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AULENTRA_NEWS,
  type AulentraNewsCategory,
  type AulentraNewsItem,
  newsCategoryLabel,
} from "@/lib/aulentra-mock-data";
import { isNewsSubscribed, setNewsSubscribed } from "@/lib/aulentra-mock-store";
import { cn } from "@/lib/cn";

const CATEGORIES: Array<"all" | AulentraNewsCategory> = ["all", "new_feature", "improvement", "fix", "note"];

/**
 * Bloque 4 · Novedades del producto Aulentra
 * Changelog del producto con filtros, item destacado y toggle de suscripción.
 */
export function NewsFeed() {
  const [filter, setFilter] = useState<"all" | AulentraNewsCategory>("all");
  const [subscribed, setSubscribed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selected, setSelected] = useState<AulentraNewsItem | null>(null);

  useEffect(() => { setSubscribed(isNewsSubscribed()); setMounted(true); }, []);

  const items = useMemo(() => {
    const filtered = filter === "all" ? AULENTRA_NEWS : AULENTRA_NEWS.filter((i) => i.category === filter);
    return [...filtered].sort((a, b) => b.date.localeCompare(a.date));
  }, [filter]);

  const toggle = () => { const next = !subscribed; setSubscribed(next); setNewsSubscribed(next); };

  const [featured, ...rest] = items;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-h2 font-bold text-fg leading-tight">Novedades del producto</h1>
        <p className="mt-2 text-body text-fg-soft tracking-normal normal-case max-w-[680px]">
          Qué hay de nuevo en Aulentra. Nuevas funcionalidades, mejoras, correcciones y notas de producto.
        </p>
      </header>

      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-line-soft">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtro por categoría">
          {CATEGORIES.map((cat) => {
            const active = filter === cat;
            const label = cat === "all" ? "Todas" : newsCategoryLabel(cat);
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(cat)}
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

        <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
          <span className="text-small text-fg-soft tracking-normal normal-case">Avisarme de cada release</span>
          <span
            role="switch"
            aria-checked={subscribed}
            className={cn(
              "relative inline-flex h-5 w-9 rounded-pill transition-colors",
              subscribed ? "bg-horizon-gradient-soft" : "bg-bg-deep border border-line-strong"
            )}
            onClick={toggle}
          >
            <span className={cn("absolute top-0.5 h-4 w-4 rounded-full bg-fg transition-transform", subscribed ? "translate-x-[18px]" : "translate-x-0.5")} />
          </span>
        </label>
      </div>

      {mounted && subscribed && (
        <div className="px-4 py-3 rounded-lg bg-primary-light border border-primary/25 text-small text-fg tracking-normal normal-case">
          Te avisaremos por email con cada release. <span className="text-caption text-muted">(Simulación · sin envío real hasta el backend)</span>
        </div>
      )}

      {items.length === 0 ? (
        <p className="text-small text-fg-soft tracking-normal normal-case">Sin novedades en esta categoría.</p>
      ) : (
        <div className="space-y-5">
          {featured && <FeaturedItem item={featured} onOpen={() => setSelected(featured)} />}
          {rest.length > 0 && (
            <ul className="grid md:grid-cols-2 gap-4">
              {rest.map((item) => (
                <li key={item.id}>
                  <ItemCard item={item} onOpen={() => setSelected(item)} />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {selected && <ItemModal item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function CategoryChip({ category }: { category: AulentraNewsCategory }) {
  const color: Record<AulentraNewsCategory, string> = {
    new_feature: "bg-primary-light text-primary border-primary/30",
    improvement: "bg-accent-light text-accent-cyan border-accent/30",
    fix: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    note: "bg-fg/5 text-fg-soft border-line-strong/50",
  };
  return (
    <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-pill text-caption font-semibold tracking-normal normal-case border", color[category])}>
      {newsCategoryLabel(category)}
    </span>
  );
}

function FeaturedItem({ item, onOpen }: { item: AulentraNewsItem; onOpen: () => void }) {
  return (
    <button type="button" onClick={onOpen} className="block w-full text-left rounded-lg border border-primary/25 bg-card overflow-hidden group hover:border-primary/50 transition-colors">
      <div className="h-[2px] bg-horizon-gradient-soft" />
      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <CategoryChip category={item.category} />
          <span className="text-caption text-muted tracking-normal normal-case">{formatDate(item.date)}</span>
          {item.area && <span className="text-caption text-muted tracking-normal normal-case">· {item.area}</span>}
        </div>
        <h2 className="text-h3 font-semibold text-fg leading-tight mb-2 group-hover:text-primary transition-colors">
          {item.title}
        </h2>
        <p className="text-body text-fg-soft leading-relaxed tracking-normal normal-case max-w-[720px]">
          {item.summary}
        </p>
        <p className="mt-4 text-caption text-primary font-semibold tracking-normal normal-case inline-flex items-center gap-1">
          Ver detalle <span className="group-hover:translate-x-1 transition-transform">→</span>
        </p>
      </div>
    </button>
  );
}

function ItemCard({ item, onOpen }: { item: AulentraNewsItem; onOpen: () => void }) {
  return (
    <button type="button" onClick={onOpen} className="block w-full h-full text-left rounded-lg border border-line-soft bg-card p-5 hover:border-primary/30 transition-colors group">
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <CategoryChip category={item.category} />
        <span className="text-caption text-muted tracking-normal normal-case">{formatDate(item.date)}</span>
      </div>
      <h3 className="text-body font-semibold text-fg leading-tight mb-1.5 group-hover:text-primary transition-colors tracking-normal normal-case">
        {item.title}
      </h3>
      <p className="text-small text-fg-soft leading-relaxed tracking-normal normal-case line-clamp-2">
        {item.summary}
      </p>
    </button>
  );
}

function ItemModal({ item, onClose }: { item: AulentraNewsItem; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div role="dialog" aria-modal="true" aria-label={item.title} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-bg-deep/80 backdrop-blur-sm overflow-y-auto" onClick={onClose}>
      <div className="w-full max-w-[640px] my-auto rounded-lg bg-card border border-primary/20 overflow-hidden shadow-lg" onClick={(e) => e.stopPropagation()}>
        <div className="h-[2px] bg-horizon-gradient-soft" />
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-2 flex-wrap">
              <CategoryChip category={item.category} />
              <span className="text-caption text-muted tracking-normal normal-case">{formatDate(item.date)}</span>
              {item.area && <span className="text-caption text-muted tracking-normal normal-case">· {item.area}</span>}
            </div>
            <button type="button" onClick={onClose} aria-label="Cerrar" className="w-8 h-8 rounded-full border border-line-strong text-fg-soft hover:text-primary hover:border-primary/40 transition-colors flex items-center justify-center">×</button>
          </div>
          <h2 className="text-h3 font-semibold text-fg leading-tight mb-3">{item.title}</h2>
          <p className="text-body text-fg-soft leading-relaxed tracking-normal normal-case mb-6">
            {item.summary}
          </p>
          <p className="text-caption text-muted tracking-normal normal-case">
            El detalle completo y enlaces a documentación llegarán cuando el backend conecte el CMS de producto.
          </p>
        </div>
      </div>
    </div>
  );
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  const months = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  return `${parseInt(d, 10)} ${months[parseInt(m, 10) - 1]} ${y}`;
}

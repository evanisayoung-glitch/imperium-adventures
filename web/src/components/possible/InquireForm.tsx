"use client";

import { useMemo, useState, type FormEvent } from "react";
import { atmospheres, getBand, investmentBands } from "@/lib/possibility";
import { studioNeedOptions } from "@/lib/studio";

export type InquirePrefill = {
  study?: string;
  band?: string;
  word?: string;
  need?: string;
};

export function InquireForm({ prefill }: { prefill: InquirePrefill }) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [url, setUrl] = useState("");
  const [need, setNeed] = useState(prefill.need ?? "site");
  const [band, setBand] = useState(prefill.band ?? "");
  const [study, setStudy] = useState(prefill.study ?? "");
  const [word, setWord] = useState(prefill.word ?? "");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");

  const selectedBand = useMemo(() => getBand(band), [band]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, company, url, need, band, study, word, note }),
      });
      const payload = (await response.json()) as { mailto?: string; error?: string };
      if (!response.ok || !payload.mailto) {
        throw new Error(payload.error || "Could not compose the brief.");
      }
      window.location.href = payload.mailto;
    } catch (caught) {
      setStatus("error");
      setError(caught instanceof Error ? caught.message : "Could not compose the brief.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-12 max-w-2xl space-y-6">
      <label className="block space-y-2 text-sm text-muted">
        Name
        <input
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="min-h-11 w-full border border-forest/20 bg-transparent px-3 text-base text-ink outline-none focus:border-gold"
          autoComplete="name"
        />
      </label>
      <label className="block space-y-2 text-sm text-muted">
        Company
        <input
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          className="min-h-11 w-full border border-forest/20 bg-transparent px-3 text-base text-ink outline-none focus:border-gold"
          autoComplete="organization"
        />
      </label>
      <label className="block space-y-2 text-sm text-muted">
        Site or references
        <input
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          className="min-h-11 w-full border border-forest/20 bg-transparent px-3 text-base text-ink outline-none focus:border-gold"
          autoComplete="url"
          inputMode="url"
        />
      </label>
      <fieldset className="space-y-3">
        <legend className="text-sm text-muted">What do you need?</legend>
        <div className="flex flex-col gap-2">
          {studioNeedOptions.map((option) => (
            <label key={option.id} className="flex min-h-11 items-center gap-3 text-sm text-ink">
              <input
                type="radio"
                name="need"
                value={option.id}
                checked={need === option.id}
                onChange={() => setNeed(option.id)}
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>
      <label className="block space-y-2 text-sm text-muted">
        Budget band
        <select
          value={band}
          onChange={(event) => setBand(event.target.value)}
          className="min-h-11 w-full border border-forest/20 bg-field px-3 text-base text-ink outline-none focus:border-gold"
        >
          <option value="">Not sure yet</option>
          {investmentBands.map((item) => (
            <option key={item.id} value={item.id}>
              {item.price} — {item.name}
            </option>
          ))}
        </select>
        {selectedBand ? (
          <span className="block text-xs text-muted">{selectedBand.summary}</span>
        ) : null}
      </label>
      <label className="block space-y-2 text-sm text-muted">
        Atmosphere that felt like you
        <select
          value={study}
          onChange={(event) => setStudy(event.target.value)}
          className="min-h-11 w-full border border-forest/20 bg-field px-3 text-base text-ink outline-none focus:border-gold"
        >
          <option value="">Not sure</option>
          {atmospheres.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.title} — {item.job}
            </option>
          ))}
        </select>
      </label>
      <label className="block space-y-2 text-sm text-muted">
        Brand word
        <input
          value={word}
          onChange={(event) => setWord(event.target.value.toUpperCase().slice(0, 8))}
          className="min-h-11 w-full border border-forest/20 bg-transparent px-3 text-base tracking-[0.18em] text-ink outline-none focus:border-gold"
          maxLength={8}
        />
      </label>
      <label className="block space-y-2 text-sm text-muted">
        Note
        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          rows={5}
          className="w-full border border-forest/20 bg-transparent px-3 py-3 text-base text-ink outline-none focus:border-gold"
        />
      </label>
      <div className="flex flex-wrap items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-11 items-center bg-gold px-6 py-3 text-sm font-medium tracking-[0.12em] uppercase text-forest-deep transition hover:bg-gold-soft disabled:opacity-60"
        >
          {status === "sending" ? "Opening brief…" : "Send the brief"}
        </button>
        <p className="max-w-sm text-xs text-muted">
          Opens a composed message to the studio. We reply with next steps — usually within a day.
        </p>
      </div>
      {status === "error" ? <p className="text-sm text-forest">{error}</p> : null}
    </form>
  );
}

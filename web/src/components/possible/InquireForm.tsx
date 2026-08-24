"use client";

import { useMemo, useState, type FormEvent } from "react";
import { crafts, getCraft } from "@/lib/crafts";
import { atmospheres, getBand, investmentBands } from "@/lib/possibility";
import { studioNeedOptions } from "@/lib/studio";

export type InquirePrefill = {
  study?: string;
  band?: string;
  word?: string;
  need?: string;
  craft?: string;
};

export function InquireForm({ prefill }: { prefill: InquirePrefill }) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [url, setUrl] = useState("");
  const [need, setNeed] = useState(prefill.need ?? "site");
  const [band, setBand] = useState(prefill.band ?? "");
  const [study, setStudy] = useState(prefill.study ?? "");
  const [craft, setCraft] = useState(prefill.craft ?? "");
  const [word, setWord] = useState(prefill.word ?? "");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");

  const selectedBand = useMemo(() => getBand(band), [band]);
  const selectedCraft = useMemo(() => getCraft(craft), [craft]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/inquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, company, url, need, band, study, craft, word, note }),
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
    <form onSubmit={onSubmit} className="max-w-xl space-y-10">
      <label className="block space-y-2 text-[14px] text-ivory/50">
        Name
        <input
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="field-input text-[17px]"
          autoComplete="name"
        />
      </label>
      <label className="block space-y-2 text-[14px] text-ivory/50">
        Company
        <input
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          className="field-input text-[17px]"
          autoComplete="organization"
        />
      </label>
      <label className="block space-y-2 text-[14px] text-ivory/50">
        A site you like, if you have one
        <input
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          className="field-input text-[17px]"
          autoComplete="url"
          inputMode="url"
        />
      </label>
      <fieldset className="space-y-4">
        <legend className="text-[14px] text-ivory/50">What do you need?</legend>
        <div className="flex flex-col gap-3">
          {studioNeedOptions.map((option) => (
            <label key={option.id} className="flex min-h-11 items-center gap-3 text-[16px]">
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
      <label className="block space-y-2 text-[14px] text-ivory/50">
        What should guests see first?
        <select
          value={craft}
          onChange={(event) => setCraft(event.target.value)}
          className="field-input text-[17px]"
        >
          <option value="">Not sure yet</option>
          {crafts.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        {selectedCraft ? (
          <span className="block text-[14px] text-ivory/55">{selectedCraft.line}</span>
        ) : null}
      </label>
      <label className="block space-y-2 text-[14px] text-ivory/50">
        What it should cost
        <select
          value={band}
          onChange={(event) => setBand(event.target.value)}
          className="field-input text-[17px]"
        >
          <option value="">Not sure yet</option>
          {investmentBands.map((item) => (
            <option key={item.id} value={item.id}>
              {item.price} — {item.name}
            </option>
          ))}
        </select>
        {selectedBand ? (
          <span className="block text-[14px] text-ivory/55">{selectedBand.summary}</span>
        ) : null}
      </label>
      <label className="block space-y-2 text-[14px] text-ivory/50">
        The doorway
        <select
          value={study}
          onChange={(event) => setStudy(event.target.value)}
          className="field-input text-[17px]"
        >
          <option value="">Not sure</option>
          {atmospheres.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.title}
            </option>
          ))}
        </select>
      </label>
      <label className="block space-y-2 text-[14px] text-ivory/50">
        Your word
        <input
          value={word}
          onChange={(event) => setWord(event.target.value.toUpperCase().slice(0, 8))}
          className="field-input display text-[22px] tracking-wide"
          maxLength={8}
        />
      </label>
      <label className="block space-y-2 text-[14px] text-ivory/50">
        Note
        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          rows={5}
          className="field-input min-h-32 resize-y py-3 text-[17px]"
        />
      </label>
      <div className="flex flex-wrap items-center gap-5 pt-2">
        <button type="submit" disabled={status === "sending"} className="cta-ink text-[15px] disabled:opacity-60">
          {status === "sending" ? "Opening…" : "Send the brief"}
        </button>
        <p className="max-w-xs text-[13px] text-ivory/40">
          Opens a letter to us. No account. No booking page.
        </p>
      </div>
      {status === "error" ? <p className="text-[15px] text-gold">{error}</p> : null}
    </form>
  );
}

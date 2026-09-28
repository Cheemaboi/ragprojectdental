"use client";

import { ArrowUpRight } from "@phosphor-icons/react";

export function ChatOpenButton() {
  return (
    <button
      type="button"
      className="button-dark mt-10"
      onClick={() => document.querySelector<HTMLButtonElement>("[aria-label='Open Bright Smile assistant']")?.click()}
    >
      Talk with the clinic assistant <ArrowUpRight size={18} />
    </button>
  );
}

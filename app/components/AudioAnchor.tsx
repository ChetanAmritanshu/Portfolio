"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";

import { dispatchAudioEvent, type SemanticAudioEventName } from "~/audio/events";

interface AudioAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  eventName: SemanticAudioEventName;
  projectSlug?: string;
}

export function AudioAnchor({ children, eventName, projectSlug, ...props }: AudioAnchorProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        dispatchAudioEvent({ name: eventName, projectSlug });
        props.onClick?.(event);
      }}
      onFocus={(event) => {
        dispatchAudioEvent({ name: "ui:focus" });
        props.onFocus?.(event);
      }}
      onPointerEnter={(event) => {
        dispatchAudioEvent({ name: "ui:hover" });
        props.onPointerEnter?.(event);
      }}
    >
      {children}
    </a>
  );
}

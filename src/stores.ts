import { writable, type Writable } from "svelte/store";

export const toasts: Writable<{title: string, body:string, dice?: string}[]> = writable([]) 
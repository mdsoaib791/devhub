import '@tanstack/react-table'; //or vue, svelte, solid, qwik, etc.

declare module '@tanstack/react-table' {
  interface ColumnMeta {
    sortingKey?: string;
    tdClassName?: string;
    thClassName?: string;
  }
}

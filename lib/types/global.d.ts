declare global {
  interface Window {
    initMap: () => void;
  }
}

// Ce export vide est nécessaire pour que le fichier soit traité comme un module.
export {};

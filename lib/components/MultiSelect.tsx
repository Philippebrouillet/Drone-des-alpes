"use client";

import { useState, useRef, useEffect } from "react";
import { Briefcase, ChevronDown, X } from "lucide-react";

interface MultiSelectProps {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

export default function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Sélectionner des prestations",
  className = "",
  required = false,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fermer le dropdown quand on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }

    // Focus l'input après sélection
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const removeOption = (option: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter((v) => v !== option));
  };

  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
  };

  const filteredOptions = options.filter(
    (option) =>
      option.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !value.includes(option)
  );

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsOpen(true);
  };

  return (
    <div className={`relative  ${className}`} ref={dropdownRef}>
      {/* Container principal avec les tags et l'input */}
      <div
        className="w-full pr-10 py-2 border border-ink/15 rounded-[10px] focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary transition-[border-color,box-shadow] duration-150 bg-white min-h-11 cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="flex justify-between items-center">
          <Briefcase className="text-ink-3 w-4 h-4 ml-3 mr-3 shrink-0" />

          <div className="flex flex-wrap gap-1.5 items-center  w-full">
            {/* Tags sélectionnés */}
            {value.map((option) => (
              <span
                key={option}
                className="inline-flex items-center gap-1 px-2.5 py-1 bg-surface-3 text-ink text-sm rounded-md"
              >
                <span className="max-w-[200px] truncate">{option}</span>
                <button
                  type="button"
                  onClick={(e) => removeOption(option, e)}
                  className="ml-1 hover:bg-ink/10 rounded-sm p-0.5 transition-colors"
                  tabIndex={-1}
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}

            {/* Input de recherche */}
            <input
              ref={inputRef}
              type="text"
              name="searchService"
              id="searchService"
              value={searchTerm}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              autoComplete="off"
              placeholder={
                value.length === 0
                  ? placeholder
                  : value.length !== options.length
                  ? "Rechercher..."
                  : ""
              }
              className="flex-1 min-w-[120px] py-1 outline-none   text-ink placeholder:text-ink-3"
            />
          </div>

          {/* Bouton clear all */}
          {value.length > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              title="Tout effacer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        {/* Chevron */}
        <ChevronDown
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 transition-transform duration-200 pointer-events-none ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown avec options */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-line rounded-xl p-1 shadow-[0_8px_24px_rgba(15,26,46,0.08)] max-h-64 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            <>
              {/* Options */}
              <div className="py-1">
                {filteredOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleOption(option)}
                    className="w-full px-4 pl-10 py-3 text-left rounded-lg hover:bg-surface-2 text-ink transition-colors duration-150 flex items-center group"
                  >
                    <span className="flex-1 text-sm">{option}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="px-4 py-6 text-center text-gray-500">
              <p className="text-sm">
                {searchTerm
                  ? `Aucune prestation trouvée pour "${searchTerm}"`
                  : "Toutes les prestations sont sélectionnées"}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Input caché pour la validation du formulaire */}
      <input
        type="hidden"
        name="prestations"
        id="prestations"
        value={value.join(",")}
        required={required && value.length === 0}
      />
    </div>
  );
}

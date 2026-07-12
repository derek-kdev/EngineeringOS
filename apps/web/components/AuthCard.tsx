// apps/web/components/AuthCard.tsx
"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Loader2 } from "lucide-react";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
  backgroundImage?: string;
  isLoading?: boolean;
  onSubmit?: (e: React.FormEvent) => void;
}

export function AuthCard({ 
  title, 
  subtitle, 
  children, 
  footer, 
  backgroundImage,
  isLoading = false,
  onSubmit,
}: AuthCardProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit(e);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      {/* Background Image */}
      {backgroundImage && (
        <div className="fixed inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="Background"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        </div>
      )}

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md">
        <div 
          className="
            w-full rounded-2xl
            border border-[#FF6200]/20
            bg-[#111111]/90
            backdrop-blur-2xl
            p-8
            shadow-[0_20px_60px_rgba(0,0,0,0.8)]
            hover:shadow-[0_30px_80px_rgba(255,98,0,0.15)]
            transition-all duration-500
          "
        >
          {/* Logo / Brand */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#FF6200] to-[#FFB300] font-bold text-black shadow-lg shadow-[#FF6200]/30 transition-transform hover:scale-110 duration-300">
              ⚙
            </div>
            <span className="text-xl font-bold text-white">
              Engineering<span className="font-mono">OS</span>
            </span>
          </div>

          <h1 className="text-2xl font-bold text-white mb-1">
            {title}
          </h1>
          <p className="text-sm text-zinc-400 mb-6">
            {subtitle}
          </p>

          <form onSubmit={handleSubmit}>
            {children}

            {/* If children include a submit button, we'll keep it */}
            {/* Otherwise, we can add a default submit */}
          </form>

          <div className="mt-6 text-center text-sm text-zinc-400">
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Sub-components for easier use ----

interface AuthInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  error?: string;
  showPasswordToggle?: boolean;
}

export function AuthInput({
  label,
  type,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  showPasswordToggle = false,
}: AuthInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = showPasswordToggle && type === "password" 
    ? (showPassword ? "text" : "password") 
    : type;

  return (
    <div>
      <label className="block text-sm font-medium text-zinc-300 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`
            w-full rounded-xl 
            border ${error ? 'border-red-500/50' : 'border-[#FF6200]/20'}
            bg-[#1F1F1F]/60
            px-4 py-3.5 text-sm
            text-white placeholder-zinc-500
            focus:border-[#FF8A00] focus:outline-none focus:ring-2 focus:ring-[#FF8A00]/30
            transition-all duration-200
            ${showPasswordToggle ? 'pr-12' : ''}
          `}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}

interface AuthSubmitButtonProps {
  label: string;
  isLoading?: boolean;
  loadingLabel?: string;
  fullWidth?: boolean;
}

export function AuthSubmitButton({
  label,
  isLoading = false,
  loadingLabel = "Loading...",
  fullWidth = true,
}: AuthSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`
        ${fullWidth ? 'w-full' : 'px-6'}
        rounded-full
        bg-gradient-to-r from-[#FF6200] to-[#FFB300]
        px-6 py-3.5 text-sm font-semibold text-black
        transition-all duration-300
        hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,138,0,0.4)]
        active:scale-95
        disabled:opacity-70 disabled:cursor-not-allowed
        flex items-center justify-center gap-2
      `}
    >
      {isLoading ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          {loadingLabel}
        </>
      ) : (
        label
      )}
    </button>
  );
}

interface AuthSocialButtonProps {
  provider: "google" | "github" | "sso";
  label: string;
  icon: string;
  onClick?: () => void;
}

export function AuthSocialButton({
  provider,
  label,
  icon,
  onClick,
}: AuthSocialButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        flex-1 flex items-center justify-center gap-2 
        rounded-xl border border-[#FF6200]/20 
        py-2.5 text-sm text-white 
        hover:bg-[#FF6200]/10 hover:border-[#FF8A00] 
        transition-all duration-200
        hover:scale-[1.02]
      "
    >
      <span className="text-lg">{icon}</span>
      {label}
    </button>
  );
}

interface AuthDividerProps {
  label?: string;
}

export function AuthDivider({ label = "Or continue with" }: AuthDividerProps) {
  return (
    <div className="relative flex items-center my-6">
      <div className="flex-1 border-t border-[#FF6200]/20" />
      <span className="px-3 text-xs text-zinc-500">{label}</span>
      <div className="flex-1 border-t border-[#FF6200]/20" />
    </div>
  );
}

interface AuthCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function AuthCheckbox({
  label,
  checked,
  onChange,
}: AuthCheckboxProps) {
  return (
    <label className="flex items-center gap-2.5 text-sm text-zinc-400 cursor-pointer group hover:text-white transition">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="
          w-4.5 h-4.5 rounded 
          border-[#FF6200]/30
          text-[#FF8A00] focus:ring-[#FF8A00] focus:ring-offset-0
          bg-[#1F1F1F]
          cursor-pointer
          transition
        "
      />
      <span className="group-hover:text-white transition">{label}</span>
    </label>
  );
}
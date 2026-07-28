"use client";

import { useEffect, useState, useRef } from "react";
import {
  Mail,
  Shield,
  Calendar,
  CheckCircle,
  XCircle,
  Edit3,
  Save,
  X,
  Clock,
  Globe,
  Camera,
} from "lucide-react";
import Cropper, { Area } from "react-easy-crop";
import { getCurrentUser, updateCurrentUser } from "@/lib/api/users";
import { uploadAvatar } from "@/lib/storage/avatar";
import { useAuth } from "@/hooks/useAuth";
import Toast from "@/components/ui/Toast";

interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatarUrl?: string | null;
  timezone: string;
  locale: string;
  emailVerifiedAt?: string | null;
  lastLoginAt?: string | null;
  createdAt: string;
}

export default function ProfileSection() {
  const { setUser: updateAuthUser } = useAuth();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success" as "success" | "error",
  });

  // Avatar states
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    timezone: "",
    locale: "",
  });

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getCurrentUser();
        setUser(data);
        setForm({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          timezone: data.timezone || "",
          locale: data.locale || "",
        });
      } catch (error) {
        console.error("Failed loading profile", error);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function saveProfile() {
    try {
      setSaving(true);
      setError("");
      const updated = await updateCurrentUser({
        firstName: form.firstName,
        lastName: form.lastName,
        timezone: form.timezone,
        locale: form.locale,
      });
      setUser(updated);
      updateAuthUser(updated);
      setEditing(false);
      setToast({
        show: true,
        message: "Profile updated successfully",
        type: "success",
      });
      setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3000);
    } catch (error) {
      console.error("Profile update failed", error);
      setError("Unable to update profile");
      setToast({ show: true, message: "Unable to update profile", type: "error" });
    } finally {
      setSaving(false);
    }
  }

  // --- Avatar Upload ---
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setToast({
        show: true,
        message: "Image must be smaller than 5MB",
        type: "error",
      });
      setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3000);
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setToast({
        show: true,
        message: "Please select an image file",
        type: "error",
      });
      setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3000);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result as string);
      setIsCropping(true);
    };
    reader.readAsDataURL(file);
    setAvatarFile(file);
  };

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const getCroppedImage = async () => {
    if (!avatarPreview || !croppedAreaPixels) return;
    const image = new Image();
    image.src = avatarPreview;
    await new Promise((resolve) => (image.onload = resolve));

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height, x, y } = croppedAreaPixels;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, x, y, width, height, 0, 0, width, height);

    return new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
      }, "image/png");
    });
  };

  const handleCropConfirm = async () => {
    try {
      const croppedBlob = await getCroppedImage();
      if (!croppedBlob) {
        throw new Error("Failed to crop image");
      }
      // Upload cropped image to Cloudinary
      const avatarUrl = await uploadAvatar(croppedBlob);
      // Update user profile with new avatar URL
      const updated = await updateCurrentUser({ avatarUrl });
      setUser(updated);
      updateAuthUser(updated);
      setToast({
        show: true,
        message: "Avatar updated successfully",
        type: "success",
      });
      setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3000);
    } catch (error) {
      console.error("Avatar upload failed", error);
      setToast({
        show: true,
        message: error instanceof Error ? error.message : "Failed to upload avatar",
        type: "error",
      });
      setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3000);
    } finally {
      setIsCropping(false);
      setAvatarPreview(null);
      setAvatarFile(null);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleCropCancel = () => {
    setIsCropping(false);
    setAvatarPreview(null);
    setAvatarFile(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  if (loading) {
    return <div className="text-sm text-white/40">Loading profile...</div>;
  }

  if (!user) {
    return <div className="text-sm text-red-400">Unable to load profile.</div>;
  }

  return (
    <div className="space-y-5">
      <Toast
        message={toast.message}
        type={toast.type}
        show={toast.show}
        onClose={() => setToast((prev) => ({ ...prev, show: false }))}
      />

      {/* Avatar */}
      <div className="flex items-center gap-4">
        <div
          className="relative h-16 w-16 flex-shrink-0 cursor-pointer group"
          onClick={handleAvatarClick}
        >
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt="Avatar"
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <div className="h-full w-full rounded-full bg-gradient-to-br from-[#FF6B00] to-[#FFB300] flex items-center justify-center text-xl font-bold text-black">
              {user.firstName?.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
            <Camera size={18} className="text-white" />
          </div>
        </div>
        <div>
          <h2 className="font-semibold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-sm text-white/40">{user.email}</p>
        </div>
        <button
          onClick={() => setEditing((prev) => !prev)}
          className="rounded-lg bg-white/5 p-2 hover:bg-white/10 ml-auto"
        >
          {editing ? <X size={17} /> : <Edit3 size={17} />}
        </button>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Cropping Modal */}
      {isCropping && avatarPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#0B132B] p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Crop Avatar</h3>
            <div className="relative h-64 w-full bg-black rounded-lg overflow-hidden">
              <Cropper
                image={avatarPreview}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                objectFit="contain"
              />
            </div>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={handleCropCancel}
                className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white/60 hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleCropConfirm}
                className="rounded-lg bg-[#00D2FF] px-4 py-2 text-sm font-medium text-black hover:bg-[#00D2FF]/80"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit form */}
      {editing && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
          <Input
            label="First Name"
            value={form.firstName}
            onChange={(v) => updateField("firstName", v)}
          />
          <Input
            label="Last Name"
            value={form.lastName}
            onChange={(v) => updateField("lastName", v)}
          />
          <Input
            label="Timezone"
            value={form.timezone}
            onChange={(v) => updateField("timezone", v)}
          />
          <Input
            label="Locale"
            value={form.locale}
            onChange={(v) => updateField("locale", v)}
          />
          <button
            disabled={saving}
            onClick={saveProfile}
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#00D2FF]/20 py-2 text-sm text-[#00D2FF] disabled:opacity-50"
          >
            <Save size={16} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      )}

      {/* Info rows */}
      {!editing && (
        <div className="space-y-4">
          <InfoRow icon={<Shield size={17} />} label="Role" value={user.role} />
          <InfoRow icon={<Clock size={17} />} label="Timezone" value={user.timezone} />
          <InfoRow icon={<Globe size={17} />} label="Locale" value={user.locale} />
          <InfoRow
            icon={<Mail size={17} />}
            label="Email Verification"
            value={user.emailVerifiedAt ? "Verified" : "Not verified"}
            status={!!user.emailVerifiedAt}
          />
          <InfoRow
            icon={<Calendar size={17} />}
            label="Joined"
            value={new Date(user.createdAt).toLocaleDateString()}
          />
        </div>
      )}
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="text-xs text-white/40 mb-1">{label}</p>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg bg-black/20 border border-white/10 px-3 py-2 text-sm outline-none focus:border-[#00D2FF]/50"
      />
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
  status,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  status?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-[#00D2FF]">{icon}</div>
      <div className="flex-1">
        <p className="text-xs text-white/40">{label}</p>
        <p className="text-sm">{value}</p>
      </div>
      {status !== undefined &&
        (status ? (
          <CheckCircle size={16} className="text-green-400" />
        ) : (
          <XCircle size={16} className="text-red-400" />
        ))}
    </div>
  );
}
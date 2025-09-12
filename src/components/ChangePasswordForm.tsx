"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface FormErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}

export default function ChangePasswordForm() {
  const [formValues, setFormValues] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formValues.currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formValues.newPassword.trim()) {
      newErrors.newPassword = "New password is required";
    } else if (formValues.newPassword.length < 8) {
      newErrors.newPassword = "New password must be at least 8 characters long";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formValues.newPassword)) {
      newErrors.newPassword =
        "New password must contain at least one uppercase letter, one lowercase letter, and one number";
    } else if (formValues.currentPassword === formValues.newPassword) {
      newErrors.newPassword =
        "New password must be different from current password";
    }

    if (!formValues.confirmNewPassword.trim()) {
      newErrors.confirmNewPassword = "Please confirm your new password";
    } else if (formValues.newPassword !== formValues.confirmNewPassword) {
      newErrors.confirmNewPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Password changed successfully!");

      setFormValues({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch {
      alert("Failed to change password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-start gap-4 md:gap-8">
      <h1 className="text-2xl md:text-5xl font-medium text-[#9333EA]">
        Password
      </h1>
      <hr className="bg-[#9333EA] w-full h-[1px] border-[#9333EA]" />

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[485px] flex flex-col items-center gap-5 md:gap-10 mt-5"
      >
        <label
          htmlFor="currentPassword"
          className="flex flex-col items-center gap-5 w-full"
        >
          <span className="text-[#9333EA] font-medium text-xl md:text-[32px]">
            Enter current password
          </span>
          <div className="w-full">
            <Input
              id="currentPassword"
              type="password"
              value={formValues.currentPassword}
              name="currentPassword"
              placeholder="Current password"
              onChange={handleChange}
              className={`w-full border-[1px] rounded-[40px] py-7 px-[30px] bg-[#1F2937] text-base text-[#FFFFFF] font-normal ${
                errors.currentPassword
                  ? "border-red-500 focus:border-red-500"
                  : "border-[#9333EA]"
              }`}
              disabled={isSubmitting}
            />
            {errors.currentPassword && (
              <p className="text-red-500 text-sm mt-2 text-center">
                {errors.currentPassword}
              </p>
            )}
          </div>
        </label>

        <label
          htmlFor="newPassword"
          className="flex flex-col items-center gap-5 w-full"
        >
          <span className="text-[#9333EA] font-medium text-xl md:text-[32px]">
            Enter new password
          </span>
          <div className="w-full">
            <Input
              id="newPassword"
              type="password"
              value={formValues.newPassword}
              name="newPassword"
              placeholder="New password"
              onChange={handleChange}
              className={`w-full border-[1px] rounded-[40px] py-7 px-[30px] bg-[#1F2937] text-base text-[#FFFFFF] font-normal ${
                errors.newPassword
                  ? "border-red-500 focus:border-red-500"
                  : "border-[#9333EA]"
              }`}
              disabled={isSubmitting}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm mt-2 text-center">
                {errors.newPassword}
              </p>
            )}
          </div>
        </label>

        <label
          htmlFor="confirmNewPassword"
          className="flex flex-col items-center gap-5 w-full"
        >
          <span className="text-[#9333EA] font-medium text-xl md:text-[32px]">
            Re-type new password
          </span>
          <div className="w-full">
            <Input
              id="confirmNewPassword"
              type="password"
              value={formValues.confirmNewPassword}
              name="confirmNewPassword"
              placeholder="Confirm new password"
              onChange={handleChange}
              className={`w-full border-[1px] rounded-[40px] py-7 px-[30px] bg-[#1F2937] text-base text-[#FFFFFF] font-normal ${
                errors.confirmNewPassword
                  ? "border-red-500 focus:border-red-500"
                  : "border-[#9333EA]"
              }`}
              disabled={isSubmitting}
            />
            {errors.confirmNewPassword && (
              <p className="text-red-500 text-sm mt-2 text-center">
                {errors.confirmNewPassword}
              </p>
            )}
          </div>
        </label>

        <Button
          type="submit"
          variant="secondary"
          disabled={isSubmitting}
          className="ml-auto bg-[#9333EA] w-full max-w-[200px] text-center rounded-[25px] text-white text-base font-normal py-6 px-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Changing..." : "Change"}
        </Button>
      </form>
    </div>
  );
}

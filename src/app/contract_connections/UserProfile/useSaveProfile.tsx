import { useState, useCallback } from "react";
import {
  saveProfile,
  UserProfileData,
  ContractConfig,
  SaveProfileResponse,
  ValidationErrors,
  validateProfileData,
} from "./saveProfile";

interface UseSaveProfileReturn {
  saveUserProfile: (
    profileData: UserProfileData,
    config?: ContractConfig
  ) => Promise<SaveProfileResponse>;
  isLoading: boolean;
  error: string | null;
  validationErrors: ValidationErrors | null;
  clearError: () => void;
  clearValidationErrors: () => void;
}

export function useSaveProfile(
  defaultConfig?: ContractConfig
): UseSaveProfileReturn {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] =
    useState<ValidationErrors | null>(null);

  const saveUserProfile = useCallback(
    async (
      profileData: UserProfileData,
      config?: ContractConfig
    ): Promise<SaveProfileResponse> => {
      setIsLoading(true);
      setError(null);
      setValidationErrors(null);

      try {
        const clientValidationErrors = validateProfileData(profileData);
        if (clientValidationErrors) {
          setValidationErrors(clientValidationErrors);
          return {
            success: false,
            error: "Please fix validation errors before submitting",
          };
        }

        const configToUse = config || defaultConfig;
        if (!configToUse) {
          throw new Error("Contract configuration is required");
        }

        const result = await saveProfile(profileData, configToUse);

        if (!result.success) {
          setError(result.error || "Failed to save profile");
        }

        return result;
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred";
        setError(errorMessage);
        return {
          success: false,
          error: errorMessage,
        };
      } finally {
        setIsLoading(false);
      }
    },
    [defaultConfig]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearValidationErrors = useCallback(() => {
    setValidationErrors(null);
  }, []);

  return {
    saveUserProfile,
    isLoading,
    error,
    validationErrors,
    clearError,
    clearValidationErrors,
  };
}

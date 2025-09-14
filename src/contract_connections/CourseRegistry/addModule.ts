import { useState, useCallback } from "react";

// Align with the actual contract schema
interface Module {
  id: string;
  course_id: string;
  position: number;
  title: string;
  created_at: number;
}

interface AddModuleRequest {
  course_id: string;
  position: number;
  title: string;
}

interface AddModuleResponse {
  success: boolean;
  module?: Module;
  error?: string;
}

// Constants for validation
const MAX_POSITION = 1000;
const MAX_TITLE_LENGTH = 200;

/**
 * Sanitize and validate input data
 */
function sanitizeAndValidateRequest(request: AddModuleRequest): { 
  isValid: boolean; 
  error?: string; 
  sanitized?: AddModuleRequest;
} {
  // Sanitize inputs
  const sanitized = {
    course_id: request.course_id?.trim() || "",
    position: request.position,
    title: request.title?.trim() || ""
  };

  // Validate course_id
  if (!sanitized.course_id) {
    return { isValid: false, error: "Course ID cannot be empty" };
  }

  if (sanitized.course_id.length > 100) {
    return { isValid: false, error: "Course ID is too long (max 100 characters)" };
  }

  // Validate title
  if (!sanitized.title) {
    return { isValid: false, error: "Module title cannot be empty" };
  }

  if (sanitized.title.length > MAX_TITLE_LENGTH) {
    return { isValid: false, error: `Module title is too long (max ${MAX_TITLE_LENGTH} characters)` };
  }

  // Validate position
  if (!Number.isFinite(sanitized.position)) {
    return { isValid: false, error: "Position must be a valid number" };
  }

  if (sanitized.position < 0) {
    return { isValid: false, error: "Position must be a non-negative number" };
  }

  if (sanitized.position > MAX_POSITION) {
    return { isValid: false, error: `Position must be between 0 and ${MAX_POSITION}` };
  }

  return { isValid: true, sanitized };
}

/**
 * Generate a unique module ID following the contract pattern
 * Contract format: module_{courseId}_{position}_{ledgerSeq}
 */
function generateModuleId(courseId: string, position: number): string {
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substr(2, 9);
  return `module_${courseId}_${position}_${timestamp}_${randomSuffix}`;
}

/**
 * Validate course existence. Replace with a real contract call in production.
 */
async function validateCourseExists(courseId: string): Promise<boolean> {
  await new Promise((r) => setTimeout(r, 150));
  
  // Simulate validation - replace with actual contract call
  return courseId !== "non_existent_course" && courseId.trim().length > 0;
}

/**
 * Simulated contract invocation for course_registry_add_module.
 * Replace with actual contract integration.
 */
async function simulateContractCall(request: AddModuleRequest): Promise<Module> {
  await new Promise((r) => setTimeout(r, 600));

  // Generate module ID following contract pattern
  const moduleId = generateModuleId(request.course_id, request.position);
  const timestamp = Date.now();

  return {
    id: moduleId,
    course_id: request.course_id,
    position: request.position,
    title: request.title,
    created_at: timestamp,
  };
}

export async function addModule(
  request: AddModuleRequest
): Promise<AddModuleResponse> {
  try {
    // Step 1: Sanitize and validate input
    const validation = sanitizeAndValidateRequest(request);
    if (!validation.isValid) {
      return { success: false, error: validation.error };
    }

    const sanitizedRequest = validation.sanitized!;

    // Step 2: Validate that the course exists
    const courseExists = await validateCourseExists(sanitizedRequest.course_id);
    if (!courseExists) {
      return {
        success: false,
        error: "Cannot add module. Course does not exist.",
      };
    }

    // Step 3: Call the smart contract (simulated here)
    const moduleResult = await simulateContractCall(sanitizedRequest);
    return { success: true, module: moduleResult };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error occurred";
    return { success: false, error: message };
  }
}

export function useAddModule() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [module, setModule] = useState<Module | null>(null);

  const execute = useCallback(async (request: AddModuleRequest): Promise<Module | null> => {
    setIsLoading(true);
    setError(null);
    setModule(null);

    try {
      const response = await addModule(request);
      if (response.success && response.module) {
        setModule(response.module);
        return response.module;
      }
      setError(response.error || "Failed to add module");
      return null;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error occurred";
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setModule(null);
  }, []);

  return { execute, reset, isLoading, error, module };
}



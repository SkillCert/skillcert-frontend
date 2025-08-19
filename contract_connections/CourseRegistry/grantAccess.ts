type GrantAccessParams = {
  course_id: string;
  user: string;
};

type GrantAccessResponse = {
  success: boolean;
  error?: string;
};

// This is a simulated function for granting course access.
export async function grantAccess({ course_id, user }: GrantAccessParams): Promise<GrantAccessResponse> {
  console.log(`Simulating grantAccess for course ${course_id} to user ${user}`);

  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate a user who already has access
      if (user.toLowerCase() === '0xalreadygranted') {
        console.log('Simulating "User already has access" error');
        resolve({ success: false, error: 'User already has access to this course.' });
        return;
      }

      // Simulate a generic error
      if (user.toLowerCase() === '0xerror') {
        console.log('Simulating a generic error');
        resolve({ success: false, error: 'An unknown error occurred.' });
        return;
      }

      // Simulate a successful transaction
      console.log('Simulating successful access grant');
      resolve({ success: true });
    }, 1500); // Simulate network delay
  });
}
import React, { useEffect, useState } from "react";
import {
  CourseUsers,
  listCourseAccess,
} from "@/contract_connections/CourseAccess/listCourseAccess";
import { formatWalletAddressCustom } from "@/lib/utils";

interface CourseAccessListProps {
  courseId: string;
}

const CourseAccessList: React.FC<CourseAccessListProps> = ({ courseId }) => {
  const [courseAccess, setCourseAccess] = useState<CourseUsers | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccess = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await listCourseAccess(courseId);
        setCourseAccess(data);
      } catch (err: any) {
        setError(err.message || "Failed to load course access.");
      } finally {
        setLoading(false); // ensures loading stops in both success & error
      }
    };

    fetchAccess();
  }, [courseId]);

  if (loading) return <div>Loading course access...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!courseAccess) return <div>No course access data found.</div>;

  return (
    <div>
      <h2>Course Access List</h2>
      <p>
        <strong>Course ID:</strong> {courseAccess.course}
      </p>
      <p>
        <strong>Total Users:</strong> {courseAccess.users.length}
      </p>

      {courseAccess.users.length === 0 ? (
        <div>
          <p>No users have access to this course yet.</p>
        </div>
      ) : (
        <div>
          <h3>Users with Access:</h3>
          <ul>
            {courseAccess.users.map((user, index) => (
              <li key={user.address} style={{ marginBottom: "8px" }}>
                <strong>#{index + 1}</strong>{" "}
                {formatWalletAddressCustom(user.address)}
                <br />
                <small style={{ color: "#666", fontFamily: "monospace" }}>
                  {user.address}
                </small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CourseAccessList;

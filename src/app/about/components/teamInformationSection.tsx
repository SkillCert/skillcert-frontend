import React, { useEffect, useState } from 'react';
import Image from "next/image";

// Define the type for team member data
interface TeamMember {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
}

export default function TeamInformationSection() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch team data from the API or backend
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        // Make sure to replace '/api/team' with your actual API endpoint
        const response = await fetch('/api/team'); // Replace with actual endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch team data');
        }
        const data = await response.json();
        setTeamMembers(data); // Assuming the response returns an array of team members
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="team-information-section py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member bg-white p-6 rounded-lg shadow-lg">
              <Image
                src={member.imageUrl}
                alt={member.name}
                width={96}
                height={96}
                unoptimized
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{member.role}</p>
              <p className="text-gray-700">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
// export default function TeamInformationSection() {}

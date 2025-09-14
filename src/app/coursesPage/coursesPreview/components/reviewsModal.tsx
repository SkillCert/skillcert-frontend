import Image from "next/image";

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    comment:
      "This course exceeded my expectations! The content is well-structured and the instructor explains complex concepts clearly. Highly recommended!",
    avatarUrl: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 4,
    comment:
      "Great course overall. The practical examples were very helpful. Could use more advanced topics in the later modules.",
    avatarUrl: "https://i.pravatar.cc/150?u=michael",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    rating: 5,
    comment:
      "Outstanding quality! The step-by-step approach made learning so much easier. Worth every penny.",
    avatarUrl: "https://i.pravatar.cc/150?u=emma",
  },
  {
    id: 4,
    name: "David Kim",
    rating: 4,
    comment:
      "Very informative course with good pacing. The assignments were challenging but fair. Really helped me improve my skills.",
    avatarUrl: "https://i.pravatar.cc/150?u=david",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    rating: 5,
    comment:
      "Perfect for beginners and intermediate learners. The instructor is knowledgeable and responds quickly to questions.",
    avatarUrl: "https://i.pravatar.cc/150?u=lisa",
  },
];

const mockRating = 4.5;
const mockReviewsCount = 1250;

const renderStars = (rating: number) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <svg
        key={`full-${i}`}
        width="35"
        height="35"
        viewBox="0 0 35 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.69375 35L10.7625 21.7L0 14H13.3L17.5 0L21.7 14H35L24.2375 21.7L28.3062 35L17.5 26.775L6.69375 35Z"
          fill="#D8B4FE"
        />
      </svg>
    );
  }

  if (hasHalfStar) {
    stars.push(
      <svg
        key="half"
        width="35"
        height="35"
        viewBox="0 0 35 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23.0125 27.3553L21.5688 20.7237L26.425 16.3026L20.0375 15.7039L17.5 9.44079V23.8092L23.0125 27.3553ZM6.69375 35L9.5375 22.0592L0 13.3553L12.6 12.2039L17.5 0L22.4 12.2039L35 13.3553L25.4625 22.0592L28.3062 35L17.5 28.1382L6.69375 35Z"
          fill="#D8B4FE"
        />
      </svg>
    );
  }

  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <svg
        key={`empty-${i}`}
        width="35"
        height="35"
        viewBox="0 0 35 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.69375 35L9.5375 22.0592L0 13.3553L12.6 12.2039L17.5 0L22.4 12.2039L35 13.3553L25.4625 22.0592L28.3062 35L17.5 28.1382L6.69375 35Z"
          fill="none"
          stroke="#D8B4FE"
          strokeWidth="3"
        />
      </svg>
    );
  }

  return stars;
};

export default function ReviewsModal() {
  return (
    <div className="bg-[#151a23] rounded-lg min-w-[700px] max-h-[600px] overflow-y-auto">
      <div className="flex items-center gap-4 mb-4 p-8">
        <h1 className="text-white text-7xl font-medium">{mockRating}</h1>

        <div className="flex flex-col items-start gap-2">
          <div className="flex items-center gap-2">
            {renderStars(mockRating)}
          </div>

          <h2 className="text-gray-400 text-2xl font-bold">
            {mockReviewsCount} reviews
          </h2>
        </div>
      </div>

      <div className="space-y-10 px-8 pb-8">
        {reviews.map((review) => (
          <div key={review.id} className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Image
                src={review.avatarUrl}
                alt={review.name}
                width={80}
                height={80}
                className="rounded-full object-cover"
              />

              <div className="flex flex-col gap-2">
                <h3 className="text-white text-3xl font-bold">{review.name}</h3>

                <div className="flex items-center gap-2">
                  {renderStars(review.rating)}
                </div>
              </div>
            </div>

            <p className="text-gray-400 text-2xl font-bold leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

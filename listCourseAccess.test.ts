process.env.NEXT_PUBLIC_SOROBAN_RPC_URL = "http://mock-rpc-url";
process.env.NEXT_PUBLIC_COURSE_ACCESS_CONTRACT_ID =
  "mock-course-access-contract-id";

import { listCourseAccess } from "@/contract_connections/CourseAccess/listCourseAccess";
import SorobanClient from "@stellar/stellar-sdk";

jest.mock("@stellar/stellar-sdk");
const mockSorobanClient = SorobanClient as jest.Mocked<typeof SorobanClient>;

const mockGetContractValue = jest.fn().mockResolvedValue({
  course: "mock-course-id",
  users: [
    "GABC123456789DEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCDEFGHIJK",
    "GDEF987654321ABCDEFGHIJKLMNOPQRSTUVWXYZ0987654321FEDCBA",
    "GHIJ567890123FEDCBAZYXWVUTSRQPONMLKJIHGFEDCBA1234567890",
  ],
});

mockSorobanClient.Server = jest.fn().mockImplementation(() => ({
  getContractValue: mockGetContractValue,
}));

describe("listCourseAccess", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetContractValue.mockResolvedValue({
      course: "mock-course-id",
      users: [
        "GABC123456789DEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCDEFGHIJK",
        "GDEF987654321ABCDEFGHIJKLMNOPQRSTUVWXYZ0987654321FEDCBA",
        "GHIJ567890123FEDCBAZYXWVUTSRQPONMLKJIHGFEDCBA1234567890",
      ],
    });
  });
  it("returns mocked course access data", async () => {
    const courseAccess = await listCourseAccess("mock-course-id");
    expect(courseAccess).toEqual({
      course: "mock-course-id",
      users: [
        {
          address: "GABC123456789DEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCDEFGHIJK",
        },
        { address: "GDEF987654321ABCDEFGHIJKLMNOPQRSTUVWXYZ0987654321FEDCBA" },
        { address: "GHIJ567890123FEDCBAZYXWVUTSRQPONMLKJIHGFEDCBA1234567890" },
      ],
    });
  });

  it("handles empty user list", async () => {
    mockGetContractValue.mockResolvedValueOnce({
      course: "empty-course-id",
      users: [],
    });

    const courseAccess = await listCourseAccess("empty-course-id");
    expect(courseAccess).toEqual({
      course: "empty-course-id",
      users: [],
    });
  });

  it("handles User Courses Not Found error", async () => {

    mockGetContractValue.mockRejectedValueOnce(
      new Error("User Courses Not Found")
    );

    const courseAccess = await listCourseAccess("non-existent-course-id");
    expect(courseAccess).toEqual({
      course: "non-existent-course-id",
      users: [],
    });
  });

  it("returns null for invalid course ID", async () => {
    await expect(listCourseAccess("")).rejects.toThrow("Course ID is required");
  });

  it("returns null when environment variables are missing", async () => {

    const originalRpcUrl = process.env.NEXT_PUBLIC_SOROBAN_RPC_URL;
    const originalContractId =
      process.env.NEXT_PUBLIC_COURSE_ACCESS_CONTRACT_ID;

    delete process.env.NEXT_PUBLIC_SOROBAN_RPC_URL;
    delete process.env.NEXT_PUBLIC_COURSE_ACCESS_CONTRACT_ID;

    const courseAccess = await listCourseAccess("test-course-id");
    expect(courseAccess).toBeNull();


    process.env.NEXT_PUBLIC_SOROBAN_RPC_URL = originalRpcUrl;
    process.env.NEXT_PUBLIC_COURSE_ACCESS_CONTRACT_ID = originalContractId;
  });

  it("handles malformed contract response", async () => {

    mockGetContractValue.mockResolvedValueOnce({

      invalidField: "invalid-data",
      users: "not-an-array",
    });

    const courseAccess = await listCourseAccess("malformed-course-id");
    expect(courseAccess).toBeNull();
  });

  it("handles user objects instead of strings", async () => {

    mockGetContractValue.mockResolvedValueOnce({
      course: "object-users-course-id",
      users: [
        {
          address: "GABC123456789DEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCDEFGHIJK",
        },
        { address: "GDEF987654321ABCDEFGHIJKLMNOPQRSTUVWXYZ0987654321FEDCBA" },
      ],
    });

    const courseAccess = await listCourseAccess("object-users-course-id");
    expect(courseAccess).toEqual({
      course: "object-users-course-id",
      users: [
        {
          address: "GABC123456789DEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCDEFGHIJK",
        },
        { address: "GDEF987654321ABCDEFGHIJKLMNOPQRSTUVWXYZ0987654321FEDCBA" },
      ],
    });
  });
});

process.env.NEXT_PUBLIC_SOROBAN_RPC_URL = "http://mock-rpc-url";
process.env.NEXT_PUBLIC_COURSE_REGISTRY_CONTRACT_ID = "mock-contract-id";
import { getCourse } from "./src/contract_connections/CourseRegistry/getCourse";

// Mock SorobanClient.Server and its getContractValue method
jest.mock("@stellar/stellar-sdk", () => ({
  Server: jest.fn().mockImplementation(() => ({
    getContractValue: jest.fn().mockResolvedValue({
      title: "Mock Course",
      description: "Mock Description",
      creator: "Mock Creator",
      price: "100",
      category: "Mock Category",
      language: "en",
      published: true,
      thumbnail_url: "",
    }),
  })),
}));

describe("getCourse", () => {
  it("returns mocked course data", async () => {
    const course = await getCourse("mock-id");
    expect(course).toEqual({
      id: "mock-id",
      title: "Mock Course",
      description: "Mock Description",
      creator: "Mock Creator",
      price: "100",
      category: "Mock Category",
      language: "en",
      published: true,
      thumbnail_url: "",
    });
  });
});

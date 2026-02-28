import { apiFetch } from "../../lib/api";

const mockFetch: jest.Mock = jest.fn();
global.fetch = mockFetch as unknown as typeof fetch;

describe("apiFetch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return data on successful response", async () => {
    const mockData = { message: "success" };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await apiFetch("/test");

    expect(result).toEqual(mockData);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/test"),
      expect.objectContaining({
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
    );
  });

  it("should throw structured error on failed response", async () => {
    const errorMessage = "Invalid request";
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ message: errorMessage }),
    });

    await expect(apiFetch("/bad")).rejects.toMatchObject({
      status: 400,
      message: errorMessage,
    });
  });

  it("should send POST body correctly", async () => {
    const mockData = { id: 1, name: "Raymond" };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const body = { email: "test@mail.com" };
    const result = await apiFetch("/user", { method: "POST", body });

    expect(result).toEqual(mockData);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/user"),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(body),
      })
    );
  });
});

import { render, screen } from "@testing-library/react"
import ModuleManagement from "./page"

describe("ModuleManagement Page", () => {
  it("renders module name, description, lessons section, and add lesson button", () => {
    render(<ModuleManagement />)
    expect(screen.getByText(/Module name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Describe your module/i)).toBeInTheDocument()
    expect(screen.getByText(/Lessons/i)).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /Add Lesson/i })
    ).toBeInTheDocument()
  })

  it("renders lesson cards with Preview, Edit, Delete buttons", () => {
    render(<ModuleManagement />)
    expect(screen.getAllByText(/Lesson Name/i).length).toBeGreaterThan(0)
    expect(
      screen.getAllByRole("button", { name: /Preview/i }).length
    ).toBeGreaterThan(0)
    expect(
      screen.getAllByRole("button", { name: /Edit/i }).length
    ).toBeGreaterThan(0)
    expect(
      screen.getAllByRole("button", { name: /Delete/i }).length
    ).toBeGreaterThan(0)
  })
})

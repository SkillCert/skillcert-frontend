import { render, screen, fireEvent } from "@testing-library/react"
import ModuleManagement from "../../app/instructor/courses/[courseId]/modules/[moduleId]/page"

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

  it("calls edit handler when Edit button is clicked", () => {
    const { container } = render(<ModuleManagement />)
    const editButtons = screen.getAllByRole("button", { name: /Edit/i })
    fireEvent.click(editButtons[0])
    expect(container.textContent).toMatch(/Edit Lesson/i)
  })

  it("removes lesson when Delete button is clicked", () => {
    render(<ModuleManagement />)
    const deleteButtons = screen.getAllByRole("button", { name: /Delete/i })
    fireEvent.click(deleteButtons[0])
    expect(screen.getAllByText(/Lesson Name/i).length).toBeLessThan(4)
  })

  it("adds a new lesson when Add Lesson is used", () => {
    render(<ModuleManagement />)
    fireEvent.click(screen.getByRole("button", { name: /Add Lesson/i }))
    fireEvent.change(screen.getByLabelText(/Lesson Name/i), {
      target: { value: "New Lesson" },
    })
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "New lesson description" },
    })
    fireEvent.click(screen.getByRole("button", { name: /Save/i }))
    expect(screen.getByText(/New Lesson/i)).toBeInTheDocument()
    expect(screen.getByText(/New lesson description/i)).toBeInTheDocument()
  })
})

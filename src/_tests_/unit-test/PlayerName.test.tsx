import { render, screen, fireEvent } from "@testing-library/react"
import PlayerInput from "../../Pages/Home"

test("playername input should change", () => {
  render(<PlayerInput />)
  const playernameInputEl = screen.getByPlaceholderText(/Player name/i)
  const testValue = "test"

  fireEvent.change(playernameInputEl, { target: { value: testValue } })
  //@ts-ignore
  expect(playernameInputEl.value).toBe(testValue)
})

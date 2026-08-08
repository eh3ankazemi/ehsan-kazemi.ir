import { describe, expect, test } from "bun:test"

import { calculateDuration, diceCoefficient, formatDuration, getFilterOptions } from "./utils"

describe("duration helpers", () => {
  test("formats a project that starts and ends in the same month", () => {
    expect(formatDuration("2026-07", "2026-07").en).toBe("Jul 2026")
  })

  test("localizes compact durations", () => {
    expect(calculateDuration("2024-01", "2026-04")).toBe("2 yrs 3 mos")
    expect(calculateDuration("2024-01", "2026-04", "fa")).toContain("سال")
  })
})

describe("diceCoefficient", () => {
  test("is symmetric and bounded when bigrams repeat", () => {
    const forward = diceCoefficient("aaa", "aa")
    const reverse = diceCoefficient("aa", "aaa")

    expect(forward).toBeCloseTo(2 / 3)
    expect(reverse).toBeCloseTo(forward)
    expect(forward).toBeGreaterThanOrEqual(0)
    expect(forward).toBeLessThanOrEqual(1)
  })
})

describe("getFilterOptions", () => {
  test("counts and alphabetizes values across the full collection", () => {
    const items = [{ values: ["React", "Next.js"] }, { values: ["React"] }]

    expect(getFilterOptions(items, item => item.values)).toEqual([
      { name: "Next.js", count: 1 },
      { name: "React", count: 2 },
    ])
  })
})

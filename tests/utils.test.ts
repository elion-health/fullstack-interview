import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("resolves tailwind conflicts by keeping the last value", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import { useTheme } from "next-themes";
import ThemeSwitcher from "@/app/components/ThemeSwitcher";
import React from "react";

// next-themes mock
jest.mock("next-themes", () => ({
  useTheme: jest.fn(),
}));

const mockUseTheme = useTheme as jest.MockedFunction<typeof useTheme>;

describe("ThemeSwitcher", () => {
  const mockSetTheme = jest.fn();
  const setupMockTheme = (theme: "light" | "dark" = "light") =>
    mockUseTheme.mockReturnValue({
      theme,
      setTheme: mockSetTheme,
      themes: ["light", "dark"],
    });

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock defaults
    setupMockTheme();
  });
  describe("component has been mounted", () => {
    it("should display current theme button with light theme", () => {
      render(<ThemeSwitcher />);

      const currentThemeButton = screen.getByRole("button", {
        name: /current theme/i,
      });
      expect(currentThemeButton).toBeInTheDocument();

      const sunIcon = screen.getByLabelText(/sun icon/i);
      expect(sunIcon).toBeInTheDocument();
    });
    it("should display current theme button with dark theme", () => {
      setupMockTheme("dark");

      render(<ThemeSwitcher />);

      const moonIcon = screen.getByLabelText(/moon icon/i);
      expect(moonIcon).toBeInTheDocument();
    });
    it("should have light and dark theme buttons in the dom", () => {
      render(<ThemeSwitcher />);

      const lightThemeButton = screen.getByText(/light/i);
      const darkThemeButton = screen.getByText(/dark/i);
      expect(lightThemeButton).toBeInTheDocument();
      expect(darkThemeButton).toBeInTheDocument();
    });
    it("should reveal theme option buttons when current theme button is clicked", () => {
      render(<ThemeSwitcher />);

      const currentThemeButton = screen.getByRole("button", {
        name: /current theme/i,
      });
      const lightThemeButton = screen.getByText(/light/i);
      const darkThemeButton = screen.getByText(/dark/i);
      const themeButtonsContainer = lightThemeButton.closest("div");
      expect(themeButtonsContainer).toHaveClass(
        "translate-x-full",
        "opacity-0",
        "pointer-events-none"
      );
      expect(lightThemeButton).toHaveAttribute("aria-hidden", "true");
      expect(lightThemeButton).toHaveAttribute("tabIndex", "-1");
      expect(darkThemeButton).toHaveAttribute("aria-hidden", "true");
      expect(darkThemeButton).toHaveAttribute("tabIndex", "-1");

      fireEvent.click(currentThemeButton);

      expect(themeButtonsContainer).toHaveClass(
        "translate-x-0",
        "opacity-100",
        "pointer-events-auto"
      );
      expect(lightThemeButton).toHaveAttribute("aria-hidden", "false");
      expect(lightThemeButton).toHaveAttribute("tabIndex", "0");
      expect(darkThemeButton).toHaveAttribute("aria-hidden", "false");
      expect(darkThemeButton).toHaveAttribute("tabIndex", "0");
    });
    it("should call setTheme with the 'light' argument when the light theme button is clicked", () => {
      render(<ThemeSwitcher />);

      const lightThemeButton = screen.getByText(/light/i);
      fireEvent.click(lightThemeButton);

      expect(mockSetTheme).toHaveBeenCalledWith("light");
    });
    it("should call setTheme with the 'dark' argument when the dark theme button is clicked", () => {
      render(<ThemeSwitcher />);

      const darkThemeButton = screen.getByText(/dark/i);
      fireEvent.click(darkThemeButton);

      expect(mockSetTheme).toHaveBeenCalledWith("dark");
    });
  });
});

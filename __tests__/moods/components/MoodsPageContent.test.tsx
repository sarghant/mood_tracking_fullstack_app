import { screen, render, fireEvent, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import MoodsPageContent from "@/app/moods/components/MoodsPageContent";
import { latestMood, mockAllMoods } from "../../../fixtures/moods";
import { logMood } from "@/actions/moods.actions";
import { moods } from "@/app/moods/constants/moods";
import { Mood, User } from "@prisma/generated";

const mockUser = {
  id: "user-1",
  email: "johndoe@email.com",
  name: "John",
};

jest.mock("@/actions/moods.actions", () => ({
  logMood: jest.fn(),
}));

type MockPropsType = {
  user: Partial<User>;
  allMoods: Mood[] | null;
  latestMood: Mood | null;
};
const defaultProps: MockPropsType = {
  user: mockUser,
  allMoods: mockAllMoods,
  latestMood: latestMood,
};
const renderMoodsPageContent = (overrides: Partial<MockPropsType> = {}) => {
  const moodsPageContentProps = { ...defaultProps, ...overrides };
  render(<MoodsPageContent {...moodsPageContentProps} />);
};

describe("MoodsPageContent", () => {
  const MOCK_DATE = new Date("2025-09-20T10:00:00Z");
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(MOCK_DATE);
  });
  afterEach(() => {
    jest.useRealTimers();
  });
  it("should have a paragraph displaying the current date in a specific format", () => {
    renderMoodsPageContent();
    expect(
      screen.getByText("Saturday, September 20, 2025")
    ).toBeInTheDocument();
  });
  describe("user hasn't logged a mood on current day", () => {
    beforeEach(() => {
      jest.setSystemTime(new Date("2025-09-21T10:00:00Z"));
    });
    it("should have a heading containing greeting text", () => {
      renderMoodsPageContent();
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toHaveTextContent(`Hello, ${mockUser.name}!`);
    });
    it("should have the greeting text styled based on latest mood data and props", () => {
      renderMoodsPageContent();
      const heading = screen.getByRole("heading", { level: 1 });
      const userTextSpan = within(heading).getByText(mockUser.name, {
        selector: "span",
      });
      expect(userTextSpan).toHaveClass("text-red-600");
    });
    it("should default to neutral mood theme colors when there is no latest mood", () => {
      renderMoodsPageContent({ latestMood: null });
      const heading = screen.getByRole("heading", { level: 1 });
      const userTextSpan = within(heading).getByText(mockUser.name, {
        selector: "span",
      });
      expect(userTextSpan).toHaveClass("text-teal-500");
    });
    it("should have a paragraph with a question regarding user's mood", () => {
      renderMoodsPageContent();
      expect(
        screen.getByText(/how are we feeling today\?/i, { selector: "p" })
      ).toBeInTheDocument();
    });
  });
  describe("user has logged a mood on current day", () => {
    it("should show heading text based on current mood", () => {
      renderMoodsPageContent();
      const heading = screen.getByRole("heading", { level: 1 });
      expect(within(heading).getByText("Take a Pause")).toBeInTheDocument();
    });
    it("should have the heading text styled based on current mood", () => {
      renderMoodsPageContent();
      const heading = screen.getByRole("heading", { level: 1 });
      expect(
        within(heading).getByText("Take a Pause", { selector: "span" })
      ).toHaveClass("text-red-600");
    });
    it("should change the styling and text of the heading for different mood types", () => {
      jest.setSystemTime(new Date("2025-09-17T16:45:00Z"));
      renderMoodsPageContent({ latestMood: mockAllMoods[3] });
      const heading = screen.getByRole("heading", { level: 1 });
      expect(
        within(heading).getByText("Look Forward!", { selector: "span" })
      ).toHaveClass("text-yellow-500");
    });
    it("should show uplifting message inside a paragraph based on current mood", () => {
      renderMoodsPageContent();
      expect(
        screen.getByText("Breathe deeply. You can handle this.", {
          selector: "p",
        })
      ).toBeInTheDocument();
    });
    it("should change the uplifting message for different moods", () => {
      jest.setSystemTime(new Date("2025-09-19T14:30:00Z"));
      renderMoodsPageContent({ latestMood: mockAllMoods[1] });
      expect(
        screen.getByText("You’re not alone. Things will get better.", {
          selector: "p",
        })
      ).toBeInTheDocument();
    });
  });
});

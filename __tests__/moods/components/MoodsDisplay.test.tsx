import { screen, render, fireEvent, within } from "@testing-library/react";
import MoodsDisplay from "@/app/moods/components/MoodsDisplay";
import { mockAllMoods, mockCurrentMoodAccent } from "../../../fixtures/moods";
import { Mood } from "@prisma/generated";
import { MoodDisplayData } from "@/app/moods/constants/moods";

type MockPropsType = {
  showForm: boolean;
  hasLoggedMoodToday: boolean;
  allMoods: Mood[];
  currentMoodAccent: MoodDisplayData["colors"] | undefined;
};
const defaultProps: MockPropsType = {
  showForm: false,
  hasLoggedMoodToday: false,
  allMoods: mockAllMoods,
  currentMoodAccent: mockCurrentMoodAccent,
};
const additionalMoods: Mood[] = [
  {
    id: "mood-6",
    userId: "user-1",
    moodType: "NEUTRAL",
    moodQuote: "Feeling fine...",
    createdAt: new Date("2025-09-15T12:20:00Z"),
    date: new Date("2025-09-15T00:00:00Z"),
  },
  {
    id: "mood-7",
    userId: "user-1",
    moodType: "OPTIMISTIC",
    moodQuote: null,
    createdAt: new Date("2025-09-14T20:20:00Z"),
    date: new Date("2025-09-14T00:00:00Z"),
  },
  {
    id: "mood-8",
    userId: "user-1",
    moodType: "SAD",
    moodQuote: "Pretty down today.",
    createdAt: new Date("2025-09-11T12:00:00Z"),
    date: new Date("2025-09-11T00:00:00Z"),
  },
  {
    id: "mood-9",
    userId: "user-1",
    moodType: "SAD",
    moodQuote: "Not too good...",
    createdAt: new Date("2025-09-08T08:30:00Z"),
    date: new Date("2025-09-08T00:00:00Z"),
  },
];
const renderMoodsDisplay = (overrides: Partial<MockPropsType> = {}) => {
  const moodsDisplayProps = { ...defaultProps, ...overrides };
  return render(<MoodsDisplay {...moodsDisplayProps} />);
};
const getContainerHeading = () => {
  return screen.getByRole("heading", { level: 2 });
};
const getSelectElement = () => {
  return screen.getByRole("combobox");
};
const getAverageMoodParent = () => {
  return screen.getByText("Latest Average Mood", { selector: "span" })
    .parentElement!.parentElement;
};
describe("MoodsDisplay", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2025-09-20T10:00:00Z"));
  });
  afterEach(() => {
    jest.useRealTimers();
  });
  it("should have the specified styles for the main wrapper when showForm is false", () => {
    const { container } = renderMoodsDisplay();
    const mainWrapper = container.firstChild;
    expect(mainWrapper).toHaveClass(
      "pointer-events-auto",
      "opacity-100",
      "brightness-100"
    );
  });
  it("should have the specified styles for the main wrapper when showForm is true", () => {
    const { container } = renderMoodsDisplay({ showForm: true });
    const mainWrapper = container.firstChild;
    expect(mainWrapper).toHaveClass(
      "pointer-events-none",
      "opacity-50",
      "brightness-75",
      "select-none"
    );
  });
  //
  describe("container heading content", () => {
    it("should have the specified text when hasLoggedMoodToday is false", () => {
      renderMoodsDisplay();
      const heading = getContainerHeading();
      expect(heading).toHaveTextContent("Latest Mood:");
    });
    it("should have the specified text when hasLoggedMoodToday is true", () => {
      renderMoodsDisplay({ hasLoggedMoodToday: true });
      const heading = getContainerHeading();
      expect(heading).toHaveTextContent("Current Mood:");
    });
    it("should have a span element displaying the current mood type", () => {
      renderMoodsDisplay();
      const heading = getContainerHeading();
      expect(
        within(heading).getByText("ANGRY", { selector: "span" })
      ).toBeInTheDocument();
    });
    it("should have the span displaying the current mood type styled based on currentMoodAccent", () => {
      renderMoodsDisplay();
      const heading = getContainerHeading();
      expect(
        within(heading).getByText("ANGRY", { selector: "span" })
      ).toHaveClass("text-red-600");
    });
  });
  it("should have a blockquote element with the current mood quote text content", () => {
    renderMoodsDisplay();
    expect(
      screen.getByText(/really frustrated today\!/i, { selector: "blockquote" })
    ).toBeInTheDocument();
  });
  describe("select element for average mood duration", () => {
    it("should have 5 options with specified duration values", () => {
      renderMoodsDisplay();
      const select = getSelectElement();
      expect(
        within(select).getByText("Last 7 days", { selector: "option" })
      ).toHaveValue("7");
      expect(
        within(select).getByText("Last 30 days", { selector: "option" })
      ).toHaveValue("30");
      expect(
        within(select).getByText("Last 90 days", { selector: "option" })
      ).toHaveValue("90");
      expect(
        within(select).getByText("Last year", { selector: "option" })
      ).toHaveValue("365");
      expect(
        within(select).getByText("All time", { selector: "option" })
      ).toHaveValue("0");
    });
    it("should change its value based on currently selected option", () => {
      renderMoodsDisplay();
      const select = getSelectElement();
      expect(select).toHaveValue("7");
      fireEvent.change(select, { target: { value: "30" } });
      expect(select).toHaveValue("30");
      fireEvent.change(select, { target: { value: "0" } });
      expect(select).toHaveValue("0");
    });
    it("should show average mood type based on currently selected duration", () => {
      renderMoodsDisplay();
      expect(
        within(getAverageMoodParent()!).getByText("NEUTRAL", {
          selector: "span",
        })
      ).toBeInTheDocument();
    });
    it("should show the proper color for the average mood type based on currently selected duration", () => {
      renderMoodsDisplay();
      expect(
        within(getAverageMoodParent()!).getByText("NEUTRAL", {
          selector: "span",
        })
      ).toHaveAttribute("style", "color: rgb(36, 184, 150);");
    });
    it("should show an image element with the emoji for the average mood", () => {
      renderMoodsDisplay();
      expect(
        within(getAverageMoodParent()!).getByAltText("Average Mood Emoji")
      ).toHaveAttribute("src", "/mood_emojis/neutral_face_flat.svg");
    });
    it("should change the average mood type, its element's color and sibling image on duration change", () => {
      renderMoodsDisplay({ allMoods: [...mockAllMoods, ...additionalMoods] });
      const select = getSelectElement();
      fireEvent.change(select, { target: { value: "30" } });
      const moodTypeElement = within(getAverageMoodParent()!).getByText("SAD", {
        selector: "span",
      });
      const siblingImg = within(getAverageMoodParent()!).getByAltText(
        "Average Mood Emoji"
      );
      expect(select).toHaveValue("30");
      expect(moodTypeElement).toBeInTheDocument();
      expect(moodTypeElement).toHaveAttribute(
        "style",
        "color: rgb(96, 165, 250);"
      );
      expect(siblingImg).toHaveAttribute(
        "src",
        "/mood_emojis/frowning_face_flat.svg"
      );
    });
  });
});

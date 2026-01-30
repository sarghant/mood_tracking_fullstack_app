import {
  render,
  screen,
  fireEvent,
  within,
  waitFor,
} from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import DailyLog from "@/app/moods/components/DailyLog";
import { logMood } from "@/actions/moods.actions";
import { toast, ToastContainer } from "react-toastify";
import { MoodDisplayData, MoodType } from "@/app/moods/constants/moods";
import type { MoodWithDailyLog } from "@/lib/getMood";
import { mockAllMoods, mockCurrentMoodAccent } from "../../../fixtures/moods";

jest.mock("@/actions/moods.actions", () => ({
  logMood: jest.fn(),
}));
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
  ToastContainer: () => <div data-testid="toast-container" />,
}));

const mockLogMood = logMood as jest.MockedFunction<typeof logMood>;
const mockToast = toast as jest.MockedFunction<typeof toast>;

type MockPropsType = {
  allMoods: MoodWithDailyLog[];
  currentMoodAccent: MoodDisplayData["colors"] | undefined;
  hasLoggedMoodToday: boolean;
};

const defaultProps: MockPropsType = {
  allMoods: mockAllMoods,
  currentMoodAccent: mockCurrentMoodAccent,
  hasLoggedMoodToday: false,
};

// Helpers
const renderDailyLog = (overrides = {}) => {
  const dailyLogProps = { ...defaultProps, ...overrides };
  render(<DailyLog {...dailyLogProps} />);
};

const openForm = async (user: ReturnType<typeof userEvent.setup>) => {
  const showFormButton = screen.getByRole("button", {
    name: /show form/i,
  });
  await user.click(showFormButton);
  return screen.getByRole("form");
};
const selectMood = async (
  user: ReturnType<typeof userEvent.setup>,
  moodIndex: number = 2
) => {
  const moodLoggingForm = screen.getByRole("form");
  const moodImage =
    within(moodLoggingForm).getAllByAltText("Mood Emoji")[moodIndex];
  await user.click(moodImage);
};

describe("DailyLog", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockLogMood.mockResolvedValue({
      success: true,
      message: "You have added your daily log!",
    });
  });
  describe("when mood hasn't been logged for the day", () => {
    it("should have the showForm button present in the dom in non-disabled state while the form itself alongside with hideForm button should be hidden", () => {
      renderDailyLog();

      const showFormButton = screen.getByRole("button", {
        name: /show form/i,
      });
      const hideFormButton = screen.queryByRole("button", {
        name: /hide form button/i,
      });
      const moodLoggingForm = screen.queryByRole("form");

      expect(showFormButton).toBeInTheDocument();
      expect(showFormButton).not.toBeDisabled();
      expect(hideFormButton).not.toBeInTheDocument();
      expect(moodLoggingForm).not.toBeInTheDocument();
    });
    it("should display the mood logging form and the hideForm button with it's wrapper upon clicking the showForm button", () => {
      renderDailyLog();

      const showFormButton = screen.getByRole("button", {
        name: /show form/i,
      });

      fireEvent.click(showFormButton);
      const moodLoggingForm = screen.getByRole("form");
      const hideFormButton = screen.getByRole("button", {
        name: /hide form button/i,
      });

      expect(showFormButton).toBeDisabled();
      expect(hideFormButton).toBeInTheDocument();
      expect(moodLoggingForm).toBeInTheDocument();
      expect(moodLoggingForm).toHaveClass(
        "rotate-x-0",
        "translate-y-0",
        "opacity-100",
        "z-50",
        "pointer-events-auto"
      );
      expect(moodLoggingForm).toHaveAttribute("aria-hidden", "false");
    });
    it("should hide form when clicking the hideForm button", () => {
      renderDailyLog();

      const showFormButton = screen.getByRole("button", {
        name: /show form/i,
      });
      fireEvent.click(showFormButton);
      const moodLoggingForm = screen.queryByRole("form");
      const hideFormButton = screen.queryByRole("button", {
        name: /hide form button/i,
      });

      fireEvent.click(hideFormButton!);

      expect(moodLoggingForm).toHaveAttribute("aria-hidden", "true");
      expect(moodLoggingForm).toHaveClass(
        "rotate-x-90",
        "-translate-y-full",
        "opacity-0",
        "-z-50",
        "pointer-events-none"
      );
      expect(hideFormButton).toHaveAttribute("aria-hidden", "true");
      expect(showFormButton).not.toBeDisabled();
    });
    it("showForm button should have classnames based on current mood accent", () => {
      renderDailyLog();

      const showFormButton = screen.getByRole("button", {
        name: /show form/i,
      });

      expect(showFormButton).toHaveClass(
        mockCurrentMoodAccent!.background,
        mockCurrentMoodAccent!.hoverBackground
      );
    });
    //
    describe("form elements", () => {
      it("should render 5 radio inputs", () => {
        renderDailyLog();

        const showFormButton = screen.getByRole("button", {
          name: /show form/i,
        });
        fireEvent.click(showFormButton);
        const moodLoggingForm = screen.getByRole("form");

        const moodInputs = within(moodLoggingForm).getAllByRole("radio", {
          hidden: true,
        });
        expect(moodInputs).toHaveLength(5);
        moodInputs.forEach((input) => {
          expect(input).toHaveClass("hidden", "peer");
        });
      });
      it("radio input values should be mood types", async () => {
        renderDailyLog();
        const user = userEvent.setup();
        const moodLoggingForm = await openForm(user);
        const moodInputs = within(moodLoggingForm).getAllByRole("radio", {
          hidden: true,
        });
        const inputValues = moodInputs.map((input) =>
          input.getAttribute("value")
        );

        expect(inputValues).toEqual<MoodType[]>([
          "ANGRY",
          "SAD",
          "NEUTRAL",
          "OPTIMISTIC",
          "ECSTATIC",
        ]);
      });
      it("each radio input should have a sibling image and span elements", async () => {
        renderDailyLog();

        const user = userEvent.setup();
        const moodLoggingForm = await openForm(user);
        const moodInputs = within(moodLoggingForm).getAllByRole("radio", {
          hidden: true,
        });
        moodInputs.forEach((input) => {
          const parentLabel = input.closest("label") as HTMLLabelElement;
          const siblingImg = within(parentLabel).getByAltText("Mood Emoji");
          const siblingSpan = parentLabel.querySelector("span");
          expect(siblingImg).toBeInTheDocument();
          expect(siblingSpan).toBeInTheDocument();
        });
      });
      it("should check radio input upon clicking on a sibling image element", async () => {
        renderDailyLog();
        const user = userEvent.setup();

        const moodLoggingForm = await openForm(user);
        const moodInputs = within(moodLoggingForm).getAllByRole("radio", {
          hidden: true,
        });
        const neutralInput = moodInputs.find(
          (input) => input.getAttribute("value") === "NEUTRAL"
        )!;
        const siblingImg = within(neutralInput.closest("label")!).getByAltText(
          "Mood Emoji"
        );
        await user.click(siblingImg);

        expect(neutralInput).toBeChecked();
      });
      it("should check radio input upon clicking on a sibling span element", async () => {
        renderDailyLog();
        const user = userEvent.setup();

        const moodLoggingForm = await openForm(user);
        const moodInputs = within(moodLoggingForm).getAllByRole("radio", {
          hidden: true,
        });
        const neutralInput = moodInputs.find(
          (input) => input.getAttribute("value") === "NEUTRAL"
        )!;
        const siblingSpan = neutralInput
          .closest("label")!
          .querySelector("span")!;
        await user.click(siblingSpan);

        expect(neutralInput).toBeChecked();
      });
      // Mood logging
      it("should display error message when trying to submit without picking a mood", async () => {
        renderDailyLog();
        const user = userEvent.setup();

        const moodLoggingForm = await openForm(user);
        const submitButton = within(moodLoggingForm).getByRole("button", {
          name: /log your mood/i,
        });

        await user.click(submitButton);
        const errorMessage = screen.getByRole("alert");
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage).not.toBeEmptyDOMElement();
        expect(mockLogMood).not.toHaveBeenCalled();
      });
      it("should clear the error message after a mood has been picked", async () => {
        renderDailyLog();
        const user = userEvent.setup();

        const moodLoggingForm = await openForm(user);
        const submitButton = within(moodLoggingForm).getByRole("button", {
          name: /log your mood/i,
        });

        await user.click(submitButton);
        const errorMessage = screen.getByRole("alert");
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage).not.toBeEmptyDOMElement();

        await selectMood(user);
        expect(errorMessage).not.toBeInTheDocument();
      });
      it("should not submit form when the hideForm button is clicked", async () => {
        renderDailyLog();
        const user = userEvent.setup();

        const moodLoggingForm = await openForm(user);
        const hideFormButton = screen.getByRole("button", {
          name: /hide form button/i,
        });
        await selectMood(user);
        await user.click(hideFormButton);

        expect(mockLogMood).not.toHaveBeenCalled();
        await waitFor(() => {
          expect(mockToast.success).not.toHaveBeenCalled();
          expect(mockToast.error).not.toHaveBeenCalled();
        });
      });
      it("should call the logMood function when submitting the form when a mood is picked", async () => {
        renderDailyLog();
        const user = userEvent.setup();

        const moodLoggingForm = await openForm(user);
        const submitButton = within(moodLoggingForm).getByRole("button", {
          name: /log your mood/i,
        });
        await selectMood(user);
        await user.click(submitButton);
        expect(mockLogMood).toHaveBeenCalled();
        await waitFor(() => {
          expect(mockToast.success).toHaveBeenCalledWith(
            "You have added your daily log!"
          );
        });
      });
      it("should close/hide the form after submission", async () => {
        renderDailyLog();
        const user = userEvent.setup();

        const moodLoggingForm = await openForm(user);
        const submitButton = within(moodLoggingForm).getByRole("button", {
          name: /log your mood/i,
        });
        await selectMood(user);
        await user.click(submitButton);
        await waitFor(() => {
          expect(moodLoggingForm).toHaveAttribute("aria-hidden", "true");
          expect(moodLoggingForm).toHaveClass(
            "rotate-x-90",
            "-translate-y-full",
            "opacity-0",
            "-z-50",
            "pointer-events-none"
          );
        });
      });
      // Errors on logMood calls
      it("should display error message regarding the user not being authorized", async () => {
        const message = "You're not authorized to perform this action.";
        mockLogMood.mockResolvedValue({
          success: false,
          message,
        });
        renderDailyLog();
        const user = userEvent.setup();

        const moodLoggingForm = await openForm(user);
        const submitButton = within(moodLoggingForm).getByRole("button", {
          name: /log your mood/i,
        });
        await selectMood(user);
        await user.click(submitButton);
        expect(mockLogMood).toHaveBeenCalled();
        await waitFor(() => {
          expect(mockToast.error).toHaveBeenCalledWith(message);
        });
      });
      it("should display error message regarding unexpected issues", async () => {
        const message = "Something went wrong. Please, try again.";
        mockLogMood.mockResolvedValue({
          success: false,
          message,
        });
        renderDailyLog();
        const user = userEvent.setup();

        const moodLoggingForm = await openForm(user);
        const submitButton = within(moodLoggingForm).getByRole("button", {
          name: /log your mood/i,
        });
        await selectMood(user);
        await user.click(submitButton);
        expect(mockLogMood).toHaveBeenCalled();
        await waitFor(() => {
          expect(mockToast.error).toHaveBeenCalledWith(message);
        });
      });
    });
  });
  describe("when mood has been logged for the day", () => {
    it("should not have the wrapper containing the form and showForm button elements in the dom", () => {
      renderDailyLog({ hasLoggedMoodToday: true });

      const showFormButton = screen.queryByRole("button", {
        name: /show form/i,
      });
      const containerDiv = showFormButton?.closest("div");

      expect(containerDiv).toBeUndefined();
    });
  });
});

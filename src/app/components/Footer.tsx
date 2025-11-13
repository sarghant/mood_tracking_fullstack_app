import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="sticky top-[100vh] inset-x-0">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-2 sm:gap-4 px-4 py-6 text-sm text-gray-600 dark:text-gray-400">
        {/* Branding / Copyright */}
        <p>
          © {new Date().getFullYear()} Moodies ·{" "}
          <span className="inline-flex items-center gap-1">
            Built by
            <Link
              href="https://github.com/sarghant"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-gray-800 dark:hover:text-gray-200"
              aria-label="Visit sarghant's GitHub profile"
            >
              sarghant
              <FaGithub className="w-4 h-4" aria-hidden="true" />
            </Link>
          </span>{" "}
          · Next.js, Prisma & Neon.
        </p>
        <Link
          href="/privacy"
          className="mt-2 sm:mt-0 text-xs text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
        >
          Privacy Policy
        </Link>
        {/* Emoji Credits */}
        <p className="mt-2 sm:mt-0 text-xs text-gray-500">
          Emoji graphics provided by{" "}
          <a
            href="https://github.com/microsoft/fluentui-emoji"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-800 dark:hover:text-gray-300"
          >
            Fluent Emoji
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;

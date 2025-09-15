const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 pb-24 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
        <p className="text-blue-800 dark:text-blue-200 font-medium">
          📝 Demo Application Notice
        </p>
        <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">
          This is currently a showcase/demonstration application. While we
          protect any data you enter, please be aware this is an early-stage
          project that may evolve over time.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What This App Does</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          This mood tracking app allows you to log your daily moods and view
          your mood history. It's built as a demonstration of modern web
          technologies including Next.js, Auth.js, and Prisma.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Data We Collect</h2>

        <div className="space-y-3">
          <h3 className="text-lg font-medium">Authentication</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            When you sign in with GitHub or Google:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
            <li>Your name and email from your chosen provider</li>
            <li>Your profile picture (if available)</li>
            <li>
              We don't store your passwords - authentication is handled by
              GitHub/Google
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-medium">Mood Data</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Any mood entries you choose to log, including:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
            <li>
              Your selected mood (angry, sad, neutral, optimistic, ecstatic)
            </li>
            <li>Optional notes or quotes you add</li>
            <li>Date and time of entries</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">How We Use Your Data</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          We use your information solely to:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
          <li>Provide the mood tracking functionality</li>
          <li>Display your mood history and trends</li>
          <li>Authenticate your sessions</li>
        </ul>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-3">
          <strong>We do not:</strong> sell your data, share it with third
          parties, use it for advertising, or analyze it for commercial
          purposes.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Data Security</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Your data is stored securely using industry-standard practices.
          However, as this is a demonstration app, please don't rely on it for
          storing sensitive or critical information.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Your Control</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          You can:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
          <li>View all your mood data in the app</li>
          <li>Delete individual mood entries</li>
          <li>Sign out at any time</li>
          <li>Revoke access through your GitHub or Google account settings</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Questions?</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          This is a personal showcase project. If you have questions about the
          app or your data, feel free to check out the source code or reach out
          through the contact information provided in the app.
        </p>
      </section>

      <div className="border-t pt-6 mt-8">
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Your privacy and data are important to us.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;

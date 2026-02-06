function About() {
  return (
    <div
      style={{
        padding: "clamp(20px, 5vw, 40px)",
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      {/* TITLE */}

      <h2
        style={{
          marginBottom: "16px",
          fontSize: "clamp(22px, 4vw, 28px)",
        }}
      >
        About
      </h2>

      {/* PARAGRAPHS */}

      <p
        style={{
          fontSize: "clamp(15px, 3.5vw, 16px)",
          lineHeight: "1.7",
          marginBottom: "14px",
        }}
      >
        After every competitive exam, students look for one thing — clarity.
        Understanding performance from answer keys and response sheets can be
        confusing and stressful.
      </p>

      <p
        style={{
          fontSize: "clamp(15px, 3.5vw, 16px)",
          lineHeight: "1.7",
          marginBottom: "14px",
        }}
      >
        Manually calculating marks takes time and often leads to mistakes.
        Especially when emotions are high, students deserve a faster and more
        reliable way to analyze their results.
      </p>

      <p
        style={{
          fontSize: "clamp(15px, 3.5vw, 16px)",
          lineHeight: "1.7",
          marginBottom: "14px",
        }}
      >
        This platform was created to make that process simple. By uploading your
        Answer Key and Response Sheet, you can instantly view your expected score
        along with detailed question-wise analysis.
      </p>

      <p
        style={{
          fontSize: "clamp(15px, 3.5vw, 16px)",
          lineHeight: "1.7",
          marginBottom: "14px",
        }}
      >
        If you find any issue, error, or unexpected result while using this
        platform, please feel free to contact us at{" "}
        <strong>tutorialinside1@gmail.com</strong>. Your feedback helps us improve
        and serve you better.
      </p>

      <p
        style={{
          fontSize: "clamp(15px, 3.5vw, 16px)",
          lineHeight: "1.7",
        }}
      >
        It helps you focus less on calculations and more on planning your next
        steps in your academic journey.
      </p>

      {/* FOOTER LINE */}

      <p
        style={{
          marginTop: "24px",
          fontStyle: "italic",
          color: "#9ca3af",
          fontSize: "clamp(14px, 3vw, 15px)",
        }}
      >
        Built with students in mind.
      </p>
    </div>
  );
}

export default About;

function About() {
  return (
    <div
      style={{
        padding: "clamp(20px, 5vw, 40px)",
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      <h2
        style={{
          marginBottom: "16px",
          fontSize: "clamp(22px, 4vw, 28px)",
        }}
      >
        About
      </h2>

      <p
        style={{
          fontSize: "clamp(15px, 3.5vw, 16px)",
          lineHeight: "1.7",
          marginBottom: "14px",
        }}
      >
        After every JEE exam, students want one thing — clarity.
      </p>

      <p
        style={{
          fontSize: "clamp(15px, 3.5vw, 16px)",
          lineHeight: "1.7",
          marginBottom: "14px",
        }}
      >
        Calculating scores manually from response sheets and answer keys can be
        confusing, time-consuming, and stressful, especially when emotions are
        already high.
      </p>

      <p
        style={{
          fontSize: "clamp(15px, 3.5vw, 16px)",
          lineHeight: "1.7",
          marginBottom: "14px",
        }}
      >
        This tool was created to make that process simple. It helps JEE aspirants
        quickly check their expected scores so they can focus on what comes next.
      </p>

      <p
        style={{
          fontSize: "clamp(15px, 3.5vw, 16px)",
          lineHeight: "1.7",
        }}
      >
        No noise. No distractions. Just clarity when it matters.
      </p>

      <p
        style={{
          marginTop: "24px",
          fontStyle: "italic",
          color: "#555",
          fontSize: "clamp(14px, 3vw, 15px)",
        }}
      >
        Built with students in mind.
      </p>
    </div>
  );
}

export default About;

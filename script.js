console.log("working!");

const resumeEl = document.getElementById("resume-container");

async function getData() {
  const fileLocation = "./resume.json";

  try {
    const response = await fetch(fileLocation);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const resumeData = await response.json();

    const htmlMarkup = `
  <header>
    <h1>${resumeData.personalInformation.name}</h1>
    <p>${resumeData.personalInformation.email}</p>
    <p>${resumeData.personalInformation.phone}</p>
    <p>${resumeData.personalInformation.website}</p>
  </header>

  <section>
    <h2>Professional Summary</h2>
    <p>${resumeData.professionalSummary}</p>
  </section>

  <section>
    <h2>Skills</h2>
    <ul>
      ${resumeData.skills
        .map(
          (skill) => `
        <li>${skill}</li>
      `,
        )
        .join("")}
    </ul>
  </section>

  <section>
    <h2>Experience</h2>

    ${resumeData.experience
      .map(
        (job) => `
      <article>
        <h3>${job.title}</h3>
        <h4>${job.company}</h4>

        <p>
          ${job.dates.start} - ${job.dates.end}
        </p>

        <ul>
          ${job.responsibilities
            .map(
              (item) => `
            <li>${item}</li>
          `,
            )
            .join("")}
        </ul>

      </article>
    `,
      )
      .join("")}

  </section>
`;

    resumeEl.innerHTML = htmlMarkup;
  } catch (error) {
    console.error(error.message);
  }
}

getData();

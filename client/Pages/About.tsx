import { useAboutText } from '../hooks/useAboutText'

import { useAboutImages } from '../hooks/useAboutImages'
import { ErrorFallback } from '../components/ErrorFallback'

function About() {
  //grab text data from the database and render it on the page
  function AboutText() {
    const { data, isError } = useAboutText()
    if (isError) {
      return <ErrorFallback />
    }

    if (data)
      return (
        <>
          {data.map((section) => (
            <section
              className="rounded-md border-2 border-spamBlue p-8"
              key={section.title}
            >
              <h2 className="pb-4 font-heading text-heading-md font-heading-bold">
                {section.title}
              </h2>
              <p>{section.body}</p>
            </section>
          ))}
        </>
      )
  }

  //grab image data from the database and render it on the page
  function AboutImages() {
    const { data, isError } = useAboutImages()
    if (isError) {
      return <ErrorFallback />
    }

    if (data)
      return (
        <>
          {data.map((image) => (
            <div key={image.alt}>
              <img
                className="w-full rounded-md border-2 border-spamBlue"
                src={`/images/${image.link}`}
                alt={image.alt}
              />
              <p className="w-full">
                <em>{image.caption}</em>
              </p>
            </div>
          ))}
        </>
      )
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="flex flex-col gap-8 md:flex-row">
        <section className="w-full">
          <article className="space-y-6">
            <h1 className="pb-4 font-heading text-heading-lg font-heading-bold text-spamBlue">
              The history of SPAM
            </h1>
            <AboutText />
          </article>
        </section>
        <section className="grid grid-cols-1 gap-8 p-6 md:w-1/3">
          <AboutImages />
        </section>
      </div>
    </div>
  )
}

export default About

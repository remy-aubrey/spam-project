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
            <section key={section.title}>
              <h2>{section.title}</h2>
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
              <img src={`/images/${image.link}`} alt={image.alt} />
              <p>
                <em>{image.caption}</em>
              </p>
            </div>
          ))}
        </>
      )
  }

  return (
    // TODO: Style this page!
    <>
      <div>
        <section>
          <article>
            <h1>The history of SPAM</h1>
            <AboutText />
          </article>
        </section>
        <section>
          <AboutImages />
        </section>
      </div>
    </>
  )
}

export default About

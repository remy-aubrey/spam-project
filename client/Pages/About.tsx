import { Link } from 'react-router-dom'
import { useAboutText } from '../hooks/useAboutText'
import Button from '../components/UI/Button'
import { useAboutImages } from '../hooks/useAboutImages'

function About() {
  //grab text data from the database and render it on the page
  function AboutText() {
    const { data, isError } = useAboutText()
    if (isError) {
      return (
        <div className="flex flex-col items-center justify-center p-8">
          <p>Something went wrong</p>
          <Link to="/">
            <Button>Home</Button>
          </Link>
        </div>
      )
    }

    if (data)
      return (
        <>
          {data.map((section, idx) => (
            <section key={idx}>
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
      return (
        <div className="flex flex-col items-center justify-center p-8">
          <p>Something went wrong</p>
          <Link to="/">
            <Button>Home</Button>
          </Link>
        </div>
      )
    }

    if (data)
      return (
        <>
          {data.map((image, idx) => (
            <div key={idx}>
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

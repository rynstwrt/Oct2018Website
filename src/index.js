/** IMPORTS **/
import React from "react"
import ReactDOM from "react-dom"
import LineIcon from "react-lineicons"
import "./index.css"


/** CONSTANTS **/
const pages = {
    HOME: "HOME",
    PROJECTS: "PROJECTS",
    CONTACT: "CONTACT"
}
const startPage = pages.CONTACT


/** HEADER **/
// Header component
function Header(props)
{
    return (
        <header>
            <h1 className={"use-pointer unselectable"} onClick={() => props.onPageButtonClick(pages.HOME) }>RYAN<br/>STEWART</h1>
            <ul>
                <li>
                    <PageButton page={pages.HOME} clickFunc={(page) => props.onPageButtonClick(page)} />
                </li>
                <li>
                    <PageButton page={pages.PROJECTS} clickFunc={(page) => props.onPageButtonClick(page)} />
                </li>
                <li>
                    <PageButton page={pages.CONTACT} clickFunc={(page) => props.onPageButtonClick(page)} />
                </li>
            </ul>
        </header>
    )
}

// PageButton component
function PageButton(props)
{
    return (
        <button
            className={"use-pointer unselectable"}
            onClick={() => props.clickFunc(props.page)}>{props.page}
        </button>
    )
}


/** PAGE CONTENT **/
// PageContent component
function PageContent(props)
{
    if (props.page === pages.HOME)
    {
        return (
            <h2>Home Page</h2>
        )
    }

    if (props.page === pages.PROJECTS)
    {
        return (
            <div className={"card-container"}>
                <div className={"cards"}>
                    <ProjectCard
                        text={"CHORD PROGRESSION GENERATOR"}
                        url={"https://rynstwrt.github.io/ChordProgressionGenerator/"}
                        imageSrc={"chordgenerator.png"} />
                    <ProjectCard
                        text={"CSS ANIMATION GALLERY"}
                        url={"https://rynstwrt.github.io/CSS-Animations/"}
                        imageSrc={"animationgallery.png"} />
                    <ProjectCard
                        text={"MY OTHER WEBSITE"}
                        url={"https://www.ryanstewart.gay/"}
                        imageSrc={"otherwebsite.png"} />
                    <ProjectCard
                        text={"BLOCKY WEBSITE DESIGN CONCEPT"}
                        url={"https://rynstwrt.github.io/ryanstew.artold/website7"}
                        imageSrc={"blockywebsite.png"} />
                </div>
            </div>
        )
    }

    if (props.page === pages.CONTACT)
    {
        return (
            <div className={"card-container"}>
                <div className={"cards"}>
                    <ContactCard
                        text={"MY E-MAIL"}
                        url={"mailto:ryanstewartalex@gmail.com"}
                        iconName={"envelope"} />
                    <ContactCard
                        text={"MY GITHUB"}
                        url={"https://github.com/rynstwrt"}
                        iconName={"github"} />
                    <ContactCard
                        text={"MY TWITTER"}
                        url={"https://twitter.com/rynstwrt"}
                        iconName={"twitter"} />
                    <ContactCard
                        text={"MY INSTAGRAM"}
                        url={"https://instagram.com/rynstwrt"}
                        iconName={"instagram"} />
                    <ContactCard
                        text={"MY UNSPLASH"}
                        url={"https://unsplash.com/@rynstwrt"}
                        iconName={"unsplash"} />
                    <ContactCard
                        text={"MY CODEPEN"}
                        url={"https://codepen.io/ryanstewartalex"}
                        iconName={"codepen"} />
                </div>
            </div>
        )
    }
}

// ProjectCard component
function ProjectCard(props)
{
    return (
        <div className={"card use-pointer"} onClick={() => window.open(props.url, "__blank")}>
            <div className={"project-card-img-container"} style={{ backgroundImage: `url(${props.imageSrc})` }} />
            <p>{props.text}</p>
        </div>
    )
}

// ContactCard component
function ContactCard(props)
{
    return (
        <div className={"card use-pointer"} onClick={() => window.open(props.url, "__blank")}>
            <LineIcon name={props.iconName} />
            <p>{props.text}</p>
        </div>
    )
}


/** WEBSITE **/
// website component
class Website extends React.Component
{
    constructor(props)
    {
        super(props)

        this.state = { page: startPage }

        this.changeDisplayingPage = this.changeDisplayingPage.bind(this)
    }

    changeDisplayingPage(newPage)
    {
        this.setState({ page: newPage })
    }

    render()
    {
        return (
            <div>
                <Header onPageButtonClick={this.changeDisplayingPage} />
                <PageContent page={this.state.page} />
            </div>
        )
    }
}


/** RENDER **/
ReactDOM.render(<Website />, document.getElementById("root"))
import React from "react"
import ReactDOM from "react-dom"
import "./index.css"


/** ENUMS **/
const pages = {
    HOME: "HOME",
    PROJECTS: "PROJECTS",
    CONTACT: "CONTACT"
}


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
            <h2>Projects Page</h2>
        )
    }

    if (props.page === pages.CONTACT)
    {
        return (
            <h2>Contact Page</h2>
        )
    }

    return (
        <h3>Unknown page: "{props.page}"</h3>
    )
}


/** WEBSITE **/
// website component
class Website extends React.Component
{
    constructor(props)
    {
        super(props)

        this.state = { page: pages.HOME }

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
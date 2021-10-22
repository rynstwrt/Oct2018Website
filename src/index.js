/** IMPORTS **/
import React from "react"
import ReactDOM from "react-dom"
import { Engine, Scene, ArcRotateCamera, MeshBuilder,
    StandardMaterial, Vector3, Color4 } from "babylonjs"
import { makeStyles } from "@material-ui/core/styles"
import { Button, Grid, Container } from "@material-ui/core"
import { ConsoleArt } from "./consoleart"
import "./index.css"


/** CONSOLE ART **/
const consoleArt = new ConsoleArt("console-art")
consoleArt.showRandomConsoleArt()


/** VARIABLES **/
const pages = {
    HOME: "HOME",
    PROJECTS: "PROJECTS",
    CONTACT: "CONTACT"
}
const smallerCardImageSize = "40px"


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
class PageContent extends React.Component
{
    constructor(props)
    {
        super(props)
        this.canvasRef = React.createRef()

        this.state = {
            engine: undefined
        }
    }

    render()
    {
        if (this.props.page === pages.HOME)
        {
            if (this.state.engine)
            {
                return (
                    <canvas id={"babylon-canvas"} ref={this.canvasRef} />
                )
            }
            else
            {
                return (
                    <canvas ref={this.canvasRef} onLoad={this.attachBabylonJS()} />
                )
            }
        }

        setTimeout(() =>
        {
            if (this.state.engine)
            {
                this.state.engine.stopRenderLoop()
                this.setState({ engine: undefined })
            }
        }, 0)

        if (this.props.page === pages.PROJECTS)
        {
            return (
                <Container maxWidth={"xs"}>
                    <Grid container spacing={3} direction={"column"} >
                        <Grid item >
                            <LinkCard
                                text={"CHORD PROGRESSION GENERATOR"}
                                url={"https://rynstwrt.github.io/ChordProgressionGenerator/"}
                                imgSrc={"project-images/chordgenerator.png"} />
                        </Grid>
                        <Grid item>
                            <LinkCard
                                text={"CSS ANIMATION GALLERY"}
                                url={"https://rynstwrt.github.io/CSS-Animations/"}
                                imgSrc={"project-images/animationgallery.png"} />
                        </Grid>
                        <Grid item>
                            <LinkCard
                                text={"MY OTHER WEBSITE"}
                                url={"https://www.ryanstewart.gay/"}
                                imgSrc={"project-images/otherwebsite.png"} />
                        </Grid>
                        <Grid item>
                            <LinkCard
                                text={"BLOCKY WEBSITE DESIGN CONCEPT"}
                                url={"https://rynstwrt.github.io/ryanstew.artold/website7"}
                                imgSrc={"project-images/blockywebsite.png"} />
                        </Grid>
                    </Grid>
                </Container>
            )
        }

        if (this.props.page === pages.CONTACT)
        {
            return <Container maxWidth={"xs"}>
                <Grid container spacing={3} direction={"column"} >
                    <Grid item >
                        <LinkCard
                            text={"MY E-MAIL"}
                            url={"mailto:ryanstewartalex@gmail.com"}
                            imgSrc={"icons/lineicons/envelope.png"} />
                    </Grid>

                    <Grid item >
                        <LinkCard
                            text={"MY GITHUB"}
                            url={"https://github.com/rynstwrt"}
                            imgSrc={"icons/lineicons/github-original.png"} />
                    </Grid>
                    <Grid item>
                        <LinkCard
                            text={"MY TWITTER"}
                            url={"https://twitter.com/rynstwrt"}
                            imgSrc={"icons/lineicons/twitter-filled.png"} />
                    </Grid>
                    <Grid item >
                        <LinkCard
                            text={"MY INSTAGRAM"}
                            url={"https://instagram.com/rynstwrt"}
                            imgSrc={"icons/lineicons/instagram-filled.png"} />
                    </Grid>
                    <Grid item >
                        <LinkCard
                            text={"MY UNSPLASH"}
                            url={"https://unsplash.com/@rynstwrt"}
                            imgSrc={"icons/lineicons/unsplash.png"} />
                    </Grid>
                    <Grid item >
                        <LinkCard
                            text={"MY CODEPEN"}
                            url={"https://codepen.io/rynstwrt"}
                            imgSrc={"icons/lineicons/codepen.png"} />
                    </Grid>
                </Grid>
            </Container>
        }
    }

    // Attach BabylonJS if not done already
    attachBabylonJS()
    {
        setTimeout(() =>
        {
            const canvas = this.canvasRef.current
            const engine = new Engine(canvas, true)
            this.setState({ engine: engine })

            const scene = new Scene(engine)
            scene.clearColor = new Color4(0, 0, 0, 0)

            const shape = MeshBuilder.CreatePolyhedron("shape", {type: 3, size: 5}, scene);
            const shapeMat = new StandardMaterial("shapeMat", scene);
            shape.material = shapeMat;
            shapeMat.wireframe = true;

            const camera = new ArcRotateCamera("camera",
                Math.random() * (Math.PI * 2),
                Math.random() * (Math.PI * 2),
                20,
                Vector3.Zero(),
                scene);
            camera.attachControl(canvas, true);

            window.addEventListener("resize", () => { engine.resize(); });

            const inc = .00075;
            engine.runRenderLoop(() =>
            {
                scene.render()
                const shape = scene.getMeshByName("shape");
                shape.rotation.x += inc;
                shape.rotation.y += inc;
                shape.rotation.z += inc;
            })

        }, 0)
    }

}

// LinkCard style
const usesCardStyle = makeStyles(() =>
({
    root:
    {
        backgroundColor: "#FEFEFE",
        padding: ".5rem 1.25rem",
        fontFamily: "Roboto, sans-serif",
        fontSize: ".95rem",

        "&:hover":
        {
            backgroundColor: "#EEE"
        }
    }
}))

// LinkCard component
function LinkCard(props)
{
    let cardImageStyle = {
        backgroundImage: `url("${props.imgSrc}")`,
    }

    if (props.imgSrc.toString().startsWith("icons/lineicons/"))
    {
        cardImageStyle.minWidth = smallerCardImageSize
        cardImageStyle.width = smallerCardImageSize
        cardImageStyle.height = smallerCardImageSize
        cardImageStyle.borderRadius = "0"
    }

    return (
        <Button className={usesCardStyle().root}
                variant={"contained"}
                color={"default"}
                fullWidth={true}
                onClick={() => { window.open(props.url, "__blank") }}>
            <div className={"card-content"}>
                <div className={"card-image"} style={cardImageStyle} />
                <p>{props.text}</p>
            </div>
        </Button>
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
const consoleArtFiles = [
    "squidward.txt",
    "ahegao.txt",
    "amogus.txt",
    "imposter.txt",
    "uwu.txt"
]

export class ConsoleArt
{
    artDirectory = ""

    constructor(artDirectory)
    {
        this.artDirectory = artDirectory
    }

    showConsoleArt(fileName)
    {
        fetch(this.artDirectory + "/" + fileName)
            .then(resp => resp.text())
            .then(data =>
            {
                console.log(data)
            })
    }

    showRandomConsoleArt()
    {
        const randomIndex = Math.floor(Math.random() * consoleArtFiles.length)
        this.showConsoleArt(consoleArtFiles[randomIndex])
    }
}
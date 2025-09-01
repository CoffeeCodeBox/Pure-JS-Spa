import router from "./router.js"

const spaLinks = document.querySelectorAll(".spa-link")
const wrapper = document.querySelector("main")

spaLinks.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault()
        const route = e.target.href
        history.pushState({}, "", route)

        locationHandler()
    })
})

const manipulateDom = async url => {
    try{
        const res = await fetch(url)

        if(!res.ok){
            throw new Error("failed to fetch page content!")
        }

        const html = await res.text()

        wrapper.innerHTML = html
    }
    catch (err) {
        console.error(err)
    }
}

const locationHandler = () => {
    const pathName = location.pathname
    const reqFilePath = router[pathName]?.template ?? "./404.html"
    const title = router[pathName]?.title ?? "Not Found!"

    document.title = title
    manipulateDom(reqFilePath)
}

window.addEventListener("popstate", locationHandler)
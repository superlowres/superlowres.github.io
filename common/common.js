/*
 *  SRL - Menu
 *  Ce morceau de code:
 *  1. écrit quelque default (touchmove)
 *  2. injecte micro navigation
 *  3. injecte bouton audio
 */

// 1. Eject depuis un iframe, si jamais ---------------------------------------
if (top.location != document.location) {
    top.location.href = document.location.href
}

// 2. No "bounce" (mobnile) ---------------------------------------------------
document.ontouchmove = function(e){
    e.preventDefault()
}

// 3. Boot baby ---------------------------------------------------------------
window.addEventListener("load", run)

function run() {

    fetch("/common/sequence.json").then(function(res){
        return res.json()
    }).then(function(json){

        const url_chunks = location.pathname.split("/")
        const nom        = url_chunks[url_chunks.length - 3]
        const sub        = url_chunks[url_chunks.length - 2]
        const dossier    = nom + "/" + sub
        const current_index = json.findIndex(e => (e.dossier == dossier))

        window.localStorage.setItem(dossier, 1) // visited?

        init_menu(json, current_index)
    })

    function init_menu(data, current_index) {

        // --- Output ---------------------------------------------------------

        const menu = document.createElement("div")
        menu.classList.add("minimenu")
        const parent = document.body
        parent.insertBefore(menu, document.body.firstChild)

        const prev = data[(current_index + data.length - 1) % data.length]
        const next = data[(current_index + 1) % data.length]

        let html = `
            <ul>
            <li><a class="btn btn_prev" href="/cahier/${prev.dossier}"></a></li>
            <li><a class="btn btn_next" href="/cahier/${next.dossier}"></a></li>
            <li><a class="btn btn_home" href="/index.html"></a></li>
            <li><span class="index"><sup>${(current_index + 1)}</sup>/<sub>${data.length}<sub><span></li>
            <li class="unbreak"><span class="nom">${data[current_index].nom}<span></li>
            <li><span class="btn btn_play"></span></li>
            <li class="break"><canvas></canvas></li>
            </ul>
        `;
        menu.innerHTML = html

         // --- Sound ---------------------------------------------------------

        window.AudioContext = window.AudioContext || window.webkitAudioContext // WebKit 2020 ?

        const audio_ctx = new AudioContext()
        const sound = new Audio('audio.mp3')
        sound.load() // load() necessaire!! (Safari, voir aussi QUIRK, plus en bas)

        // sound.addEventListener("loadedmetadata", e => console.log("1. loadedmetadata"))
        // sound.addEventListener("loadeddata",     e => console.log("2. loadeddata"))
        // sound.addEventListener("canplay",        e => console.log("3. canplay"))
        // sound.addEventListener("canplaythrough", e => console.log("4. canplaythrough"))
        // sound.addEventListener("play",           e => console.log("5. play") )
        sound.addEventListener("ended", e => {
            // console.log("6. ended")
            sound.currentTime = 0
            play_btn.dataset.playing = 0
        })

        let analyser, buffer_data
        const play_btn = menu.querySelector(".btn_play")

        let __run_once__ = false
        play_btn.addEventListener('click', e => {
            // QUIRK: analyser DOIT etre ajouté aprés .load() sur Safari (Version 13.1)
            //             and DOIT etre ajouté aprés "canplay" event (???)
            //             and DOIT etre ajouté aprés "canplaythrough" event (???)
            //             (ça marche en locale, mais pas sur le sérveur)
            if(!__run_once__) {
                __run_once__ = true
                analyser = audio_ctx.createAnalyser()
                analyser.fftSize = 256
                analyser.connect(audio_ctx.destination)
                buffer_data = new Uint8Array(analyser.frequencyBinCount)
                const audio_src = audio_ctx.createMediaElementSource(sound)
                audio_src.connect(analyser)
                requestAnimationFrame(render)
            }
            if (e.target.dataset.playing == 1) {
                e.target.dataset.playing = 0
                sound.pause()
            } else {
                e.target.dataset.playing = 1
                sound.play()
            }
        })

        // --- Canvas ---------------------------------------------------------

        const canvas = menu.querySelector("canvas")
        const ctx = canvas.getContext('2d')
        const w = 128
        const h = 24
        canvas.width = w
        canvas.height = h
        canvas.style.width = w + "px"
        canvas.style.height = h + "px"

        ctx.strokeStyle = 'white'
        ctx.fillStyle   = 'white'
        ctx.lineWidth   = 1
        ctx.beginPath()
        ctx.moveTo(0, h/2)
        ctx.lineTo(w, h/2)
        ctx.stroke()

        function render() {

            requestAnimationFrame(render)

            analyser.getByteTimeDomainData(buffer_data)

            ctx.clearRect(0, 0, w, h)
            ctx.beginPath()
            for (let i=0; i<=buffer_data.length; i++){
                const y = (buffer_data[i]-128) / 128.0 * h*2 + h/2 + 0.5 // Per avere la linea nitida spostiamo di 0.5px
                ctx.lineTo(i, y)
            }
            ctx.stroke()

            const rad = 2.5
            const idx = Math.floor(sound.currentTime / sound.duration * (w-1)) || 0
            const y = (buffer_data[idx]-128) / 128.0 * h*2 + h/2 + 0.5
            ctx.beginPath()
            ctx.ellipse(idx+rad, y, rad, rad, 0, 0, Math.PI * 2, false)
            ctx.fill()
        }
    }
}

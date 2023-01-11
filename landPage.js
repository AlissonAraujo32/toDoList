function startTime(){
    const res = new Date("januery 29, 2023") - new Date()

    let seconds = 1000
    let minutes = seconds * 60
    let hour = minutes * 60
    let day = hour * 24

    document.querySelector('.day').innerText = Math.floor(res/ day)

    document.querySelector('.hour').innerText = Math.floor((res % day) / hour)

    document.querySelector('.minute').innerText = Math.floor((res % hour) / minutes)

    document.querySelector('.second').innerText = Math.floor((res % minutes) / seconds)
}
setInterval(startTime, 1000)
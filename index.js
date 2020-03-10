const scGap = 0.02
const delay = 30

class AnimatedScale {

    scale = 0
    animated = false
    interval

    start(cb) {
        if (!this.animated) {
            this.animated = true
            setInterval(() => {
                scale += scGap
                cb(scale)
            }, delay)
        }
    }

    stop() {
        if (this.animated) {
            this.animated = false
            clearInterval(this.interval)
        }
    }
}

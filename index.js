const scGap = 0.02
const delay = 30
const radiusFactor = 5
const sizeFactor = 8
const w = window.innerWidth
const h = window.innerHeight

class AnimatedScale {

    scale = 0
    animated = false
    interval

    start(cb) {
        if (!this.animated) {
            this.animated = true
            const interval = setInterval(() => {
                this.scale += scGap
                cb(Math.sin(this.scale * Math.PI))
                if (this.scale > 1) {
                    cb(0)
                    this.scale = 0
                    clearInterval(interval)
                    this.animated = false
                }
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

Vue.component('plus-button', {
    data() {
        const sf = 0
        const animatedScale = new AnimatedScale()
        return {sf, animatedScale}
    },
    methods: {
        start() {
            this.animatedScale.start((sf) => {
                this.sf = sf
            })
        },
        getCommonStyle() {
            const rSize = this.getSize()
            const size = Math.min(w, h) / sizeFactor
            const width = `${size}px`
            const height = `${size / 11}px`
            const background = 'white'
            const position = 'relative'
            const left = `${-size / 2 + rSize / 2}px`
            const top = `${-parseFloat(height) / 2 + rSize / 2}px`
            return  {width, height, background, position, top, left}
        },

        getSize() {
            return Math.min(w, h) / radiusFactor
        }
    },
    computed: {
        objStyle() {
            const size = this.getSize()
            const position = 'absolute'
            const left = `${w / 2}px`
            const top = `${h / 2}px`
            const width = `${size}px`
            const height = `${size}px`
            const borderRadius = '50%'
            const background = '#4CAF50'
            const WebkitTransform = `rotate(${45 * this.sf}deg)`
            return {position, left, top, width, height, background, borderRadius, WebkitTransform}
        },
        plusStyle1() {
            return this.getCommonStyle()
        },

        plusStyle2() {
            const style = Object.assign({}, this.getCommonStyle())
            style.WebkitTransform = `rotate(90deg)`
            return style
        }
    },
    template : '<div :style = "objStyle" @click = "start"><div :style = "plusStyle1"></div><div :style = "plusStyle2"></div></div>'
})

const vueInstance = new Vue({
    el : '#app',
})

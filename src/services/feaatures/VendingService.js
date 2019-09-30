import $ from 'jquery'
import reduxService from '../redux/reduxService'
import { resolvePurchase } from '../../store/config/asyncActions'
import { openPopup } from '../../store/common/actions'
import appService from '../core/appService'

class VendingMachine {
    constructor() {
        this.setupLabels()
        this.setInitialDisabled()
        this.bindEventListeners()

        this.scene = {
            letter: '',
            number: '',
        }
    }

    setupLabels() {
        $('[data-shelf]').each((i, el) => {
            const letter = $(el).data('shelf')

            this.addNumpad(letter, 'letter')

            $('[data-can]', el).each((j, el2) => {
                const number = $(el2).data('can')

                $(el2).append(
                    '<div class="can-label">' + letter + number + '</div>'
                )
            })
        })

        for (let i = 1; i < 6; i++) {
            this.addNumpad(i, 'number')
        }
    }

    bindEventListeners() {
        $('[data-label]').on('click', e => {
            if (!$(e.currentTarget).hasClass('disabled')) {
                var val = $(e.currentTarget).data('label')
                var type = $(e.currentTarget).data('type')

                this.addVal(val, type)
            }
        })
    }

    addNumpad(label, type) {
        $('.numpad').append(
            '<button data-label="' +
                label +
                '" data-type="' +
                type +
                '">' +
                label +
                '</button>'
        )
    }

    setInitialDisabled() {
        $('[data-type="letter"]').removeClass('disabled')
        $('[data-type="number"]').addClass('disabled')
    }

    disableAll() {
        $('[data-type]').addClass('disabled')
    }

    resetVals() {
        this.scene.letter = ''
        this.scene.number = ''

        this.showVal()
    }

    addVal(val, type) {
        if (type === 'letter') {
            this.scene.letter = val
            this.scene.number = ''
        } else {
            this.scene.number = val
        }

        this.validate()
    }

    validate() {
        const {
            user: { balance },
        } = reduxService.getState('config')

        if (balance === 0) {
            reduxService.dispatch(
                openPopup('warning', {
                    title: "You didn't add any money",
                    msg: 'Please add money in order to purchase',
                })
            )
            return
        }

        if (!!this.scene.number && !appService.hasMoney(this.scene.number)) {
            // Reset to starting position
            this.setInitialDisabled()
            this.resetVals()
            return
        }

        //check if slot is empty
        if (
            !!this.scene.letter.length &&
            !!this.scene.number &&
            appService.isSlotEmpty(this.scene.letter, this.scene.number)
        ) {
            reduxService.dispatch(
                openPopup('warning', {
                    title: 'The slot is empty',
                    msg: 'Please choose another slot or beverage',
                })
            )
            return
        }

        if (this.scene.letter.length) {
            $('[data-type="number"]').removeClass('disabled')
        }

        if (this.scene.number) {
            $('[data-type="number"]').addClass('disabled')
            this.getBeverage()
        }

        this.showVal()
    }

    showVal() {
        $('.current-input').text(this.scene.letter + this.scene.number)
    }

    getBeverage() {
        console.log('getting drink : ' + this.scene.letter + this.scene.number)
        this.disableAll()

        this.getPosition()
    }

    getPosition() {
        const el = $(
            '[data-shelf="' +
                this.scene.letter +
                '"] [data-can="' +
                this.scene.number +
                '"]'
        )

        const x = el[0].offsetLeft
        const y = el[0].offsetTop

        this.setPosition(x, y, () => {
            // Getting the product

            this.appendTheCan()

            // purchase item
            this.purchase()

            this.setPosition(110, 420, () => {
                // Dropping the product

                this.dropTheCan()

                this.showCan()

                this.setPosition(195, 345, () => {
                    // Reset to starting position
                    this.setInitialDisabled()
                    this.resetVals()
                })
            })
        })
    }

    showCan() {
        $('.tray-inner').append(
            '<div class="container" data-can="' +
                this.scene.number +
                '"><div class="can"></div></div>'
        )

        $('.tray').addClass('open')

        setTimeout(() => {
            $('.tray').removeClass('open')
            $('.tray-inner [data-can]').addClass('hide')

            setTimeout(function() {
                $('.tray-inner [data-can]').remove()
            }, 750)
        }, 2500)
    }

    appendTheCan() {
        $('.hand').append(
            '<div class="container" data-can="' +
                this.scene.number +
                '"><div class="can"></div></div>'
        )
    }

    dropTheCan() {
        $('.hand [data-can]').remove()
    }

    setPosition(x, y, callback) {
        $('.hand').on('transitionend', () => {
            $('.hand').off('transitionend')

            setTimeout(function() {
                callback()
            }, 500)
        })

        this.calculateVelocity(x, y, (velX, velY) => {
            $('.arm').css({
                top: y + 35 + 'px',
                'transition-duration': velY + 's',
            })

            $('.hand').css({
                left: x + 5 + 'px',
                'transition-duration': velX + 's',
                'transition-delay': velY + 's',
            })
        })
    }

    calculateVelocity(x, y, callback) {
        const currentX = $('.hand')[0].offsetLeft
        const currentY = $('.arm')[0].offsetTop

        const velX = Math.ceil(
            (Math.max(currentX, x) - Math.min(currentX, x)) / 70
        )
        const velY = Math.ceil(
            (Math.max(currentY, y) - Math.min(currentY, y)) / 70
        )

        callback(velX, velY)
    }

    purchase() {
        const stockId = appService.getStockId()
        const stockAmount = appService.getStockAmount(
            this.scene.letter,
            this.scene.number
        )
        const userId = appService.getUserId()
        const { name: product } = appService.getProductFromId(this.scene.number)
        reduxService.dispatch(
            resolvePurchase({
                letter: this.scene.letter,
                number: this.scene.number,
                stockId,
                stockAmount,
                userId,
                product,
            })
        )
    }
}

export default VendingMachine

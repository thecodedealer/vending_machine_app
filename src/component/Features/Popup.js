import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import * as commonActions from '../../store/common/actions'

const MySwal = withReactContent(Swal)

const Popup = props => {
    const dispatch = useDispatch()
    const { showPopup } = useSelector(store => store.common)

    const triggerAlert = ({ option, details }) => {
        let title = ''
        let content = ''

        if (details instanceof Error) {
            title = details.name
            content = details.stack
        } else {
            title = details.title
            content = details.msg
        }

        MySwal.fire({
            type: option,
            title: <p>{title}</p>,
            html: (
                <div>
                    <p>{content}</p>
                </div>
            ),
        }).then(res => {
            if (res) dispatch(commonActions.closePopup())
        })
    }

    useEffect(() => {
        if (!!showPopup) triggerAlert(showPopup)
    }, [showPopup])

    return <React.Fragment></React.Fragment>
}

export default Popup

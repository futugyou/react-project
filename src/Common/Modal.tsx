import './Modal.css'
import { Modal as Modalraw } from 'bootstrap'

interface ModalProps {
    children: React.ReactNode
    autoClose?: boolean
    showHeader?: boolean
    header?: string
    onModalClose?: () => void
}

function Modal(props: ModalProps) {
    const closeModal = () => {
        const alreadyOpen = Element.prototype.querySelector.call(
            document.documentElement,
            '.modal.show'
        )

        if (alreadyOpen) {
            Modalraw.getInstance(alreadyOpen)?.hide()
        }

        if (props.onModalClose) {
            props.onModalClose()
        }
    }

    const dialog = <div className="modal-dialog" style={{ maxWidth: "max-content" }}>
        <div className="modal-content">
            {props.showHeader && (
                <div className="modal-header">
                    <h5 className="modal-title">{props.header}</h5>
                    {!props.autoClose && (
                        <button type="button" className="btn-close" onClick={closeModal}></button>
                    )}
                </div>
            )}
            <div className="modal-body">
                {props.children}
            </div>
        </div>
    </div>

    if (props.autoClose) {
        return (
            <>
                <div className="modal fade" tabIndex={-1}>
                    {dialog}
                </div >
            </>
        )
    }

    return (
        <>
            <div className="modal fade" tabIndex={-1} data-bs-backdrop="static" data-bs-keyboard="false">
                {dialog}
            </div >
        </>
    )
}

export default Modal
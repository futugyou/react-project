import './Examples.css'

import { BsSearch, BsChevronDown } from "react-icons/bs"

import Dropdown, { DropdownItem } from "./Dropdown"

function Examples(props: any) {
    let fakeList: any[] = []
    for (let index = 0; index < 20; index++) {
        fakeList.push({
            key: index,
            title: "this is title " + index,
            description: "this is description " + index,
            icon: ""
        })
    }

    const categories: DropdownItem[] = [
        {
            key: "chooseAll",
            value: "All Categories",
        },
        {
            key: "answers",
            value: "answers",
        },
        {
            key: "classification",
            value: "classification",
        },
        {
            key: "code",
            value: "code",
        },
        {
            key: "conversation",
            value: "conversation",
        },
        {
            key: "generation",
            value: "generation",
        },
        {
            key: "translation",
            value: "translation",
        },
        {
            key: "transformation",
            value: "transformation",
        },
    ]

    const exampleItems = fakeList.map(item => {
        return (
            <div key={item.key} className="example-item" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever={item.key}>
                <div className="example-item-left">
                    <BsSearch></BsSearch>
                </div>
                <div className="example-item-right">
                    <div className="example-item-title">{item.title}</div>
                    <div className="example-item-description">{item.description}</div>
                </div>
            </div>
        )
    })
    const exampleModal = document.getElementById('exampleModal')
    if (exampleModal) {
        exampleModal.addEventListener('show.bs.modal', event => {
            // Button that triggered the modal
            const button = event.relatedTarget
            // Extract info from data-bs-* attributes
            const recipient = button.getAttribute('data-bs-whatever')

            // Update the modal's content.
            const modalTitle = exampleModal.querySelector('.modal-title')
            const modalBodyInput = exampleModal.querySelector('.modal-body input')

            modalTitle!.textContent = `New message to ${recipient}`
            modalBodyInput!.value = recipient
        })
    }
    return (
        <div className="example-page">
            <div className="example-container">
                <div className="example-header">
                    <h1 className="text-title">Examples</h1>
                    <h3 className="text-tagline">Explore what's possible with some example applications</h3>
                </div>
                <div className="example-search">
                    <div className="example-search-input-container">
                        <BsSearch className="search-icon"></BsSearch>
                        <input className="example-search-input"></input>
                    </div>
                    <Dropdown items={categories}></Dropdown>
                </div>
                <div className="example-item-container">
                    {exampleItems}

                </div>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-fullscreen-lg-down">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">New message</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Recipient:</label>
                                    <input type="text" className="form-control" id="recipient-name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label">Message:</label>
                                    <textarea className="form-control" id="message-text"></textarea>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Send message</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Examples
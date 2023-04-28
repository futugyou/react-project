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
            <div key={item.key} className="example-item">
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
        </div>
    )
}

export default Examples
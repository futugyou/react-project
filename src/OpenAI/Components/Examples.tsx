import './Examples.css'

import { useState, useEffect } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs"

import Dropdown, { DropdownItem } from "./Dropdown"
import ExampleDetail from "./ExampleDetail"

import set from '../Services/Example';
import { ExampleModel, DefaultExampleModel } from '../Models/ExampleModel';

export async function examplesLoader({ params, request }: any) {
    console.log(params, request)
    return await set.getAllExamples();
}

function Examples(props: any) {
    const loaderdata = useLoaderData() as ExampleModel[]
    const [exampleList, setExampleList] = useState(loaderdata)
    const [exampleData, setExampleData] = useState<ExampleModel>(exampleList.length > 1 ? exampleList[0] : DefaultExampleModel)

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

    const exampleItems = exampleList.map(item => {
        return (
            <div key={item.key} className="example-item" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-key={item.key}>
                <div className="example-item-left">
                    <BsSearch></BsSearch>
                </div>
                <div className="example-item-right">
                    <div className="example-item-title">{item.title}</div>
                    <div className="example-item-description">{item.subTitle}</div>
                </div>
            </div>
        )
    })

    useEffect(() => {
        const exampleModal = document.getElementById("exampleModal")
        if (exampleModal) {
            exampleModal.addEventListener("show.bs.modal", (event: any) => {
                const div = event.relatedTarget
                const key = div.getAttribute("data-bs-key")

                const data = exampleList.find(p => p.key === key) ?? DefaultExampleModel
                setExampleData(data)
            })
        }
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
            <div className="modal fade" id="exampleModal" tabIndex={-1} aria-hidden="true">
                <ExampleDetail data={exampleData}></ExampleDetail>
            </div>
        </div >
    )
}

export default Examples
import './Examples.css'

import { useState, useEffect, lazy } from "react"
import { useLoaderData, useLocation, useNavigate } from "react-router-dom"
import { BsSearch } from "react-icons/bs"

import Dropdown, { DropdownItem } from "./Dropdown"

import { ExampleModel, DefaultExampleModel } from '../Models/ExampleModel'

const ExampleDetail = lazy(() => import('./ExampleDetail'))
const ExampleEdit = lazy(() => import('./ExampleEdit'))

const Examples = (props: any) => {
    let loaderdata = useLoaderData() as ExampleModel[]

    const [editMode, setEditMode] = useState(false)
    const [exampleList, setExampleList] = useState(loaderdata)
    const [exampleData, setExampleData] = useState<ExampleModel>(exampleList.length > 1 ? exampleList[0] : DefaultExampleModel)
    const [searchFilter, setSearchFilter] = useState({ key: "", category: "chooseAll" })

    useEffect(() => {
        const list = loaderdata
            .filter(p => p.tags == undefined || p.tags.findIndex(element => {
                return element.toLowerCase() === searchFilter.category.toLowerCase()
                    || searchFilter.category === "chooseAll";
            }) >= 0)
            .filter(p => searchFilter.key === ""
                || p.title.toLowerCase().includes(searchFilter.key.toLowerCase())
                || p.description.toLowerCase().includes(searchFilter.key.toLowerCase()))

        setExampleList(list)
    }, [searchFilter])

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

                let data = exampleList.find(p => p.key === key) ?? DefaultExampleModel
                data = {
                    ...DefaultExampleModel,
                    ...data,
                }
                setExampleData(data)
            })
        }
    })

    const HandleCategoryChange = (category: string) => {
        setSearchFilter({
            ...searchFilter,
            category: category,
        })
    }

    const handleKeyworkChange = (e: any) => {
        const k: string = e.target.value;
        setSearchFilter({
            ...searchFilter,
            key: k ?? "",
        })
    }

    const onModeChange = (f: boolean) => {
        setEditMode(() => f)
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
                        <input className="example-search-input" onChange={handleKeyworkChange}></input>
                    </div>
                    <Dropdown items={categories} onDropdownChange={HandleCategoryChange}></Dropdown>
                </div>
                <div className="example-item-container">
                    {exampleItems}
                </div>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex={-1} data-bs-backdrop="static" data-bs-keyboard="false">

                <div className="modal-dialog" style={{ maxWidth: "max-content" }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"></h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {!editMode && (<ExampleDetail data={exampleData} onEidtClick={() => onModeChange(true)}></ExampleDetail>)}
                            {editMode && (<ExampleEdit data={exampleData} onCancelClick={() => onModeChange(false)}></ExampleEdit>)}
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default Examples